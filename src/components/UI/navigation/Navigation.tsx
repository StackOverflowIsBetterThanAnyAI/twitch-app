import { useContext, useEffect, useRef, useState } from 'react'
import ButtonIcon from '../ButtonIcon'
import { HomeIcon } from './HomeIcon'
import { UserIcon } from './UserIcon'
import MobileSearch from './MobileSearch'
import {
    ContextDisableFocusTrap,
    ContextFilteredStreamData,
    ContextFocusInput,
    ContextHideSearch,
    ContextSEOSearchText,
    ContextScreenWidth,
    ContextSearchResults,
    ContextSearchText,
    ContextStreamData,
} from '../../../App'
import DesktopSearch from './DesktopSearch'
import { getSearchFilter } from '../../../helper/getSearchFilter'
import { setItemInStorage } from '../../../helper/setItemInStorage'

const Navigation = () => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

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
    const [searchText, setSearchText] = contextSearchText

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

    const contextFocusInput = useContext(ContextFocusInput)
    if (!contextFocusInput) {
        throw new Error(
            'ContextFocusInput must be used within a ContextFocusInput.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [inputFocussed, _setInputFocussed] = contextFocusInput

    const contextHideSearch = useContext(ContextHideSearch)
    if (!contextHideSearch) {
        throw new Error(
            'ContextHideSearch must be used within a ContextHideSearch.Provider'
        )
    }
    const [hideSearch, setHideSearch] = contextHideSearch

    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const [blockOpacity, setBlockOpacity] = useState(false)
    const [ariaPressed, setAriaPressed] = useState(false)
    const [searchResultsExpanded, setSearchResultsExpanded] = useState(false)
    const desktopSearchRef = useRef<HTMLDivElement>(null)
    const mobileSearchRef = useRef<HTMLDivElement>(null)
    const searchMobileRef = useRef<HTMLInputElement>(null)
    const buttonIconRef = useRef<HTMLButtonElement>(null)
    const userIconRef = useRef<HTMLButtonElement>(null)
    const anchorRef = useRef<HTMLButtonElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleBlur = () => {
        setBlockOpacity(false)
        if (searchText.length === 0) {
            setFilteredStreamData(streamData)
            setSearchResultsExpanded(false)
            setSearchResults([])
            setSEOSearchText('')
            setItemInStorage('filter', '')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFocusTrapDisabled(false)
        setSearchText(e.target.value)
        if (streamData) {
            const results = getSearchFilter(e.target.value, streamData)!.map(
                (item) => ({
                    game_name: item.game_name,
                    user_name: item.user_name,
                    title: item.title,
                    tags: item.tags.filter((tag) =>
                        tag
                            .toLowerCase()
                            .includes(
                                e.target.value.toLowerCase().replaceAll(' ', '')
                            )
                    ),
                })
            )
            setSearchResults(results)
        }
        if (e.target.value.length > 0) {
            setSearchResultsExpanded(true)
        } else {
            setFilteredStreamData(streamData)
            setSearchResultsExpanded(false)
            setSearchResults([])
            setSEOSearchText('')
            setItemInStorage('filter', '')
        }
    }

    const handleClickCompletion = (name: string) => {
        setSearchText(name)
    }

    const handleSearch = () => {
        const filteredData = getSearchFilter(searchText, streamData)
        if (streamData) {
            setFilteredStreamData({
                data: filteredData!,
            })
            filteredData && filteredData.length > 0
                ? setSEOSearchText(searchText)
                : setSEOSearchText('')
            filteredData && filteredData.length > 0
                ? setItemInStorage('filter', searchText)
                : setItemInStorage('filter', '')
        }
    }

    const handleSearchDoubleClick = (search?: string) => {
        const filteredData = getSearchFilter(
            search || searchText,
            streamData,
            true
        )
        if (streamData) {
            setFilteredStreamData({
                data: filteredData!,
            })
            filteredData && filteredData.length > 0
                ? setSEOSearchText(search ?? searchText)
                : setSEOSearchText('')
            filteredData && filteredData.length > 0
                ? setItemInStorage('filter', search ?? searchText)
                : setItemInStorage('filter', '')
        }
    }

    const handleSearchKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        name: string
    ) => {
        const filteredData = getSearchFilter(name, streamData, true)
        if (streamData && (e.key === ' ' || e.key === 'Enter')) {
            setFilteredStreamData({
                data: filteredData!,
            })
            filteredData && filteredData.length > 0
                ? setSEOSearchText(name)
                : setSEOSearchText('')
            filteredData && filteredData.length > 0
                ? setItemInStorage('filter', name)
                : setItemInStorage('filter', '')
        }
    }

    const handleFocus = () => {
        setNavOpacity('opacity-100')
        setBlockOpacity(true)
        setSearchResultsExpanded(true)
    }
    const handleInput = handleFocus

    const handleKeyDownMobile = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
            if (searchText.length > 0) {
                setSearchText('')
                setSearchResults([])
                setSearchResultsExpanded(false)
            } else {
                buttonIconRef.current?.focus()
                setHideSearch(true)
            }
        } else if (e.shiftKey && e.key === 'Tab' && searchText.length === 0) {
            e.preventDefault()
            buttonIconRef.current?.focus()
        } else if (e.key === 'Enter') handleSearch()
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation()
        if (e.key === 'Enter') handleSearch()
        if (e.key === 'Escape') {
            if (searchText.length > 0) {
                setSearchText('')
                setSearchResults([])
                setSearchResultsExpanded(false)
            } else {
                userIconRef?.current?.focus()
                anchorRef?.current?.focus()
            }
        }
    }

    const handleToggleMobile = () => {
        setHideSearch((prev) => !prev)
        setAriaPressed((prev) => !prev)
        setTimeout(() => {
            searchMobileRef.current?.focus()
        }, 0)
    }

    useEffect(() => {
        let lastScrollY = window.scrollY
        let timer: NodeJS.Timeout

        const handleScroll = () => {
            if (window.scrollY === 0) {
                setNavOpacity('opacity-100')
            } else if (window.scrollY < lastScrollY && !blockOpacity) {
                setNavOpacity('opacity-75')
            } else if (!blockOpacity) {
                setNavOpacity('opacity-95')
            }
            lastScrollY = window.scrollY

            clearTimeout(timer)
            if (navOpacity !== 'opacity-100') {
                timer = setTimeout(() => {
                    setNavOpacity('opacity-100')
                }, 500)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
        }
    }, [blockOpacity, navOpacity])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ((desktopSearchRef.current &&
                    !desktopSearchRef.current.contains(event.target as Node)) ||
                    (mobileSearchRef.current &&
                        !mobileSearchRef.current.contains(
                            event.target as Node
                        ))) &&
                searchResultsExpanded
            ) {
                event.stopPropagation()
                setSearchResultsExpanded(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (
                ((desktopSearchRef.current &&
                    desktopSearchRef.current.contains(event.target as Node)) ||
                    (mobileSearchRef.current &&
                        mobileSearchRef.current.contains(
                            event.target as Node
                        ))) &&
                searchResultsExpanded &&
                event.key === 'Escape'
            ) {
                event.stopPropagation()
                setSearchResultsExpanded(false)
                if (!inputRef?.current?.onfocus) {
                    if (
                        contextScreenWidth === 'MOBILE' ||
                        contextScreenWidth === 'TABLET_SMALL'
                    ) {
                        buttonIconRef?.current?.focus()
                    } else {
                        userIconRef?.current?.focus()
                        anchorRef?.current?.focus()
                    }
                }
            }
        }

        if (searchResultsExpanded) {
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [contextScreenWidth, searchResultsExpanded])

    useEffect(() => {
        if (
            (contextScreenWidth === 'MOBILE' ||
                contextScreenWidth === 'TABLET_SMALL') &&
            inputFocussed
        ) {
            setHideSearch(false)
            setAriaPressed(true)
        }
    }, [contextScreenWidth, inputFocussed, setHideSearch])

    return (
        <div className="sticky top-0 z-10" data-testid="navigation-container">
            <nav
                className={`bg-zinc-925 text-slate-300 
                transition-opacity duration-500 ease-in-out ${navOpacity}`}
                data-testid="navigation"
            >
                <div className="max-w-[2048px] flex justify-between w-full py-2 px-4 h-16 m-auto">
                    <HomeIcon />
                    {contextScreenWidth === 'TABLET' ||
                    contextScreenWidth === 'DESKTOP' ? (
                        <DesktopSearch
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                            handleClick={handleClickCompletion}
                            handleFocus={handleFocus}
                            handleInput={handleInput}
                            handleKeyDown={handleKeyDown}
                            handleSearch={handleSearch}
                            handleSearchDoubleClick={handleSearchDoubleClick}
                            handleSearchKeyDown={handleSearchKeyDown}
                            inputRef={inputRef}
                            searchResultsExpanded={searchResultsExpanded}
                            ref={desktopSearchRef}
                        />
                    ) : (
                        <ButtonIcon
                            ariaLabel="Search current Livestreams."
                            ariaPressed={ariaPressed}
                            buttonIconRef={buttonIconRef}
                            type="Search"
                            title="Toggle search bar."
                            onClick={handleToggleMobile}
                            place="center"
                        />
                    )}
                    <UserIcon anchorRef={anchorRef} buttonRef={userIconRef} />
                </div>
            </nav>
            {(contextScreenWidth === 'MOBILE' ||
                contextScreenWidth === 'TABLET_SMALL') &&
                !hideSearch && (
                    <MobileSearch
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleClick={handleClickCompletion}
                        handleFocus={handleFocus}
                        handleInput={handleInput}
                        handleKeyDown={handleKeyDownMobile}
                        handleSearch={handleSearch}
                        handleSearchDoubleClick={handleSearchDoubleClick}
                        handleSearchKeyDown={handleSearchKeyDown}
                        searchMobileRef={searchMobileRef}
                        searchResultsExpanded={searchResultsExpanded}
                        ref={mobileSearchRef}
                    />
                )}
        </div>
    )
}

export default Navigation
