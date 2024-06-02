import StreamFeed from './components/streamFeed/StreamFeed'
import Navigation from './components/UI/navigation/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'

function App() {
    const screenWidth = useScreenWidth()
    return (
        <div className="min-w-80">
            <Navigation screenWidth={screenWidth} />
            <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                <StreamFeed screenWidth={screenWidth} />
            </main>
        </div>
    )
}

export default App
