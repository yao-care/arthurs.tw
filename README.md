# arthurs.tw

AI 網站顧問服務的官方網站。這個網站本身就是服務的示範：用同一套方式建置，由 AI 持續協助更新內容。

正式站：<https://arthurs.tw>

## 技術

Astro 6 加 `@astrojs/sitemap`，純靜態，Node 22.12 以上，pnpm。push 到 `main` 就由 GitHub Actions 自動 build 並部署到 GitHub Pages，自訂網域走 `public/CNAME`。

```bash
pnpm install
pnpm dev              # 本機開發
pnpm build            # 先跑兩道守門，再 astro build
pnpm check:design     # 只跑設計規範守門
pnpm check:copy       # 只跑文案守門
```

## 兩道 CI 守門

`build` 一定先跑這兩支，違規就不上線。

**設計守門**（`scripts/check-design.mjs`）：顏色只准出現在 `src/styles/variables.css`（oklch 為準、hex 作 fallback），字級一律走 `--text-*` 階梯且不小於 18px，禁 `!important`，禁外部 CDN。

**文案守門**（`scripts/check-copy.mjs`）：擋掉固定樣式的 AI 腔，包含雙破折號插入句、八股連接詞、浮誇詞、emoji、全形數字。這道只保證固定樣式不會混進來，語意層級的 AI 味仍然需要人看。

## 內容架構

內容與版型分離，內容放在 `src/content/`（Astro Content Collections，schema 在 `src/content.config.ts`）：

| 集合 | 目錄 | 路由 |
|---|---|---|
| 常見問題 | `src/content/qa/` | `/qa/`、`/qa/<slug>/` |
| 文章 | `src/content/articles/` | `/articles/`、`/articles/<slug>/` |
| 更新紀錄 | `src/content/updates/` | `/updates/` |

事實與文案骨幹集中在 `src/lib/site.ts`，結構化資料（Organization、WebSite、Service、FAQPage、Breadcrumb、Article 的 JSON-LD）集中在 `src/lib/seo.ts`。

## 搜尋引擎與 AI 可讀性

`robots.txt` 開放 AI 爬蟲並指向 sitemap；`/llms.txt` 是純文字目錄；`/llms-full.txt` 是純文字全文，讓 AI 一次讀完不必逐頁爬，內容全部取自 `src/content/` 與 `site.ts`，不另外維護第二份會漂移的副本。

---

Maintained by Light. I build and maintain websites with AI as a service: [arthurs.tw](https://arthurs.tw/?utm_source=github&utm_medium=readme&utm_campaign=oss)
