import { FC, useContext, useState } from 'react'
import { ContextScreenWidth } from '../../../App'
import ProfilePicture from './ProfilePicture'

type SettingsPopupProps = {
    popupRef: React.MutableRefObject<HTMLDivElement | null>
    user_display_name: string
    user_profile_image_url: string
}

const SettingsPopup: FC<SettingsPopupProps> = ({
    popupRef,
    user_display_name,
    user_profile_image_url,
}) => {
    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
    const [filterLanguageExpanded, setFilterLanguageExpanded] = useState(false)

    const handleClickFilterLanguage = () => {
        setFilterLanguageExpanded((prev) => !prev)
    }

    return (
        <div
            className="absolute top-16 right-4 bg-zinc-700 outline outline-zinc-900 rounded-md p-2"
            ref={popupRef}
        >
            {filterLanguageExpanded ? (
                <>
                    <label>Language</label>
                    <select></select>
                </>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row border-b pb-2 items-center">
                        <ProfilePicture
                            user_display_name={user_display_name}
                            user_profile_image_url={user_profile_image_url}
                        />
                        <h2 className="text-base lg:text-lg px-2">
                            {user_display_name}
                        </h2>
                    </div>
                    <button
                        className="rounded-md px-2 py-1 pseudo-zinc w-full flex justify-between gap-2 items-center"
                        onClick={handleClickFilterLanguage}
                    >
                        <h3 className="text-base lg:text-lg">
                            Filter Language
                        </h3>
                        <span>X</span>
                    </button>
                    <button className="rounded-md px-2 py-1 pseudo-zinc w-full flex justify-between gap-2 items-center">
                        <h3 className="text-base lg:text-lg">Log out</h3>
                        <span>X</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default SettingsPopup
