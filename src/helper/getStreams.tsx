import axios from 'axios'
import { AuthorizationProps } from '../types/AuthorizationProps'
import { StreamProps } from '../types/StreamProps'
import { getItemFromStorage } from './getItemFromStorage'
import { getTwitchAuthorization } from './getTwitchAuthorization'

export const getStreams = async (
    url: string
): Promise<StreamProps | undefined | { error: 'login' }> => {
    const parsedData = getItemFromStorage()
    const authorizationObject: AuthorizationProps =
        parsedData.access_token &&
        parsedData.expires_in &&
        parsedData.token_type
            ? {
                  access_token: parsedData.access_token,
                  expires_in: parsedData.expires_in,
                  token_type: parsedData.token_type,
              }
            : await getTwitchAuthorization()
    let { access_token, token_type } = authorizationObject
    if (!access_token || !token_type) {
        return { error: 'login' }
    }

    token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length)

    try {
        const response = await axios.post(
            'https://twitch-backend.vercel.app/api/streams',
            {
                access_token,
                token_type,
                url,
            }
        )

        if (response.status !== 200 || typeof response.data !== 'object') {
            throw new Error(`${response.status}`)
        }

        if (!response.data.data)
            throw new Error(
                `There are no Livestreams available under this url: ${url}`
            )

        return response.data
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn('Token expired, refreshing...')

            const retryAuth: AuthorizationProps = await getTwitchAuthorization()
            if (retryAuth.access_token) {
                const retryResponse = await axios.post(
                    'https://twitch-backend.vercel.app/api/streams',
                    {
                        access_token: retryAuth.access_token,
                        token_type: retryAuth.token_type,
                        url,
                    }
                )
                return retryResponse.data
            }
        }

        console.error(
            'The following error occured while fetching the current Livestreams:',
            error
        )
    }

    return undefined
}
