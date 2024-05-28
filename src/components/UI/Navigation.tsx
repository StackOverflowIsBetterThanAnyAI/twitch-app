import { useEffect, useState } from 'react'
import logo from './../../images/fallback.png'

const Navigation = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [navOpacity, setNavOpacity] = useState<string>('opacity-100')
    const [blockOpacity, setBlockOpacity] = useState(false)

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
        <nav
            className={`bg-zinc-900 text-slate-300 flex justify-between py-2 px-4 h-16 sticky top-0 z-10
            transition-opacity duration-500 ease-in-out ${navOpacity}`}
        >
            <a href="/" className="flex flex-row">
                <img src={logo} alt="Twitch-App Homepage" loading="lazy" />
                <span className="pl-2 m-auto">Twitch-App</span>
            </a>
            <div className="flex flex-row outline-zinc-700 outline rounded-lg">
                <input
                    type="search"
                    placeholder="Search"
                    className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2"
                    value={searchText}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onInput={handleInput}
                    onBlur={handleBlur}
                />
                <button className="m-auto px-2">
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="gainsboro"
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </button>
            </div>
            <img src={logo} alt="Settings" loading="lazy" />
        </nav>
    )
}

export default Navigation
