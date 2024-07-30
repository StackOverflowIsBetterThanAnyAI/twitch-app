import { useContext } from 'react'
import logo from './../../../images/fallback.png'
import { ContextScreenWidth } from '../../../App'

export const HomeIcon = () => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === ' ') {
            const target = e.target as HTMLElement
            target.click()
            e.preventDefault()
        }
    }

    return (
        <a
            href="/"
            className="flex flex-row px-2 rounded-md pseudo-zinc navigation"
            onKeyDown={handleKeyDown}
            title="Homepage"
            data-testid="navigation-homepage-anchor"
        >
            <img src={logo} alt="Twitch-App Homepage" loading="lazy" />
            {(contextScreenWidth === 'TABLET' ||
                contextScreenWidth === 'DESKTOP') && (
                <span className="pl-4 m-auto">Twitch-App</span>
            )}
        </a>
    )
}
