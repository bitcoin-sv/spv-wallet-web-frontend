import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { checker } from 'vite-plugin-checker'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// @ts-ignore it's just a config file
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"' },
      overlay: false,
    }),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        sourcemap: true,
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  server: {
    port: 3002,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
