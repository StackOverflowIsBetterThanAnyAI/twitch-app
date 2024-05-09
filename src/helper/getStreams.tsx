import { AuthorizationProps } from '../types/AuthorizationProps'
import { getTwitchAuthorization } from './getTwitchAuthorization'

import type { StreamProps } from '../types/StreamProps'

export const getStreams = async (CLIENT_ID: string, CLIENT_SECRET: string) => {
    const url = 'https://api.twitch.tv/helix/streams?language=de'

    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization(CLIENT_ID, CLIENT_SECRET)
    let { access_token, token_type } = authorizationObject

    token_type =
        token_type.substring(0, 1).toUpperCase() +
        token_type.substring(1, token_type.length)

    const authorization = `${token_type} ${access_token}`

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
        const data: StreamProps = await response.json()
        return data
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the current live streams:',
            error
        )
    }
}
