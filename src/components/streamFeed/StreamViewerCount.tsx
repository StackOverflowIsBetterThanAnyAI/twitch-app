import { FC } from 'react'
import { getFormattedNumber } from '../../helper/getFormattedNumber'

type StreamViewerCountProps = {
    viewer_count: number
}

const StreamViewerCount: FC<StreamViewerCountProps> = ({ viewer_count }) => {
    return (
        <aside className="absolute left-2 bottom-4 bg-zinc-900 text-slate-50 px-2 opacity-85 tabular-nums text-sm lg:text-base">
            {`${getFormattedNumber(viewer_count)} viewers`}
        </aside>
    )
}

export default StreamViewerCount
