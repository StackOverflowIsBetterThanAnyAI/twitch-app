import { getRequestBody, jsonResponse } from '../testUtils'
import { getItemFromStorage } from './getItemFromStorage'
import { getTwitchAuthorization } from './getTwitchAuthorization'
import { getTwitchData } from './getTwitchData'
import { setItemInStorage } from './setItemInStorage'

const AUTH_URL = 'https://twitch-backend.vercel.app/api/auth'

describe('getTwitchAuthorization', () => {
    it('shares one token request between concurrent callers', async () => {
        const fetchMock = vi.fn(async () =>
            jsonResponse({
                access_token: 'token',
                expires_in: 1000,
                token_type: 'bearer',
            })
        )
        vi.stubGlobal('fetch', fetchMock)

        const results = await Promise.all([
            getTwitchAuthorization(),
            getTwitchAuthorization(),
            getTwitchAuthorization(),
        ])

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(results.every((result) => result.access_token === 'token')).toBe(
            true
        )
        expect(getItemFromStorage().access_token).toBe('token')
    })
})

describe('getTwitchData', () => {
    it('requests a token first when none is stored', async () => {
        const fetchMock = vi.fn(async (input: RequestInfo | URL) =>
            input === AUTH_URL
                ? jsonResponse({
                      access_token: 'token',
                      expires_in: 1000,
                      token_type: 'bearer',
                  })
                : jsonResponse({ data: [] })
        )
        vi.stubGlobal('fetch', fetchMock)

        await expect(
            getTwitchData('https://api.twitch.tv/helix/streams')
        ).resolves.toEqual({ data: [] })
        expect(fetchMock).toHaveBeenCalledTimes(2)
        expect(getRequestBody(fetchMock.mock.calls[1])).toEqual({
            access_token: 'token',
            token_type: 'Bearer',
            url: 'https://api.twitch.tv/helix/streams',
        })
    })

    it('refreshes an expired token and retries the request', async () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {})
        setItemInStorage('access_token', 'expired')
        setItemInStorage('expires_in', 1000)
        setItemInStorage('token_type', 'bearer')

        const fetchMock = vi.fn(
            async (input: RequestInfo | URL, init?: RequestInit) => {
                if (input === AUTH_URL) {
                    return jsonResponse({
                        access_token: 'fresh',
                        expires_in: 1000,
                        token_type: 'bearer',
                    })
                }
                const { access_token } = JSON.parse(init?.body as string)
                // the backend wraps the Twitch 401 into a 500
                return access_token === 'expired'
                    ? jsonResponse(
                          {
                              error: '401 https://api.twitch.tv/helix/streams',
                          },
                          500
                      )
                    : jsonResponse({ data: [] })
            }
        )
        vi.stubGlobal('fetch', fetchMock)

        await expect(
            getTwitchData('https://api.twitch.tv/helix/streams')
        ).resolves.toEqual({ data: [] })
        expect(fetchMock).toHaveBeenCalledTimes(3)
        expect(getItemFromStorage().access_token).toBe('fresh')
    })

    it('reports a login error when no token can be fetched', async () => {
        vi.spyOn(console, 'error').mockImplementation(() => {})
        vi.stubGlobal(
            'fetch',
            vi.fn(async () => jsonResponse({ error: 'Server error' }, 500))
        )

        await expect(
            getTwitchData('https://api.twitch.tv/helix/streams')
        ).resolves.toEqual({ error: 'login' })
    })

    it('rethrows errors that are not caused by an expired token', async () => {
        setItemInStorage('access_token', 'token')
        setItemInStorage('expires_in', 1000)
        setItemInStorage('token_type', 'bearer')
        vi.stubGlobal(
            'fetch',
            vi.fn(async () =>
                jsonResponse({ error: '404 https://api.twitch.tv' }, 500)
            )
        )

        await expect(
            getTwitchData('https://api.twitch.tv/helix/streams')
        ).rejects.toThrow('404')
    })
})
