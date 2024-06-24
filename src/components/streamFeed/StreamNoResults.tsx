import { useContext, useEffect, useState } from 'react'
import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'
import { ContextSearchText } from '../../App'

const StreamNoResults = () => {
    // TODO: is overwritten by refresh method every 120 seconds
    // TODO: update notFOundText
    const contextSearchText = useContext(ContextSearchText)
    if (!contextSearchText) {
        throw new Error(
            'ContextSearchText must be used within a ContextSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchText, setSearchText] = contextSearchText

    const [notFoundText, setNotFoundText] = useState(searchText)

    useEffect(() => {
        setNotFoundText(searchText)
    }, [])

    return (
        <article className="p-4 md:p-12 lg:p-12 text-center h-screen text-slate-300">
            <section>
                <h2 className="text-lg lg:text-xl font-bold">
                    There are no current Livestreams which match
                </h2>
                <q className="text-base lg:text-lg italic">{notFoundText}</q>
                <h3 className="text-sm lg:text-base">
                    Make sure all words are spelled correctly or try different
                    keywords.
                </h3>
                <section className="py-2 max-w-lg m-auto">
                    <StreamThumbnail
                        thumbnail_url={fallbackThumbnailImage}
                        user_name="no current Livestreams"
                    />
                </section>
            </section>
        </article>
    )
}

export default StreamNoResults
