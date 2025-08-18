import { FC } from 'react'

type StreamTitleProps = {
    testid?: string
    title: string
}

const StreamTitle: FC<StreamTitleProps> = ({ testid, title }) => {
    return (
        <div
            className="text-slate-300 w-full px-1 text-ellipsis whitespace-nowrap overflow-hidden text-base lg:text-lg streamfeed"
            title={title}
            data-testid={testid}
        >
            {title}
        </div>
    )
}

export default StreamTitle
