import axios from 'axios'

export const getProfilePicture = async (user_id: string) => {
    try {
        const response = await axios.get(
            `/api/profile-picture?user_id=${user_id}`
        )
        return response.data.profile_image_url
    } catch (error) {
        console.error('Error fetching profile picture:', error)
        return undefined
    }
}
