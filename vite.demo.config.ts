// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
    root: 'demo',
    build: {
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve('demo', 'index.html'),
                serial: resolve('demo', 'serial/index.html'),
                parallel: resolve('demo', 'parallel/index.html'),
            },
        },
    }
})