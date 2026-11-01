import { StreamProps } from '../types/StreamProps'
import { getTwitchData } from './getTwitchData'

export const getStreams = async (
    url: string
): Promise<StreamProps | undefined | { error: 'login' }> => {
    try {
        const data = await getTwitchData<StreamProps>(url)

        if ('error' in data) {
            return data
        }

        if (!data.data)
            throw new Error(
                `There are no Livestreams available under this url: ${url}`
            )

        return data
    } catch (error: any) {
        console.error(
            'The following error occured while fetching the current Livestreams:',
            error
        )
    }

    return undefined
}
