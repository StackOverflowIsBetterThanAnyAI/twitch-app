import { FC, useContext, useState } from 'react'
import {
    ContextDisableFocusTrap,
    ContextFilteredStreamData,
    ContextScreenWidth,
    ContextSearchResults,
    ContextSearchText,
    ContextSEOSearchText,
    ContextStreamData,
} from '../../App'
import { getImage } from '../../helper/getImage'
import { getSearchFilter } from '../../helper/getSearchFilter'

type StreamThumbnailProps = {
    isError?: boolean
    stream_game?: string
    testid?: string
    thumbnail_url: string
    user_name: string
}

const StreamThumbnail: FC<StreamThumbnailProps> = ({
    isError = false,
    stream_game,
    testid,
    thumbnail_url,
    user_name,
}) => {
    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [streamData, _setStreamData] = contextStreamData

    const contextSearchText = useContext(ContextSearchText)
    if (!contextSearchText) {
        throw new Error(
            'ContextSearchText must be used within a ContextSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_searchText, setSearchText] = contextSearchText

    const contextSEOSearchText = useContext(ContextSEOSearchText)
    if (!contextSEOSearchText) {
        throw new Error(
            'ContextSEOSearchText must be used within a ContextSEOSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_seoSearchText, setSEOSearchText] = contextSEOSearchText

    const contextDisableFocusTrap = useContext(ContextDisableFocusTrap)
    if (!contextDisableFocusTrap) {
        throw new Error(
            'ContextDisableFocusTrap must be used within a ContextDisableFocusTrap.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_focusTrapDisabled, setFocusTrapDisabled] = contextDisableFocusTrap

    const contextSearchResults = useContext(ContextSearchResults)
    if (!contextSearchResults) {
        throw new Error(
            'ContextSearchResults must be used within a ContextSearchResults.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_searchResults, setSearchResults] = contextSearchResults

    const [loaded, setLoaded] = useState<boolean>(false)

    const handleClick = () => {
        setFilteredStreamData({
            data: getSearchFilter(user_name, streamData, true)!,
        })
        setSearchText(user_name)
        setSEOSearchText(user_name)
        setFocusTrapDisabled(true)
        setSearchResults([])
    }

    return (
        <div className="aspect-video">
            {loaded ? (
                <button
                    onClick={handleClick}
                    className={`${
                        isError ? '' : 'absolute'
                    } rounded-xl pseudo-zinc`}
                >
                    <img
                        src={getImage(
                            thumbnail_url,
                            {
                                size: contextScreenWidth,
                            },
                            'THUMBNAIL'
                        )}
                        alt={`${user_name} Livestream`}
                        className="rounded-xl"
                        width="100%"
                        loading="lazy"
                        title={
                            stream_game
                                ? `${user_name} streams ${stream_game}`
                                : user_name
                        }
                        data-testid={testid}
                    />
                </button>
            ) : (
                <img
                    src={getImage(
                        '',
                        {
                            size: contextScreenWidth,
                        },
                        'THUMBNAIL'
                    )}
                    alt={`loading ${user_name}`}
                    className="rounded-xl"
                    width="100%"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    data-testid={testid}
                />
            )}
        </div>
    )
}

export default StreamThumbnail
