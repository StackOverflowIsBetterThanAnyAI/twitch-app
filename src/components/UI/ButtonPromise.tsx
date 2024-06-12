import { FC } from 'react'

type ButtonPromiseProps = {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    children: string
}

const ButtonPromise: FC<ButtonPromiseProps> = ({ children, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="mt-4 text-base lg:text-lg text-slate-300 px-8 py-1 rounded-xl font-semibold outline outline-zinc-50 outline-1 cursor-default
            pseudo-zinc-retry"
        >
            {children}
        </button>
    )
}

export default ButtonPromise
