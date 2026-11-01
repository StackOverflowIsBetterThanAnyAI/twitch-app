import { useEffect, useState } from 'react'
import { getItemFromStorage } from '../helper/getItemFromStorage'
import { getProfilePictures } from '../helper/getProfilePictures'
import { setItemInStorage } from '../helper/setItemInStorage'
import { StreamProps } from '../types/StreamProps'

// fetches the missing profile pictures of all streamers with a single batched request
export const useProfilePictures = (streamData: StreamProps | undefined) => {
    const [profilePictures, setProfilePictures] = useState<
        Record<string, string>
    >(() => getItemFromStorage().profile_pictures || {})

    useEffect(() => {
        if (!streamData) {
            return
        }

        const cachedPictures = getItemFromStorage().profile_pictures || {}
        const missingIds = streamData.data
            .map((item) => item.user_id)
            .filter((user_id) => !cachedPictures[user_id])

        if (missingIds.length === 0) {
            return
        }

        let cancelled = false

        getProfilePictures(missingIds).then((pictures) => {
            const mergedPictures = {
                ...(getItemFromStorage().profile_pictures || {}),
                ...pictures,
            }
            setItemInStorage('profile_pictures', mergedPictures)
            if (!cancelled) {
                setProfilePictures(mergedPictures)
            }
        })

        return () => {
            cancelled = true
        }
    }, [streamData])

    return profilePictures
}
