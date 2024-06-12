import { FC } from 'react'

type ButtonApplyProps = {
    children: string
    handleClick: () => void
}

const ButtonApply: FC<ButtonApplyProps> = ({ children, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="mt-4 text-base lg:text-lg px-8 pb-1 rounded-xl font-semibold outline outline-1
            pseudo-zinc outline-slate-300 text-slate-300"
        >
            {children}
        </button>
    )
}

export default ButtonApply
