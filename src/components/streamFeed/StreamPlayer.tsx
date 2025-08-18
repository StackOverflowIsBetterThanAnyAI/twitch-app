import { useEffect, useRef, useState } from 'react'

interface StreamPlayerProps {
    channel: string
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ channel }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const playerRef = useRef<any>(null)
    const [height, setHeight] = useState(0)
    const volume = 0.5

    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                setHeight(Math.round((width * 9) / 16))
            }
        }
        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [])

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
    }, [channel, height])

    useEffect(() => {
        if (playerRef.current && height > 0) {
            playerRef.current._iframe.style.height = `${height}px`
        }
    }, [height])

    return <div ref={containerRef}></div>
}

export default StreamPlayer
