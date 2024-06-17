import { FC } from 'react'

type StreamLiveProps = {
    type: string
}

const StreamLive: FC<StreamLiveProps> = ({ type }) => {
    return (
        <mark className="absolute left-2 top-2 bg-red-600 text-slate-50 rounded-lg px-2 font-medium text-sm lg:text-base">
            {type.toUpperCase()}
        </mark>
    )
}

export default StreamLive
