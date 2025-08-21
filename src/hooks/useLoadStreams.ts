import { useEffect } from 'react'

export const useLoadStreams = (loadStreams: () => Promise<void>) => {
    useEffect(() => {
        loadStreams()
        const refresh = setInterval(() => {
            loadStreams()
        }, 120000)
        return () => {
            clearInterval(refresh)
        }
    }, [loadStreams])
}
