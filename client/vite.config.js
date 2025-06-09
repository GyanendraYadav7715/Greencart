import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: 'Greencart - Grocery Web App',
      short_name: 'Greencart',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0f172a',
      icons: [
        {
          src: ' logo.svg',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'logo.svg',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }),],
})
