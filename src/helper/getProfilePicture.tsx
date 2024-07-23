import axios from 'axios'
import { AuthorizationProps } from '../types/AuthorizationProps'
import { getTwitchAuthorization } from './getTwitchAuthorization'

export const getProfilePicture = async (
    user_id: string
): Promise<string | undefined> => {
    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization()
    let { access_token, token_type } = authorizationObject
    if (!access_token || !token_type) return undefined

    token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length)

    try {
        const response = await axios.post('/api/profile-picture', {
            access_token,
            token_type,
            user_id,
        })

        if (response.status !== 200 || typeof response.data !== 'object') {
            throw new Error(`${response.status}`)
        }

        return response.data.imageUrl
    } catch (error) {
        console.error(
            'The following error occurred while fetching a user profile picture for the user:',
            user_id,
            error
        )
        return undefined
    }
}
