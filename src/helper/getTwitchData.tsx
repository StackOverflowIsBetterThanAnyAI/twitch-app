import {
    getStoredTwitchAuthorization,
    getTwitchAuthorization,
} from './getTwitchAuthorization'

class TwitchRequestError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

const capitalize = (text: string) =>
    text.substring(0, 1).toUpperCase() + text.substring(1, text.length)

const requestTwitchData = async (
    access_token: string,
    token_type: string,
    url: string
) => {
    const response = await fetch(
        'https://twitch-backend.vercel.app/api/streams',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_token,
                token_type: capitalize(token_type),
                url,
            }),
        }
    )
    const data = await response.json().catch(() => undefined)

    if (!response.ok || typeof data !== 'object') {
        throw new TwitchRequestError(
            response.status,
            data?.error ?? `${response.status}`
        )
    }

    return data
}

// the backend forwards an expired token as a 500 whose message starts with the Twitch status code
const isUnauthorized = (error: unknown) =>
    error instanceof TwitchRequestError &&
    (error.status === 401 || error.message.startsWith('401'))

export const getTwitchData = async <T,>(
    url: string
): Promise<T | { error: 'login' }> => {
    const { access_token, token_type } = await getStoredTwitchAuthorization()
    if (!access_token || !token_type) {
        return { error: 'login' }
    }

    try {
        return await requestTwitchData(access_token, token_type, url)
    } catch (error) {
        if (!isUnauthorized(error)) {
            throw error
        }

        console.warn('Token expired, refreshing...')

        const retryAuth = await getTwitchAuthorization()
        if (!retryAuth.access_token || !retryAuth.token_type) {
            return { error: 'login' }
        }
        return requestTwitchData(
            retryAuth.access_token,
            retryAuth.token_type,
            url
        )
    }
}
