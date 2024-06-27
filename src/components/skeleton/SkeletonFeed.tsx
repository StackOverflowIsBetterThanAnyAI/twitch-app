import { useContext } from 'react'
import SkeletonChannelInfo from './SkeletonChannelInfo'
import SkeletonProfilePicture from './SkeletonProfilePicture'
import SkeletonThumbnail from './SkeletonThumbnail'
import { ContextScreenWidth } from '../../App'

const SkeletonFeed = () => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const skeletonArray = Array.from({ length: 20 }, (_, i) => i)
    return (
        <>
            <div
                className="bg-zinc-50 rounded-full h-4 animate-pulse mt-4 mb-2 mx-4"
                style={{ width: 'clamp(25vw, 300px, 75vw)' }}
            ></div>
            <article
                className={`p-4 gap-4 ${
                    contextScreenWidth === 'MOBILE'
                        ? 'grid grid-cols-1'
                        : 'grid grid-cols-auto-fill-284'
                }`}
            >
                {skeletonArray.map((item) => {
                    return (
                        <article key={item} className="max-w-[440px]">
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
        </>
    )
}

export default SkeletonFeed
