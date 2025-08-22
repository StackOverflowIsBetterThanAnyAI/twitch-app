import { useEffect } from 'react'
import { getProfilePicture } from '../helper/getProfilePicture'

export const useFetchImageUrl = (
    setImageUrl: (value: React.SetStateAction<string>) => void,
    user_id: string
) => {
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const data = await getProfilePicture(user_id || '')
                if (!data) {
                    throw new Error()
                } else {
                    setImageUrl(data)
                }
            } catch (error: any) {}
        }
        fetchImageUrl()

        return () => {}
    }, [setImageUrl, user_id])
}
