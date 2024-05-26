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
            hover:cursor-pointer hover:bg-zinc-50 hover:text-zinc-800
            focus:outline-4
            active:outline-offset-2 active:bg-zinc-200 active:text-zinc-800"
        >
            {children}
        </button>
    )
}

export default Button
