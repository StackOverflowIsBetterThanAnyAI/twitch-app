export const setItemInStorage = (key: string, value: any) => {
    const storage = sessionStorage.getItem('twitch-app')
    const parsedTracker = storage ? JSON.parse(storage) : {}
    parsedTracker[key] = value
    sessionStorage.setItem('twitch-app', JSON.stringify(parsedTracker))
}
