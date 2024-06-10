import { FC } from 'react'

type SettingsPopupProps = {
    popupRef: React.MutableRefObject<HTMLDivElement | null>
}

const SettingsPopup: FC<SettingsPopupProps> = ({ popupRef }) => {
    return (
        <div
            className="absolute top-16 right-4 bg-zinc-700 outline outline-zinc-900 rounded-md p-2"
            ref={popupRef}
        >
            <div className="flex flex-col gap-2 items-start">
                <button className="rounded-md px-2 py-1 pseudo-zinc">
                    Filter Language
                </button>
                <button className="rounded-md px-2 py-1 pseudo-zinc">
                    Abmelden
                </button>
            </div>
        </div>
    )
}

export default SettingsPopup
