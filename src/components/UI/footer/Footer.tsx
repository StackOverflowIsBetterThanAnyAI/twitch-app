const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer
            className="flex text-slate-300 p-4 text-center text-xs md:text-sm lg:text-base"
            data-testid="footer-container"
        >
            <span className="m-auto" data-testid="footer-content">
                Copyright &#169; {year} Michael Münzenhofer. All Rights
                Reserved.
                <a
                    href="https://github.com/StackOverflowIsBetterThanAnyAI/twitch-app"
                    target="_blank"
                    rel="noreferrer"
                    className="pseudo-zinc-purple text-purple-400 rounded-md px-0.5 mx-0.5 footer"
                    data-testid="footer-anchor"
                >
                    GitHub Repository.
                </a>
            </span>
        </footer>
    )
}

export default Footer
