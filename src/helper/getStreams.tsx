import axios from 'axios'

export const getStreams = async (language: string) => {
    try {
        const response = await axios.get(`/api/streams?language=${language}`)
        return response.data
    } catch (error) {
        console.error('Error fetching streams:', error)
        return null
    }
}
