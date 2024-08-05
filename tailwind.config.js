/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {
            animation: {
                fadeOut: 'fadeOut 5s forwards',
            },
            keyframes: {
                fadeOut: {
                    '0%': { opacity: 0, visibility: 'hidden' },
                    '10%': { opacity: 1, visibility: 'visible' },
                    '80%': { opacity: 1, visibility: 'visible' },
                    '100%': { opacity: 0, visibility: 'hidden' },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.grid-cols-minmax-36': {
                    'grid-template-columns':
                        'minmax(36px, 1fr) 1fr 1fr 1fr 1fr',
                },
            }

            addUtilities(newUtilities)
        },
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.grid-cols-auto-fill-284': {
                    'grid-template-columns':
                        'repeat(auto-fill, minmax(284px, 1fr))',
                },
            }
            addUtilities(newUtilities, ['responsive'])
        }),
        function ({ addUtilities }) {
            addUtilities({
                '.pseudo-zinc': {
                    '@apply hover:cursor-pointer hover:bg-zinc-800 focus-visible:bg-zinc-800 focus-visible:outline focus-visible:outline-zinc-400 focus-visible:outline-2 active:bg-zinc-700 active:outline active:outline-zinc-600 active:outline-2':
                        {},
                },
            })
        },
        function ({ addUtilities }) {
            addUtilities({
                '.pseudo-zinc-secondary': {
                    '@apply hover:cursor-pointer hover:bg-zinc-700 focus-visible:bg-zinc-700 focus-visible:outline focus-visible:outline-zinc-400 focus-visible:outline-2 active:bg-zinc-600 active:outline active:outline-zinc-500 active:outline-2':
                        {},
                },
            })
        },
        function ({ addUtilities }) {
            addUtilities({
                '.pseudo-zinc-purple': {
                    '@apply hover:cursor-pointer hover:bg-zinc-700 hover:text-purple-400 focus-visible:bg-zinc-700 focus-visible:text-purple-400 focus-visible:outline focus-visible:outline-zinc-400 focus-visible:outline-2 active:bg-zinc-600 active:text-purple-500 active:outline active:outline-zinc-500 active:outline-2':
                        {},
                },
            })
        },
        function ({ addUtilities }) {
            addUtilities({
                '.pseudo-zinc-retry': {
                    '@apply hover:cursor-pointer hover:bg-zinc-50 hover:text-zinc-800 focus-visible:outline-4 active:outline-offset-2 active:bg-zinc-200 active:text-zinc-800':
                        {},
                },
            })
        },
    ],
}
