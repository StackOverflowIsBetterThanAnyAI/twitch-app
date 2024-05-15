import { FC } from 'react'

type StreamTitleProps = {
    title: string
}

const StreamTitle: FC<StreamTitleProps> = ({ title }) => {
    return (
        <div
            className="text-slate-300 w-full text-ellipsis whitespace-nowrap overflow-hidden"
            title={title}
        >
            {title}
        </div>
    )
}

export default StreamTitle
