import { RefObject } from 'react'

export type SearchProps = {
    handleBlur: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClick: (name: string) => void
    handleFocus: () => void
    handleInput: () => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleSearch: () => void
    searchResults: any[]
    searchResultsExpanded: boolean
    searchMobileRef?: RefObject<HTMLInputElement>
}
