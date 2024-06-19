import { FC } from 'react'

type StreamLiveProps = {
    placement: 'thumbnail' | 'search'
    type: string
}

const StreamLive: FC<StreamLiveProps> = ({ placement, type }) => {
    return (
        <mark
            className={`${
                placement === 'thumbnail' ? 'absolute left-2 top-2' : ''
            } bg-gradient-to-tr from-red-600 to-red-700 text-slate-50 rounded-lg px-2 font-medium text-sm lg:text-base`}
        >
            {type.toUpperCase()}
        </mark>
    )
}

export default StreamLive
