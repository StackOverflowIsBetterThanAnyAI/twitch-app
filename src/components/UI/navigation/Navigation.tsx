import { useContext, useEffect, useRef, useState } from 'react'
import ButtonIcon from '../ButtonIcon'
import { HomeIcon } from './HomeIcon'
import { UserIcon } from './UserIcon'
import { MobileSearch } from './MobileSearch'
import {
    ContextFilteredStreamData,
    ContextScreenWidth,
    ContextStreamData,
} from '../../../App'
import DesktopSearch from './DesktopSearch'

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

    const [searchText, setSearchText] = useState<string>('')
    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const [blockOpacity, setBlockOpacity] = useState(false)
    const [hideSearch, setHideSearch] = useState(true)
    const [ariaPressed, setAriaPressed] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [searchResultsExpanded, setSearchResultsExpanded] = useState(false)
    const desktopSearchRef = useRef<HTMLDivElement>(null)
    const searchMobileRef = useRef<HTMLInputElement>(null)
    const buttonIconRef = useRef<HTMLButtonElement>(null)

    const handleBlur = () => {
        setBlockOpacity(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        const searchTextLowerCase = e.target.value.toLocaleLowerCase()
        if (streamData) {
            const filteredData = streamData.data.filter(
                (item) =>
                    item.user_name
                        .toLowerCase()
                        .includes(searchTextLowerCase) ||
                    item.game_name
                        .toLowerCase()
                        .includes(searchTextLowerCase) ||
                    item.title.toLowerCase().includes(searchTextLowerCase) ||
                    item.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTextLowerCase)
                    )
            )

            const results = filteredData.map((item) => ({
                game_name: item.game_name,
                user_name: item.user_name,
                title: item.title,
                tags: item.tags.filter((tag) =>
                    tag.toLowerCase().includes(searchTextLowerCase)
                ),
            }))
            setSearchResults(results)
        }
        if (e.target.value.length === 0) {
            setFilteredStreamData(streamData)
            setSearchResultsExpanded(true)
            setSearchResults([])
        } else {
            setSearchResultsExpanded(true)
        }
    }

    const handleSearch = () => {
        const searchTextLowerCase = searchText.toLocaleLowerCase()
        if (streamData) {
            const filteredData = streamData.data.filter(
                (item) =>
                    item.user_name
                        .toLowerCase()
                        .includes(searchTextLowerCase) ||
                    item.game_name
                        .toLowerCase()
                        .includes(searchTextLowerCase) ||
                    item.title.toLowerCase().includes(searchTextLowerCase) ||
                    item.tags.some((tag) =>
                        tag.toLowerCase().includes(searchTextLowerCase)
                    )
            )
            setFilteredStreamData({ data: filteredData })
        }
    }

    const handleFocus = () => {
        setNavOpacity('opacity-100')
        setBlockOpacity(true)
        setSearchResultsExpanded(true)
    }
    const handleInput = handleFocus

    const handleKeyDownMobile = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            buttonIconRef.current?.focus()
            setHideSearch(true)
        } else if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault()
            buttonIconRef.current?.focus()
        } else if (e.key === 'Enter') handleSearch()
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch()
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
                desktopSearchRef.current &&
                !desktopSearchRef.current.contains(event.target as Node)
            ) {
                setSearchResultsExpanded(false)
            }
        }

        if (searchResultsExpanded) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [searchResultsExpanded])

    return (
        <div className="sticky top-0 z-10">
            <nav
                className={`bg-zinc-900 text-slate-300 flex justify-between py-2 px-4 h-16
            transition-opacity duration-500 ease-in-out ${navOpacity}`}
            >
                <HomeIcon />
                {contextScreenWidth === 'TABLET' ||
                contextScreenWidth === 'DESKTOP' ? (
                    <DesktopSearch
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleFocus={handleFocus}
                        handleInput={handleInput}
                        handleKeyDown={handleKeyDown}
                        handleSearch={handleSearch}
                        searchText={searchText}
                        searchResults={searchResults}
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
                <UserIcon />
            </nav>
            {(contextScreenWidth === 'MOBILE' ||
                contextScreenWidth === 'TABLET_SMALL') &&
                !hideSearch && (
                    <MobileSearch
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleFocus={handleFocus}
                        handleInput={handleInput}
                        handleKeyDown={handleKeyDownMobile}
                        handleSearch={handleSearch}
                        searchMobileRef={searchMobileRef}
                        searchText={searchText}
                        searchResults={searchResults}
                    />
                )}
        </div>
    )
}

export default Navigation
