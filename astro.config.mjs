import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
    clientAddressResolution: 'x-forwarded-for'
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()]
  }
})
