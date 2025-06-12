import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss(), react(), mdx()],
  base: '/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ecosystem: resolve(__dirname, 'ecosystem.html'),
      }
    }
  }
})
