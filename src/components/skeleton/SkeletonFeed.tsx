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
            <div className="w-full lg:w-4/5 max-w-6xl m-auto pt-4">
                <div
                    className="bg-zinc-50 rounded-full h-6 animate-pulse my-2"
                    style={{ width: 'clamp(25vw, 300px, 75vw)' }}
                ></div>
                <div className="relative bg-zinc-700 my-8 p-4 rounded-lg h-80 animate-pulse">
                    <div className="absolute inset-4 bg-zinc-50 animate-pulse"></div>
                </div>
            </div>
            <div
                className="bg-zinc-50 rounded-full h-5 animate-pulse mt-4 mb-2 mx-4"
                style={{ width: 'clamp(25vw, 300px, 75vw)' }}
            ></div>
            <article
                className={`p-4 gap-4 ${
                    contextScreenWidth === 'MOBILE'
                        ? 'grid grid-cols-1'
                        : contextScreenWidth === 'TABLET_SMALL'
                        ? 'grid grid-cols-2'
                        : 'grid grid-cols-auto-fill-284'
                }`}
            >
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
        </>
    )
}

export default SkeletonFeed
