const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, _config) {
            on('task', {
                log(message) {
                    console.log(message)
                    return null
                },
            })
        },
        baseUrl: 'https://stackoverflowisbetterthananyai.github.io/twitch-app',
    },
})
