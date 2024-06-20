import { Dispatch, SetStateAction, createContext, useState } from 'react'
import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'
import { StreamProps } from './types/StreamProps'

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

const App = () => {
    const [errorMessage, setErrorMessage] = useState([''])
    const [language, setLanguage] = useState(
        sessionStorage.getItem('twitch_filtered_language') || 'de'
    )
    const screenWidth = useScreenWidth()
    const [searchText, setSearchText] = useState<string>('')
    const [streamData, setStreamData] = useState<StreamProps | undefined>(
        undefined
    )
    const [filteredStreamData, setFilteredStreamData] = useState<
        StreamProps | undefined
    >(streamData)

    return (
        <div className="min-w-72 min-h-screen bg-zinc-800">
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
                                    <Navigation />
                                    <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 px-2">
                                        <StreamFeed />
                                    </main>
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
