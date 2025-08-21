import axios from 'axios'
import { UserProps } from '../types/UserProps'
import { getItemFromStorage } from './getItemFromStorage'
import { removeItemFromStorage } from './removeItemFromStorage'
import { setItemInStorage } from './setItemInStorage'

export const getUser = async (): Promise<UserProps | null> => {
    let user: UserProps | null = null

    const hash = window.location.hash
    const params = new URLSearchParams(hash.substring(1))
    const access_token = params.get('access_token')
    const access_state = params.get('state')

    const parsedData = getItemFromStorage()

    setItemInStorage('twitch_access_token', access_token || '')
    setItemInStorage('twitch_access_state', access_state || '')

    const sameState =
        parsedData.twitch_random_state === parsedData.twitch_access_state

    if (!sameState) {
        !user && setItemInStorage('twitch_logged_in', 'false')
        window.location.href = '/twitch-app/'
        throw new Error('The received state does not match the sent state.')
    }

    try {
        const response = await axios.post(
            'https://twitch-backend.vercel.app/api/user',
            {
                access_token,
                access_state,
                random_state: parsedData.twitch_random_state,
            }
        )

        if (response.status !== 200 || typeof response.data !== 'object')
            throw new Error(`${response.status}`)

        user = response.data
        setItemInStorage('twitch_logged_in', 'true')
        return user
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the currently logged in user',
            error
        )
        setItemInStorage('twitch_logged_in', 'false')
        return user
    } finally {
        window.location.href = '/twitch-app/'

        removeItemFromStorage('twitch_access_state')
        removeItemFromStorage('twitch_random_state')
        removeItemFromStorage('twitch_access_token')
    }
}
