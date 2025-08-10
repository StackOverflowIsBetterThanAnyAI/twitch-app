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

            const focusableStreamButtons: HTMLButtonElement[] = Array.from(
                document.querySelectorAll(
                    'button.streamfeed, .navigation, .footer'
                )
            )

            const focusableNavigationButtons = Array.from(
                document.querySelectorAll('.navigation')
            )

            if (
                !document.activeElement ||
                !focusableStreamButtons.includes(
                    document.activeElement as HTMLButtonElement
                )
            )
                return

            const firstFocusableElement =
                focusableStreamButtons[0] as HTMLButtonElement

            const firstStreamFeedFocusableElement = focusableStreamButtons[
                focusableNavigationButtons.length
            ] as HTMLButtonElement

            const lastFocusableElement = focusableStreamButtons[
                focusableStreamButtons.length - 1
            ] as HTMLButtonElement

            const findCurrentButtonIndex = (button: HTMLButtonElement) => {
                return focusableStreamButtons.indexOf(button)
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
                    focusableStreamButtons[currentIndex - 1]?.focus()
                }
            } else if (!e.shiftKey && e.key === 'Tab') {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstStreamFeedFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    const currentIndex = findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                    focusableStreamButtons[currentIndex + 1]?.focus()
                }
            } else if (e.key === 'ArrowRight') {
                const upcommingFocusableStreamButtons =
                    focusableStreamButtons.splice(
                        findCurrentButtonIndex(
                            document.activeElement as HTMLButtonElement
                        ) + 1
                    )

                const previousFocusableStreamButtons =
                    focusableStreamButtons.splice(
                        0,
                        findCurrentButtonIndex(
                            document.activeElement as HTMLButtonElement
                        )
                    )

                const category = Array.from(document.activeElement.classList)[
                    Array.from(document.activeElement.classList).length - 1
                ]

                const upcomingElement =
                    upcommingFocusableStreamButtons.filter((item) =>
                        Array.from(item.classList).includes(category)
                    )[0] ??
                    previousFocusableStreamButtons.filter((item) =>
                        Array.from(item.classList).includes(category)
                    )[0] ??
                    undefined

                upcomingElement && upcomingElement.focus()
            } else if (e.key === 'ArrowLeft') {
                const upcommingFocusableStreamButtons =
                    focusableStreamButtons.splice(
                        findCurrentButtonIndex(
                            document.activeElement as HTMLButtonElement
                        ) + 1
                    )

                const previousFocusableStreamButtons =
                    focusableStreamButtons.splice(
                        0,
                        findCurrentButtonIndex(
                            document.activeElement as HTMLButtonElement
                        )
                    )

                const category = Array.from(document.activeElement.classList)[
                    Array.from(document.activeElement.classList).length - 1
                ]

                const previousElement =
                    previousFocusableStreamButtons
                        .reverse()
                        .filter((item) =>
                            Array.from(item.classList).includes(category)
                        )[0] ??
                    upcommingFocusableStreamButtons
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
