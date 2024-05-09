import { ScreenSizeProps } from '../types/ScreenSizeProps'

export const getImage = (url: string, size: ScreenSizeProps) => {
    const sizes = {
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

    return url
        .replace('{height}', sizes[size.size].height)
        .replace('{width}', sizes[size.size].width)
}
