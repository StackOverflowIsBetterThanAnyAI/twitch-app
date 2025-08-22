import { Dispatch, SetStateAction, createContext, useState } from 'react'
import Footer from './components/UI/footer/Footer'
import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { StreamProps } from './types/StreamProps'
import { getItemFromStorage } from './helper/getItemFromStorage'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { useScreenWidth } from './hooks/useScreenWidth'

export const ContextScreenWidth = createContext<
    'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP' | undefined
>(undefined)

export const ContextLanguage = createContext<
    [string, Dispatch<SetStateAction<string>>] | undefined
>(undefined)

export const ContextErrorMessage = createContext<
    [string[], Dispatch<SetStateAction<string[]>>] | undefined
>(undefined)

export const ContextStreamData = createContext<
    | [
          StreamProps | undefined,
          Dispatch<SetStateAction<StreamProps | undefined>>
      ]
    | undefined
>(undefined)

export const ContextFilteredStreamData = createContext<
    | [
          StreamProps | undefined,
          Dispatch<SetStateAction<StreamProps | undefined>>
      ]
    | undefined
>(undefined)

export const ContextSearchText = createContext<
    [string, Dispatch<SetStateAction<string>>] | undefined
>(undefined)

export const ContextSEOSearchText = createContext<
    [string, Dispatch<SetStateAction<string>>] | undefined
>(undefined)

export const ContextDisableFocusTrap = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

export const ContextSearchResults = createContext<
    [any[], Dispatch<SetStateAction<any[]>>] | undefined
>(undefined)

export const ContextFocusInput = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

export const ContextHideSearch = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

const App = () => {
    const [errorMessage, setErrorMessage] = useState([''])
    const [language, setLanguage] = useState(() => {
        const parsedData = getItemFromStorage()
        return parsedData.twitch_filtered_language || 'en'
    })
    const screenWidth = useScreenWidth()
    const [searchText, setSearchText] = useState<string>('')
    const [seoSearchText, setSEOSearchText] = useState<string>('')
    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )
    const [filteredStreamData, setFilteredStreamData] = useState<
        StreamProps | undefined
    >(streamData)
    const [focusTrapDisabled, setFocusTrapDisabled] = useState(false)
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [inputFocussed, setInputFocussed] = useState(false)
    const [hideSearch, setHideSearch] = useState(true)

    useDocumentTitle(language, seoSearchText)

    return (
        <div className="min-w-64 min-h-screen bg-zinc-800">
            <ContextScreenWidth.Provider value={screenWidth}>
                <ContextLanguage.Provider value={[language, setLanguage]}>
                    <ContextErrorMessage.Provider
                        value={[errorMessage, setErrorMessage]}
                    >
                        <ContextStreamData.Provider
                            value={[streamData, setStreamData]}
                        >
                            <ContextFilteredStreamData.Provider
                                value={[
                                    filteredStreamData,
                                    setFilteredStreamData,
                                ]}
                            >
                                <ContextSearchText.Provider
                                    value={[searchText, setSearchText]}
                                >
                                    <ContextSEOSearchText.Provider
                                        value={[
                                            seoSearchText,
                                            setSEOSearchText,
                                        ]}
                                    >
                                        <ContextDisableFocusTrap.Provider
                                            value={[
                                                focusTrapDisabled,
                                                setFocusTrapDisabled,
                                            ]}
                                        >
                                            <ContextSearchResults.Provider
                                                value={[
                                                    searchResults,
                                                    setSearchResults,
                                                ]}
                                            >
                                                <ContextFocusInput.Provider
                                                    value={[
                                                        inputFocussed,
                                                        setInputFocussed,
                                                    ]}
                                                >
                                                    <ContextHideSearch.Provider
                                                        value={[
                                                            hideSearch,
                                                            setHideSearch,
                                                        ]}
                                                    >
                                                        <Navigation />
                                                        <div
                                                            className="grid"
                                                            style={{
                                                                minHeight: `calc(100dvh - 64px - ${
                                                                    (screenWidth ===
                                                                        'MOBILE' ||
                                                                        screenWidth ===
                                                                            'TABLET_SMALL') &&
                                                                    !hideSearch
                                                                        ? '40px'
                                                                        : '0px'
                                                                })`,
                                                                gridTemplateRows:
                                                                    '1fr auto',
                                                            }}
                                                        >
                                                            <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 px-2">
                                                                <StreamFeed />
                                                            </main>
                                                            <Footer />
                                                        </div>
                                                    </ContextHideSearch.Provider>
                                                </ContextFocusInput.Provider>
                                            </ContextSearchResults.Provider>
                                        </ContextDisableFocusTrap.Provider>
                                    </ContextSEOSearchText.Provider>
                                </ContextSearchText.Provider>
                            </ContextFilteredStreamData.Provider>
                        </ContextStreamData.Provider>
                    </ContextErrorMessage.Provider>
                </ContextLanguage.Provider>
            </ContextScreenWidth.Provider>
        </div>
    )
}

export default App
