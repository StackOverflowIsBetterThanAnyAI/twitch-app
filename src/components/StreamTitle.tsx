import { FC } from 'react'

type StreamTitleProps = {
    title: string
}

const StreamTitle: FC<StreamTitleProps> = ({ title }) => {
    return (
        <h3
            className="text-slate-300 w-full text-ellipsis whitespace-nowrap overflow-hidden"
            title={title}
        >
            {title}
        </h3>
    )
}

export default StreamTitle
