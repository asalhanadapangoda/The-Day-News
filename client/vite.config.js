import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(), // Enables ?as=webp&imagetools imports
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.webp', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'The Day News Global',
        short_name: 'Day News',
        description: 'Stay updated with breaking news, in-depth reports, video programs, and stories from around the world.',
        theme_color: '#0a0a0a',
        background_color: '#0c0014',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Cache JS, CSS, and HTML pages
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        // Runtime caching for API calls and Cloudinary images
        runtimeCaching: [
          {
            // Cache Cloudinary images (your article/program thumbnails)
            urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cloudinary-images',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache API responses (news data) with network-first strategy
            urlPattern: /^https?:\/\/.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 5 * 60 // 5 minutes
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              networkTimeoutSeconds: 10
            }
          }
        ]
      }
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 800,
    minify: 'esbuild',
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const REGIONS = ['Bangladesh', 'Australia', 'NewZealand', 'Japan', 'India', 'USA', 'Thailand', 'Denmark', 'Samoa', 'SouthAfrica'];

          // Vendor: React core + its peer deps (react-is, scheduler, prop-types)
          // These MUST be in the same chunk as React — they call React.forwardRef etc.
          // at module init time and will crash if vendor-react hasn't loaded first.
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-is/') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('node_modules/prop-types/')
          ) {
            return 'vendor-react';
          }
          // Vendor: Routing
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Vendor: Data fetching
          if (id.includes('node_modules/@tanstack')) {
            return 'vendor-query';
          }
          // Vendor: Heavy libs
          if (id.includes('node_modules/quill') || id.includes('node_modules/react-quill')) {
            return 'vendor-quill';
          }
          if (id.includes('node_modules/leaflet') || id.includes('node_modules/react-leaflet')) {
            return 'vendor-leaflet';
          }
          if (id.includes('node_modules/date-fns')) {
            return 'vendor-datefns';
          }
          // Vendor: Everything else
          if (id.includes('node_modules')) {
            return 'vendor-misc';
          }

          // App: Regional admin pages — keyed by region FIRST to avoid circular deps
          for (const region of REGIONS) {
            if (id.includes(`/src/${region}/`) && (id.includes('/pages/admin/') || id.includes('/admin/'))) {
              return `admin-${region.toLowerCase()}`;
            }
          }
          // App: Global admin pages
          if (id.includes('/pages/admin/') || id.includes('/admin/')) {
            return 'admin-global';
          }

          // App: Regional public pages
          for (const region of REGIONS) {
            if (id.includes(`/src/${region}/`)) {
              return `region-${region.toLowerCase()}`;
            }
          }
        }
      }
    }
  }
})
