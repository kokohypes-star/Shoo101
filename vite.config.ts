import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'client',
  plugins: [react()],
  server: {
    host: true,             // make server accessible externally (Replit preview)
    port: 5173,             // default Vite port
    strictPort: false,      // allows fallback if port is in use
    allowedHosts: 'all',    // allow any hostname (avoids host blocked errors)
  },
  resolve: {
    alias: {
      '@': '/src',          // relative to root (client)
    },
  },
  build: {
    outDir: '../dist',      // build output directory (relative to root)
    emptyOutDir: true,
    sourcemap: true,        // useful for debugging
  },
  optimizeDeps: {
    include: [],
  },
})
