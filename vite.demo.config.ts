// vite.config.ts
import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
    root: 'demo',
    resolve: {
        preserveSymlinks: true,
    },
    build: {
        modulePreload: false,
        target: 'esnext',
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve('demo', 'index.html'),
                serial: resolve('demo', 'serial/index.html'),
                parallel: resolve('demo', 'parallel/index.html'),
                react: resolve('demo', 'react/index.html'),
                busy: resolve('demo', 'react/busy.tsx')
            },
        },
    }
})