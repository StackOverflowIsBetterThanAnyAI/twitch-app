import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useRef,
    useState,
} from 'react'
import SettingsPopup from './SettingsPopup'
import { UserProps } from '../../../types/UserProps'
import { getImage } from '../../../helper/getImage'
import { getRandomChars } from '../../../helper/getRandomChars'
import { getUser } from '../../../helper/getUser'
import { useCloseUserIcon } from '../../../hooks/useCloseUserIcon'
import { useGetAuthUrl } from '../../../hooks/useGetAuthUrl'
import { useLogUserOut } from '../../../hooks/useLogUserOut'
import { useSetRedirectUrl } from '../../../hooks/useSetRedirectUrl'

export const ContextFilterLanguageExpanded = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

type UserIconProps = {
    anchorRef: React.RefObject<HTMLButtonElement>
    buttonRef: React.RefObject<HTMLButtonElement>
}

export const UserIcon: FC<UserIconProps> = ({ anchorRef, buttonRef }) => {
    const [filterLanguageExpanded, setFilterLanguageExpanded] = useState(false)
    const [state, setState] = useState('')
    const [user, setUser] = useState<UserProps | null>(() => {
        const storedUser = sessionStorage.getItem('twitch_user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [dropdownActive, setDropdownActive] = useState(false)
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

    const popupRef = useRef<HTMLDivElement | null>(null)

    const settingState = () => {
        const randomState = getRandomChars()
        setState(randomState)
        sessionStorage.setItem('twitch_random_state', randomState)
    }

    const fetchUser = async () => {
        try {
            const data = await getUser()
            if (!data) {
                throw new Error('Unable to fetch the currently logged in user')
            }
            setUser(data)
            sessionStorage.setItem('twitch_user', JSON.stringify(data))
        } catch (error: any) {
            console.error(
                'The following error occured while fetching the currently logged in user',
                error
            )
        }
    }

    const handleAnchorClick = () => {
        settingState()
        sessionStorage.setItem('twitch_logged_in', 'true')
    }

    useLogUserOut(fetchUser, user)

    const handleButtonClick = () => {
        setDropdownActive((prev) => !prev)
        setFilterLanguageExpanded(false)
    }

    const closeDropdown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape') {
            e.stopPropagation()
            setDropdownActive(false)
            buttonRef?.current?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ') {
            const target = e.target as HTMLElement
            target.click()
            e.preventDefault()
            settingState()
        }
    }

    useGetAuthUrl(setRedirectUrl, state)
    useSetRedirectUrl(redirectUrl || '')

    useCloseUserIcon(
        buttonRef,
        dropdownActive,
        filterLanguageExpanded,
        popupRef,
        setDropdownActive,
        setFilterLanguageExpanded
    )

    return (
        <>
            <ContextFilterLanguageExpanded.Provider
                value={[filterLanguageExpanded, setFilterLanguageExpanded]}
            >
                {user?.profile_image_url ? (
                    <>
                        <button
                            className="rounded-md px-2 pseudo-zinc navigation"
                            onClick={handleButtonClick}
                            ref={buttonRef}
                        >
                            <img
                                src={getImage(
                                    user?.profile_image_url || '',
                                    48,
                                    'PROFILE'
                                )}
                                alt="Settings"
                                title="Settings"
                                loading="lazy"
                                width={48}
                                className="rounded-full"
                            />
                        </button>
                        {dropdownActive && (
                            <SettingsPopup
                                handleButtonKeyDown={closeDropdown}
                                popupRef={popupRef}
                                user_display_name={user.display_name}
                                user_profile_image_url={user.profile_image_url}
                                userIsPartner={
                                    user.broadcaster_type === 'partner'
                                }
                            />
                        )}
                    </>
                ) : (
                    <>
                        <button
                            className="rounded-md px-2 pseudo-zinc navigation"
                            onKeyDown={handleKeyDown}
                            onClick={handleAnchorClick}
                            ref={anchorRef}
                            data-testid="navigation-login-button"
                        >
                            <img
                                src={getImage(
                                    user?.profile_image_url || '',
                                    48,
                                    'PROFILE'
                                )}
                                alt="Log in"
                                title="Log in"
                                loading="lazy"
                                width={48}
                                className="rounded-full"
                            />
                        </button>
                    </>
                )}
            </ContextFilterLanguageExpanded.Provider>
        </>
    )
}
