import { useContext } from 'react'
import { ContextScreenWidth } from '../../App'
import { StreamProps } from '../../types/StreamProps'
import StreamChannel from './StreamChannel'
import StreamGame from './StreamGame'
import StreamPlayer from './StreamPlayer'
import StreamProfilePicture from './StreamProfilePicture'
import StreamTags from './StreamTags'
import StreamTitle from './StreamTitle'
import StreamTitleHero from './StreamTitleHero'

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
                data-testid="streamfeed-heading-2"
            >
                <span className="text-slate-300">Current</span>
                <span className="text-purple-400"> Top Livestream</span>
                <span className="text-slate-300">
                    : {filteredStreamData.data[0].user_name}
                </span>
            </h1>
            {contextScreenWidth === 'DESKTOP' ? (
                <article
                    className="flex w-4/5 max-w-6xl m-auto p-4 my-4 items-center gap-4
                    bg-gradient-to-b from-zinc-700 to-zinc-700/80 rounded-lg"
                    data-testid="streamfeed-article-0"
                >
                    <div className={`w-1/2 ${bgColors[0]}`}>
                        <StreamPlayer
                            channel={filteredStreamData.data[0].user_login}
                        />
                    </div>
                    <section className="flex items-center gap-x-2 w-1/2 bg-zinc-800 p-4 rounded-xl">
                        <StreamProfilePicture
                            isHeroPicture
                            user_id={filteredStreamData.data[0].user_id}
                            user_name={filteredStreamData.data[0].user_name}
                            testid="streamfeed-profilepicture-0"
                        />
                        <section>
                            <StreamChannel
                                user_name={filteredStreamData.data[0].user_name}
                                testid="streamfeed-channel-0"
                            />
                            <StreamTitleHero
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
            ) : contextScreenWidth === 'TABLET' ? (
                <article
                    className="flex flex-col w-full m-auto p-4 my-4 gap-2
                    bg-gradient-to-b from-zinc-700 to-zinc-700/80 rounded-lg"
                    data-testid="streamfeed-article-0"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-1/2 ${bgColors[0]}`}>
                            <StreamPlayer
                                channel={filteredStreamData.data[0].user_login}
                            />
                        </div>
                        <section className="flex items-center gap-x-2 w-1/2 bg-zinc-800 p-4 rounded-xl">
                            <StreamProfilePicture
                                isHeroPicture
                                user_id={filteredStreamData.data[0].user_id}
                                user_name={filteredStreamData.data[0].user_name}
                                testid="streamfeed-profilepicture-0"
                            />
                            <section className="flex flex-col">
                                <StreamChannel
                                    user_name={
                                        filteredStreamData.data[0].user_name
                                    }
                                    testid="streamfeed-channel-0"
                                />
                                <StreamGame
                                    game_name={
                                        filteredStreamData.data[0].game_name
                                    }
                                    testid="streamfeed-game-0"
                                />
                            </section>
                        </section>
                    </div>
                    <StreamTitleHero
                        title={filteredStreamData.data[0].title}
                        testid="streamfeed-title-0"
                    />
                    <div className="flex flex-wrap w-full max-h-20 overflow-auto pl-2 -ml-2">
                        {filteredStreamData.data[0].tags.map((tag, index) => (
                            <StreamTags
                                item={tag}
                                key={`${tag}${index} - tag`}
                                testid={`streamfeed-tags-${index}`}
                            />
                        ))}
                    </div>
                </article>
            ) : (
                <article
                    className="flex flex-col m-auto p-4 my-4 gap-2
                    bg-gradient-to-b from-zinc-700 to-zinc-700/80 rounded-lg"
                    data-testid="streamfeed-article-0"
                >
                    <div className={`w-full ${bgColors[0]}`}>
                        <StreamPlayer
                            channel={filteredStreamData.data[0].user_login}
                        />
                    </div>
                    <section className="flex items-center gap-x-2 bg-zinc-800 p-4 rounded-xl">
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
            )}
        </>
    )
}

export default StreamHero
