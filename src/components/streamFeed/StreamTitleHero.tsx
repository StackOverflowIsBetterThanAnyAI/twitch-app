import { FC } from 'react'

type StreamTitleHeroProps = {
    testid?: string
    title: string
}

const StreamTitleHero: FC<StreamTitleHeroProps> = ({ testid, title }) => {
    return (
        <div
            className="text-slate-300 w-full text-pretty text-base lg:text-lg streamfeed"
            title={title}
            data-testid={testid}
        >
            {title}
        </div>
    )
}

export default StreamTitleHero
