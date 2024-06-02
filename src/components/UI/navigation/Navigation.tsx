import { FC, useEffect, useRef, useState } from 'react'
import ButtonIcon from '../ButtonIcon'
import { HomeIcon } from './HomeIcon'
import { UserIcon } from './UserIcon'
import { DesktopSearch } from './DesktopSearch'
import { MobileSearch } from './MobileSearch'

type NavigationProps = {
    screenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP'
}

// TODO: save profile picture (it is reset after going back to the homepage)

const Navigation: FC<NavigationProps> = ({ screenWidth }) => {
    const [searchText, setSearchText] = useState<string>('')
    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const [blockOpacity, setBlockOpacity] = useState(false)
    const [hideSearch, setHideSearch] = useState(true)
    const [ariaPressed, setAriaPressed] = useState(false)
    const searchMobileRef = useRef<HTMLInputElement>(null)
    const buttonIconRef = useRef<HTMLButtonElement>(null)

    const handleBlur = () => {
        setBlockOpacity(false)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    const handleFocus = () => {
        setNavOpacity('opacity-100')
        setBlockOpacity(true)
    }
    const handleInput = handleFocus
    const handleKeyDownMobile = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            buttonIconRef.current?.focus()
            setHideSearch(true)
        } else if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault()
            buttonIconRef.current?.focus()
        }
    }
    const handleSearch = () => {
        console.log(`searching for ${searchText}`)
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

    return (
        <div className="sticky top-0 z-10">
            <nav
                className={`bg-zinc-900 text-slate-300 flex justify-between py-2 px-4 h-16
            transition-opacity duration-500 ease-in-out ${navOpacity}`}
            >
                <HomeIcon screenWidth={screenWidth} />
                {screenWidth === 'TABLET' || screenWidth === 'DESKTOP' ? (
                    <DesktopSearch
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        handleFocus={handleFocus}
                        handleInput={handleInput}
                        handleSearch={handleSearch}
                        searchText={searchText}
                    />
                ) : (
                    <ButtonIcon
                        ariaLabel="Search current Livestreams"
                        ariaPressed={ariaPressed}
                        buttonIconRef={buttonIconRef}
                        type="Search"
                        onClick={handleToggleMobile}
                    />
                )}
                <UserIcon />
            </nav>
            {(screenWidth === 'MOBILE' || screenWidth === 'TABLET_SMALL') &&
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
                    />
                )}
        </div>
    )
}

export default Navigation
