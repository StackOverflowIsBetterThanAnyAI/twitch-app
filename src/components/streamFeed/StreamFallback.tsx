import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'
import ButtonPromise from '../UI/ButtonPromise'

const StreamFallback = () => {
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
                    <ButtonPromise />
                </section>
            </section>
        </article>
    )
}

export default StreamFallback
