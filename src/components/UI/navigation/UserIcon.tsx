import logo from './../../../images/fallback.png'
import { CLIENT_ID } from './../../../clientdata/clientdata'

export const UserIcon = () => {
    return (
        <a
            href={`https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=http://localhost&scope=user:read:email`}
            className="rounded-md px-2 pseudo-zinc"
        >
            <img src={logo} alt="Settings" loading="lazy" width={48} />
        </a>
    )
}
