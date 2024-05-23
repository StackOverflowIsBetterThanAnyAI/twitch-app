import { FC } from 'react'

type StreamViewerCountProps = {
    viewer_count: number
}

const StreamViewerCount: FC<StreamViewerCountProps> = ({ viewer_count }) => {
    const format = (
        num: number,
        index: number
    ): { num: number; index: number } => {
        if (num >= 1000 && index < 2) {
            return format(num / 1000, index + 1)
        }
        return { num, index }
    }

    const formattedViewerCountObject = format(viewer_count, 0)

    const formattedViewerCount = (() => {
        switch (formattedViewerCountObject.index) {
            case 0:
                return formattedViewerCountObject.num
            case 1:
                return `${formattedViewerCountObject.num.toFixed(2)}k`
            case 2:
                return `${formattedViewerCountObject.num.toFixed(2)}m`
        }
    })()

    return (
        <aside className="absolute left-2 bottom-4 bg-zinc-900 text-slate-50 px-2 opacity-85 tabular-nums">
            {`${formattedViewerCount} viewers`}
        </aside>
    )
}

export default StreamViewerCount
