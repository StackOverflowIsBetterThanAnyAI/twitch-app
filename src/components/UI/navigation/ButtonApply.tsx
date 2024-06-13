import { FC } from 'react'

type ButtonApplyProps = {
    children: string
    disabled: boolean
    handleClick: () => void
}

const ButtonApply: FC<ButtonApplyProps> = ({
    children,
    disabled,
    handleClick,
}) => {
    return (
        <button
            onClick={handleClick}
            className={`mt-4 text-base lg:text-lg px-8 pb-1 rounded-xl w-4/5 max-w-36 mx-auto font-semibold outline outline-1
            pseudo-zinc outline-slate-300 text-slate-300 ${
                disabled &&
                'outline-zinc-400 text-zinc-400 hover:cursor-not-allowed hover:bg-zinc-700 active:outline-zinc-400 active:outline-1'
            }`}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default ButtonApply
