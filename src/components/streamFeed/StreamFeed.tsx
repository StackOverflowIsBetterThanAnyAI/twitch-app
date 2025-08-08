import { useCallback, useContext, useEffect, useState } from 'react'
import { getStreams } from '../../helper/getStreams'
import { StreamProps } from '../../types/StreamProps'

import SkeletonFeed from '../skeleton/SkeletonFeed'
import StreamGame from './StreamGame'
import StreamChannel from './StreamChannel'
import StreamFallback from './StreamFallback'
import StreamLive from './StreamLive'
import StreamProfilePicture from './StreamProfilePicture'
import StreamTags from './StreamTags'
import StreamThumbnail from './StreamThumbnail'
import StreamTitle from './StreamTitle'
import StreamViewerCount from './StreamViewerCount'
import {
    ContextErrorMessage,
    ContextFilteredStreamData,
    ContextFocusInput,
    ContextLanguage,
    ContextSEOSearchText,
    ContextScreenWidth,
    ContextSearchText,
    ContextStreamData,
} from '../../App'
import { getEnglishLanguageName } from '../../helper/getEnglishLanguageName'
import StreamNoResults from './StreamNoResults'
import ButtonIcon from '../UI/ButtonIcon'

const bgColors = [
    'bg-gradient-to-tr from-red-400 to-red-800',
    'bg-gradient-to-tr from-cyan-400 to-cyan-800',
    'bg-gradient-to-tr from-lime-300 to-lime-700',
    'bg-gradient-to-tr from-violet-600 to-violet-950',
    'bg-gradient-to-tr from-amber-300 to-amber-700',
    'bg-gradient-to-tr from-blue-300 to-blue-700',
    'bg-gradient-to-tr from-green-500 to-green-900',
    'bg-gradient-to-tr from-fuchsia-400 to-fuchsia-800',
]

