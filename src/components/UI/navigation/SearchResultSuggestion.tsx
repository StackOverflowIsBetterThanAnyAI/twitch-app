import { forwardRef, useContext } from 'react'
import StreamLive from '../../streamFeed/StreamLive'
import { ContextSearchResults } from '../../../App'

type SearchResultSuggestionProps = {
    handleClick: (name: string) => void
    handleSearchDoubleClick: () => void
    handleSearchKeyDown: (
        e: React.KeyboardEvent<HTMLButtonElement>,
        name: string
    ) => void
}

const SearchResultSuggestion = forwardRef<
    HTMLDivElement,
    SearchResultSuggestionProps
>(({ handleClick, handleSearchDoubleClick, handleSearchKeyDown }, ref) => {
    const contextSearchResults = useContext(ContextSearchResults)
    if (!contextSearchResults) {
        throw new Error(
            'ContextSearchResults must be used within a ContextSearchResults.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchResults, setSearchResults] = contextSearchResults

    return (
        <div
            className="outline outline-zinc-700 rounded-lg bg-zinc-900 flex flex-col overflow-auto"
            style={{
                maxHeight: '377px',
                minHeight: `clamp(0px, ${
                    searchResults.length * 60 + 17
                }px, 377px)`,
            }}
            ref={ref}
        >
            {searchResults.map((item, index) => (
                <div
                    key={item.user_name}
                    className={`${
                        index % 2 !== 0 ? 'bg-zinc-700' : 'bg-zinc-900'
                    } px-1 py-1`}
                >
                    <button
                        className="flex flex-col pseudo-zinc rounded-md p-1"
                        title={`${item.user_name}${
                            item.tags.length ? ` (${item.tags.join(', ')})` : ''
                        }`}
                        onClick={() => handleClick(item.user_name)}
                        onDoubleClick={handleSearchDoubleClick}
                        onKeyDown={(e) =>
                            handleSearchKeyDown(e, item.user_name)
                        }
                    >
                        <div className="flex flex-row items-center justify-between w-full">
                            <div className="w-[163px] overflow-hidden text-ellipsis text-left whitespace-nowrap text-base">
                                {item.user_name}
                                {item.tags.length ? (
                                    <i> ({item.tags.join(', ')})</i>
                                ) : null}
                            </div>
                            <StreamLive type="live" placement="search" />
                        </div>
                        <div
                            className="w-[225px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-left"
                            title={`${item.game_name}: ${item.title}`}
                        >
                            {item.game_name}: {item.title}
                        </div>
                    </button>
                </div>
            ))}
        </div>
    )
})

export default SearchResultSuggestion
