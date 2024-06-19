import { forwardRef } from 'react'
import StreamLive from '../../streamFeed/StreamLive'

type DesktopSearchProps = {
    handleBlur: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleFocus: () => void
    handleInput: () => void
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
    handleSearch: () => void
    searchResults: any[]
    searchResultsExpanded: boolean
    searchText: string
}

const DesktopSearch = forwardRef<HTMLDivElement, DesktopSearchProps>(
    (
        {
            handleBlur,
            handleChange,
            handleFocus,
            handleInput,
            handleKeyDown,
            handleSearch,
            searchResults,
            searchResultsExpanded,
            searchText,
        },
        ref
    ) => {
        return (
            <div className="flex flex-col py-1 gap-1" ref={ref}>
                <div className="flex flex-row outline outline-zinc-700 rounded-lg my-auto w-[249px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="bg-zinc-900 text-slate-300 caret-zinc-300 px-2 m-1 rounded-l-md pseudo-zinc"
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        title="Search current Livestreams."
                    />
                    <button
                        className={`m-auto p-2 rounded-full mr-1 ${
                            searchText
                                ? 'hover:cursor-pointer'
                                : 'hover:cursor-not-allowed active:bg-zinc-800 active:outline-0'
                        } pseudo-zinc`}
                        title={
                            searchText
                                ? 'Search current Livestreams.'
                                : 'Type anything to search for.'
                        }
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
                {searchResults.length > 0 && searchResultsExpanded && (
                    <div
                        className="outline outline-zinc-700 rounded-lg bg-zinc-900 flex flex-col overflow-scroll"
                        style={{
                            maxHeight: '384px',
                            minHeight: `clamp(0px, ${
                                searchResults.length * 52 + 17
                            }px, 384px)`,
                        }}
                    >
                        {searchResults.map((item, index) => (
                            <div
                                key={item.user_name}
                                className={`${
                                    index % 2 !== 0
                                        ? 'bg-zinc-700'
                                        : 'bg-zinc-900'
                                } px-2 py-1`}
                            >
                                <button
                                    className="flex flex-col"
                                    title={`${item.user_name}${
                                        item.tags.length
                                            ? ` (${item.tags.join(', ')})`
                                            : ''
                                    }`}
                                >
                                    <div className="flex flex-row items-center justify-between w-full">
                                        <div className="w-[163px] overflow-hidden text-ellipsis text-left whitespace-nowrap text-base">
                                            {item.user_name}
                                            {item.tags.length ? (
                                                <i> ({item.tags.join(', ')})</i>
                                            ) : null}
                                        </div>
                                        <StreamLive
                                            type="live"
                                            placement="search"
                                        />
                                    </div>
                                    <div
                                        className="w-[225px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-left"
                                        title={`${item.game_name}: ${item.title}`}
                                    >
                                        {item.game_name}: {item.title}
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
)

export default DesktopSearch
