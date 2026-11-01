import { StreamProps } from './types/StreamProps'

export const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    })

export const createStream = (
    index: number,
    overrides: Partial<StreamProps['data'][number]> = {}
): StreamProps['data'][number] => ({
    game_id: `${index}`,
    game_name: `Game ${index}`,
    id: `stream-${index}`,
    is_mature: false,
    language: 'en',
    started_at: '2026-11-01T00:00:00Z',
    tag_ids: [],
    tags: ['English'],
    thumbnail_url: `https://static-cdn.jtvnw.net/previews-ttv/live_user_user${index}-{width}x{height}.jpg`,
    title: `Title ${index}`,
    type: 'live',
    user_id: `${index}`,
    user_login: `user${index}`,
    user_name: `User${index}`,
    viewer_count: 1000 - index,
    ...overrides,
})

export const createStreams = (count: number): StreamProps => ({
    data: Array.from({ length: count }, (_, index) => createStream(index)),
})

export const getRequestBody = (call: unknown[]) =>
    JSON.parse(((call[1] as RequestInit | undefined)?.body as string) ?? '{}')
