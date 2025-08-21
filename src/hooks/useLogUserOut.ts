import { useEffect } from 'react'
import { UserProps } from '../types/UserProps'

export const useLogUserOut = (
    fetchUser: () => Promise<void>,
    user: UserProps | null
) => {
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('twitch_logged_in')
        isLoggedIn === 'true' && !user && fetchUser()
        const timer = setTimeout(
            () =>
                isLoggedIn === 'false' &&
                (sessionStorage.removeItem('twitch_logged_in'),
                sessionStorage.removeItem('twitch_access_state'),
                sessionStorage.removeItem('twitch_access_token'),
                sessionStorage.removeItem('twitch_user')),
            0
        )
        return () => clearTimeout(timer)
    }, [fetchUser, user])
}
