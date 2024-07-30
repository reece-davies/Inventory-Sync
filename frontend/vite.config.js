import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server configured for proxy to node.js. Taken from: https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://inventory-sync.onrender.com', // was 'http://localhost:4000'
        changeOrigin: true,
      },
    },
  },
})
