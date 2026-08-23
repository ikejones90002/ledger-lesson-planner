import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Leave open for tunneled/preview hosts (e.g. E2B, ngrok) when you move
    // this into Spark103 or another sandboxed dev environment.
    allowedHosts: true
  }
})
