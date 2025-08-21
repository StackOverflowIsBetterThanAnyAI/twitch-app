import { useEffect } from 'react'

export const useCloseSettingsPopup = (
    filterLanguageExpanded: boolean,
    popupLanguageRef: React.MutableRefObject<HTMLDivElement | null>,
    setFilterLanguageExpanded: (value: React.SetStateAction<boolean>) => void
) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupLanguageRef.current &&
                !popupLanguageRef.current.contains(event.target as Node) &&
                filterLanguageExpanded &&
                event.key === 'Escape'
            ) {
                event.stopPropagation()
                setFilterLanguageExpanded(false)
            }
        }

        if (filterLanguageExpanded) {
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [filterLanguageExpanded, popupLanguageRef, setFilterLanguageExpanded])
}
