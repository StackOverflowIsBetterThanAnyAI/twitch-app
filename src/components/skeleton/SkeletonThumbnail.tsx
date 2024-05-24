import { FC } from 'react'

import fallbackThumbnailSkeleton from './../../fallbackThumbnailSkeleton.png'

type SkeletonThumbnailProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
}

const SkeletonThumbnail: FC<SkeletonThumbnailProps> = ({ screenWidth }) => {
    return (
        <img
            src={fallbackThumbnailSkeleton}
            alt="loading"
            className="rounded-xl w-full pb-2 animate-pulse"
        />
    )
}

export default SkeletonThumbnail
