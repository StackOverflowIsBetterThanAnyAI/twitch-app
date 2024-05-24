/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.grid-cols-auto-fit-320': {
                    'grid-template-columns':
                        'repeat(auto-fit, minmax(320px, 1fr))',
                },
            }
            addUtilities(newUtilities, ['responsive'])
        }),
    ],
}
