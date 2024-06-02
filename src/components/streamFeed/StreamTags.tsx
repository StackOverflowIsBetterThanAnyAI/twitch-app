import { FC } from 'react'

type StreamTagsProps = {
    item: string
}

const StreamTags: FC<StreamTagsProps> = ({ item }) => {
    return (
        <h4 className="bg-gray-600 text-slate-50 px-2 rounded-md mr-1 my-1 text-sm lg:text-base">
            {item}
        </h4>
    )
}

export default StreamTags