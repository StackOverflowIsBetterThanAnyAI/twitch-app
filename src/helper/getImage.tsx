import { ScreenSizeProps } from '../types/ScreenSizeProps'

import fallbackImage from './../fallback.png'
import fallbackThumbnailImage from './../fallbackThumbnail.png'

export const getImage = (
    url: string,
    size: ScreenSizeProps,
    type: 'THUMBNAIL' | 'PROFILE'
): string => {
    const sizesThumbnail = {
        MOBILE: {
            height: '180',
            width: '320',
        },
        TABLET: {
            height: '180',
            width: '320',
        },
        DESKTOP: {
            height: '180',
            width: '320',
        },
    }

    if (type === 'PROFILE') {
        return url.startsWith('https://static-cdn.jtvnw.net/jtv_user_pictures/')
            ? url
            : fallbackImage
    }
    return url.startsWith(
        'https://static-cdn.jtvnw.net/previews-ttv/live_user_'
    )
        ? url
              .replace('{height}', sizesThumbnail[size.size].height)
              .replace('{width}', sizesThumbnail[size.size].width)
        : fallbackThumbnailImage
}
