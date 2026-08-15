import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts'], // Configure Vitest to scan files with the .test.ts extension.
        reporters: ['verbose'],
    },
    resolve: {
        alias: {
            '@data-structures': path.resolve(__dirname, './src/data_structures'),
        },
    },
});