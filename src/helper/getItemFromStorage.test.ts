import { getItemFromStorage } from './getItemFromStorage'

describe('getItemFromStorage', () => {
    it('returns an empty object for malformed storage content', () => {
        sessionStorage.setItem('twitch-app', '{invalid')
        expect(getItemFromStorage()).toEqual({})

        sessionStorage.setItem('twitch-app', '["a"]')
        expect(getItemFromStorage()).toEqual({})
    })

    it('only keeps profile pictures from the Twitch CDN', () => {
        sessionStorage.setItem(
            'twitch-app',
            JSON.stringify({
                filter: 'abc',
                profile_pictures: {
                    1: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a.png',
                    2: '"><img src=x onerror=alert(1)>',
                    3: 42,
                },
            })
        )

        expect(getItemFromStorage()).toEqual({
            filter: 'abc',
            profile_pictures: {
                1: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a.png',
            },
        })
    })
})
