import { FC } from 'react'

type IconProps = {
    code?: string
    language?: string
    type: 'Logout' | 'Expand' | 'Country'
}

const Icon: FC<IconProps> = ({ code, language, type }) => {
    const logout = (
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
    const country = (
        <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={language}
            className="mx-2 w-8"
        ></img>
    )

    const icon = (() => {
        switch (type) {
            case 'Logout':
                return logout
            case 'Expand':
                return expand
            case 'Country':
                return country
        }
    })()

    return icon
}

export default Icon
