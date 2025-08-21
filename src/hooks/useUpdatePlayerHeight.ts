import { useEffect } from 'react'

export const useUpdatePlayerHeight = (
    containerRef: React.MutableRefObject<HTMLDivElement | null>,
    setHeight: (value: React.SetStateAction<number>) => void
) => {
    useEffect(() => {
        const updateHeight = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth
                setHeight(Math.round((width * 9) / 16))
            }
        }
        updateHeight()
        window.addEventListener('resize', updateHeight)
        return () => window.removeEventListener('resize', updateHeight)
    }, [containerRef, setHeight])
}
