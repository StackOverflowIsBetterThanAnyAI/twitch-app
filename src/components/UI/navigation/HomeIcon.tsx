import { FC } from 'react'
import logo from './../../../images/fallback.png'

type HomeIconProps = {
    screenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP'
}

export const HomeIcon: FC<HomeIconProps> = ({ screenWidth }) => {
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
            className="flex flex-row px-2 rounded-md pseudo-zinc"
            onKeyDown={handleKeyDown}
        >
            <img
                src={logo}
                alt="Twitch-App Homepage"
                title="Homepage"
                loading="lazy"
            />
            {(screenWidth === 'TABLET' || screenWidth === 'DESKTOP') && (
                <span className="pl-4 m-auto">Twitch-App</span>
            )}
        </a>
    )
}
