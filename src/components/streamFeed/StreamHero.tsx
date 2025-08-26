import { useContext } from 'react'
import { ContextScreenWidth } from '../../App'
import { StreamProps } from '../../types/StreamProps'
import StreamChannel from './StreamChannel'
import StreamGame from './StreamGame'
import StreamPlayer from './StreamPlayer'
import StreamProfilePicture from './StreamProfilePicture'
import StreamTags from './StreamTags'
import StreamTitle from './StreamTitle'

type StreamHeroProps = { bgColors: string[]; filteredStreamData: StreamProps }

const StreamHero = ({ bgColors, filteredStreamData }: StreamHeroProps) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    return (
        <>
            <h1
                className="w-full lg:w-4/5 max-w-6xl m-auto pt-4 text-2xl lg:text-3xl"
                data-testid="streamfeed-heading-1"
            >
                <span className="text-slate-300">Current</span>
                <span className="text-purple-400"> Top Livestream</span>
                <span className="text-slate-300">
                    : {filteredStreamData.data[0].user_name}
                </span>
            </h1>
            <article
                className={`flex ${
                    contextScreenWidth === 'DESKTOP'
                        ? 'w-4/5'
                        : `w-full ${
                              contextScreenWidth === 'TABLET' ? '' : 'flex-col'
                          }`
                } max-w-6xl m-auto p-4 my-4 items-center gap-4
                bg-gradient-to-b from-zinc-700 to-zinc-700/80 shadow-zinc-900 shadow-lg rounded-lg"
                data-testid="streamfeed-article-0`}
            >
                <div
                    className={`${
                        ['DESKTOP', 'TABLET'].includes(contextScreenWidth)
                            ? 'w-1/2'
                            : 'w-full'
                    } ${bgColors[0]} aspect-video`}
                >
                    <StreamPlayer
                        channel={filteredStreamData.data[0].user_login}
                    />
                </div>
                <section
                    className={`flex items-center gap-x-2 ${
                        ['DESKTOP', 'TABLET'].includes(contextScreenWidth)
                            ? 'w-1/2'
                            : 'w-full'
                    } bg-zinc-800 shadow-zinc-800/75 shadow-md p-4 rounded-xl`}
                >
                    <StreamProfilePicture
                        isHeroPicture
                        user_id={filteredStreamData.data[0].user_id}
                        user_name={filteredStreamData.data[0].user_name}
                        testid="streamfeed-profilepicture-0"
                    />
                    <section className="flex flex-col flex-1 w-0">
                        <StreamChannel
                            user_name={filteredStreamData.data[0].user_name}
                            testid="streamfeed-channel-0"
                        />
                        <StreamTitle
                            title={filteredStreamData.data[0].title}
                            testid="streamfeed-title-0"
                        />
                        <StreamGame
                            game_name={filteredStreamData.data[0].game_name}
                            testid="streamfeed-game-0"
                        />
                        <div className="flex flex-wrap w-full max-h-20 overflow-auto pl-2 -ml-2">
                            {filteredStreamData.data[0].tags.map(
                                (tag, index) => (
                                    <StreamTags
                                        item={tag}
                                        key={`${tag}${index} - tag`}
                                        testid={`streamfeed-tags-${index}`}
                                    />
                                )
                            )}
                        </div>
                    </section>
                </section>
            </article>
        </>
    )
}

export default StreamHero
