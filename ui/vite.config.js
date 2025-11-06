import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../TechStacks/wwwroot',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      // Proxy API requests to the backend during development
      '/api': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false, // Allow self-signed certificates in dev
      },
      '/auth': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      '/signin-oidc-github': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
