import { getStreams } from '../helper/getStreams'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'
import { useEffect, useState } from 'react'

import { StreamProps } from '../types/StreamProps'
import { getImage } from '../helper/getImage'

import { useScreenWidth } from '../hooks/useScreenWidth'
import StreamLive from './StreamLive'
import { getProfilePicture } from '../helper/getProfilePicture'
import StreamThumbnail from './StreamThumbnail'
import StreamProfilePicture from './StreamProfilePicture'
import StreamViewerCount from './StreamViewerCount'
import StreamTags from './StreamTags'
import StreamGame from './StreamGame'
import StreamTitle from './StreamTitle'
import StreamChannel from './StreamChannel'

const StreamFeed = () => {
    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )

    const screenWidth = useScreenWidth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStreams(CLIENT_ID, CLIENT_SECRET)
                setStreamData(data)
                if (!data) throw new Error('no Streams')
            } catch (error) {
                console.error('Error fetching streams:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            {streamData?.data &&
                streamData.data.map((item) => (
                    <article key={item.user_id} className="pb-4">
                        <div className="relative pb-2">
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
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 w-96">
                            <div className="p-1 col-span-1">
                                <StreamProfilePicture
                                    screenWidth={screenWidth}
                                    user_id={item.user_id}
                                    user_name={item.user_name}
                                />
                            </div>
                            <div className="col-span-4">
                                <StreamChannel user_name={item.user_name} />
                                <StreamTitle title={item.title} />
                                <StreamGame game_name={item.game_name} />
                                <div className="flex flex-wrap w-64">
                                    {item.tags.map((item) => (
                                        <StreamTags item={item} key={item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
        </div>
    )
}

export default StreamFeed
