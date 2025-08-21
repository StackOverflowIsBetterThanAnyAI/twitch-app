import { useContext } from 'react'
import logo from './../../../images/fallback.png'
import { ContextScreenWidth } from '../../../App'
import { setItemInStorage } from '../../../helper/setItemInStorage'

export const HomeIcon = () => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const clearFilter = () => {
        setItemInStorage('filter', '')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === ' ') {
            const target = e.target as HTMLElement
            target.click()
            e.preventDefault()
            clearFilter()
        }
    }

    return (
        <a
            href="/twitch-app/"
            className="flex flex-row px-2 rounded-md pseudo-zinc navigation"
            onClick={clearFilter}
            onKeyDown={handleKeyDown}
            title="Homepage"
            data-testid="navigation-homepage-anchor"
        >
            <img
                src={logo}
                alt="Twitch-App Homepage"
                loading="lazy"
                className="rounded-md"
                width={48}
            />
            {(contextScreenWidth === 'TABLET' ||
                contextScreenWidth === 'DESKTOP') && (
                <span className="pl-4 m-auto">Twitch-App</span>
            )}
        </a>
    )
}
