import { useScreenWidth } from '../../hooks/useScreenWidth'

import SkeletonChannelInfo from './SkeletonChannelInfo'
import SkeletonProfilePicture from './SkeletonProfilePicture'
import SkeletonThumbnail from './SkeletonThumbnail'

const SkeletonFeed = () => {
    const screenWidth = useScreenWidth()
    const skeleton = []
    for (let i = 0; i < 20; i++) {
        skeleton.push(i)
    }
    return (
        <article className="p-4 gap-4 grid grid-cols-auto-fit-320">
            {skeleton.map((item) => {
                return (
                    <article key={item}>
                        <SkeletonThumbnail screenWidth={screenWidth} />
                        <section className="grid grid-cols-5 grid-rows-1 w-full">
                            <SkeletonProfilePicture screenWidth={screenWidth} />
                            <section className="col-span-4">
                                <SkeletonChannelInfo />
                            </section>
                        </section>
                    </article>
                )
            })}
        </article>
    )
}

export default SkeletonFeed
