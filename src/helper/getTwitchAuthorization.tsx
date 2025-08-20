import axios from 'axios'

import { AuthorizationProps } from '../types/AuthorizationProps'
import { setItemInStorage } from './setItemInStorage'

export const getTwitchAuthorization = async (): Promise<AuthorizationProps> => {
    try {
        const response = await axios.get(
            'https://twitch-backend.vercel.app/api/auth'
        )
        if (response.status !== 200 || typeof response.data !== 'object')
            throw new Error(`${response.status}`)

        setItemInStorage('access_token', response.data.access_token)
        setItemInStorage('expires_in', response.data.expires_in)
        setItemInStorage('token_type', response.data.token_type)

        return response.data
    } catch (error: any) {
        console.error(
            'The following error occured during the Athorization:',
            error
        )
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}
