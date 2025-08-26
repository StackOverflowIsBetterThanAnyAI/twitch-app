import { useEffect } from 'react'

export const useLoadStreams = (
    loadStreams: (useSkeleton: boolean) => Promise<void>
) => {
    useEffect(() => {
        loadStreams(true)
        const refresh = setInterval(() => {
            loadStreams(false)
        }, 120000)
        return () => {
            clearInterval(refresh)
        }
    }, [loadStreams])
}
