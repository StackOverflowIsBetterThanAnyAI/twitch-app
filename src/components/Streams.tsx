import { getStreams } from '../helper/getStreams'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'
import { useEffect, useState } from 'react'

import { StreamProps } from '../types/StreamProps'
import { getImage } from '../helper/getImage'

import { useScreenWidth } from '../hooks/useScreenWidth'
import StreamLive from './StreamLive'
import { getProfilePicture } from '../helper/getProfilePicture'

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
                        <div key={item.thumbnail_url} className="relative">
                            <img
                                src={getImage(
                                    item.thumbnail_url,
                                    {
                                        size: screenWidth,
                                    },
                                    'THUMBNAIL'
                                )}
                                alt={`${item.user_name} Livestream`}
                                className="rounded-xl"
                            />
                            <StreamLive
                                type={item.type}
                                key={`${item.user_id}${item.type}`}
                            />
                        </div>
                        <div key={`${item.user_id}${item.title}`}>
                            {item.title}
                        </div>
                        <div key={item.user_name}>{item.user_name}</div>
                        <div key={`${item.user_id}${item.game_name}`}>
                            {item.game_name}
                        </div>
                        <div key={`${item.user_id}${item.viewer_count}`}>
                            {item.viewer_count}
                        </div>
                        <div key={`${item.user_id}${item.tags}`}>
                            {item.tags.map((item) => (
                                <a href="#" className="bg-red-500">
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
