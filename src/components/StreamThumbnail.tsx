import { FC, useState } from 'react'
import { getImage } from '../helper/getImage'

type StreamThumbnailProps = {
    screenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP'
    thumbnail_url: string
    user_name: string
}

const StreamThumbnail: FC<StreamThumbnailProps> = ({
    screenWidth,
    thumbnail_url,
    user_name,
}) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    return (
        <>
            {loaded ? (
                <img
                    src={getImage(
                        thumbnail_url,
                        {
                            size: screenWidth,
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
                            size: screenWidth,
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
