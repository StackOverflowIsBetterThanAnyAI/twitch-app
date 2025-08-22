import { useEffect } from 'react'

export const useSetPlayerHeight = (
    height: number,
    playerRef: React.MutableRefObject<any>
) => {
    useEffect(() => {
        if (playerRef.current && height > 0) {
            playerRef.current._iframe.style.height = `${height}px`
        }
    }, [height, playerRef])
}
