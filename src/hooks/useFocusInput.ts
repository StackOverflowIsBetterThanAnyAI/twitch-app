import { useEffect } from 'react'

export const useFocusInput = (
    inputFocussed: boolean,
    inputRef: React.RefObject<HTMLInputElement> | undefined,
    setInputFocussed: (value: React.SetStateAction<boolean>) => void
) => {
    useEffect(() => {
        if (inputFocussed && inputRef?.current) {
            inputRef.current.focus()
            setInputFocussed(false)
        }
    }, [inputFocussed, inputRef, setInputFocussed])
}
