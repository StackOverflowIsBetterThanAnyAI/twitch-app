import { ProfilePictureProps } from '../types/ProfilePictureProps'
import { getTwitchData } from './getTwitchData'

// the Twitch users endpoint accepts up to 100 ids per request
const MAX_IDS_PER_REQUEST = 100

export const getProfilePictures = async (
    user_ids: string[]
): Promise<Record<string, string>> => {
    const uniqueIds = [...new Set(user_ids)]
    const chunks: string[][] = []
    for (let i = 0; i < uniqueIds.length; i += MAX_IDS_PER_REQUEST) {
        chunks.push(uniqueIds.slice(i, i + MAX_IDS_PER_REQUEST))
    }

    const responses = await Promise.all(
        chunks.map(async (chunk) => {
            const query = chunk
                .map((id) => `id=${encodeURIComponent(id)}`)
                .join('&')
            try {
                const data = await getTwitchData<ProfilePictureProps>(
                    `https://api.twitch.tv/helix/users?${query}`
                )
                return 'error' in data ? [] : data.data
            } catch (error) {
                console.error(
                    'The following error occurred while fetching the profile pictures for the users:',
                    chunk,
                    error
                )
                return []
            }
        })
    )

    return Object.fromEntries(
        responses.flat().map((user) => [user.id, user.profile_image_url])
    )
}
