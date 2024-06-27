import { forwardRef, useContext, useEffect, useRef } from 'react'
import {
    ContextDisableFocusTrap,
    ContextSearchResults,
    ContextSearchText,
} from '../../../App'
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
        const [searchText, setSearchText] = contextSearchText

        const contextDisableFocusTrap = useContext(ContextDisableFocusTrap)
        if (!contextDisableFocusTrap) {
            throw new Error(
                'ContextDisableFocusTrap must be used within a ContextDisableFocusTrap.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [focusTrapDisabled, setFocusTrapDisabled] =
            contextDisableFocusTrap

        const contextSearchResults = useContext(ContextSearchResults)
        if (!contextSearchResults) {
            throw new Error(
                'ContextSearchResults must be used within a ContextSearchResults.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [searchResults, setSearchResults] = contextSearchResults

        const buttonRef = useRef<HTMLButtonElement | null>(null)
        const searchResultsRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            const handleFocusTrap = (e: KeyboardEvent) => {
                if (e.key !== 'Tab') return

                if (focusTrapDisabled) return

                const focusableElements = [
                    searchMobileRef?.current,
                    buttonRef.current,
                    ...(searchResultsRef.current
                        ? Array.from(
                              searchResultsRef.current.querySelectorAll(
                                  'button'
                              )
                          )
                        : []),
                ].filter((el) => el !== null) as (
                    | HTMLInputElement
                    | HTMLButtonElement
                )[]

                if (focusableElements.length === 0) return

                const firstElement = focusableElements[0]
                const lastElement =
                    focusableElements[focusableElements.length - 1]

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault()
                        lastElement.focus()
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault()
                        firstElement.focus()
                    }
                }
            }

            document.addEventListener('keydown', handleFocusTrap)

            return () => {
                document.removeEventListener('keydown', handleFocusTrap)
            }
        }, [
            focusTrapDisabled,
            searchMobileRef,
            searchResults,
            searchResultsExpanded,
        ])

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
