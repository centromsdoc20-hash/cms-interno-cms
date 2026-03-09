// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mkv', '**/*.mp4', '**/*.webm', '**/*.ogg', '**/*.mov'], // Adicione esta linha
  server: {
    port: 3000,
  },
})