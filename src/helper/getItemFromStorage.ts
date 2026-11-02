import { PROFILE_PICTURE_PREFIX } from './getImage'

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value)

// only keeps profile pictures that point to the trusted Twitch CDN
const sanitizeProfilePictures = (value: unknown): Record<string, string> => {
    if (!isRecord(value)) {
        return {}
    }
    return Object.fromEntries(
        Object.entries(value).filter(
            (entry): entry is [string, string] =>
                typeof entry[1] === 'string' &&
                entry[1].startsWith(PROFILE_PICTURE_PREFIX)
        )
    )
}

export const getItemFromStorage = () => {
    const storedData = sessionStorage.getItem('twitch-app')
    if (!storedData) {
        return {}
    }

    let parsedData: unknown
    try {
        parsedData = JSON.parse(storedData)
    } catch {
        return {}
    }

    if (!isRecord(parsedData)) {
        return {}
    }

    if ('profile_pictures' in parsedData) {
        parsedData.profile_pictures = sanitizeProfilePictures(
            parsedData.profile_pictures
        )
    }

    return parsedData as Record<string, any>
}
