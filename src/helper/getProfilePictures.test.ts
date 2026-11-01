import { getRequestBody, jsonResponse } from '../testUtils'
import { getProfilePictures } from './getProfilePictures'
import { setItemInStorage } from './setItemInStorage'

const mockUsersEndpoint = () =>
    vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        const { url } = JSON.parse(init?.body as string)
        const ids = new URL(url).searchParams.getAll('id')
        return jsonResponse({
            data: ids.map((id) => ({
                id,
                profile_image_url: `https://static-cdn.jtvnw.net/jtv_user_pictures/${id}.png`,
            })),
        })
    })

describe('getProfilePictures', () => {
    beforeEach(() => {
        setItemInStorage('access_token', 'token')
        setItemInStorage('expires_in', 1000)
        setItemInStorage('token_type', 'bearer')
    })

    it('fetches all profile pictures with a single request', async () => {
        const fetchMock = mockUsersEndpoint()
        vi.stubGlobal('fetch', fetchMock)

        const pictures = await getProfilePictures(['1', '2', '3'])

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(getRequestBody(fetchMock.mock.calls[0]).url).toBe(
            'https://api.twitch.tv/helix/users?id=1&id=2&id=3'
        )
        expect(pictures).toEqual({
            1: 'https://static-cdn.jtvnw.net/jtv_user_pictures/1.png',
            2: 'https://static-cdn.jtvnw.net/jtv_user_pictures/2.png',
            3: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3.png',
        })
    })

    it('removes duplicate ids', async () => {
        const fetchMock = mockUsersEndpoint()
        vi.stubGlobal('fetch', fetchMock)

        await getProfilePictures(['1', '1', '2'])

        expect(getRequestBody(fetchMock.mock.calls[0]).url).toBe(
            'https://api.twitch.tv/helix/users?id=1&id=2'
        )
    })

    it('splits more than 100 ids into multiple requests', async () => {
        const fetchMock = mockUsersEndpoint()
        vi.stubGlobal('fetch', fetchMock)
        const ids = Array.from({ length: 150 }, (_, index) => `${index}`)

        const pictures = await getProfilePictures(ids)

        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(Object.keys(pictures)).toHaveLength(150)
    })

    it('returns an empty result when the request fails', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => jsonResponse({ error: 'Server error' }, 500))
        )

        await expect(getProfilePictures(['1'])).resolves.toEqual({})
    })
})
