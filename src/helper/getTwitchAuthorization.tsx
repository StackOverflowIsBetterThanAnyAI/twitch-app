import axios from 'axios'

export const getTwitchAuthorization = async () => {
    try {
        const response = await axios.get('/api/auth')
        return response.data
    } catch (error) {
        console.error('Error fetching authorization:', error)
        return { access_token: '', expires_in: 0, token_type: '' }
    }
}
