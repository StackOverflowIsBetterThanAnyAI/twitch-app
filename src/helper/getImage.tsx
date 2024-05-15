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
            height: '162',
            width: '288',
        },
        DESKTOP: {
            height: '198',
            width: '352',
        },
    }

    return type === 'PROFILE'
        ? url
        : url
              .replace('{height}', sizesThumbnail[size.size].height)
              .replace('{width}', sizesThumbnail[size.size].width)
}
