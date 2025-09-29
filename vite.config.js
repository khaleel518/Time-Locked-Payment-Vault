import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

export default defineConfig({
  plugins: [react(), wasm(), topLevelAwait()],
  server: {
    port: 3000,
    host: true,
    hmr: {
      overlay: true
    }
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: ['@meshsdk/core']
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['@meshsdk/core']
    }
  },
  esbuild: {
    target: 'esnext'
  }
})
