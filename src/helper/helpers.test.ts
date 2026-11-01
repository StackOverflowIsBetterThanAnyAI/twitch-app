import { createStream } from '../testUtils'
import { getFormattedNumber } from './getFormattedNumber'
import { getImage } from './getImage'
import { getSearchFilter } from './getSearchFilter'

describe('getFormattedNumber', () => {
    it.each([
        [999, 999],
        [1500, '1.50k'],
        [2_345_678, '2.35m'],
    ])('formats %s as %s', (input, expected) => {
        expect(getFormattedNumber(input)).toBe(expected)
    })
})

describe('getSearchFilter', () => {
    const streamData = {
        data: [
            createStream(0, {
                user_name: 'Gorgc',
                game_name: 'Dota 2',
                tags: ['English'],
            }),
            createStream(1, {
                user_name: 'Shroud',
                game_name: 'Counter Strike',
                tags: ['FPS'],
            }),
        ],
    }

    it('matches user names, games, titles and tags ignoring case and spaces', () => {
        expect(getSearchFilter('dota2', streamData)).toHaveLength(1)
        expect(getSearchFilter('counter strike', streamData)).toHaveLength(1)
        expect(getSearchFilter('fps', streamData)).toHaveLength(1)
        expect(getSearchFilter('title', streamData)).toHaveLength(2)
    })

    it('only matches user names when searching for a channel', () => {
        expect(getSearchFilter('dota', streamData, true)).toHaveLength(0)
        expect(getSearchFilter('gorgc', streamData, true)).toHaveLength(1)
    })

    it('returns undefined without stream data', () => {
        expect(getSearchFilter('dota', undefined)).toBeUndefined()
    })
})

describe('getImage', () => {
    it('uses the fallback for unknown profile picture hosts', () => {
        expect(getImage('https://example.com/a.png', 48, 'PROFILE')).not.toBe(
            'https://example.com/a.png'
        )
        expect(
            getImage(
                'https://static-cdn.jtvnw.net/jtv_user_pictures/a.png',
                48,
                'PROFILE'
            )
        ).toBe('https://static-cdn.jtvnw.net/jtv_user_pictures/a.png')
    })

    it('replaces the thumbnail size placeholders', () => {
        const url = getImage(
            'https://static-cdn.jtvnw.net/previews-ttv/live_user_a-{width}x{height}.jpg',
            { size: 'DESKTOP' },
            'THUMBNAIL'
        )
        expect(url).toMatch(/live_user_a-384x216\.jpg&cacheBuster=\d+$/)
    })

    it('returns the same thumbnail url for re-renders within the refresh interval', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-11-01T00:00:00Z'))
        const thumbnail =
            'https://static-cdn.jtvnw.net/previews-ttv/live_user_a-{width}x{height}.jpg'

        const first = getImage(thumbnail, { size: 'MOBILE' }, 'THUMBNAIL')
        vi.advanceTimersByTime(60_000)
        const second = getImage(thumbnail, { size: 'MOBILE' }, 'THUMBNAIL')
        vi.advanceTimersByTime(120_000)
        const third = getImage(thumbnail, { size: 'MOBILE' }, 'THUMBNAIL')

        expect(second).toBe(first)
        expect(third).not.toBe(first)
        vi.useRealTimers()
    })
})
