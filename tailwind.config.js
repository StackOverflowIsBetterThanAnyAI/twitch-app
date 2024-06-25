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
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.grid-cols-auto-fill-320': {
                    'grid-template-columns':
                        'repeat(auto-fill, minmax(320px, 1fr))',
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
                '.pseudo-zinc-retry': {
                    '@apply hover:cursor-pointer hover:bg-zinc-50 hover:text-zinc-800 focus-visible:outline-4 active:outline-offset-2 active:bg-zinc-200 active:text-zinc-800':
                        {},
                },
            })
        },
    ],
}
