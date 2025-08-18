import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'

const StreamNoResults = () => {
    return (
        <article className="m-auto p-4 md:p-12 lg:p-12 text-center text-slate-300">
            <section>
                <h2 className="text-lg lg:text-xl font-bold mb-2">
                    There are no current Livestreams which match your keywords.
                </h2>
                <h3 className="text-sm lg:text-base">
                    Make sure all words are spelled correctly or try different
                    keywords.
                </h3>
                <section className="py-4 max-w-lg m-auto">
                    <StreamThumbnail
                        isError={true}
                        thumbnail_url={fallbackThumbnailImage}
                        user_name="no current Livestreams"
                    />
                </section>
            </section>
        </article>
    )
}

export default StreamNoResults
