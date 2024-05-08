import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

type AuthorizationProps = {
    access_token: string
    expires_in: number
    token_type: string
}

const getTwitchAuthorization = async () => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`

    try {
        const response = await fetch(url, {
            method: 'POST',
        })
        if (!response.ok) throw new Error(`${response.status} ${response.url}`)
        const data: AuthorizationProps = await response.json()
        return data
    } catch (error: any) {
        console.error(
            'The following error occured during the Athorization:',
            error
        )
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}

async function getStreams() {
    const url = 'https://api.twitch.tv/helix/streams?language=de'

    const authorizationObject: AuthorizationProps =
        await getTwitchAuthorization()
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
        const data: AuthorizationProps = await response.json()
        renderStreams(data)
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the current live streams:',
            error
        )
    }
}

const renderStreams = (data: AuthorizationProps) => {
    console.log(data, 'renderStreams')
}

export default function Call() {
    getStreams()
    return <div>Hello Again!</div>
}
