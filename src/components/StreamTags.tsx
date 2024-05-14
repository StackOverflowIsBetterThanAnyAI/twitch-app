import { FC } from 'react'

type StreamTagsProps = {
    item: string
}

const StreamTags: FC<StreamTagsProps> = ({ item }) => {
    return (
        <span className="bg-gray-600 text-slate-50 px-2 rounded-md mr-1 my-1 text-sm">
            {item}
        </span>
    )
}

export default StreamTags
