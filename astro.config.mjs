// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

// sitemap 的 lastmod 來源。2026-08-02 補：原本整份 sitemap 一個 lastmod 都沒有，
// 只給 changefreq 與 priority，而 Google 公開說過那兩個它不看，lastmod 才是它排爬取順序的依據。
// 站況：13 天內 Google 爬過的頁 100% 收錄（歷來 0 筆 Crawled-not-indexed），
// 卡住的 20 頁全部 lastCrawlTime=null，也就是還沒被爬 —— 缺的是爬取順序的訊號。
// 鐵律：逐頁給真實日期。整份塞 new Date() 等於宣稱全站今天都改過，Google 會折扣整份 sitemap。
function contentDates() {
  const map = new Map();
  for (const dir of ['qa', 'articles', 'cases']) {
    for (const f of readdirSync(`src/content/${dir}`)) {
      if (!f.endsWith('.md')) continue;
      const src = readFileSync(`src/content/${dir}/${f}`, 'utf8');
      const m = src.match(/^updated:\s*"?([\d-]+)"?/m) ?? src.match(/^created:\s*"?([\d-]+)"?/m);
      if (m) map.set(`/${dir}/${f.replace(/\.md$/, '')}`, m[1]);
    }
  }
  return map;
}

// 靜態頁沒有 frontmatter，用該頁原始檔的最後一次 commit 日期當 lastmod。
function pageGitDate(path) {
  const candidates = path === '/'
    ? ['src/pages/index.astro']
    : [`src/pages${path}/index.astro`, `src/pages${path}.astro`];
  for (const file of candidates) {
    try {
      const out = execSync(`git log -1 --format=%cs -- ${file}`, { encoding: 'utf8' }).trim();
      if (out) return out;
    } catch { /* 不在 git 或查不到就略過，寧可不給 lastmod 也不給假日期 */ }
  }
  return null;
}

const CONTENT_DATES = contentDates();

// arthurs.tw：自訂根網域（GitHub Pages + public/CNAME）。不設 base。
export default defineConfig({
  site: 'https://arthurs.tw',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // 表單成功頁是轉換流程，不是搜尋內容；不要讓它佔 sitemap 的索引配額。
      filter(page) {
        const path = new URL(page).pathname.replace(/\/$/, '') || '/';
        return path !== '/website-check/thank-you';
      },
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (path === '/') { item.priority = 1.0; item.changefreq = 'weekly'; }
        else if (['/website-check', '/pricing', '/service', '/taichung'].includes(path)) { item.priority = 0.9; item.changefreq = 'monthly'; }
        else if (path === '/qa' || path === '/articles' || path === '/updates') { item.priority = 0.8; item.changefreq = 'weekly'; }
        // 個別文章/QA 頁：承接長尾搜尋的主力，優先於 /about、/404 等一般頁
        else if (path.startsWith('/articles/') || path.startsWith('/qa/') || path.startsWith('/cases/')) { item.priority = 0.7; item.changefreq = 'monthly'; }
        else { item.priority = 0.6; item.changefreq = 'monthly'; }

        // lastmod：內容頁取 frontmatter 的 updated，靜態頁取該頁原始檔最後一次 commit 日期。
        // 查不到就不給，不編日期。
        const day = CONTENT_DATES.get(path) ?? pageGitDate(path);
        if (day) item.lastmod = new Date(`${day}T00:00:00Z`).toISOString();
        return item;
      },
    }),
  ],
});
