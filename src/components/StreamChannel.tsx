import { FC } from 'react'

type StreamChannelProps = {
    user_name: string
}

const StreamChannel: FC<StreamChannelProps> = ({ user_name }) => {
    return <div className="text-slate-300 font-medium text-lg">{user_name}</div>
}

export default StreamChannel
