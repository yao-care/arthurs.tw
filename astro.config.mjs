// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// arthurs.tw：自訂根網域（GitHub Pages + public/CNAME）。不設 base。
export default defineConfig({
  site: 'https://arthurs.tw',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (path === '/') { item.priority = 1.0; item.changefreq = 'weekly'; }
        else if (['/website-check', '/pricing', '/service'].includes(path)) { item.priority = 0.9; item.changefreq = 'monthly'; }
        else if (path === '/qa' || path === '/articles' || path === '/content-lab' || path === '/updates') { item.priority = 0.8; item.changefreq = 'weekly'; }
        else { item.priority = 0.6; item.changefreq = 'monthly'; }
        return item;
      },
    }),
  ],
});
