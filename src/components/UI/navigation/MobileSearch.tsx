import { forwardRef, useContext } from 'react'
import { ContextSearchText } from '../../../App'
import { SearchProps } from '../../../types/SearchProps'
import Icon from '../Icon'
import SearchResultSuggestion from './SearchResultSuggestion'
import './search.css'

const MobileSearch = forwardRef<HTMLDivElement, SearchProps>(
    (
        {
            handleBlur,
            handleChange,
            handleClick,
            handleFocus,
            handleInput,
            handleKeyDown,
            handleSearch,
            searchMobileRef,
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
            <>
                <div className="flex justify-center bg-zinc-800 p-2 outline outline-zinc-900 w-full">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 rounded-md pseudo-zinc"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        ref={searchMobileRef}
                        title="Search current Livestreams."
                    />
                    <button
                        className={`px-2 pseudo-zinc rounded-md search-button ${
                            searchText
                                ? 'hover:cursor-pointer'
                                : 'hover:cursor-not-allowed'
                        }`}
                        onClick={handleSearch}
                        disabled={!searchText}
                        aria-disabled={!searchText}
                    >
                        <Icon type="Search" />
                    </button>
                </div>
                {searchResults.length > 0 && searchResultsExpanded && (
                    <div
                        className="absolute mx-auto left-0 right-0 w-[249px] text-slate-300"
                        ref={ref}
                    >
                        <SearchResultSuggestion
                            handleClick={handleClick}
                            handleSearch={handleSearch}
                            searchResults={searchResults}
                        />
                    </div>
                )}
            </>
        )
    }
)

export default MobileSearch
