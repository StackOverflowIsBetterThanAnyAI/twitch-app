import { useEffect } from 'react'
import { StreamProps } from '../types/StreamProps'

export const useFocusTrap = (
    error: boolean,
    filteredStreamData: StreamProps | undefined
) => {
    useEffect(() => {
        const focusTrap = (e: KeyboardEvent) => {
            if (
                !['Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                error ||
                filteredStreamData?.data.length === 0
            )
                return

            const focusableElements: HTMLButtonElement[] = Array.from(
                document.querySelectorAll(
                    'button.streamfeed, .navigation, .footer, .remove-button'
                )
            )

            if (
                !document.activeElement ||
                !focusableElements.includes(
                    document.activeElement as HTMLButtonElement
                )
            )
                return

            const firstFocusableElement =
                focusableElements[0] as HTMLButtonElement

            const lastFocusableElement = focusableElements[
                focusableElements.length - 1
            ] as HTMLButtonElement

            const findCurrentButtonIndex = (button: HTMLButtonElement) => {
                return focusableElements.indexOf(button)
            }

            if (e.shiftKey && e.key === 'Tab') {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault()
                    lastFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    const currentIndex = findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                    focusableElements[currentIndex - 1]?.focus()
                }
            } else if (!e.shiftKey && e.key === 'Tab') {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    const currentIndex = findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                    focusableElements[currentIndex + 1]?.focus()
                }
            } else if (e.key === 'ArrowRight') {
                const upcomingFocusableElements = focusableElements.splice(
                    findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    ) + 1
                )

                const previousFocusableElements = focusableElements.splice(
                    0,
                    findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                )

                const category = Array.from(document.activeElement.classList)[
                    Array.from(document.activeElement.classList).length - 1
                ]

                const upcomingElement =
                    upcomingFocusableElements.filter((item) =>
                        Array.from(item.classList).includes(category)
                    )[0] ??
                    previousFocusableElements.filter((item) =>
                        Array.from(item.classList).includes(category)
                    )[0] ??
                    undefined

                upcomingElement && upcomingElement.focus()
            } else if (e.key === 'ArrowLeft') {
                const upcomingFocusableElements = focusableElements.splice(
                    findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    ) + 1
                )

                const previousFocusableElements = focusableElements.splice(
                    0,
                    findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                )

                const category = Array.from(document.activeElement.classList)[
                    Array.from(document.activeElement.classList).length - 1
                ]

                const previousElement =
                    previousFocusableElements
                        .reverse()
                        .filter((item) =>
                            Array.from(item.classList).includes(category)
                        )[0] ??
                    upcomingFocusableElements
                        .reverse()
                        .filter((item) =>
                            Array.from(item.classList).includes(category)
                        )[0] ??
                    undefined

                previousElement && previousElement.focus()
            }
        }

        document.addEventListener('keydown', focusTrap)

        return () => {
            document.removeEventListener('keydown', focusTrap)
        }
    }, [error, filteredStreamData])
}
