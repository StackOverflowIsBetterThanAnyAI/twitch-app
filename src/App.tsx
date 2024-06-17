import { Dispatch, SetStateAction, createContext, useState } from 'react'
import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'

export const ContextScreenWidth = createContext<
    'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP' | undefined
>(undefined)

export const ContextLanguage = createContext<
    [string, Dispatch<SetStateAction<string>>] | undefined
>(undefined)

function App() {
    // TODO: api error handling on screen
    const [language, setLanguage] = useState(
        sessionStorage.getItem('twitch_filtered_language') || 'de'
    )
    const screenWidth = useScreenWidth()

    return (
        <div className="min-w-80">
            <ContextScreenWidth.Provider value={screenWidth}>
                <ContextLanguage.Provider value={[language, setLanguage]}>
                    <Navigation />
                    <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                        <StreamFeed />
                    </main>
                </ContextLanguage.Provider>
            </ContextScreenWidth.Provider>
        </div>
    )
}

export default App
