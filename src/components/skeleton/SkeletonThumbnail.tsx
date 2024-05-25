import { FC } from 'react'

type SkeletonThumbnailProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
}

const SkeletonThumbnail: FC<SkeletonThumbnailProps> = ({ screenWidth }) => {
    return (
        <div className="rounded-xl w-full mb-2 h-48 animate-pulse bg-zinc-50"></div>
    )
}

export default SkeletonThumbnail
