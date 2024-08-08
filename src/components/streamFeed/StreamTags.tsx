import { FC, useContext } from 'react'
import { getSearchFilter } from '../../helper/getSearchFilter'
import {
    ContextDisableFocusTrap,
    ContextFilteredStreamData,
    ContextSEOSearchText,
    ContextSearchResults,
    ContextSearchText,
    ContextStreamData,
} from '../../App'

type StreamTagsProps = {
    item: string
    testid?: string
}

const StreamTags: FC<StreamTagsProps> = ({ item, testid }) => {
    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [streamData, setStreamData] = contextStreamData

    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

    const contextSearchText = useContext(ContextSearchText)
    if (!contextSearchText) {
        throw new Error(
            'ContextSearchText must be used within a ContextSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchText, setSearchText] = contextSearchText

    const contextSEOSearchText = useContext(ContextSEOSearchText)
    if (!contextSEOSearchText) {
        throw new Error(
            'ContextSEOSearchText must be used within a ContextSEOSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [seoSearchText, setSEOSearchText] = contextSEOSearchText

    const contextDisableFocusTrap = useContext(ContextDisableFocusTrap)
    if (!contextDisableFocusTrap) {
        throw new Error(
            'ContextDisableFocusTrap must be used within a ContextDisableFocusTrap.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [focusTrapDisabled, setFocusTrapDisabled] = contextDisableFocusTrap

    const contextSearchResults = useContext(ContextSearchResults)
    if (!contextSearchResults) {
        throw new Error(
            'ContextSearchResults must be used within a ContextSearchResults.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchResults, setSearchResults] = contextSearchResults

    const handleClick = () => {
        setFilteredStreamData({
            data: getSearchFilter(item, streamData)!,
        })
        setSearchText(item)
        setSEOSearchText(item)
        setFocusTrapDisabled(true)
        setSearchResults([])
    }

    return (
        <button
            className="bg-gray-600 text-slate-50 text-left max-w-full text-ellipsis whitespace-nowrap overflow-hidden px-2 rounded-md mr-1 my-1 text-sm lg:text-base pseudo-zinc-secondary streamfeed streamtag"
            onClick={handleClick}
            title={item}
            data-testid={testid}
        >
            {item}
        </button>
    )
}

export default StreamTags
