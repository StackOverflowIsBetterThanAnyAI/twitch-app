import { Dispatch, SetStateAction, createContext, useState } from 'react'
import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'

export const ContextScreenWidth = createContext<
    'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP' | undefined
>(undefined)

export const ContextLoggedIn = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

export const ContextLanguage = createContext<
    [string, Dispatch<SetStateAction<string>>] | undefined
>(undefined)

function App() {
    const [language, setLanguage] = useState('de')
    const [loggedIn, setLoggedIn] = useState(false)
    const screenWidth = useScreenWidth()
    return (
        <div className="min-w-80">
            <ContextScreenWidth.Provider value={screenWidth}>
                <ContextLoggedIn.Provider value={[loggedIn, setLoggedIn]}>
                    <ContextLanguage.Provider value={[language, setLanguage]}>
                        <Navigation />
                        <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                            <StreamFeed />
                        </main>
                    </ContextLanguage.Provider>
                </ContextLoggedIn.Provider>
            </ContextScreenWidth.Provider>
        </div>
    )
}

export default App
