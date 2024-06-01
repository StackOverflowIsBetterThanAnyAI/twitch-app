import { FC } from 'react'

type DesktopSearchProps = {
    handleBlur: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFocus: () => void
    handleInput: () => void
    handleSearch: () => void
    searchText: string
}

export const DesktopSearch: FC<DesktopSearchProps> = ({
    handleBlur,
    handleChange,
    handleFocus,
    handleInput,
    handleSearch,
    searchText,
}) => {
    return (
        <div className="flex flex-row outline outline-zinc-700 rounded-lg">
            <input
                type="search"
                placeholder="Search"
                className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 m-1 rounded-l-md pseudo-zinc"
                value={searchText}
                onChange={handleChange}
                onFocus={handleFocus}
                onInput={handleInput}
                onBlur={handleBlur}
            />
            <button
                className={`m-auto p-2 rounded-full mr-1 ${
                    searchText
                        ? 'hover:cursor-pointer'
                        : 'hover:cursor-not-allowed'
                } pseudo-zinc`}
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
