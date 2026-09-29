// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// Kanonisk domene. Alle canonical-, OG- og sitemap-URLer bygges fra denne.
const SITE = 'https://nsbetong.no';

// Sider som ikke skal i sitemap (noindex).
const UTELATT = ['/takk/', '/404/'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  output: 'static',
  adapter: vercel({ imageService: false }),
  compressHTML: true,
  prefetch: false,
  integrations: [
    sitemap({
      filter: (page) => !UTELATT.some((sti) => page.endsWith(sti)),
    }),
  ],
});
