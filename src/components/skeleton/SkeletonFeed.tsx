import SkeletonChannelInfo from './SkeletonChannelInfo'
import SkeletonProfilePicture from './SkeletonProfilePicture'
import SkeletonThumbnail from './SkeletonThumbnail'

const SkeletonFeed = () => {
    const skeletonArray = Array.from({ length: 20 }, (_, i) => i)
    return (
        <div className="max-w-[2048px] mx-auto">
            <div className="w-full lg:w-4/5 max-w-6xl m-auto pt-4">
                <div
                    className="bg-zinc-50 rounded-full h-6 shimmer my-2"
                    style={{ width: 'min(75vw, 256px)' }}
                ></div>
                <div className="relative bg-zinc-700 my-8 p-4 rounded-lg h-80 shimmer">
                    <div className="absolute inset-4 bg-zinc-50 shimmer"></div>
                </div>
            </div>
            <div
                className="bg-zinc-50 rounded-full h-5 shimmer my-4 mx-4"
                style={{ width: 'min(85vw, 320px)' }}
            ></div>
            <article className="p-4 gap-4 grid grid-cols-1 min-[384px]:grid-cols-2 sm:grid-cols-auto-fill-284">
                {skeletonArray.map((item) => {
                    return (
                        <article key={item} className="max-w-[440px]">
                            <SkeletonThumbnail />
                            <section className="grid grid-cols-minmax-36 grid-rows-1 w-full">
                                <SkeletonProfilePicture />
                                <section className="col-span-4">
                                    <SkeletonChannelInfo />
                                </section>
                            </section>
                        </article>
                    )
                })}
            </article>
        </div>
    )
}

export default SkeletonFeed
