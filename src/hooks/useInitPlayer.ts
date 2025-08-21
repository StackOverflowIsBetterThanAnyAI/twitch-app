import { useEffect } from 'react'

export const useInitPlayer = (
    channel: string,
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
    height: number,
    playerRef: React.MutableRefObject<any>,
    volume: number
) => {
    useEffect(() => {
        if (height === 0) {
            return
        }

        const initPlayer = () => {
            if (playerRef.current) {
                return
            }

            if ((window as any).Twitch?.Player) {
                const options = {
                    width: '100%',
                    height,
                    channel,
                    muted: true,
                    parent: [window.location.hostname],
                }
                playerRef.current = new (window as any).Twitch.Player(
                    containerRef.current,
                    options
                )
                playerRef.current.setVolume(volume)
            }
        }

        if (!(window as any).Twitch) {
            const script = document.createElement('script')
            script.src = 'https://player.twitch.tv/js/embed/v1.js'
            script.addEventListener('load', initPlayer)
            document.body.appendChild(script)
        } else {
            initPlayer()
        }
    }, [channel, containerRef, height, playerRef, volume])
}
