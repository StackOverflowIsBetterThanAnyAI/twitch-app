import { CLIENT_ID, PORT } from './../../../clientdata/clientdata'
import { useEffect, useState } from 'react'
import { getImage } from '../../../helper/getImage'
import { UserProps } from '../../../types/UserProps'
import { getUser } from '../../../helper/getUser'

export const UserIcon = () => {
    const [state, setState] = useState('')
    const [user, setUser] = useState<UserProps | null>(null)
    const [dropdownActive, setDropdownActive] = useState(false)

    useEffect(() => {
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
    }, [])

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

    const handleClick = () => {
        setDropdownActive((prev) => !prev)
    }

    return (
        <>
            {user?.profile_image_url ? (
                <>
                    <button
                        className="rounded-md px-2 pseudo-zinc"
                        onClick={handleClick}
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
                        <div className="absolute top-16 right-4 bg-zinc-700 outline outline-zinc-900 rounded-md p-2">
                            <div className="flex flex-col gap-4">
                                <button className="rounded-md m-auto px-2 pseudo-zinc">
                                    Filter Language
                                </button>
                                <button className="rounded-md m-auto px-2 pseudo-zinc">
                                    Filter Language
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <a
                    href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http://localhost:${PORT}&state=${state}&scope=user:read:email`}
                    className="rounded-md px-2 pseudo-zinc"
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
