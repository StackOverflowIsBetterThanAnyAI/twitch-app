import { FC } from 'react'

type StreamLiveProps = {
    type: string
}

const StreamLive: FC<StreamLiveProps> = ({ type }) => {
    return (
        <>
            {type === 'live' ? (
                <mark className="absolute left-2 top-2 bg-red-600 text-slate-50 rounded-lg px-2 font-medium">
                    {type.toUpperCase()}
                </mark>
            ) : (
                <mark className="absolute left-2 top-2 bg-gray-800 text-slate-50 rounded-lg px-2 font-medium shadow">
                    {type.toUpperCase()}
                </mark>
            )}
        </>
    )
}

export default StreamLive
