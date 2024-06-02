import logo from './../../../images/fallback.png'
import { CLIENT_ID, PORT } from './../../../clientdata/clientdata'
import { useEffect, useState } from 'react'

export const UserIcon = () => {
    const [state, setState] = useState('')
    useEffect(() => {
        let randomState = ''
        for (let i = 0; i < 16; i++) {
            let x = Math.round(Math.random() * 2)
            switch (x) {
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
    return (
        <a
            href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http://localhost:${PORT}&state=${state}&scope=user:read:email`}
            className="rounded-md px-2 pseudo-zinc"
        >
            <img src={logo} alt="Settings" loading="lazy" width={48} />
        </a>
    )
}
