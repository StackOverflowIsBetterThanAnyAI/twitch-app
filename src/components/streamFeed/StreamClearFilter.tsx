import ButtonIcon from '../UI/ButtonIcon'

type StreamClearFilterProps = {
    onClick: () => void
    onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>
}

const StreamClearFilter = ({ onClick, onKeyDown }: StreamClearFilterProps) => {
    return (
        <>
            <div className="flex items-center mx-0 lg:mx-4 py-2 border-b-2 border-slate-300/25">
                <h2 className="text-lg lg:text-xl text-slate-300 pr-2">
                    Clear filter:
                </h2>
                <ButtonIcon
                    ariaLabel="Remove filter."
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    place="left"
                    secondary
                    type="Remove"
                />
            </div>
        </>
    )
}

export default StreamClearFilter
