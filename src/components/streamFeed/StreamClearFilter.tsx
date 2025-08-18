import ButtonIcon from '../UI/ButtonIcon'

type StreamClearFilterProps = {
    removeFilter: () => void
}

const StreamClearFilter = ({ removeFilter }: StreamClearFilterProps) => {
    return (
        <>
            <div className="flex items-center px-4 pt-1">
                <h2 className="text-lg lg:text-xl text-slate-300 pr-2">
                    Clear filter:
                </h2>
                <ButtonIcon
                    ariaLabel="Remove filter."
                    onClick={removeFilter}
                    place="left"
                    secondary
                    type="Remove"
                />
            </div>
        </>
    )
}

export default StreamClearFilter
