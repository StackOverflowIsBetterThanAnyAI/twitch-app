import { FC, useEffect, useState } from 'react'
import { getProfilePicture } from '../helper/getProfilePicture'

import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

import { getImage } from '../helper/getImage'

type StreamProfilePictureProps = {
    screenWidth: 'MOBILE' | 'TABLET' | 'DESKTOP'
    user_id: string
    user_name: string
}

const StreamProfilePicture: FC<StreamProfilePictureProps> = ({
    screenWidth,
    user_id,
    user_name,
}) => {
    const [imageUrl, setImageUrl] = useState<string>('')

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const data = await getProfilePicture(
                    CLIENT_ID,
                    CLIENT_SECRET,
                    user_id
                )
                if (!data) {
                    throw new Error()
                } else setImageUrl(data)
            } catch (error: any) {}
        }
        fetchImageUrl()

        return () => {}
    }, [user_id])

    const imageWidth = (() => {
        switch (screenWidth) {
            case 'MOBILE':
                return 40
            case 'TABLET':
                return 48
            case 'DESKTOP':
                return 54
        }
    })()

    return (
        <img
            src={getImage(imageUrl, { size: screenWidth }, 'PROFILE')}
            alt={user_name}
            title={user_name}
            className="rounded-full p-1 col-span-1 mx-auto"
            width={imageWidth}
            loading="lazy"
        />
    )
}

export default StreamProfilePicture
