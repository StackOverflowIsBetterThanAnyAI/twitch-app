import { FC, useContext, useEffect, useState } from 'react'
import { getProfilePicture } from '../../helper/getProfilePicture'

import { getImage } from '../../helper/getImage'
import { ContextScreenWidth } from '../../App'

type StreamProfilePictureProps = {
    user_id: string
    user_name: string
}

const StreamProfilePicture: FC<StreamProfilePictureProps> = ({
    user_id,
    user_name,
}) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
    const [imageUrl, setImageUrl] = useState<string>('')

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const data = await getProfilePicture(user_id || '')
                if (!data) {
                    throw new Error()
                } else setImageUrl(data)
            } catch (error: any) {}
        }
        fetchImageUrl()

        return () => {}
    }, [user_id])

    const imageWidth = (() => {
        switch (contextScreenWidth) {
            case 'MOBILE':
                return 40
            case 'TABLET_SMALL':
                return 48
            case 'TABLET':
                return 48
            case 'DESKTOP':
                return 54
        }
    })()

    return (
        <img
            src={getImage(imageUrl, { size: contextScreenWidth }, 'PROFILE')}
            alt={user_name}
            title={user_name}
            className="rounded-full p-1 col-span-1 mx-auto"
            width={imageWidth}
            loading="lazy"
        />
    )
}

export default StreamProfilePicture
