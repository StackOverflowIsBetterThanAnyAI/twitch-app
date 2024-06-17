const SkeletonChannelInfo = () => {
    const textClassName = 'bg-zinc-50 rounded-full h-4 mb-2 animate-pulse'
    const skeletonArray = Array.from({ length: 3 }, (_, i) => i)
    return (
        <>
            {skeletonArray.map((i) => (
                <div className={textClassName} key={i}></div>
            ))}
            <div className="flex">
                <div className={`${textClassName} w-1/4 mr-2`}></div>
                <div className={`${textClassName} w-1/4`}></div>
            </div>
        </>
    )
}

export default SkeletonChannelInfo
