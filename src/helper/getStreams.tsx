import { AuthorizationProps } from '../types/AuthorizationProps'
import { getTwitchAuthorization } from './getTwitchAuthorization'

import type { StreamProps } from '../types/StreamProps'

export const getStreams = async (
    CLIENT_ID: string,
    CLIENT_SECRET: string,
    url: string
): Promise<StreamProps | undefined | { error: 'login' }> => {
    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization(CLIENT_ID, CLIENT_SECRET)
    let { access_token, token_type } = authorizationObject
    if (access_token === '' && token_type === '') return { error: 'login' }

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
        if (!data.data.length)
            throw new Error(
                `There are no Livestreams available under this url: ${response.url}`
            )
        return data
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the current Livestreams:',
            error
        )
    }
}
