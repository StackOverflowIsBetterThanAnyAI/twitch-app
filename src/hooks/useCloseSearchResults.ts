import { useEffect } from 'react'

export const useCloseSearchResults = (
    anchorRef: React.RefObject<HTMLButtonElement>,
    buttonIconRef: React.RefObject<HTMLButtonElement>,
    contextScreenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP',
    desktopSearchRef: React.RefObject<HTMLDivElement>,
    inputRef: React.RefObject<HTMLInputElement>,
    mobileSearchRef: React.RefObject<HTMLDivElement>,
    searchResultsExpanded: boolean,
    setSearchResultsExpanded: (value: React.SetStateAction<boolean>) => void,
    userIconRef: React.RefObject<HTMLButtonElement>
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ((desktopSearchRef.current &&
                    !desktopSearchRef.current.contains(event.target as Node)) ||
                    (mobileSearchRef.current &&
                        !mobileSearchRef.current.contains(
                            event.target as Node
                        ))) &&
                searchResultsExpanded
            ) {
                event.stopPropagation()
                setSearchResultsExpanded(false)
            }
        }

        const handleEscape = (event: KeyboardEvent) => {
            if (
                ((desktopSearchRef.current &&
                    desktopSearchRef.current.contains(event.target as Node)) ||
                    (mobileSearchRef.current &&
                        mobileSearchRef.current.contains(
                            event.target as Node
                        ))) &&
                searchResultsExpanded &&
                event.key === 'Escape'
            ) {
                event.stopPropagation()
                setSearchResultsExpanded(false)
                if (!inputRef?.current?.onfocus) {
                    if (
                        contextScreenWidth === 'MOBILE' ||
                        contextScreenWidth === 'TABLET_SMALL'
                    ) {
                        buttonIconRef?.current?.focus()
                    } else {
                        userIconRef?.current?.focus()
                        anchorRef?.current?.focus()
                    }
                }
            }
        }

        if (searchResultsExpanded) {
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [
        anchorRef,
        buttonIconRef,
        contextScreenWidth,
        desktopSearchRef,
        inputRef,
        mobileSearchRef,
        searchResultsExpanded,
        setSearchResultsExpanded,
        userIconRef,
    ])
}
