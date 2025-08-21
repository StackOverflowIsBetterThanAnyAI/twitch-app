import { useRef, useState } from 'react'
import { useInitPlayer } from '../../hooks/useInitPlayer'
import { useUpdatePlayerHeight } from '../../hooks/useUpdatePlayerHeight'
import { useSetPlayerHeight } from '../../hooks/useSetPlayerHeight'

interface StreamPlayerProps {
    channel: string
}

const StreamPlayer: React.FC<StreamPlayerProps> = ({ channel }) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const playerRef = useRef<any>(null)
    const [height, setHeight] = useState(0)
    const volume = 0.5

    useUpdatePlayerHeight(containerRef, setHeight)
    useInitPlayer(channel, containerRef, height, playerRef, volume)
    useSetPlayerHeight(height, playerRef)

    return <div ref={containerRef} className="shadow-zinc-900 shadow-lg"></div>
}

export default StreamPlayer
