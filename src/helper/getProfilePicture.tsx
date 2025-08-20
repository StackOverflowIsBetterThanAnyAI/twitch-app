import axios from 'axios'
import { AuthorizationProps } from '../types/AuthorizationProps'
import { getItemFromStorage } from './getItemFromStorage'
import { getTwitchAuthorization } from './getTwitchAuthorization'

export const getProfilePicture = async (
    user_id: string
): Promise<string | undefined> => {
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
        return undefined
    }

    token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length)

    try {
        const response = await axios.post(
            'https://twitch-backend.vercel.app/api/profile-picture',
            {
                access_token,
                token_type,
                user_id,
            }
        )

        if (response.status !== 200 || typeof response.data !== 'object') {
            throw new Error(`${response.status}`)
        }

        return response.data.imageUrl
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.warn('Token expired, refreshing...')

            const retryAuth: AuthorizationProps = await getTwitchAuthorization()
            if (retryAuth.access_token) {
                const retryResponse = await axios.post(
                    'https://twitch-backend.vercel.app/api/profile-picture',
                    {
                        access_token: retryAuth.access_token,
                        token_type: retryAuth.token_type,
                        user_id,
                    }
                )
                return retryResponse.data.imageUrl
            }
        }

        console.error(
            'The following error occurred while fetching a user profile picture for the user:',
            user_id,
            error
        )

        return undefined
    }
}
