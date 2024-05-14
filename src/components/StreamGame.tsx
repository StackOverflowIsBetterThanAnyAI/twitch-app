import { FC } from 'react'

type StreamGameProps = {
    game_name: string
}

const StreamGame: FC<StreamGameProps> = ({ game_name }) => {
    return <div className="text-slate-300">{game_name}</div>
}

export default StreamGame
