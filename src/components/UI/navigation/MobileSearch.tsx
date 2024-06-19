import { FC, RefObject } from 'react'

type MobileSearchProps = {
    handleBlur: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFocus: () => void
    handleInput: () => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleSearch: () => void
    searchMobileRef: RefObject<HTMLInputElement>
    searchResults: any[]
    searchText: string
}

export const MobileSearch: FC<MobileSearchProps> = ({
    handleBlur,
    handleChange,
    handleFocus,
    handleInput,
    handleKeyDown,
    handleSearch,
    searchMobileRef,
    searchResults,
    searchText,
}) => {
    return (
        <div className="flex justify-center bg-zinc-800 p-2 outline outline-zinc-900 w-full">
            <input
                type="search"
                placeholder="Search"
                className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 rounded-md pseudo-zinc"
                value={searchText}
                onChange={handleChange}
                onFocus={handleFocus}
                onInput={handleInput}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                ref={searchMobileRef}
            />
            <button
                className={`px-2 pseudo-zinc rounded-md ${
                    searchText
                        ? 'hover:cursor-pointer'
                        : 'hover:cursor-not-allowed'
                }`}
                onClick={handleSearch}
                disabled={!searchText}
                aria-disabled={!searchText}
            >
                <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="gainsboro"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                    />
                </svg>
            </button>
        </div>
    )
}
