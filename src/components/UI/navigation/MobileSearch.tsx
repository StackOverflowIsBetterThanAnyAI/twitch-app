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
            handleSearchDoubleClick,
            handleSearchKeyDown,
            searchMobileRef,
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
            searchMobileRef,
            searchResultsRef,
            searchText
        )
        useFocusInput(inputFocussed, searchMobileRef, setInputFocussed)

        return (
            <>
                <div className="flex justify-center bg-zinc-800 p-2 outline outline-zinc-900 w-full">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 rounded-md pseudo-zinc navigation"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        ref={searchMobileRef}
                        title="Search current Livestreams."
                        name="searchCurrentLivestreams"
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
                        ref={buttonRef}
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
                            handleSearchDoubleClick={handleSearchDoubleClick}
                            handleSearchKeyDown={handleSearchKeyDown}
                            ref={searchResultsRef}
                        />
                    </div>
                )}
            </>
        )
    }
)

export default MobileSearch
