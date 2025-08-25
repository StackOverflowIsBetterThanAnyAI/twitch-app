import { useEffect } from 'react'
import { getItemFromStorage } from '../helper/getItemFromStorage'
import { getProfilePicture } from '../helper/getProfilePicture'
import { setItemInStorage } from '../helper/setItemInStorage'

export const useFetchImageUrl = (
    setImageUrl: (value: React.SetStateAction<string>) => void,
    user_id: string
) => {
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const parsedData = getItemFromStorage()
                const profilePictures = parsedData.profile_pictures || {}

                if (profilePictures[user_id]) {
                    setImageUrl(profilePictures[user_id])
                } else {
                    const url = await getProfilePicture(user_id)
                    if (!url) {
                        throw new Error()
                    } else {
                        setImageUrl(url)
                        const parsed = getItemFromStorage()
                        const pictures = parsed.profile_pictures || {}
                        pictures[user_id] = url
                        setItemInStorage('profile_pictures', pictures)
                    }
                }
            } catch (error: any) {}
        }
        fetchImageUrl()

        return () => {}
    }, [setImageUrl, user_id])
}
