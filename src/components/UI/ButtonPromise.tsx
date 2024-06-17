const ButtonPromise = () => {
    return (
        <button
            onClick={() => window.location.reload()}
            className="mt-4 text-base lg:text-lg text-slate-300 px-8 py-1 rounded-xl font-semibold outline outline-zinc-50 outline-1 cursor-default
            pseudo-zinc-retry"
            title="Retry"
            autoFocus
        >
            Retry
        </button>
    )
}

export default ButtonPromise
