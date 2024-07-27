import { forwardRef, useContext, useEffect, useRef } from 'react'
import {
    ContextDisableFocusTrap,
    ContextFocusInput,
    ContextSearchResults,
    ContextSearchText,
} from '../../../App'
import { SearchProps } from '../../../types/SearchProps'
import Icon from '../Icon'
import SearchResultSuggestion from './SearchResultSuggestion'
import './search.css'

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

        const contextFocusInput = useContext(ContextFocusInput)
        if (!contextFocusInput) {
            throw new Error(
                'ContextFocusInput must be used within a ContextFocusInput.Provider'
            )
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [inputFocussed, setInputFocussed] = contextFocusInput

        const buttonRef = useRef<HTMLButtonElement | null>(null)
        const searchResultsRef = useRef<HTMLDivElement | null>(null)

        useEffect(() => {
            const handleFocusTrap = (e: KeyboardEvent) => {
                if (searchText.length === 0) return

                if (focusTrapDisabled) return

                if (e.key !== 'Tab') return

                const focusableElements = [
                    inputRef?.current,
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
            inputRef,
            searchResults,
            searchResultsExpanded,
            searchText,
        ])

        useEffect(() => {
            if (inputFocussed && inputRef?.current) {
                inputRef.current.focus()
                setInputFocussed(false)
            }
        }, [inputFocussed, inputRef, setInputFocussed])

        return (
            <div className="flex flex-col py-1 gap-1" ref={ref}>
                <div className="flex flex-row outline outline-zinc-700 rounded-lg my-auto w-[249px]">
                    <input
                        type="search"
                        placeholder="Search Livestreams"
                        className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 m-1 rounded-l-md pseudo-zinc navigation"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        title="Search current Livestreams."
                        ref={inputRef}
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
