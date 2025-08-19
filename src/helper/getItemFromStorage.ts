export const getItemFromStorage = () => {
    const storedData = sessionStorage.getItem('twitch-app')
    return storedData ? JSON.parse(storedData) : {}
}
