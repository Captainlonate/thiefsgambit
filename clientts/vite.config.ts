import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /**
     * NodeJS chat api only allows 3000 in CORS config.
     */
    port: 3000,
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@context': path.resolve(__dirname, './src/components/context'),
      '@logger': path.resolve(__dirname, './src/Logger/index.ts'),
    },
  },
})
