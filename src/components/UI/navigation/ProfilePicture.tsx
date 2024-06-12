import { FC, useContext } from 'react'
import { ContextScreenWidth } from '../../../App'
import { getImage } from '../../../helper/getImage'

type ProfilePictureProps = {
    user_display_name: string
    user_profile_image_url: string
}

const ProfilePicture: FC<ProfilePictureProps> = ({
    user_display_name,
    user_profile_image_url,
}) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
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
            src={getImage(
                user_profile_image_url,
                { size: contextScreenWidth },
                'PROFILE'
            )}
            alt={user_display_name}
            title={user_display_name}
            className="rounded-full p-1"
            width={imageWidth}
            loading="lazy"
        />
    )
}

export default ProfilePicture
