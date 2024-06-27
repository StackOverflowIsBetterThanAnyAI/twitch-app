import { ADDRESS, CLIENT_ID } from './../../../clientdata/clientdata'
import {
    Dispatch,
    FC,
    SetStateAction,
    createContext,
    useEffect,
    useRef,
    useState,
} from 'react'
import { getImage } from '../../../helper/getImage'
import { UserProps } from '../../../types/UserProps'
import { getUser } from '../../../helper/getUser'
import SettingsPopup from './SettingsPopup'
import { getRandomChars } from '../../../helper/getRandomChars'

export const ContextFilterLanguageExpanded = createContext<
    [boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined)

type UserIconProps = {
    anchorRef: React.RefObject<HTMLAnchorElement>
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

    const popupRef = useRef<HTMLDivElement | null>(null)

    const settingState = () => {
        const randomState = getRandomChars()
        setState(randomState)
        sessionStorage.setItem('twitch_random_state', randomState)
    }

    const fetchUser = async () => {
        try {
            const data = await getUser(CLIENT_ID || '')
            if (!data)
                throw new Error('Unable to fetch the currently logged in user')
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

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('twitch_logged_in')
        isLoggedIn === 'true' && !user && fetchUser()
        const timer = setTimeout(
            () =>
                isLoggedIn === 'false' &&
                (sessionStorage.removeItem('twitch_logged_in'),
                sessionStorage.removeItem('twitch_access_state'),
                sessionStorage.removeItem('twitch_access_token'),
                sessionStorage.removeItem('twitch_user')),
            0
        )
        return () => clearTimeout(timer)
    }, [user])

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === ' ') {
            const target = e.target as HTMLElement
            target.click()
            e.preventDefault()
            settingState()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownActive(false)
                setFilterLanguageExpanded(false)
            }
        }

        if (dropdownActive) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [buttonRef, dropdownActive])

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !filterLanguageExpanded
            ) {
                setDropdownActive(false)
            }
        }

        if (dropdownActive && !filterLanguageExpanded) {
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [dropdownActive, filterLanguageExpanded])

    return (
        <>
            <ContextFilterLanguageExpanded.Provider
                value={[filterLanguageExpanded, setFilterLanguageExpanded]}
            >
                {user?.profile_image_url ? (
                    <>
                        <button
                            className="rounded-md px-2 pseudo-zinc"
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
                        <a
                            href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${
                                CLIENT_ID || ''
                            }&redirect_uri=${
                                ADDRESS || 'http://localhost:3000'
                            }&state=${state}&scope=user:read:email`}
                            className="rounded-md px-2 pseudo-zinc"
                            onKeyDown={handleKeyDown}
                            onClick={handleAnchorClick}
                            title="Log in"
                            ref={anchorRef}
                        >
                            <img
                                src={getImage('', 48, 'PROFILE')}
                                alt="Settings"
                                loading="lazy"
                                width={48}
                            />
                        </a>
                        {sessionStorage.getItem('twitch_logged_in') ===
                            'false' && (
                            <div
                                className={`absolute top-16 right-4 bg-zinc-700 p-2 border-2 border-zinc-50 animate-fadeOut`}
                            >
                                <h2 className="text-base lg:text-lg">
                                    Login failed.
                                </h2>
                                <h3 className="text-sm lg:text-base">
                                    Please try again later.
                                </h3>
                            </div>
                        )}
                    </>
                )}
            </ContextFilterLanguageExpanded.Provider>
        </>
    )
}
