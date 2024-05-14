import { ScreenSizeProps } from '../types/ScreenSizeProps'

export const getImage = (
    url: string,
    size: ScreenSizeProps,
    type: 'THUMBNAIL' | 'PROFILE'
) => {
    const sizesThumbnail = {
        MOBILE: {
            height: '153',
            width: '272',
        },
        TABLET: {
            height: '198',
            width: '352',
        },
        DESKTOP: {
            height: '405',
            width: '720',
        },
    }

    return type === 'PROFILE'
        ? url
        : url
              .replace('{height}', sizesThumbnail[size.size].height)
              .replace('{width}', sizesThumbnail[size.size].width)
}