const StreamFeed = () => {
    const contextLanguage = useContext(ContextLanguage)
    if (!contextLanguage) {
        throw new Error(
            'ContextLanguage must be used within a ContextLanguage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [language, _setLanguage] = contextLanguage

    const contextErrorMessage = useContext(ContextErrorMessage)
    if (!contextErrorMessage) {
        throw new Error(
            'ContextErrorMessage must be used within a ContextErrorMessage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_errorMessage, setErrorMessage] = contextErrorMessage

    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    const [streamData, setStreamData] = contextStreamData

    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    const [filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const contextSearchText = useContext(ContextSearchText)
    if (!contextSearchText) {
        throw new Error(
            'ContextSearchText must be used within a ContextSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_searchText, setSearchText] = contextSearchText

    const contextSEOSearchText = useContext(ContextSEOSearchText)
    if (!contextSEOSearchText) {
        throw new Error(
            'ContextSEOSearchText must be used within a ContextSEOSearchText.Provider'
        )
    }
    const [seoSearchText, setSEOSearchText] = contextSEOSearchText

    const contextFocusInput = useContext(ContextFocusInput)
    if (!contextFocusInput) {
        throw new Error(
            'ContextFocusInput must be used within a ContextFocusInput.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_inputFocussed, setInputFocussed] = contextFocusInput

    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [prevLanguage, setPrevLanguage] = useState(language)

    const removeFilter = () => {
        setSEOSearchText('')
        setSearchText('')
        setFilteredStreamData(streamData)
        setInputFocussed(true)
    }

    const loadStreams = useCallback(async () => {
        const url = `https://api.twitch.tv/helix/streams?language=${language}`
        try {
            const data: StreamProps | { error: 'login' } | undefined =
                await getStreams(url)
            if (data && 'error' in data && data.error === 'login') {
                setStreamData(undefined)
                setFilteredStreamData(undefined)
                setErrorMessage([
                    'At the moment there are problems with the login process.',
                ])
                throw new Error(
                    'At the moment there are problems with the login process.'
                )
            } else if (data && !('error' in data)) {
                setStreamData(data)
                prevLanguage !== language && setFilteredStreamData(data)
                filteredStreamData === undefined && setFilteredStreamData(data)
                setPrevLanguage(language)
            } else if (!data) {
                setStreamData(undefined)
                setFilteredStreamData(undefined)
                setErrorMessage([
                    `There are no ${getEnglishLanguageName(
                        language
                    )} Livestreams available at the following URL:`,
                    url,
                ])
                throw new Error(`There are no ${getEnglishLanguageName(
                    language
                )} Livestreams available at the following URL:
                    ${url}`)
            }
            setError(false)
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [
        filteredStreamData,
        language,
        prevLanguage,
        setErrorMessage,
        setStreamData,
        setFilteredStreamData,
    ])

    useEffect(() => {
        loadStreams()
        const refresh = setInterval(() => {
            loadStreams()
        }, 120000)
        return () => {
            clearInterval(refresh)
        }
    }, [loadStreams])

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

    if (error) {
        return <StreamFallback />
    }

    if (loading) {
        return <SkeletonFeed />
    }

    return (
        <>
            {filteredStreamData && filteredStreamData.data.length > 0 ? (
                <>
                    <h1
                        className="px-4 pt-2 text-xl lg:text-2xl"
                        data-testid="streamfeed-heading"
                    >
                        <span className="text-purple-400">
                            {getEnglishLanguageName(language)} Livestreams{' '}
                        </span>
                        <span className="text-slate-300">
                            {`you might like${
                                seoSearchText ? `: ${seoSearchText}` : ''
                            }`}
                        </span>
                    </h1>
                    {seoSearchText && (
                        <div className="flex items-center px-4 pt-1">
                            <h2 className="text-lg lg:text-xl text-slate-300 pr-2">
                                Clear filter:
                            </h2>
                            <ButtonIcon
                                ariaLabel="Remove filter."
                                onClick={removeFilter}
                                place="left"
                                secondary
                                type="Remove"
                            />
                        </div>
                    )}
                    <article
                        className={`p-4 gap-4 ${
                            contextScreenWidth === 'MOBILE'
                                ? 'grid grid-cols-1'
                                : contextScreenWidth === 'TABLET_SMALL'
                                ? 'grid grid-cols-2'
                                : 'grid grid-cols-auto-fill-284'
                        }`}
                        data-testid="streamfeed-container"
                    >
                        {filteredStreamData.data.map((item, index) => {
                            const bgColor = bgColors[index % bgColors.length]
                            return (
                                <article
                                    key={item.user_id}
                                    data-testid={`streamfeed-article-${index}`}
                                >
                                    <div className={`rounded-xl ${bgColor}`}>
                                        <section
                                            className="relative transform transition duration-150 ease-in-out
                                            hover:translate-x-2 hover:-translate-y-2"
                                        >
                                            <StreamThumbnail
                                                thumbnail_url={
                                                    item.thumbnail_url
                                                }
                                                user_name={item.user_name}
                                                stream_game={item.game_name}
                                                key={`${item.user_id} - thumbnail`}
                                                testid={`streamfeed-thumbnail-${index}`}
                                            />
                                            <StreamLive
                                                placement="thumbnail"
                                                type={item.type}
                                                key={`${item.user_id} - live`}
                                                testid={`streamfeed-live-${index}`}
                                            />
                                            <StreamViewerCount
                                                viewer_count={item.viewer_count}
                                                key={`${item.user_id} - viewer_count`}
                                                testid={`streamfeed-viewercount-${index}`}
                                            />
                                        </section>
                                    </div>
                                    <section className="grid grid-cols-minmax-36 grid-rows-1 gap-2 w-full pt-2">
                                        <StreamProfilePicture
                                            user_id={item.user_id}
                                            user_name={item.user_name}
                                            key={`${item.user_id} - profile_picture`}
                                            testid={`streamfeed-profilepicture-${index}`}
                                        />
                                        <section className="col-span-4">
                                            <StreamChannel
                                                user_name={item.user_name}
                                                key={`${item.user_id} - channel`}
                                                testid={`streamfeed-channel-${index}`}
                                            />
                                            <StreamTitle
                                                title={item.title}
                                                key={`${item.user_id} - title`}
                                                testid={`streamfeed-title-${index}`}
                                            />
                                            <StreamGame
                                                game_name={item.game_name}
                                                key={`${item.user_id} - game`}
                                                testid={`streamfeed-game-${index}`}
                                            />
                                            <div className="flex flex-wrap w-full max-h-20 overflow-auto pl-2 -ml-2">
                                                {item.tags.map((tag, index) => (
                                                    <StreamTags
                                                        item={tag}
                                                        key={`${tag}${index} - tag`}
                                                        testid={`streamfeed-tags-${index}`}
                                                    />
                                                ))}
                                            </div>
                                        </section>
                                    </section>
                                </article>
                            )
                        })}
                    </article>
                </>
            ) : (
                <StreamNoResults />
            )}
        </>
    )
}

export default StreamFeed
