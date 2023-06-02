import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },


  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
         @use "@/assets/sass/helpers.sass"
       `
      },
    },
  },

  server: {
    host: '0.0.0.0',
    port: 8000,
    watch: {
        usePolling: true
    }
  }
})
