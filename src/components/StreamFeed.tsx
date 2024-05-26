import { useEffect, useState } from 'react'
import { getStreams } from '../helper/getStreams'
import { StreamProps } from '../types/StreamProps'
import { useScreenWidth } from '../hooks/useScreenWidth'

import SkeletonFeed from './skeleton/SkeletonFeed'
import StreamGame from './StreamGame'
import StreamChannel from './StreamChannel'
import StreamFallback from './StreamFallback'
import StreamLive from './StreamLive'
import StreamProfilePicture from './StreamProfilePicture'
import StreamTags from './StreamTags'
import StreamThumbnail from './StreamThumbnail'
import StreamTitle from './StreamTitle'
import StreamViewerCount from './StreamViewerCount'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

// TODO: check if api calls are on the right place in the code

// TODO: check if api error handling works

// TODO: api result can also be empty or wrong

// TODO: check if something is re-rendered / executed too often
// and can be replaced by a state variable

// TODO: implement function which lets the user filter the results

const StreamFeed = () => {
    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const screenWidth = useScreenWidth()

    const loadStreams = async () => {
        try {
            const data = await getStreams(CLIENT_ID, CLIENT_SECRET)
            setStreamData(data)
            if (!data) throw new Error()
            setError(false)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadStreams()
        const refresh = setInterval(() => {
            loadStreams()
        }, 180000)
        return () => {
            clearInterval(refresh)
        }
    }, [])

    if (error) {
        return (
            <StreamFallback
                loadStreams={loadStreams}
                screenWidth={screenWidth}
            />
        )
    }

    if (loading) {
        return <SkeletonFeed />
    }

    return (
        <article className="p-4 gap-4 grid grid-cols-auto-fit-320">
            {streamData?.data &&
                streamData.data.map((item) => (
                    <article key={item.user_id}>
                        <section className="relative pb-2">
                            <StreamThumbnail
                                thumbnail_url={item.thumbnail_url}
                                user_name={item.user_name}
                                screenWidth={screenWidth}
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
                        <section className="grid grid-cols-5 grid-rows-1 w-full">
                            <StreamProfilePicture
                                screenWidth={screenWidth}
                                user_id={item.user_id}
                                user_name={item.user_name}
                            />
                            <section className="col-span-4">
                                <StreamChannel user_name={item.user_name} />
                                <StreamTitle title={item.title} />
                                <StreamGame game_name={item.game_name} />
                                <div className="flex flex-wrap w-full">
                                    {item.tags.map((item) => (
                                        <StreamTags item={item} key={item} />
                                    ))}
                                </div>
                            </section>
                        </section>
                    </article>
                ))}
        </article>
    )
}

export default StreamFeed
