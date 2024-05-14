import { FC } from 'react'

type StreamViewerCountProps = {
    viewer_count: number
}

const StreamViewerCount: FC<StreamViewerCountProps> = ({ viewer_count }) => {
    return (
        <div className="absolute left-2 bottom-4 bg-zinc-900 text-slate-50 px-2 opacity-85">
            {`${viewer_count} viewers`}
        </div>
    )
}

export default StreamViewerCount
