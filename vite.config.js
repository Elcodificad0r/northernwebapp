// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/', // ✅ Cambia esto - custom domains usan '/'
  plugins: [
    react(),
    tailwindcss(),
  ],
})