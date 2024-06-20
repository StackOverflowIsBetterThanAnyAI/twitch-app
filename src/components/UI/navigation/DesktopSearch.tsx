import { forwardRef, useContext } from 'react'
import { ContextSearchText } from '../../../App'
import { SearchProps } from '../../../types/SearchProps'
import Icon from '../Icon'
import SearchResultSuggestion from './SearchResultSuggestion'

const DesktopSearch = forwardRef<HTMLDivElement, SearchProps>(
    (
        {
            handleBlur,
            handleChange,
            handleClick,
            handleFocus,
            handleInput,
            handleKeyDown,
            handleSearch,
            searchResults,
            searchResultsExpanded,
        },
        ref
    ) => {
        const contextSearchText = useContext(ContextSearchText)
        if (!contextSearchText) {
            throw new Error(
                'ContextSearchText must be used within a ContextSearchText.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [searchText, setSearchText] = contextSearchText

        return (
            <div className="flex flex-col py-1 gap-1" ref={ref}>
                <div className="flex flex-row outline outline-zinc-700 rounded-lg my-auto w-[249px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 m-1 rounded-l-md pseudo-zinc"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        title="Search current Livestreams."
                    />
                    <button
                        className={`m-auto p-1 rounded-full mr-1 my-1 ${
                            searchText
                                ? 'hover:cursor-pointer'
                                : 'hover:cursor-not-allowed active:bg-zinc-800 active:outline-0'
                        } pseudo-zinc`}
                        title={
                            searchText
                                ? 'Search current Livestreams.'
                                : 'Type anything to search for.'
                        }
                        onClick={handleSearch}
                        disabled={!searchText}
                        aria-disabled={!searchText}
                    >
                        <Icon type="Search" />
                    </button>
                </div>
                {searchResults.length > 0 && searchResultsExpanded && (
                    <SearchResultSuggestion
                        handleClick={handleClick}
                        handleSearch={handleSearch}
                        searchResults={searchResults}
                    />
                )}
            </div>
        )
    }
)

export default DesktopSearch
