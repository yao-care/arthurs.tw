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
        else if (['/website-check', '/pricing', '/service', '/taichung'].includes(path)) { item.priority = 0.9; item.changefreq = 'monthly'; }
        else if (path === '/qa' || path === '/articles' || path === '/updates') { item.priority = 0.8; item.changefreq = 'weekly'; }
        // 個別文章/QA 頁：承接長尾搜尋的主力，優先於 /about、/404 等一般頁
        else if (path.startsWith('/articles/') || path.startsWith('/qa/')) { item.priority = 0.7; item.changefreq = 'monthly'; }
        else { item.priority = 0.6; item.changefreq = 'monthly'; }
        return item;
      },
    }),
  ],
});
