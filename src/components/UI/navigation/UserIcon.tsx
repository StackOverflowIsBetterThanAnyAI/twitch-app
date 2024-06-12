import { ADDRESS, CLIENT_ID } from './../../../clientdata/clientdata'
import { useContext, useEffect, useRef, useState } from 'react'
import { getImage } from '../../../helper/getImage'
import { UserProps } from '../../../types/UserProps'
import { getUser } from '../../../helper/getUser'
import SettingsPopup from './SettingsPopup'
import { ContextLoggedIn } from '../../../App'

export const UserIcon = () => {
    const contextLoggedIn = useContext(ContextLoggedIn)
    if (!contextLoggedIn) {
        throw new Error(
            'ContextLoggedIn must be used within a ContextLoggedIn.Provider'
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedIn, setLoggedIn] = contextLoggedIn

    const [state, setState] = useState('')
    const [user, setUser] = useState<UserProps | null>(null)
    const [dropdownActive, setDropdownActive] = useState(false)

    const popupRef = useRef<HTMLDivElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    // should only be executed on mount when the user is not logged in
    // otherwise the states cannot be compared

    const settingState = () => {
        let randomState = ''
        for (let i = 0; i < 16; i++) {
            let char = Math.round(Math.random() * 2)
            switch (char) {
                case 0:
                    randomState += String.fromCharCode(Math.random() * 10 + 48)
                    break
                case 1:
                    randomState += String.fromCharCode(Math.random() * 26 + 65)
                    break
                case 2:
                    randomState += String.fromCharCode(Math.random() * 26 + 97)
                    break
            }
        }
        setState(randomState)
    }

    // is only executed when the user is not logged in and the button is pressed
    // ! or when the button has been pressed and the user is logged in !
    const fetchUser = async () => {
        try {
            const data = await getUser(CLIENT_ID)
            setUser(data)
            if (!data)
                throw new Error('Unable to fetch the currently logged in user')
        } catch (error: any) {
            console.error(
                'The following error occured while fetching the currently logged in user',
                error
            )
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

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

        const handleEscape = (event: KeyboardEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                event.key === 'Escape'
            ) {
                setDropdownActive(false)
            }
        }

        if (dropdownActive) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleEscape)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
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
                <a
                    href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${ADDRESS}&state=${state}&scope=user:read:email`}
                    className="rounded-md px-2 pseudo-zinc"
                    onKeyDown={handleKeyDown}
                    onClick={settingState}
                >
                    <img
                        src={getImage('', 48, 'PROFILE')}
                        alt="Settings"
                        loading="lazy"
                        width={48}
                    />
                </a>
            )}
        </>
    )
}
