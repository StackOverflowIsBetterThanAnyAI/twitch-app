import { useEffect, useState } from 'react'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

import { getStreams } from '../helper/getStreams'

import { StreamProps } from '../types/StreamProps'

import { useScreenWidth } from '../hooks/useScreenWidth'

import StreamLive from './StreamLive'
import StreamThumbnail from './StreamThumbnail'
import StreamProfilePicture from './StreamProfilePicture'
import StreamViewerCount from './StreamViewerCount'
import StreamTags from './StreamTags'
import StreamGame from './StreamGame'
import StreamTitle from './StreamTitle'
import StreamChannel from './StreamChannel'
import StreamFallback from './StreamFallback'

// TODO: check if api calls are on the right place in the code

// TODO: skeleton loader

// TODO: check if api error handling works

// TODO: api result can also be empty or wrong

// TODO: parameters and imports are sorted alphabetically

// TODO: remove unused import statements and variables

// TODO: check if something is re-rendered / executed too often
// and can be replaced by a state variable

// TODO: implement loading screen for initial page loading

// TODO: add function which refreshes the page every eg three minutes

// TODO: implement function which lets the user filter the results

// TODO: check if more than twenty streams can be loaded by this or another api

// TODO: title and game can be changed during a live stream

const StreamFeed = () => {
    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )
    const [error, setError] = useState(false)

    const screenWidth = useScreenWidth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStreams(CLIENT_ID, CLIENT_SECRET)
                setStreamData(data)
                setError(false)
                if (!data) throw new Error()
            } catch (error) {
                setError(true)
            }
        }
        fetchData()
    }, [])

    // TODO: should be turned into CSS.Properties
    // => x < 700px looks meh, there should actually be two
    // cards next to each other instead of only one
    const gridClassName = (() => {
        switch (screenWidth) {
            case 'MOBILE':
                return 'grid grid-cols-1'
            case 'TABLET':
                return 'grid grid-cols-2 gap-4'
            case 'DESKTOP':
                return 'grid grid-cols-3 gap-4'
        }
    })()

    return !error ? (
        // TODO: turn style into className if possible
        <article
            style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            }}
            className="p-4 gap-4 grid"
        >
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
    ) : (
        <StreamFallback screenWidth={screenWidth} />
    )
}

export default StreamFeed
