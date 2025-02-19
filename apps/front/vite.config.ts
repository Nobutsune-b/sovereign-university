/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import viteTsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: '../../node_modules/.vite/front',
  server: {
    port: 5555,
    open: false,
    host: process.env.DOCKER ? '0.0.0.0' : 'localhost',
    fs: {
      allow: ['../../'],
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    react(),
    svgr(),
    viteTsConfigPaths({
      root: '../../',
    }),
  ],

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  resolve: {
    alias: [
      {
        find: '@sovereign-academy/api-client',
        replacement: path.resolve('packages/api-client'),
      },
      {
        find: '@sovereign-academy/types',
        replacement: path.resolve('packages/types'),
      },
    ],
  },
});
