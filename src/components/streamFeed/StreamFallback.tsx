import fallbackThumbnailImage from './../../images/fallbackThumbnail.png'
import StreamThumbnail from './StreamThumbnail'
import ButtonRetry from '../UI/ButtonRetry'
import { useContext } from 'react'
import { ContextErrorMessage } from '../../App'

const StreamFallback = () => {
    const contextErrorMessage = useContext(ContextErrorMessage)
    if (!contextErrorMessage) {
        throw new Error(
            'ContextErrorMessage must be used within a ContextErrorMessage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, _setErrorMessage] = contextErrorMessage

    return (
        <article className="p-4 md:p-12 lg:p-12 text-center text-slate-300">
            <section>
                <h2 className="text-lg lg:text-xl font-bold">Ooops!</h2>
                <h3 className="text-base lg:text-lg">
                    Unfortunatelly we cannot fetch the current Livestreams.
                </h3>
                {errorMessage[0] && (
                    <h4 className="text-sm lg:text-base">{errorMessage[0]}</h4>
                )}
                {errorMessage[1] && (
                    <h4 className="text-sm lg:text-base">
                        <i>{errorMessage[1]}</i>
                    </h4>
                )}
                <section className="py-2 max-w-lg m-auto">
                    <StreamThumbnail
                        thumbnail_url={fallbackThumbnailImage}
                        user_name="no current Livestreams"
                    />
                    <ButtonRetry />
                </section>
            </section>
        </article>
    )
}

export default StreamFallback
