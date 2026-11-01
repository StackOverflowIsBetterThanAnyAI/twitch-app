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
                <h1 className="text-lg lg:text-xl font-bold">Ooops!</h1>
                <h2 className="text-base lg:text-lg">
                    Unfortunately we cannot fetch the current Livestreams.
                </h2>
                {errorMessage[0] && (
                    <p className="text-sm lg:text-base">{errorMessage[0]}</p>
                )}
                {errorMessage[1] && (
                    <p className="text-sm lg:text-base">
                        <i>{errorMessage[1]}</i>
                    </p>
                )}
                <section className="py-4 max-w-lg m-auto">
                    <StreamThumbnail
                        isError={true}
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
