const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(_on, config) {
            return config
        },
        baseUrl: 'https://stackoverflowisbetterthananyai.github.io/twitch-app',
    },
})
