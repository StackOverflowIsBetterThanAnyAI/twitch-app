import { FC } from 'react'
import { getImage } from '../helper/getImage'
import { ScreenSizeProps } from '../types/ScreenSizeProps'

type StreamThumbnailProps = {
    thumbnail_url: string
    user_name: string
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
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
