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

type StreamGameProps = {
    game_name: string
}

const StreamGame: FC<StreamGameProps> = ({ game_name }) => {
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
            data: getSearchFilter(game_name, streamData)!,
        })
        setSearchText(game_name)
        setSEOSearchText(game_name)
        setFocusTrapDisabled(true)
        setSearchResults([])
    }
    return (
        <button
            className="text-slate-300 text-sm lg:text-base rounded-md pr-1 pseudo-zinc-purple streamfeed streamgame"
            onClick={handleClick}
        >
            {game_name}
        </button>
    )
}

export default StreamGame
