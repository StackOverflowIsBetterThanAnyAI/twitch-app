import { FC, useContext } from 'react'
import {
    ContextDisableFocusTrap,
    ContextFilteredStreamData,
    ContextSEOSearchText,
    ContextSearchResults,
    ContextSearchText,
    ContextStreamData,
} from '../../App'
import { getSearchFilter } from '../../helper/getSearchFilter'
import { setItemInStorage } from '../../helper/setItemInStorage'

type StreamChannelProps = {
    testid?: string
    user_name: string
}

const StreamChannel: FC<StreamChannelProps> = ({ testid, user_name }) => {
    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [streamData, _setStreamData] = contextStreamData

    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

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

    const handleClick = () => {
        setFilteredStreamData({
            data: getSearchFilter(user_name, streamData, true)!,
        })
        setSearchText(user_name)
        setSEOSearchText(user_name)
        setItemInStorage('filter', user_name)
        setFocusTrapDisabled(true)
        setSearchResults([])
    }

    return (
        <button
            className="text-slate-300 text-left w-fit max-w-full text-ellipsis whitespace-nowrap overflow-hidden
            font-medium text-base lg:text-lg rounded-md px-1 pseudo-zinc-purple streamfeed streamchannel"
            onClick={handleClick}
            title={user_name}
            data-testid={testid}
        >
            {user_name}
        </button>
    )
}

export default StreamChannel
