import { FC, RefObject } from 'react'

type ButtonIconProps = {
    ariaLabel: string
    ariaPressed?: boolean
    buttonIconRef?: RefObject<HTMLButtonElement>
    onClick: () => void
    place: 'center' | 'left'
    type: 'Search' | 'Back'
}

const ButtonIcon: FC<ButtonIconProps> = ({
    ariaLabel,
    ariaPressed,
    buttonIconRef,
    onClick,
    place,
    type,
}) => {
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
    const back = (
        <svg
            className="w-[20px] h-[20px] text-gray-800 dark:text-white"
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
                strokeLinejoin="round"
                strokeWidth="2"
                d="m15 19-7-7 7-7"
            />
        </svg>
    )

    const icon = (() => {
        switch (type) {
            case 'Search':
                return search
            case 'Back':
                return back
        }
    })()

    return (
        <button
            className={`${
                place === 'center' && 'm-auto'
            } p-2 rounded-full pseudo-zinc`}
            onClick={onClick}
            title={type}
            aria-label={ariaLabel}
            aria-pressed={ariaPressed}
            ref={buttonIconRef}
        >
            {icon}
        </button>
    )
}

export default ButtonIcon
