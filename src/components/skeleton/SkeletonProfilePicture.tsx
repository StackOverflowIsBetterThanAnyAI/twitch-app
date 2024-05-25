import { FC } from 'react'

import fallbackSkeleton from './../../images/fallbackSkeleton.png'

type SkeletonProfilePictureProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
}

const SkeletonProfilePicture: FC<SkeletonProfilePictureProps> = ({
    screenWidth,
}) => {
    const imageWidth = (() => {
        switch (screenWidth) {
            case 'MOBILE':
                return 40
            case 'TABLET':
                return 48
            case 'DESKTOP':
                return 54
        }
    })()

    return (
        <img
            src={fallbackSkeleton}
            alt="loading"
            title="loading"
            className="rounded-full p-1 col-span-1 mx-auto animate-pulse"
            width={imageWidth}
        />
    )
}

export default SkeletonProfilePicture
