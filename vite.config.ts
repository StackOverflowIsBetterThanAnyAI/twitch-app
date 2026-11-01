import { defineConfig } from 'vitest/config'
import type { Connect, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = '/twitch-app/'

// the app is served under a sub path (GitHub Pages), so requests to the root are redirected to it
const redirectToBase: Connect.NextHandleFunction = (req, res, next) => {
    if (req.url === '/' || req.url === base.slice(0, -1)) {
        res.writeHead(302, { Location: base })
        res.end()
        return
    }
    next()
}

const redirectToBasePlugin = (): Plugin => ({
    name: 'redirect-to-base',
    configureServer(server) {
        server.middlewares.use(redirectToBase)
    },
    configurePreviewServer(server) {
        server.middlewares.use(redirectToBase)
    },
})

export default defineConfig({
    base,
    plugins: [react(), tailwindcss(), redirectToBasePlugin()],
    build: {
        outDir: 'build',
    },
    // PORT and HOST are respected like in Create React App (used by the accessibility audit workflow)
    server: {
        host: process.env.HOST,
        port: Number(process.env.PORT) || 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/setupTests.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
        restoreMocks: true,
    },
})
