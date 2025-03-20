import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
    define: {
        __config: JSON.parse(fs.readFileSync('./.epconfig.json', 'utf-8')),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'env-presets',
            fileName: (format) => `index.${format}.js`,
            formats: [ 'es', 'cjs' ],
        },
        rollupOptions: {
            external: [ 'fs' ],
        },
    },
});
