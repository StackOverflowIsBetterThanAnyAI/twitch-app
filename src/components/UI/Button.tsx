import { FC } from 'react'

type ButtonProps = {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    children: string
}

const Button: FC<ButtonProps> = ({ children, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className="mt-4 text-lg text-zinc-50 px-8 py-1 rounded-xl font-semibold outline outline-zinc-50 outline-1 cursor-default
            pseudo-zinc-retry"
        >
            {children}
        </button>
    )
}

export default Button
