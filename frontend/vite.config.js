import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server configured for proxy to node.js. Taken from: https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://inventory-sync.onrender.com', // prod - was 'http://localhost:4000' (dev), then 'https://inventory-sync-frontend.onrender.com' (wrong) 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
