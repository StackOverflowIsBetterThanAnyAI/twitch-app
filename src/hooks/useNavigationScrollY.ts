import { useEffect } from 'react'

export const useNavigationScrollY = (
    blockOpacity: boolean,
    navOpacity: string,
    setNavOpacity: (value: React.SetStateAction<string>) => void
) => {
    useEffect(() => {
        let lastScrollY = window.scrollY
        let timer: NodeJS.Timeout

        const handleScroll = () => {
            if (window.scrollY === 0) {
                setNavOpacity('opacity-100')
            } else if (window.scrollY < lastScrollY && !blockOpacity) {
                setNavOpacity('opacity-75')
            } else if (!blockOpacity) {
                setNavOpacity('opacity-95')
            }
            lastScrollY = window.scrollY

            clearTimeout(timer)
            if (navOpacity !== 'opacity-100') {
                timer = setTimeout(() => {
                    setNavOpacity('opacity-100')
                }, 500)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            clearTimeout(timer)
        }
    }, [blockOpacity, navOpacity, setNavOpacity])
}
