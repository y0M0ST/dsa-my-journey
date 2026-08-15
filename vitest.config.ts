import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Hack nhẹ để xài được __dirname trong môi trường ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts'], // Chỉ bảo Vitest quét mấy file có đuôi .test.ts
        reporters: ['verbose'],
    },
    resolve: {
        alias: {
            // Setup phím tắt, mốt gõ '@data-structures/...' cho lẹ
            '@data-structures': path.resolve(__dirname, './src/data_structures'),
        },
    },
});