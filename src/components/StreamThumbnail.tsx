import { FC, useState } from 'react'
import { getImage } from '../helper/getImage'

type StreamThumbnailProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
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
