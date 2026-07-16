import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://iptv-norge.net',
  trailingSlash: 'always',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  redirects: {
    '/': '/no_nu',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
