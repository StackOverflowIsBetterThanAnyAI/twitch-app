const Footer = () => {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer
            className="flex text-slate-300 p-4 text-center text-xs md:text-sm lg:text-base"
            data-testid="footer-container"
        >
            <span
                className="flex flex-wrap justify-center m-auto"
                data-testid="footer-content"
            >
                Copyright &#169; {year} Michael Münzenhofer. All Rights
                Reserved.
                <a
                    href="https://github.com/StackOverflowIsBetterThanAnyAI/twitch-app"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 pseudo-zinc-purple text-purple-400 rounded-md px-0.5 mx-0.5 footer"
                    data-testid="footer-anchor"
                    aria-label="GitHub Repository (opens in a new tab)"
                    title="GitHub Repository (opens in a new tab)"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        height={12}
                        fill="#f4f4f5"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                    </svg>
                    <span>GitHub Repository</span>
                </a>
            </span>
        </footer>
    )
}

export default Footer
