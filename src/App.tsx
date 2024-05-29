import StreamFeed from './components/StreamFeed'
import Navigation from './components/UI/Navigation'
import { useScreenWidth } from './hooks/useScreenWidth'

function App() {
    const screenWidth = useScreenWidth()
    return (
        <>
            <Navigation screenWidth={screenWidth} />
            <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                <StreamFeed screenWidth={screenWidth} />
            </main>
        </>
    )
}

export default App
