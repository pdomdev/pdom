import { defineConfig } from 'vite'

export default defineConfig({
    root: 'hosting',
    build: {
        target: 'esnext',
        outDir: '../dist/',
    }
})