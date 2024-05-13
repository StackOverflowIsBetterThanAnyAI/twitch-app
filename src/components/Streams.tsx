import { getStreams } from '../helper/getStreams'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'
import { useEffect, useState } from 'react'

import { StreamProps } from '../types/StreamProps'
import { getImage } from '../helper/getImage'

import { useScreenWidth } from '../hooks/useScreenWidth'
import StreamLive from './StreamLive'
import { getProfilePicture } from '../helper/getProfilePicture'
import StreamThumbnail from './StreamThumbnail'

// TODO: streamData.data.length could be 0

const Streams = () => {
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

    // has to be executed as soon as the stream data has arrived
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfilePicture(
                    CLIENT_ID,
                    CLIENT_SECRET,
                    '206234482' // streamData.data[].user_id
                )
                if (!data) throw new Error('no profile picture')
            } catch (error) {
                console.error('Error fetching a user profile picture:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            {streamData?.data &&
                streamData.data.map((item) => (
                    <div key={item.user_id} className="">
                        <div className="relative">
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
                        </div>
                        <div className="flex bg-red-400">
                            <div>Profile picture of {item.user_id}</div>
                            <div>
                                <div>{item.user_name}</div>
                                <div>{item.title}</div>
                                <div>{item.game_name}</div>
                                <div>{item.viewer_count}</div>
                            </div>
                        </div>
                        <div>
                            {item.tags.map((item) => (
                                <a href="#" className="bg-red-500" key={item}>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default Streams
