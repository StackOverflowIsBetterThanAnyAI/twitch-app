import { FC } from 'react'
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
    return (
        <img
            src={getImage(
                thumbnail_url,
                {
                    size: screenWidth,
                },
                'THUMBNAIL'
            )}
            alt={`${user_name} Livestream`}
            className="rounded-xl"
        />
    )
}

export default StreamThumbnail
