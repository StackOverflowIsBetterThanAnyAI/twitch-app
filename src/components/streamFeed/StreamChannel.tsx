import { FC } from 'react'

type StreamChannelProps = {
    user_name: string
}

const StreamChannel: FC<StreamChannelProps> = ({ user_name }) => {
    return (
        <h2 className="text-slate-300 font-medium text-base lg:text-lg">
            {user_name}
        </h2>
    )
}

export default StreamChannel
