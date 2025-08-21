import { useEffect } from 'react'

export const useSettingsPopupFocusTrap = (
    filterLanguageExpanded: boolean,
    popupRef: React.MutableRefObject<HTMLDivElement | null>
) => {
    useEffect(() => {
        if (filterLanguageExpanded) {
            return
        }

        const buttons = popupRef.current?.querySelectorAll('button')
        if (!buttons || buttons.length === 0) {
            return
        }

        const firstButton = buttons[0]
        const lastButton = buttons[buttons.length - 1]

        const handleFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') {
                return
            }

            if (e.shiftKey) {
                if (document.activeElement === firstButton) {
                    e.preventDefault()
                    lastButton.focus()
                }
            } else {
                if (document.activeElement === lastButton) {
                    e.preventDefault()
                    firstButton.focus()
                }
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [filterLanguageExpanded, popupRef])
}
