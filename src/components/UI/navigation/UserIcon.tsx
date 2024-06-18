import { ADDRESS, CLIENT_ID } from './../../../clientdata/clientdata'
import { useEffect, useRef, useState } from 'react'
import { getImage } from '../../../helper/getImage'
import { UserProps } from '../../../types/UserProps'
import { getUser } from '../../../helper/getUser'
import SettingsPopup from './SettingsPopup'
import { getRandomChars } from '../../../helper/getRandomChars'

export const UserIcon = () => {
    const [state, setState] = useState('')
    const [user, setUser] = useState<UserProps | null>(() => {
        const storedUser = sessionStorage.getItem('twitch_user')
        return storedUser ? JSON.parse(storedUser) : null
    })
    const [dropdownActive, setDropdownActive] = useState(false)

    const popupRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const settingState = () => {
        const randomState = getRandomChars()
        setState(randomState)
        sessionStorage.setItem('twitch_random_state', randomState)
    }

    const fetchUser = async () => {
        try {
            const data = await getUser(CLIENT_ID)
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
                sessionStorage.removeItem('twitch_logged_in'),
            100
        )
        return () => clearTimeout(timer)
    }, [user])

    const handleButtonClick = () => {
        setDropdownActive((prev) => !prev)
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
    }, [dropdownActive])

    return (
        <>
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
                            popupRef={popupRef}
                            user_display_name={user.display_name}
                            user_profile_image_url={user.profile_image_url}
                        />
                    )}
                </>
            ) : (
                <>
                    <a
                        href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${ADDRESS}&state=${state}&scope=user:read:email`}
                        className="rounded-md px-2 pseudo-zinc"
                        onKeyDown={handleKeyDown}
                        onClick={handleAnchorClick}
                        title="Log in"
                    >
                        <img
                            src={getImage('', 48, 'PROFILE')}
                            alt="Settings"
                            loading="lazy"
                            width={48}
                        />
                    </a>
                    {sessionStorage.getItem('twitch_logged_in') === 'false' && (
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
        </>
    )
}
