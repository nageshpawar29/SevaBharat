import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],   // ✅ REQUIRED for React
  server: {
    host: true,
    port: 5173
  }
})