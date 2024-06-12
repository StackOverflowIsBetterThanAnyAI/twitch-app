import { FC, useContext } from 'react'

import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'
import ButtonPromise from '../UI/ButtonPromise'
import { ContextScreenWidth } from '../../App'

type StreamFallbackProps = {
    loadStreams: () => void
}

const StreamFallback: FC<StreamFallbackProps> = ({ loadStreams }) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        loadStreams()
    }
    return (
        <article className="p-4 md:p-12 lg:p-12 text-center h-screen text-slate-300">
            <section>
                <h2 className="text-lg lg:text-base font-bold">Ooops!</h2>
                <h3 className="text-base lg:text-lg">
                    Unfortunatelly we cannot fetch the current live streams.
                </h3>
                <section className="py-2 max-w-lg m-auto">
                    <StreamThumbnail
                        thumbnail_url={fallbackThumbnailImage}
                        user_name="no current"
                    />
                    <ButtonPromise handleClick={handleClick}>
                        Retry
                    </ButtonPromise>
                </section>
            </section>
        </article>
    )
}

export default StreamFallback
