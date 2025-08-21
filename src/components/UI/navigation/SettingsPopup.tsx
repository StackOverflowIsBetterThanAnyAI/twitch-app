import { FC, useContext, useEffect, useRef, useState } from 'react'
import {
    ContextLanguage,
    ContextSEOSearchText,
    ContextScreenWidth,
    ContextSearchText,
} from '../../../App'
import { ContextFilterLanguageExpanded } from './UserIcon'
import { LANGUAGES } from '../../../constants'
import FilterLanguagePopup from './FIlterLanguagePopup'
import Icon from '../Icon'
import ProfilePicture from './ProfilePicture'
import { getLanguageIndex } from '../../../helper/getLanguageIndex'
import { removeItemFromStorage } from '../../../helper/removeItemFromStorage'
import { setItemInStorage } from '../../../helper/setItemInStorage'

type SettingsPopupProps = {
    handleButtonKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void
    popupRef: React.MutableRefObject<HTMLDivElement | null>
    userIsPartner: boolean
    user_display_name: string
    user_profile_image_url: string
}

const SettingsPopup: FC<SettingsPopupProps> = ({
    handleButtonKeyDown,
    popupRef,
    userIsPartner,
    user_display_name,
    user_profile_image_url,
}) => {
    const contextLanguage = useContext(ContextLanguage)
    if (!contextLanguage) {
        throw new Error(
            'ContextLanguage must be used within a ContextLanguage.Provider'
        )
    }
    const [language, setLanguage] = contextLanguage

    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }

    const contextFilterLanguageExpanded = useContext(
        ContextFilterLanguageExpanded
    )
    if (!contextFilterLanguageExpanded) {
        throw new Error(
            'ContextFilterLanguageExpanded must be used within a ContextFilterLanguageExpanded.Provider'
        )
    }
    const [filterLanguageExpanded, setFilterLanguageExpanded] =
        contextFilterLanguageExpanded

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

    const [currentIndex, setCurrentIndex] = useState<number>(
        getLanguageIndex(language) === 0 ? 1 : 0
    )
    const [disabledIndex, setDisabledIndex] = useState(
        getLanguageIndex(language)
    )

    const popupLanguageRef = useRef<HTMLDivElement | null>(null)
    const selectLanguageRef = useRef<HTMLSelectElement | null>(null)

    const handleSelectKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
        let newIndex = currentIndex
        if (e.key === ' ' || e.key === 'Enter') {
            const target = e.target as HTMLSelectElement
            setLanguage(target.value)
            setItemInStorage('twitch_filtered_language', target.value)
            setDisabledIndex(getLanguageIndex(target.value))
            setSEOSearchText('')
            setItemInStorage('filter', '')
            setSearchText('')
        }
        if (e.key === 'Escape') {
            e.stopPropagation()
            setFilterLanguageExpanded(false)
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (currentIndex === LANGUAGES.length - 1) {
                if (0 === disabledIndex) {
                    newIndex = 1
                } else {
                    newIndex = 0
                }
            } else if (
                currentIndex === LANGUAGES.length - 2 &&
                disabledIndex === LANGUAGES.length - 1
            ) {
                newIndex = 0
            } else if (disabledIndex === currentIndex + 1) {
                newIndex = currentIndex + 2
            } else {
                newIndex = currentIndex + 1
            }
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (currentIndex === 0) {
                if (LANGUAGES.length - 1 === disabledIndex) {
                    newIndex = LANGUAGES.length - 2
                } else {
                    newIndex = LANGUAGES.length - 1
                }
            } else if (currentIndex === 1 && disabledIndex === 0) {
                newIndex = LANGUAGES.length - 1
            } else if (disabledIndex === currentIndex - 1) {
                newIndex = currentIndex - 2
            } else {
                newIndex = currentIndex - 1
            }
        }

        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex)
            if (selectLanguageRef.current) {
                selectLanguageRef.current.selectedIndex = newIndex
            }
        }
    }

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedIndex = event.target.selectedIndex
        setCurrentIndex(selectedIndex)
    }

    const handleButtonApplyClick = () => {
        if (selectLanguageRef.current) {
            const selectedValue = selectLanguageRef.current.value
            setLanguage(selectedValue)
            setItemInStorage('twitch_filtered_language', selectedValue)
            setDisabledIndex(getLanguageIndex(selectedValue))
            setSEOSearchText('')
            setItemInStorage('filter', '')
            setSearchText('')
        }
    }

    const handleClickFilterLanguage = () => {
        setFilterLanguageExpanded((prev) => !prev)
    }

    const handleClickBackFromLanguage = () => {
        setFilterLanguageExpanded(false)
    }

    const handleLogout = () => {
        removeItemFromStorage('twitch_access_state')
        removeItemFromStorage('twitch_access_token')
        removeItemFromStorage('twitch_logged_in')
        removeItemFromStorage('twitch_user')
        window.location.reload()
    }

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupLanguageRef.current &&
                !popupLanguageRef.current.contains(event.target as Node) &&
                filterLanguageExpanded &&
                event.key === 'Escape'
            ) {
                event.stopPropagation()
                setFilterLanguageExpanded(false)
            }
        }

        if (filterLanguageExpanded) {
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [filterLanguageExpanded, setFilterLanguageExpanded])

    useEffect(() => {
        if (filterLanguageExpanded) return

        const buttons = popupRef.current?.querySelectorAll('button')
        if (!buttons || buttons.length === 0) return

        const firstButton = buttons[0]
        const lastButton = buttons[buttons.length - 1]

        const handleFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return

            if (e.shiftKey) {
                if (document.activeElement === firstButton) {
                    e.preventDefault()
                    lastButton.focus()
                }
            } else {
                if (document.activeElement === lastButton) {
                    e.preventDefault()
                    firstButton.focus()
                }
            }
        }

        document.addEventListener('keydown', handleFocusTrap)

        return () => {
            document.removeEventListener('keydown', handleFocusTrap)
        }
    }, [filterLanguageExpanded, popupRef])

    return (
        <div
            className="absolute top-16 right-4 bg-zinc-700 outline outline-zinc-900 rounded-md p-2"
            ref={popupRef}
        >
            {filterLanguageExpanded ? (
                <FilterLanguagePopup
                    currentIndex={currentIndex}
                    disabledIndex={disabledIndex}
                    handleButtonApplyClick={handleButtonApplyClick}
                    handleClickBackFromLanguage={handleClickBackFromLanguage}
                    handleSelectChange={handleSelectChange}
                    handleSelectKeyDown={handleSelectKeyDown}
                    popupLanguageRef={popupLanguageRef}
                    selectLanguageRef={selectLanguageRef}
                />
            ) : (
                <div className="flex flex-col gap-2 min-w-36 max-w-72">
                    <div className="flex border-b pb-2 items-center gap-2">
                        <ProfilePicture
                            user_display_name={user_display_name}
                            user_profile_image_url={user_profile_image_url}
                        />
                        <h2
                            className="text-base lg:text-lg font-medium text-ellipsis overflow-hidden"
                            title={user_display_name}
                        >
                            {user_display_name}
                        </h2>
                        {userIsPartner && <Icon type="Partner" />}
                    </div>
                    <button
                        className="rounded-md p-1 pseudo-zinc w-full flex justify-between gap-4 items-center"
                        onClick={handleClickFilterLanguage}
                        onKeyDown={handleButtonKeyDown}
                        autoFocus
                    >
                        <div className="flex flex-row justify-start items-center gap-2">
                            <Icon type="Language" />
                            <h3 className="text-base lg:text-lg">
                                Filter Language
                            </h3>
                        </div>
                        <Icon type="Expand" />
                    </button>
                    <button
                        className="rounded-md p-1 pseudo-zinc w-full flex justify-start gap-2 items-center"
                        onClick={handleLogout}
                        onKeyDown={handleButtonKeyDown}
                    >
                        <Icon type="Logout" />
                        <h3 className="text-base lg:text-lg">Log out</h3>
                    </button>
                </div>
            )}
        </div>
    )
}

export default SettingsPopup
