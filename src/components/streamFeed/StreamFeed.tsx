import { useCallback, useContext, useEffect, useState } from 'react'
import { getStreams } from '../../helper/getStreams'
import { StreamProps } from '../../types/StreamProps'

import SkeletonFeed from '../skeleton/SkeletonFeed'
import StreamGame from './StreamGame'
import StreamChannel from './StreamChannel'
import StreamFallback from './StreamFallback'
import StreamLive from './StreamLive'
import StreamProfilePicture from './StreamProfilePicture'
import StreamTags from './StreamTags'
import StreamThumbnail from './StreamThumbnail'
import StreamTitle from './StreamTitle'
import StreamViewerCount from './StreamViewerCount'

import { CLIENT_ID, CLIENT_SECRET } from '../../clientdata/clientdata'
import { ContextErrorMessage, ContextLanguage } from '../../App'
import { getEnglishLanguageName } from '../../helper/getEnglishLanguageName'

// TODO: implement function which lets the user filter the results

// TODO: fallback thumbnail if order of streams changes

const bgColors = [
    'bg-gradient-to-tr from-red-400 to-red-800',
    'bg-gradient-to-tr from-cyan-400 to-cyan-800',
    'bg-gradient-to-tr from-lime-300 to-lime-700',
    'bg-gradient-to-tr from-violet-600 to-violet-950',
    'bg-gradient-to-tr from-amber-300 to-amber-700',
    'bg-gradient-to-tr from-blue-300 to-blue-700',
    'bg-gradient-to-tr from-green-500 to-green-900',
    'bg-gradient-to-tr from-fuchsia-400 to-fuchsia-800',
]

const StreamFeed = () => {
    const contextLanguage = useContext(ContextLanguage)
    if (!contextLanguage) {
        throw new Error(
            'ContextLanguage must be used within a ContextLanguage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [language, setLanguage] = contextLanguage

    const contextErrorMessage = useContext(ContextErrorMessage)
    if (!contextErrorMessage) {
        throw new Error(
            'ContextErrorMessage must be used within a ContextErrorMessage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errorMessage, setErrorMessage] = contextErrorMessage

    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const loadStreams = useCallback(async () => {
        const url = `https://api.twitch.tv/helix/streams?language=${language}`
        try {
            const data = await getStreams(CLIENT_ID, CLIENT_SECRET, url)
            setStreamData(data)
            if (!data) {
                setErrorMessage([
                    `There are no ${getEnglishLanguageName(
                        language
                    )} Livestreams available at the following URL:`,
                    url,
                ])
                throw new Error(`There are no ${getEnglishLanguageName(
                    language
                )} Livestreams available at the following URL:
                    ${url}`)
            }
            setError(false)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [language, setErrorMessage])

    useEffect(() => {
        loadStreams()
        const refresh = setInterval(() => {
            loadStreams()
        }, 180000)
        return () => {
            clearInterval(refresh)
        }
    }, [loadStreams])

    if (error) {
        return <StreamFallback />
    }

    if (loading) {
        return <SkeletonFeed />
    }

    return (
        <article className="p-4 gap-4 grid grid-cols-auto-fit-320">
            {streamData?.data &&
                streamData.data.map((item, index) => {
                    const bgColor = bgColors[index % bgColors.length]
                    return (
                        <article key={item.user_id}>
                            <div className={`rounded-xl ${bgColor}`}>
                                <section className="relative transform transition duration-150 ease-in-out hover:translate-x-2 hover:-translate-y-2">
                                    <StreamThumbnail
                                        thumbnail_url={item.thumbnail_url}
                                        user_name={item.user_name}
                                        stream_game={item.game_name}
                                        key={item.thumbnail_url}
                                    />
                                    <StreamLive
                                        type={item.type}
                                        key={`${item.user_id}${item.type}`}
                                    />
                                    <StreamViewerCount
                                        viewer_count={item.viewer_count}
                                    />
                                </section>
                            </div>
                            <section className="grid grid-cols-5 grid-rows-1 w-full pt-2">
                                <StreamProfilePicture
                                    user_id={item.user_id}
                                    user_name={item.user_name}
                                />
                                <section className="col-span-4">
                                    <StreamChannel user_name={item.user_name} />
                                    <StreamTitle title={item.title} />
                                    <StreamGame game_name={item.game_name} />
                                    <div className="flex flex-wrap w-full">
                                        {item.tags.map((item, index) => (
                                            <StreamTags
                                                item={item}
                                                key={`${item}${index}`}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </section>
                        </article>
                    )
                })}
        </article>
    )
}

export default StreamFeed
