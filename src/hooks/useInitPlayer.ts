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
                playerRef.current.setChannel(channel)
                setPlayerTitle()
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
                setPlayerTitle()
            }
        }

        // frames need a title to be identifiable by assistive technologies
        const setPlayerTitle = () => {
            containerRef.current
                ?.querySelector('iframe')
                ?.setAttribute('title', `Livestream of ${channel}`)
        }

        if (!(window as any).Twitch) {
            const scriptId = 'twitch-embed-script'
            const script =
                (document.getElementById(scriptId) as HTMLScriptElement) ||
                document.createElement('script')
            script.addEventListener('load', initPlayer)
            if (!script.id) {
                script.id = scriptId
                script.src = 'https://player.twitch.tv/js/embed/v1.js'
                document.body.appendChild(script)
            }
            return () => script.removeEventListener('load', initPlayer)
        } else {
            initPlayer()
        }
    }, [channel, containerRef, height, playerRef, volume])
}
