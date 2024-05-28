import StreamFeed from './components/StreamFeed'
import Navigation from './components/UI/Navigation'

function App() {
    return (
        <>
            <Navigation />
            <main className="font-sans bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800">
                <StreamFeed />
            </main>
        </>
    )
}

export default App
