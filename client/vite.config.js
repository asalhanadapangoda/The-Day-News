import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(), // Enables ?as=webp&imagetools imports
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
