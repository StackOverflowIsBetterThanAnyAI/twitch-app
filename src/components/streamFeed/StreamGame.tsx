import { FC } from 'react'

type StreamGameProps = {
    game_name: string
}

const StreamGame: FC<StreamGameProps> = ({ game_name }) => {
    return <h4 className="text-slate-300 text-sm lg:text-base">{game_name}</h4>
}

export default StreamGame
