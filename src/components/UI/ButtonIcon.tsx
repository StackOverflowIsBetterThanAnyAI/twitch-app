import { FC } from 'react'

type ButtonIconProps = {
    onClick: () => void
    type: 'Search'
}

const ButtonIcon: FC<ButtonIconProps> = ({ onClick, type }) => {
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
            case 'Search':
                return search
        }
    })()

    return (
        <button
            className="m-auto p-2 rounded-full
        hover:bg-zinc-800
        focus:bg-zinc-800 focus:outline focus:outline-zinc-700 focus:outline-2
        active:bg-zinc-700 active:outline active:outline-zinc-600 active:outline-2"
            onClick={onClick}
            title={type}
        >
            {icon}
        </button>
    )
}

export default ButtonIcon
