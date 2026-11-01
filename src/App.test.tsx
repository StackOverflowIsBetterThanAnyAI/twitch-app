import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { createStreams, getRequestBody, jsonResponse } from './testUtils'

const AUTH_URL = 'https://twitch-backend.vercel.app/api/auth'
const STREAMS_URL = 'https://twitch-backend.vercel.app/api/streams'

const mockBackend = (streamCount = 20) =>
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (input === AUTH_URL) {
            return jsonResponse({
                access_token: 'token',
                expires_in: 1000,
                token_type: 'bearer',
            })
        }
        if (input === STREAMS_URL) {
            const { url } = JSON.parse(init?.body as string)
            if (url.startsWith('https://api.twitch.tv/helix/streams')) {
                return jsonResponse(createStreams(streamCount))
            }
            const ids = new URL(url).searchParams.getAll('id')
            return jsonResponse({
                data: ids.map((id) => ({
                    id,
                    profile_image_url: `https://static-cdn.jtvnw.net/jtv_user_pictures/${id}.png`,
                })),
            })
        }
        throw new Error(`Unexpected request to ${input}`)
    })

const helixUrls = (fetchMock: ReturnType<typeof mockBackend>) =>
    fetchMock.mock.calls
        .filter(([input]) => input === STREAMS_URL)
        .map((call) => getRequestBody(call).url as string)

describe('App', () => {
    it('loads the profile pictures of all streamers with one request', async () => {
        const fetchMock = mockBackend()
        vi.stubGlobal('fetch', fetchMock)

        render(<App />)

        await screen.findByTestId('streamfeed-heading-1')
        const profilePicture = await screen.findByTestId(
            'streamfeed-profilepicture-19'
        )
        await vi.waitFor(() =>
            expect(profilePicture).toHaveAttribute(
                'src',
                'https://static-cdn.jtvnw.net/jtv_user_pictures/19.png'
            )
        )

        const urls = helixUrls(fetchMock)
        const userRequests = urls.filter((url) => url.includes('/users'))
        expect(userRequests).toHaveLength(1)
        expect(new URL(userRequests[0]).searchParams.getAll('id')).toHaveLength(
            20
        )
        expect(
            fetchMock.mock.calls.filter(([input]) => input === AUTH_URL)
        ).toHaveLength(1)
    })

    it('reuses cached profile pictures instead of requesting them again', async () => {
        sessionStorage.setItem(
            'twitch-app',
            JSON.stringify({
                access_token: 'token',
                expires_in: 1000,
                token_type: 'bearer',
                profile_pictures: Object.fromEntries(
                    Array.from({ length: 20 }, (_, index) => [
                        `${index}`,
                        `https://static-cdn.jtvnw.net/jtv_user_pictures/${index}.png`,
                    ])
                ),
            })
        )
        const fetchMock = mockBackend()
        vi.stubGlobal('fetch', fetchMock)

        render(<App />)

        await screen.findByTestId('streamfeed-profilepicture-19')
        expect(helixUrls(fetchMock).some((url) => url.includes('/users'))).toBe(
            false
        )
    })

    it('has a single main heading and a skip link', async () => {
        vi.stubGlobal('fetch', mockBackend())

        render(<App />)

        await screen.findByTestId('streamfeed-heading-1')
        expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
        expect(
            screen.getByRole('link', { name: 'Skip to main content' })
        ).toHaveAttribute('href', '#main')
        expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
    })

    it('announces the number of results when a filter is applied', async () => {
        const user = userEvent.setup()
        vi.stubGlobal('fetch', mockBackend())

        render(<App />)

        await user.click(await screen.findByTestId('streamfeed-game-3'))

        expect(
            screen.getByRole('heading', { level: 1, name: /with: Game 3/ })
        ).toBeInTheDocument()
        expect(
            screen.getAllByRole('status').map((status) => status.textContent)
        ).toContain('1 Livestream found for Game 3')
    })

    it('labels the search input and announces the suggestions', async () => {
        const user = userEvent.setup()
        vi.stubGlobal('fetch', mockBackend())
        window.innerWidth = 1280
        window.dispatchEvent(new Event('resize'))

        render(<App />)
        await screen.findByTestId('streamfeed-heading-1')

        const search = within(screen.getByRole('search'))
        await user.type(
            search.getByRole('searchbox', {
                name: 'Search current Livestreams',
            }),
            'User1'
        )

        expect(
            screen.getAllByRole('status').map((status) => status.textContent)
        ).toContain('11 suggestions available')
    })
})
