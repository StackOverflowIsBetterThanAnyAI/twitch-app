import { FC, useContext, useEffect, useState } from 'react'

import {
    ContextDisableFocusTrap,
    ContextFilteredStreamData,
    ContextScreenWidth,
    ContextSearchResults,
    ContextSearchText,
    ContextSEOSearchText,
    ContextStreamData,
} from '../../App'
import { getImage } from '../../helper/getImage'
import { getProfilePicture } from '../../helper/getProfilePicture'
import { getSearchFilter } from '../../helper/getSearchFilter'
import { setItemInStorage } from '../../helper/setItemInStorage'

type StreamProfilePictureProps = {
    isHeroPicture?: boolean
    testid?: string
    user_id: string
    user_name: string
}

const StreamProfilePicture: FC<StreamProfilePictureProps> = ({
    isHeroPicture,
    testid,
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

    const contextStreamData = useContext(ContextStreamData)
    if (!contextStreamData) {
        throw new Error(
            'ContextStreamData must be used within a ContextStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [streamData, _setStreamData] = contextStreamData

    const contextFilteredStreamData = useContext(ContextFilteredStreamData)
    if (!contextFilteredStreamData) {
        throw new Error(
            'ContextFilteredStreamData must be used within a ContextFilteredStreamData.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_filteredStreamData, setFilteredStreamData] =
        contextFilteredStreamData

    const contextSearchText = useContext(ContextSearchText)
    if (!contextSearchText) {
        throw new Error(
            'ContextSearchText must be used within a ContextSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_searchText, setSearchText] = contextSearchText

    const contextSEOSearchText = useContext(ContextSEOSearchText)
    if (!contextSEOSearchText) {
        throw new Error(
            'ContextSEOSearchText must be used within a ContextSEOSearchText.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_seoSearchText, setSEOSearchText] = contextSEOSearchText

    const contextDisableFocusTrap = useContext(ContextDisableFocusTrap)
    if (!contextDisableFocusTrap) {
        throw new Error(
            'ContextDisableFocusTrap must be used within a ContextDisableFocusTrap.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_focusTrapDisabled, setFocusTrapDisabled] = contextDisableFocusTrap

    const contextSearchResults = useContext(ContextSearchResults)
    if (!contextSearchResults) {
        throw new Error(
            'ContextSearchResults must be used within a ContextSearchResults.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_searchResults, setSearchResults] = contextSearchResults

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

    const handleClick = () => {
        setFilteredStreamData({
            data: getSearchFilter(user_name, streamData, true)!,
        })
        setSearchText(user_name)
        setSEOSearchText(user_name)
        setItemInStorage('filter', user_name)
        setFocusTrapDisabled(true)
        setSearchResults([])
    }

    const heroImageWidth = (() => {
        switch (contextScreenWidth) {
            case 'MOBILE':
            case 'TABLET_SMALL':
                return 64
            case 'TABLET':
                return 80
            case 'DESKTOP':
                return 96
        }
    })()

    const imageWidth = (() => {
        switch (contextScreenWidth) {
            case 'MOBILE':
            case 'TABLET_SMALL':
                return 48
            case 'TABLET':
                return 52
            case 'DESKTOP':
                return 54
        }
    })()

    return (
        <button
            className="h-fit flex-shrink-0 rounded-full pseudo-zinc"
            onClick={handleClick}
        >
            <img
                src={getImage(
                    imageUrl,
                    { size: contextScreenWidth },
                    'PROFILE'
                )}
                alt={user_name}
                title={user_name}
                className="rounded-full col-span-1 mx-auto"
                style={{
                    width: `${isHeroPicture ? heroImageWidth : imageWidth}px`,
                }}
                loading="lazy"
                data-testid={testid}
            />
        </button>
    )
}

export default StreamProfilePicture
