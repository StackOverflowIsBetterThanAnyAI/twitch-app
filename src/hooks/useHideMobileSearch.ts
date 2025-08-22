import { useEffect } from 'react'

export const useHideMobileSearch = (
    contextScreenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP',
    inputFocussed: boolean,
    setAriaPressed: (value: React.SetStateAction<boolean>) => void,
    setHideSearch: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        if (
            (contextScreenWidth === 'MOBILE' ||
                contextScreenWidth === 'TABLET_SMALL') &&
            inputFocussed
        ) {
            setHideSearch(false)
            setAriaPressed(true)
        }
    }, [contextScreenWidth, inputFocussed, setAriaPressed, setHideSearch])
}
