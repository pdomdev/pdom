import { defineConfig } from 'vite'

export default defineConfig({
    root: 'library',
    build: {
        target: 'esnext',
        outDir: '../cjs/',
        lib: {
            entry: 'index.ts',
            name: 'PDom',
            formats: ['cjs']
        }
    }
})