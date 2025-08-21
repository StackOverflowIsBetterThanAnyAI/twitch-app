import { useEffect } from 'react'

export const useSetRedirectUrl = (redirectUrl: string) => {
    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl
        }
    }, [redirectUrl])
}
