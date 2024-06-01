import { FC } from 'react'
import logo from './../../../images/fallback.png'

type UserIconProps = {
    screenWidth: 'MOBILE' | 'TABLET_SMALL' | 'TABLET' | 'DESKTOP'
}

export const UserIcon: FC<UserIconProps> = ({ screenWidth }) => {
    return (
        <button className="rounded-md px-2 pseudo-zinc">
            <img src={logo} alt="Settings" loading="lazy" width={48} />
        </button>
    )
}
