import { createContext } from 'react'
import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'

export const ContextScreenWidth = createContext<
    'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP' | undefined
>(undefined)

function App() {
    const screenWidth = useScreenWidth()
    return (
        <div className="min-w-80">
            <ContextScreenWidth.Provider value={screenWidth}>
                <Navigation />
                <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                    <StreamFeed />
                </main>
            </ContextScreenWidth.Provider>
        </div>
    )
}

export default App
