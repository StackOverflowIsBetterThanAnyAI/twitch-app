export const removeItemFromStorage = (key: string) => {
    const storage = sessionStorage.getItem('twitch-app')
    if (!storage) {
        return
    }

    const parsedTracker = JSON.parse(storage)

    if (key in parsedTracker) {
        delete parsedTracker[key]
        sessionStorage.setItem('twitch-app', JSON.stringify(parsedTracker))
    }
}
