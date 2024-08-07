import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server configured for proxy to node.js. Taken from: https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
  plugins: [react()],
  base: '/', // This ensures the app is served from the root
  build: {
    outDir: './dist', // Output directory for build files
    rollupOptions: {
      input: 'index.html', // Entry point for the build
    },
  },
  server: {
    historyApiFallback: true // This enables history API fallback for the dev server
  },
})



// Previous config with proxy
/*
export default defineConfig({
  // server configured for proxy to node.js. Taken from: https://medium.com/@faazfajib7/setup-proxy-in-vite-react-2eb1454bff62
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // 'http://localhost:4000' (dev), or 'https://inventory-sync.onrender.com' (prod)
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: '/', // This ensures the app is served from the root
  build: {
    outDir: 'dist', // Output directory for build files
    rollupOptions: {
      input: 'index.html', // Entry point for the build
    },
  },
}) */
