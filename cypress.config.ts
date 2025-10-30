const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(
            on: Cypress.PluginEvents,
            _config: Cypress.PluginConfigOptions
        ) {
            on('task', {
                log(message: string) {
                    console.log(message)
                    return null
                },
            })
        },
        baseUrl: 'https://stackoverflowisbetterthananyai.github.io/twitch-app',
    },
})
