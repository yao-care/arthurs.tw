---
name: ai-ready-website
description: 用 Claude Code 建一個「AI-Ready」的靜態網站——自己擁有、能用聊天更新、可被 Google 與 AI 搜尋理解，並免費部署到 GitHub Pages。適合傳統產業公司形象／產品服務／案例／內容型網站。
---

# ai-ready-website — 自己動手建一個 AI 網站

這份 skill 讓你（或你的 AI）從零建出一個符合五個原則的網站，全程用聊天完成：

- **AI-Ready**：內容與版型分離，AI 能安全地讀懂、修改。
- **Updatable**：日後用一般說話的方式請 AI 改（加產品、改介紹）。
- **Trackable**：串接 Google Search Console 與 Google Analytics。
- **Rankable**：內建 sitemap、robots、JSON-LD、乾淨的標題與描述，利於 Google 搜尋與 AI 問答引用。
- **Human-Owned**：帳號、網址、原始檔全部在你自己的 GitHub 與網域下，隨時可轉移。

> 這份是公開、通用版，不含任何特定主機的機密或內部設定。照做即可自建；真的卡住，也可以改用顧問服務代勞。

## 你需要準備
- 一台電腦，裝好 [Claude Code](https://claude.com/claude-code) 與 Node.js（≥ 22.12）。
- 一個 GitHub 帳號（免費即可；Pages 對公開 repo 免費）。
- 一個你自己的網域（可選；沒有先用 GitHub 提供的網址）。
- 你公司的現有資料：公司簡介、產品/服務、案例、圖片、聯絡方式。

## 安裝方式（把這個資料夾放進 Claude Code 的 skills 目錄）
- 個人層級：放到 `~/.claude/skills/ai-ready-website/SKILL.md`
- 專案層級：放到你的專案 `.claude/skills/ai-ready-website/SKILL.md`

放好後，在 Claude Code 對話裡輸入 `/ai-ready-website`，或直接說「用 ai-ready-website 這個 skill 幫我建站」。

## 建站步驟（交給 Claude 執行）
1. **建立骨架**：Astro 靜態網站，`src/pages`（頁面）、`src/content`（Markdown 內容集）、`src/layouts`、`src/styles`。
2. **設計規範**：所有顏色集中在一支 `variables.css`（用 oklch，附 hex fallback）；字級用 `--text-*` 階梯，內文不小於 18px；不硬編顏色、不使用外部 CDN 字型。
3. **內容與版型分離**：QA、文章、案例、更新紀錄都用 Markdown 放 `src/content`，schema 定義在 `src/content.config.ts`。日後請 AI 只改 Markdown，不動版型。
4. **SEO / AEO / GEO**：
   - `@astrojs/sitemap` 產生 sitemap；
   - `robots.txt` 開放主要 AI 爬蟲並指向 sitemap；
   - 每頁輸出 JSON-LD（Organization / WebSite / Service / FAQPage / BreadcrumbList）；
   - 每頁乾淨、唯一的 `<title>` 與 `description`，不要關鍵字堆砌。
   - 另可輸出 `/llms.txt` 純文字摘要，方便 AI 取用。
5. **部署到 GitHub Pages**：建立 public repo → 加一個 GitHub Actions workflow（build + 部署 Pages）→ push。要用自己的網域就加 `public/CNAME`（內容為你的網域），並在網域 DNS 設 A 記錄指向 GitHub Pages（`185.199.108–111.153`）。
6. **接數據**：建立 Google Search Console（網域驗證、提交 sitemap）與 Google Analytics（把 GA4 追蹤碼接進版型）。
7. **交接**：帳號、網址、原始檔都在你名下。日後要換人維護，把 repo 權限交出去即可。

## 之後怎麼更新
在 Claude Code 打開專案，直接說：「幫我在產品頁加一項 XXX，介紹是……」「把電話改成……」。Claude 改對應的 Markdown，你看差異、確認、push，就上線了。改錯了用 git 還原上一版。

## 誠實提醒
- 這套做法能提高被搜尋與被 AI 引用的機會，但**不保證** Google 排名、**不保證**被 ChatGPT 等 AI 推薦、**不保證**帶來訂單。它的價值是把資料整理清楚、持續更新、讓機器容易理解。
- 免費網站空間（如 GitHub Pages）由第三方提供，政策可能調整；因為原始檔和網域都在你手上，隨時可搬到別的平台，不會被綁死。
