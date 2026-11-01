import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(_on, config) {
            return config
        },
        baseUrl: 'https://stackoverflowisbetterthananyai.github.io/twitch-app',
    },
})
