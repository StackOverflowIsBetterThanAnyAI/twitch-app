import { useEffect } from 'react'

export const useFocusTrapSearch = (
    buttonRef: React.MutableRefObject<HTMLButtonElement | null>,
    focusTrapDisabled: boolean,
    inputRef: React.RefObject<HTMLInputElement> | undefined,
    searchResultsRef: React.MutableRefObject<HTMLDivElement | null>,
    searchText: string
) => {
    useEffect(() => {
        const handleFocusTrap = (e: KeyboardEvent) => {
            if (
                searchText.length === 0 ||
                e.key !== 'Tab' ||
                focusTrapDisabled
            ) {
                return
            }

            const focusableElements = [
                inputRef?.current,
                buttonRef.current,
                ...(searchResultsRef.current
                    ? Array.from(
                          searchResultsRef.current.querySelectorAll('button')
                      )
                    : []),
            ].filter((element) => element !== null) as (
                | HTMLInputElement
                | HTMLButtonElement
            )[]

            if (focusableElements.length === 0) {
                return
            }

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [buttonRef, focusTrapDisabled, inputRef, searchResultsRef, searchText])
}
