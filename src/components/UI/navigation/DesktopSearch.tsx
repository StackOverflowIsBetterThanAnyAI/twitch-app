import { forwardRef, useContext, useRef } from 'react'
import './search.css'
import {
    ContextDisableFocusTrap,
    ContextFocusInput,
    ContextSearchResults,
    ContextSearchText,
} from '../../../App'
import Icon from '../Icon'
import SearchResultSuggestion from './SearchResultSuggestion'
import { SearchProps } from '../../../types/SearchProps'
import { useFocusInput } from '../../../hooks/useFocusInput'
import { useFocusTrapSearch } from '../../../hooks/useFocusTrapSearch'

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
            handleSearchDoubleClick,
            handleSearchKeyDown,
            inputRef,
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
        const [searchText, _setSearchText] = contextSearchText

        const contextDisableFocusTrap = useContext(ContextDisableFocusTrap)
        if (!contextDisableFocusTrap) {
            throw new Error(
                'ContextDisableFocusTrap must be used within a ContextDisableFocusTrap.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [focusTrapDisabled, _setFocusTrapDisabled] =
            contextDisableFocusTrap

        const contextSearchResults = useContext(ContextSearchResults)
        if (!contextSearchResults) {
            throw new Error(
                'ContextSearchResults must be used within a ContextSearchResults.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [searchResults, _setSearchResults] = contextSearchResults

        const contextFocusInput = useContext(ContextFocusInput)
        if (!contextFocusInput) {
            throw new Error(
                'ContextFocusInput must be used within a ContextFocusInput.Provider'
            )
        }
        const [inputFocussed, setInputFocussed] = contextFocusInput

        const buttonRef = useRef<HTMLButtonElement | null>(null)
        const searchResultsRef = useRef<HTMLDivElement | null>(null)

        useFocusTrapSearch(
            buttonRef,
            focusTrapDisabled,
            inputRef,
            searchResultsRef,
            searchText
        )
        useFocusInput(inputFocussed, inputRef, setInputFocussed)

        return (
            <div
                className="flex flex-col py-1 gap-1"
                ref={ref}
                data-testid="navigation-searchbar-container"
            >
                <div className="flex flex-row outline outline-zinc-700 rounded-lg my-auto w-[249px]">
                    <input
                        type="search"
                        placeholder="Search Livestreams"
                        className="bg-zinc-925 text-slate-300 caret-zinc-300 px-2 m-1 rounded-l-md pseudo-zinc navigation"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        ref={inputRef}
                        title="Search current Livestreams."
                        name="searchCurrentLivestreams"
                    />
                    <button
                        className={`m-auto p-1 rounded-full mr-1 my-1 ${
                            searchText
                                ? 'hover:cursor-pointer'
                                : 'hover:cursor-not-allowed active:bg-zinc-800 active:outline-0'
                        } pseudo-zinc search-button`}
                        title={
                            searchText
                                ? 'Search current Livestreams.'
                                : 'Type anything to search for.'
                        }
                        onClick={handleSearch}
                        disabled={!searchText}
                        aria-disabled={!searchText}
                        ref={buttonRef}
                    >
                        <Icon type="Search" />
                    </button>
                </div>
                {searchResults.length > 0 && searchResultsExpanded && (
                    <SearchResultSuggestion
                        handleClick={handleClick}
                        handleSearchDoubleClick={handleSearchDoubleClick}
                        handleSearchKeyDown={handleSearchKeyDown!}
                        ref={searchResultsRef}
                    />
                )}
            </div>
        )
    }
)

export default DesktopSearch
