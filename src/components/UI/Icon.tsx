import { FC } from 'react'

type IconProps = {
    code?: string
    language?: string
    type: 'Logout' | 'Expand' | 'Country' | 'Language' | 'Search'
}

const Icon: FC<IconProps> = ({ code, language, type }) => {
    const logout = (
        <svg
            className="w-[16px] h-[16px] text-gray-800 dark:text-white rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
            />
        </svg>
    )
    const expand = (
        <svg
            className="w-[16px] h-[16px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m9 5 7 7-7 7"
            />
        </svg>
    )
    const lang = (
        <svg
            className="w-[16px] h-[16px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"
            />
        </svg>
    )
    const country = (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={language}
            className="mx-2 w-8"
        ></img>
    )
    const search = (
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
    )

    const icon = (() => {
        switch (type) {
            case 'Logout':
                return logout
            case 'Expand':
                return expand
            case 'Country':
                return country
            case 'Language':
                return lang
            case 'Search':
                return search
        }
    })()

    return icon
}

export default Icon
