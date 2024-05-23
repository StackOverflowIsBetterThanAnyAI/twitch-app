import { FC } from 'react'
import fallbackThumbnailImage from './../fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'

type StreamFallbackProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
}

const StreamFallback: FC<StreamFallbackProps> = ({ screenWidth }) => {
    return (
        <article className="p-4 text-center text-slate-300">
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
                </section>
            </section>
        </article>
    )
}

export default StreamFallback
