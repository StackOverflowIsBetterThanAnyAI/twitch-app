import { SetStateAction, useEffect } from 'react'

export const useCloseUserIcon = (
    buttonRef: React.RefObject<HTMLButtonElement>,
    dropdownActive: boolean,
    filterLanguageExpanded: boolean,
    popupRef: React.MutableRefObject<HTMLDivElement | null>,
    setDropdownActive: (value: SetStateAction<boolean>) => void,
    setFilterLanguageExpanded: (value: SetStateAction<boolean>) => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownActive(false)
                setFilterLanguageExpanded(false)
            }
        }

        if (dropdownActive) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [
        buttonRef,
        dropdownActive,
        popupRef,
        setDropdownActive,
        setFilterLanguageExpanded,
    ])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !filterLanguageExpanded
            ) {
                setDropdownActive(false)
            }
        }

        if (dropdownActive && !filterLanguageExpanded) {
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [dropdownActive, filterLanguageExpanded, popupRef, setDropdownActive])
}
