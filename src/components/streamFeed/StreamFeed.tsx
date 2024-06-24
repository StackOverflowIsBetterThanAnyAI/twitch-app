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
import {
    ContextErrorMessage,
    ContextFilteredStreamData,
    ContextLanguage,
    ContextScreenWidth,
    ContextStreamData,
} from '../../App'
import { getEnglishLanguageName } from '../../helper/getEnglishLanguageName'
import StreamNoResults from './StreamNoResults'

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
    const [errorMessage, setErrorMessage] = contextErrorMessage

    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [streamData, setStreamData] = contextStreamData

    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    const [filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const loadStreams = useCallback(async () => {
        const url = `https://api.twitch.tv/helix/streams?language=${language}`
        try {
            const data: StreamProps | { error: 'login' } | undefined =
                await getStreams(CLIENT_ID || '', CLIENT_SECRET || '', url)
            if (data && 'error' in data && data.error === 'login') {
                setStreamData(undefined)
                setFilteredStreamData(undefined)
                setErrorMessage([
                    'At the moment there are problems with the login process.',
                ])
                throw new Error(
                    'At the moment there are problems with the login process.'
                )
            } else if (data && !('error' in data)) {
                setStreamData(data)
                setFilteredStreamData(data)
            } else if (!data) {
                setStreamData(undefined)
                setFilteredStreamData(undefined)
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
    }, [language, setErrorMessage, setStreamData, setFilteredStreamData])

    useEffect(() => {
        loadStreams()
        const refresh = setInterval(() => {
            loadStreams()
        }, 120000)
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
        <article
            className={`p-4 gap-4 ${
                contextScreenWidth === 'MOBILE'
                    ? 'grid grid-cols-1'
                    : 'grid grid-cols-auto-fit-320'
            }`}
        >
            {filteredStreamData && filteredStreamData.data.length > 0 ? (
                filteredStreamData.data.map((item, index) => {
                    const bgColor = bgColors[index % bgColors.length]
                    return (
                        // TODO: set dynamically calculated max width
                        <article key={item.user_id} className="max-w-[440px]">
                            <div className={`rounded-xl ${bgColor}`}>
                                <section className="relative transform transition duration-150 ease-in-out hover:translate-x-2 hover:-translate-y-2">
                                    <StreamThumbnail
                                        thumbnail_url={item.thumbnail_url}
                                        user_name={item.user_name}
                                        stream_game={item.game_name}
                                        key={`${item.user_id} - thumbnail`}
                                    />
                                    <StreamLive
                                        placement="thumbnail"
                                        type={item.type}
                                        key={`${item.user_id} - live`}
                                    />
                                    <StreamViewerCount
                                        viewer_count={item.viewer_count}
                                        key={`${item.user_id} - viewer_count`}
                                    />
                                </section>
                            </div>
                            <section className="grid grid-cols-5 grid-rows-1 w-full pt-2">
                                <StreamProfilePicture
                                    user_id={item.user_id}
                                    user_name={item.user_name}
                                    key={`${item.user_id} - profile_picture`}
                                />
                                <section className="col-span-4">
                                    <StreamChannel
                                        user_name={item.user_name}
                                        key={`${item.user_id} - channel`}
                                    />
                                    <StreamTitle
                                        title={item.title}
                                        key={`${item.user_id} - title`}
                                    />
                                    <StreamGame
                                        game_name={item.game_name}
                                        key={`${item.user_id} - game`}
                                    />
                                    <div className="flex flex-wrap w-full">
                                        {item.tags.map((item, index) => (
                                            <StreamTags
                                                item={item}
                                                key={`${item}${index} - tag`}
                                            />
                                        ))}
                                    </div>
                                </section>
                            </section>
                        </article>
                    )
                })
            ) : (
                <StreamNoResults />
            )}
        </article>
    )
}

export default StreamFeed
