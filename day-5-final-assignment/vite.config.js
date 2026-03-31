import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true, 
    proxy: {
      '/idbi': {
        target: 'https://api-dev-stage.iserveu.online',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
