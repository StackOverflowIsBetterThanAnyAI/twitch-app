import { SetStateAction, useEffect } from 'react'

export const useGetAuthUrl = (
    setRedirectUrl: (value: SetStateAction<string | null>) => void,
    state: string
) => {
    useEffect(() => {
        const getAuthUrl = async () => {
            if (state.length) {
                try {
                    const response = await fetch(
                        `https://twitch-backend.vercel.app/api/auth-url?state=${state}`
                    )
                    const data = await response.json()
                    setRedirectUrl(data.url)
                } catch (error) {
                    console.error('Error fetching auth URL:', error)
                }
            }
        }
        getAuthUrl()
    }, [setRedirectUrl, state])
}
