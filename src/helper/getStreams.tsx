import axios from 'axios'
import { AuthorizationProps } from '../types/AuthorizationProps'
import { getTwitchAuthorization } from './getTwitchAuthorization'
import type { StreamProps } from '../types/StreamProps'

export const getStreams = async (
    url: string
): Promise<StreamProps | undefined | { error: 'login' }> => {
    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization()
    let { access_token, token_type } = authorizationObject
    if (!access_token || !token_type) return { error: 'login' }

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
        console.error(
            'The following error occured while fetching the current Livestreams:',
            error
        )
    }

    return undefined
}
