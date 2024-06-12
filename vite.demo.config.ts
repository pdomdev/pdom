// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: 'demo',
    build: {
        target: 'esnext',
        outDir: 'dist2',
        assetsInlineLimit: 0,
    }
})