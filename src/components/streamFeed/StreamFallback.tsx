import { FC } from 'react'

import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'
import Button from '../UI/Button'

type StreamFallbackProps = {
    loadStreams: () => void
    screenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP'
}

const StreamFallback: FC<StreamFallbackProps> = ({
    loadStreams,
    screenWidth,
}) => {
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        loadStreams()
    }
    return (
        <article className="p-4 md:p-12 lg:p-12 text-center h-screen text-slate-300">
            <section>
                <h2 className="text-xl font-bold">Ooops!</h2>
                <h3 className="text-lg">
                    Unfortunatelly we cannot fetch the current live streams.
                </h3>
                <section className="py-2 max-w-lg m-auto">
                    <StreamThumbnail
                        thumbnail_url={fallbackThumbnailImage}
                        screenWidth={screenWidth}
                        user_name="no current"
                    />
                    <Button handleClick={handleClick}>Retry</Button>
                </section>
            </section>
        </article>
    )
}

export default StreamFallback
