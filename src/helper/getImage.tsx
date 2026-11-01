import { ScreenSizeProps } from '../types/ScreenSizeProps'

import fallbackImage from './../images/fallback.png'
import fallbackThumbnailImage from './../images/fallbackThumbnail.png'

export const getImage = (
    url: string,
    size: ScreenSizeProps | number,
    type: 'THUMBNAIL' | 'PROFILE'
): string => {
    // changes with every stream refresh (2 minutes) so re-renders reuse the cached thumbnail
    const cacheBuster = Math.floor(Date.now() / 120000)
    const sizesThumbnail = {
        MOBILE: {
            height: '189',
            width: '336',
        },
        TABLET_SMALL: {
            height: '162',
            width: '288',
        },
        TABLET: {
            height: '243',
            width: '432',
        },
        DESKTOP: {
            height: '216',
            width: '384',
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
        ? `${url
              .replace(
                  '{height}',
                  typeof size === 'number'
                      ? size.toString()
                      : sizesThumbnail[size.size].height
              )
              .replace(
                  '{width}',
                  typeof size === 'number'
                      ? size.toString()
                      : sizesThumbnail[size.size].width
              )}${type === 'THUMBNAIL' ? `&cacheBuster=${cacheBuster}` : ''}`
        : fallbackThumbnailImage
}
