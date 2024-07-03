// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
    root: 'site',
    resolve: {
        preserveSymlinks: true,
    },
    build: {
        target: 'esnext',
        outDir: 'dist',
    }
})