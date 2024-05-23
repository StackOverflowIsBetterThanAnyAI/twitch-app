import { AuthorizationProps } from '../types/AuthorizationProps'

export const getTwitchAuthorization = async (
    CLIENT_ID: string,
    CLIENT_SECRET: string
): Promise<AuthorizationProps> => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

    try {
        const response = await fetch(url, {
            method: 'POST',
        })
        if (!response.ok) throw new Error(`${response.status}`)
        const data: AuthorizationProps = await response.json()
        return data
    } catch (error: any) {
        console.error(
            'The following error occured during the Athorization:',
            error
        )
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}
