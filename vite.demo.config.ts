// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    root: 'demo',
    build: {
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'demo/index.html'),
                nested: resolve(__dirname, 'demo/worker.ts'),
            },
        },
    }
})