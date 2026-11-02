export const getItemFromStorage = () => {
    const storedData = sessionStorage.getItem('twitch-app')
    if (!storedData) {
        return {}
    }

    try {
        const parsedData = JSON.parse(storedData)
        if (!parsedData || typeof parsedData !== 'object') {
            return {}
        }

        const trustedProfilePrefix =
            'https://static-cdn.jtvnw.net/jtv_user_pictures/'
        const profilePictures =
            parsedData.profile_pictures &&
            typeof parsedData.profile_pictures === 'object'
                ? Object.fromEntries(
                      Object.entries(parsedData.profile_pictures).filter(
                          ([, value]) =>
                              typeof value === 'string' &&
                              value.startsWith(trustedProfilePrefix)
                      )
                  )
                : {}

        return {
            ...parsedData,
            profile_pictures: profilePictures,
        }
    } catch {
        return {}
    }
}
