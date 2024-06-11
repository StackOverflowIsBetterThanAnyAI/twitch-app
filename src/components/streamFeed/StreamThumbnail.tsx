import { FC, useContext, useState } from 'react'
import { getImage } from '../../helper/getImage'
import { ContextScreenWidth } from '../../App'

type StreamThumbnailProps = {
    thumbnail_url: string
    user_name: string
}

const StreamThumbnail: FC<StreamThumbnailProps> = ({
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
                    className="rounded-xl w-full"
                    loading="lazy"
                    title={user_name}
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
                    className="rounded-xl w-full"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
            )}
        </>
    )
}

export default StreamThumbnail
