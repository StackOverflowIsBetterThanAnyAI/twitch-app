import axios from 'axios'
import { UserProps } from '../types/UserProps'

export const getUser = async (): Promise<UserProps | null> => {
    let user: UserProps | null = null

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const access_token = params.get('access_token')
    const access_state = params.get('state')

    sessionStorage.setItem('twitch_access_token', access_token || '')
    sessionStorage.setItem('twitch_access_state', access_state || '')

    const sameState =
        sessionStorage.getItem('twitch_random_state') ===
        sessionStorage.getItem('twitch_access_state')

    if (!sameState) {
        !user && sessionStorage.setItem('twitch_logged_in', 'false')
        window.location.href = '/twitch-app/'
        throw new Error('The received state does not match the sent state.')
    }

    try {
        const response = await axios.post(
            'https://twitch-backend.vercel.app/api/user',
            {
                access_token,
                access_state,
                random_state: sessionStorage.getItem('twitch_random_state'),
            }
        )

        if (response.status !== 200 || typeof response !== 'object')
            throw new Error(`${response.status}`)

        user = response.data
        sessionStorage.setItem('twitch_logged_in', 'true')
        return user
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the currently logged in user',
            error
        )
        sessionStorage.setItem('twitch_logged_in', 'false')
        return user
    } finally {
        window.location.href = '/twitch-app/'

        sessionStorage.removeItem('twitch_access_state')
        sessionStorage.removeItem('twitch_random_state')
        sessionStorage.removeItem('twitch_access_token')
    }
}
