import { FC, useContext, useState } from 'react'
import { getImage } from '../../helper/getImage'
import { ContextScreenWidth } from '../../App'

type StreamThumbnailProps = {
    stream_game?: string
    testid?: string
    thumbnail_url: string
    user_name: string
}

const StreamThumbnail: FC<StreamThumbnailProps> = ({
    stream_game,
    testid,
    thumbnail_url,
    user_name,
}) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
    const [loaded, setLoaded] = useState<boolean>(false)

    return (
        <>
            {loaded ? (
                <img
                    src={getImage(
                        thumbnail_url,
                        {
                            size: contextScreenWidth,
                        },
                        'THUMBNAIL'
                    )}
                    alt={`${user_name} Livestream`}
                    className="rounded-xl"
                    width="100%"
                    loading="lazy"
                    title={
                        stream_game
                            ? `${user_name} streams ${stream_game}`
                            : user_name
                    }
                    data-testid={testid}
                />
            ) : (
                <img
                    src={getImage(
                        '',
                        {
                            size: contextScreenWidth,
                        },
                        'THUMBNAIL'
                    )}
                    alt={`loading ${user_name}`}
                    className="rounded-xl"
                    width="100%"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    data-testid={testid}
                />
            )}
        </>
    )
}

export default StreamThumbnail
