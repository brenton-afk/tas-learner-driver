/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

/** Production URL. Link previews need absolute image URLs, so update this if the domain changes. */
export const SITE_URL = 'https://tas-learner-driver.vercel.app';

const TITLE = 'Tasmanian Road Rules — Learner Study';
const DESCRIPTION =
  'Free practice for the Tasmanian learner licence knowledge test: 80 questions, mock test and cheat sheet. Works offline, no sign-up.';

/** Fills %SITE_URL%, %TITLE% and %DESCRIPTION% placeholders in index.html. */
function htmlMeta(): Plugin {
  return {
    name: 'html-meta',
    transformIndexHtml: (html) =>
      html
        .replaceAll('%SITE_URL%', SITE_URL)
        .replaceAll('%TITLE%', TITLE)
        .replaceAll('%DESCRIPTION%', DESCRIPTION),
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    htmlMeta(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        id: '/',
        name: 'Tasmanian Road Rules — Learner Study',
        short_name: 'Road Rules',
        description: DESCRIPTION,
        lang: 'en-AU',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#1F2328',
        theme_color: '#1F2328',
        categories: ['education'],
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        globIgnores: ['og-image.png'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    environment: 'node',
  },
});
