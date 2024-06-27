// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'site',
    build: {
        target: 'esnext',
        outDir: 'dist',
    }
})