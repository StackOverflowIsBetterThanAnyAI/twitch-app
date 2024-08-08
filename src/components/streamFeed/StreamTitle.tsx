import { FC } from 'react'

type StreamTitleProps = {
    testid?: string
    title: string
}

const StreamTitle: FC<StreamTitleProps> = ({ testid, title }) => {
    return (
        <h3
            className="text-slate-300 w-full text-ellipsis whitespace-nowrap overflow-hidden text-base lg:text-lg streamfeed"
            title={title}
            data-testid={testid}
        >
            {title}
        </h3>
    )
}

export default StreamTitle
