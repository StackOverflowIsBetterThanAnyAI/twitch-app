import { FC } from 'react'

type StreamGameProps = {
    game_name: string
}

const StreamGame: FC<StreamGameProps> = ({ game_name }) => {
    return <h3 className="text-slate-300 text-sm lg:text-base">{game_name}</h3>
}

export default StreamGame
