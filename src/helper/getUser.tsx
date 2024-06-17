import { UserProps } from '../types/UserProps'

export const getUser = async (CLIENT_ID: string): Promise<UserProps | null> => {
    let user: UserProps | null = null
    const url = 'https://api.twitch.tv/helix/users'

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const access_token = params.get('access_token')
    const access_state = params.get('state')

    sessionStorage.setItem('twitch_access_token', access_token || '')
    sessionStorage.setItem('twitch_access_state', access_state || '')

    const checkForDifferentState =
        sessionStorage.getItem('twitch_random_state') ===
        sessionStorage.getItem('twitch_access_state')

    sessionStorage.removeItem('twitch_access_state')
    sessionStorage.removeItem('twitch_random_state')
    sessionStorage.removeItem('twitch_access_token')

    if (!checkForDifferentState)
        throw new Error('The received state does not match the sent state.')

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
            'The following error occured while fetching the currently logged in user',
            error
        )
        return user
    } finally {
        window.location.href = '/'
    }
}
