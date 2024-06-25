import SkeletonChannelInfo from './SkeletonChannelInfo'
import SkeletonProfilePicture from './SkeletonProfilePicture'
import SkeletonThumbnail from './SkeletonThumbnail'

const SkeletonFeed = () => {
    const skeletonArray = Array.from({ length: 20 }, (_, i) => i)
    return (
        <article className="p-4 gap-4 grid grid-cols-auto-fill-320">
            {skeletonArray.map((item) => {
                return (
                    <article key={item}>
                        <SkeletonThumbnail />
                        <section className="grid grid-cols-5 grid-rows-1 w-full">
                            <SkeletonProfilePicture />
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
