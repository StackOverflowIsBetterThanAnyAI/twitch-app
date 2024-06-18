import { AuthorizationProps } from '../types/AuthorizationProps'
import { ProfilePictureProps } from '../types/ProfilePictureProps'
import { getTwitchAuthorization } from './getTwitchAuthorization'

export const getProfilePicture = async (
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    user_id: string
): Promise<string | undefined> => {
    const url = `https://api.twitch.tv/helix/users?id=${user_id}`

    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization(CLIENT_ID, CLIENT_SECRET)
    let { access_token, token_type } = authorizationObject

    token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length)

    const authorization = `${token_type} ${access_token}`

    const headers = {
        authorization,
        'Client-ID': CLIENT_ID,
    }

    try {
        const response = await fetch(url, {
            headers,
            method: 'GET',
        })
        if (!response.ok) throw new Error(`${response.status} ${response.url}`)
        const data: ProfilePictureProps = await response.json()
        const imageUrl: string = data.data[0].profile_image_url
        return imageUrl
    } catch (error: any) {
        console.error(
            'The following error occured while fetching a user profile picture for the user:',
            user_id,
            error
        )
        return undefined
    }
}
