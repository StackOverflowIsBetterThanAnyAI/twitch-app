import { UserProps } from '../types/UserProps'

export const getUser = async (CLIENT_ID: string): Promise<UserProps | null> => {
    let user: UserProps | null = null
    const url = 'https://api.twitch.tv/helix/users'

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const access_token = params.get('access_token')

    if (!access_token) {
        throw new Error('Failed fetching the access token')
    }

    localStorage.setItem('twitch_access_token', access_token)

    const authorization = `Bearer ${access_token}`

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

        const data = await response.json()
        if (!data.data.length)
            throw new Error(`No user has been found: ${response.url}`)
        user = data.data[0]
        return user
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the logged in user',
            error
        )
        return user
    }
}
