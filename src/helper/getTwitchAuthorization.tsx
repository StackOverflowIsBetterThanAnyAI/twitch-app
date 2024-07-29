import axios from 'axios'

import { AuthorizationProps } from '../types/AuthorizationProps'

export const getTwitchAuthorization = async (): Promise<AuthorizationProps> => {
    try {
        const response = await axios.get(
            'https://twitch-backend.vercel.app/api/auth'
        )
        if (response.status !== 200 || typeof response.data !== 'object')
            throw new Error(`${response.status}`)
        return response.data
    } catch (error: any) {
        console.error(
            'The following error occured during the Athorization:',
            error
        )
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}
