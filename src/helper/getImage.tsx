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

    const sizesProfile = {
        MOBILE: {
            height: '32',
            width: '32',
        },
        TABLET: {
            height: '48',
            width: '48',
        },
        DESKTOP: {
            height: '64',
            width: '64',
        },
    }

    const outputSize = type === 'THUMBNAIL' ? sizesThumbnail : sizesProfile

    return url
        .replace('{height}', outputSize[size.size].height)
        .replace('{width}', outputSize[size.size].width)
}
