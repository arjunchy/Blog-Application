import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: true,        // 👈 Allows access from outside the container
    port: 5173,        // 👈 Ensure it matches docker-compose
    strictPort: true   // 👈 Optional: fails instead of changing ports
  }
})
