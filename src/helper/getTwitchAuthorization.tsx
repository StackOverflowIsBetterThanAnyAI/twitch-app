import { AuthorizationProps } from '../types/AuthorizationProps'
import { getItemFromStorage } from './getItemFromStorage'
import { setItemInStorage } from './setItemInStorage'

let pendingAuthorization: Promise<AuthorizationProps> | null = null

const requestTwitchAuthorization = async (): Promise<AuthorizationProps> => {
    try {
        const response = await fetch(
            'https://twitch-backend.vercel.app/api/auth'
        )
        const data = await response.json()
        if (!response.ok || typeof data !== 'object')
            throw new Error(`${response.status}`)

        setItemInStorage('access_token', data.access_token)
        setItemInStorage('expires_in', data.expires_in)
        setItemInStorage('token_type', data.token_type)

        return data
    } catch (error: any) {
        console.error(
            'The following error occured during the Athorization:',
            error
        )
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}

// concurrent callers share a single token request instead of requesting one each
export const getTwitchAuthorization = (): Promise<AuthorizationProps> => {
    if (!pendingAuthorization) {
        pendingAuthorization = requestTwitchAuthorization().finally(() => {
            pendingAuthorization = null
        })
    }
    return pendingAuthorization
}

export const getStoredTwitchAuthorization =
    async (): Promise<AuthorizationProps> => {
        const parsedData = getItemFromStorage()
        return parsedData.access_token &&
            parsedData.expires_in &&
            parsedData.token_type
            ? {
                  access_token: parsedData.access_token,
                  expires_in: parsedData.expires_in,
                  token_type: parsedData.token_type,
              }
            : getTwitchAuthorization()
    }
