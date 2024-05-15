import { FC, useEffect, useState } from 'react'
import { getProfilePicture } from '../helper/getProfilePicture'
import { CLIENT_ID, CLIENT_SECRET } from '../clientdata/clientdata'

import fallbackImage from './../fallback.png'
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
    const [imageUrl, setImageUrl] = useState<string>(fallbackImage)

    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const data = await getProfilePicture(
                    CLIENT_ID,
                    CLIENT_SECRET,
                    user_id
                )
                if (!data) throw new Error(`no profile picture for ${user_id}`)
                setImageUrl(data)
            } catch (error) {
                console.error('Error fetching a user profile picture:', error)
            }
        }
        fetchImageUrl()
    })

    const imageWidth = (() => {
        switch (screenWidth) {
            case 'MOBILE':
                return 32
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
            className="rounded-full"
            width={imageWidth}
        />
    )
}

export default StreamProfilePicture
