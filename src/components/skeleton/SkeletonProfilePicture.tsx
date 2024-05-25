import { FC } from 'react'

type SkeletonProfilePictureProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
}

const SkeletonProfilePicture: FC<SkeletonProfilePictureProps> = ({
    screenWidth,
}) => {
    return (
        <div className="rounded-full p-1 col-span-1 mx-auto animate-pulse bg-zinc-50 w-12 h-12"></div>
    )
}

export default SkeletonProfilePicture
