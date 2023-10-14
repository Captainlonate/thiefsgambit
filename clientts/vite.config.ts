import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    /**
     * NodeJS chat api only allows 3000 in CORS config.
     */
    port: 3000,
  },
})
