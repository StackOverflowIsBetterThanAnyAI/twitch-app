import { FC, useContext, useEffect, useRef, useState } from 'react'
import { ContextLanguage, ContextScreenWidth } from '../../../App'
import ProfilePicture from './ProfilePicture'
import { LANGUAGES } from '../../../constants'
import ButtonApply from './ButtonApply'
import ButtonIcon from '../ButtonIcon'
import Icon from '../Icon'
import { getLanguageIndex } from '../../../helper/getLanguageIndex'
import { getLanguageNameByCode } from '../../../helper/getLanguageNameByCode'

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
    const contextLanguage = useContext(ContextLanguage)
    if (!contextLanguage) {
        throw new Error(
            'ContextLanguage must be used within a ContextLanguage.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [language, setLanguage] = contextLanguage

    const contextScreenWidth = useContext(ContextScreenWidth)
    if (!contextScreenWidth) {
        throw new Error(
            'ContextScreenWidth must be used within a ContextScreenWidth.Provider'
        )
    }
    const [filterLanguageExpanded, setFilterLanguageExpanded] = useState(false)
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
            setDisabledIndex(getLanguageIndex(target.value))
        }
        if (e.key === 'Escape') setFilterLanguageExpanded(false)
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
            setDisabledIndex(getLanguageIndex(selectedValue))
        }
    }

    const handleClickFilterLanguage = () => {
        setFilterLanguageExpanded((prev) => !prev)
    }

    const handleClickBackFromLanguage = () => {
        setFilterLanguageExpanded(false)
    }

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupLanguageRef.current &&
                !popupLanguageRef.current.contains(event.target as Node) &&
                event.key === 'Escape'
            ) {
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
    }, [filterLanguageExpanded])

    return (
        <div
            className="absolute top-16 right-4 bg-zinc-700 outline outline-zinc-900 rounded-md p-2"
            ref={popupRef}
        >
            {filterLanguageExpanded ? (
                <div
                    className="flex flex-col gap-2 h-[30dvh] min-w-44 w-[20vw] max-w-80"
                    ref={popupLanguageRef}
                >
                    <div className="flex flex-row border-b pb-2 items-center justify-between">
                        <ButtonIcon
                            type="Back"
                            ariaLabel="Back to Settings."
                            onClick={handleClickBackFromLanguage}
                            place="left"
                        />
                        <h2 className="text-base lg:text-lg">Language</h2>
                        <Icon
                            type="Country"
                            code={language
                                .replace('en', 'gb')
                                .replace('sv', 'se')}
                            language={getLanguageNameByCode(language)}
                        />
                    </div>
                    <select
                        size={LANGUAGES.length}
                        className="bg-zinc-700 focus-visible:outline focus-visible:outline-1 focus-visible:outline-zinc-50 rounded-md"
                        defaultValue={getLanguageNameByCode(language)}
                        onKeyDown={handleSelectKeyDown}
                        onDoubleClick={handleButtonApplyClick}
                        onChange={handleSelectChange}
                        autoFocus
                        ref={selectLanguageRef}
                    >
                        {LANGUAGES.map((lang) => {
                            const [name, code] = Object.entries(lang)[0]
                            return (
                                <option
                                    key={code}
                                    className={`px-2 py-1 rounded-md ${
                                        code === language
                                            ? 'bg-zinc-600 text-zinc-400'
                                            : 'hover:bg-zinc-800 hover:text-slate-300'
                                    }`}
                                    value={code}
                                    disabled={code === language}
                                >
                                    {name}
                                </option>
                            )
                        })}
                    </select>
                    <ButtonApply
                        handleClick={handleButtonApplyClick}
                        disabled={currentIndex === disabledIndex}
                    >
                        Apply
                    </ButtonApply>
                </div>
            ) : (
                <div className="flex flex-col gap-2 min-w-36 max-w-80">
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
                    </div>
                    <button
                        className="rounded-md p-1 pseudo-zinc w-full flex justify-between gap-4 items-center"
                        onClick={handleClickFilterLanguage}
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
                    <button className="rounded-md p-1 pseudo-zinc w-full flex justify-start gap-2 items-center">
                        <Icon type="Logout" />
                        <h3 className="text-base lg:text-lg">Log out</h3>
                    </button>
                </div>
            )}
        </div>
    )
}

export default SettingsPopup
