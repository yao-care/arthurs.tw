# arthurs.tw — 維運手冊

AI 網站銷售漏斗站。**核心商品＝一次性顧問服務**（含用 AI 建站＋交接＋帶你上手；**沒有月費**）。定位：「大家都能享受 AI 紅利；你看不懂、沒空管網站沒關係，付一筆顧問費我幫你搞定」——**不是**便宜的按頁建站/網頁外包，別把它寫成「建站費/按頁數計費」。**網站本身即服務的活體示範**（用同一套方式建置、由 AI 持續協助更新內容）。

> 💰 **價格政策（2026-07-21 老闆定案，取代先前的固定定價）**：**全站不公開固定金額**，改為「多少錢直接問我」——讀者可見處用直接口語（首頁 Hero／§8、service、diy、QA：「多少錢直接問我，加 LINE 或來信」）；meta description 與 `llms.txt` 用「費用洽詢報價」；`seo.ts` 的 `Service.Offer` 只留描述、**不放 price 數字**。單一真實來源＝`site.ts` 的 `FEE_NOTE`（含千分位金額的 `PRICE_LABEL` 已移除，`SITE.price` 已刪；`priceModel="一次性顧問費"` 保留但未被頁面引用）。**別再把任何金額寫回站上**；要恢復標價，改 `FEE_NOTE`＋各處口語＋`seo.ts` Offer 一起改。原含舊定價字樣的 QA slug 已改名為 `what-does-the-service-include`；選單/麵包屑改為「方案與費用」。

- 正式站：https://arthurs.tw （GitHub Pages + 自訂根網域，`public/CNAME`）
- Repo：`yao-care/arthurs.tw`（公開）
- 部署：push `main` → `.github/workflows/deploy.yml` 自動 build＋部署 Pages。

## 技術棧 / 常用指令
Astro 6 + @astrojs/sitemap，純靜態，Node ≥ 22.12，pnpm。
```bash
pnpm install
pnpm dev                # 本機開發 http://localhost:4321
pnpm build              # 先跑設計守門，再 astro build（產 dist/）
pnpm check:design       # 只跑設計規範守門
```
改動後務必 `pnpm build` 成功再 commit/push（CI 會再跑一次；green 才算數）。

## 設計規範（守門：scripts/check-design.mjs，build 前自動跑，違規 fail）
- **顏色**只在 `src/styles/variables.css` 定義：oklch 為準、hex 為 fallback；元件一律 `var(--color-*)`，不寫 hex/rgb。
- **字級**一律 `--text-*` 階梯，**最小 18px**，內文不小於 `--text-base`；禁 px 硬編字級。
- 禁 `!important`；禁外部 CDN（字型用系統堆疊）。
- 例外：HTML 屬性無法用 var() 的顏色（如 `<meta theme-color>`）放 `src/lib/site.ts`（.ts 不受守門掃描）。
- 品牌色：深藍青 primary（信任/可追蹤）＋暖琥珀 accent（人味）；佔位性質，要換色改 variables.css 的 oklch 與 hex 兩處。

## 文案守門（scripts/check-copy.mjs，build 前自動跑，違規 fail）
掃 `src/` 下 .md/.ts/.astro，對這幾種**具體 AI 味**做 100% 攔截：① 雙破折號插入句（一句塞兩段、`——…——` 夾註）② 八股連接詞（首先/其次/綜上所述/不僅…而且…）③ 浮誇詞（一站式/賦能/卓越/無縫/一鍵/完美…）④ emoji ⑤ 全形數字。
- **侷限（別誤會成萬能）**：語意層級的 AI 味（一句話硬塞太多、生硬名詞化）**無法用正則窮盡**，仍需人工把關；守門只保證上列固定樣式不會混進去。
- **刻意不收的規則**：「的樣子」「長頓號串」——它們大量命中正常中文（還原成…的樣子／服務清單枚舉），當規則只會誤擋、逼人忽略守門。要加新規則前先 grep 全站確認不會誤傷正常文案。

### 語感層：獨立 agent 審查（`.claude/settings.json` 的 PostToolUse hook）
regex 守門只擋固定樣式；「一句太繞、名詞化、對仗過工整」這種語感層 AI 味要**在寫的 session 當場、由獨立的另一雙眼睛審**。已設 PostToolUse agent hook（`if` 限 `src/content/**`、`src/lib/site.ts`、`src/pages/**` 的 Write/Edit）：改到文案就自動 spawn 一個獨立 Sonnet agent 讀該檔、挑 AI 味回報，作者當場修。
- **啟用注意**：hook 檔若在 session 開始時不存在，設定監看不會生效，需開一次 `/hooks` 或重啟該 session 才會開始觸發（之後自動）。
- 這是「很強的自動關卡」，非數學意義 100%（LLM 判斷有機率性）；仍以人最終定稿為準。

## 內容維護（最常見任務）
內容與版型分離，內容在 `src/content/`（Content Collections，schema 在 `src/content.config.ts`）：

| 集合 | 目錄 | 路由 | frontmatter 重點 |
|------|------|------|------|
| 常見問題 | `src/content/qa/<slug>.md` | `/qa/`、`/qa/<slug>/` | question, category, answer(50–100字), order, updated, related[] |
| 文章 | `src/content/articles/<slug>.md` | `/articles/`、`/articles/<slug>/` | title, category, summary, order, created, updated, reason, sources, aiHelp, humanReview |
| 更新紀錄 | `src/content/updates/<slug>.md` | `/updates/` | title, date, page, reason, source, aiHelp, humanReview, watch, status |
| 案例 | `src/content/cases/`（目前案例牆改由 site.ts 的 CASES 驅動） | `/cases/` | — |

- **新增一題 QA**：在 `src/content/qa/` 新增 `<slug>.md`，填齊 frontmatter；若要上首頁精選，於 `src/lib/site.ts` 的 `FEATURED_QA` 加一筆。
- **新增一篇文章**：在 `src/content/articles/` 新增 `<slug>.md`。
- **記一筆更新**：在 `src/content/updates/` 新增 `<date>-<slug>.md`（會顯示在 `/updates/` 與 content-lab）。

## 文案原則（務必遵守）
- **受眾中性、不分行業（2026-07-20 老闆定案）**：受眾＝任何想搭上 AI 紅利、但看不懂 AI／沒空管網站的人，不論行業、不論懂不懂 AI。**不得**把受眾綁定任何特定行業別（早期曾誤寫成某某『產業老闆』，已全數清掉，別再寫回），也**不得**換成另一個窄族群（中小企業／小店／工作室／接案者…）。泛稱用「老闆」「很多人」「不少公司」「你」即可；痛點（網站沒人更新、沒有行銷人手、資料零散過時、不懂技術後台）是普世的，不要冠上任何行業。
- **老闆語言**：首頁級頁面不出現 GitHub / repository / Pages / deploy / source code；改說「客戶自己持有的網站空間／帳號」。技術細節放 QA。
- **誠實不灌水**：不保證 Google 排名、不保證被 AI 推薦、不保證訂單或固定時間成效；只承諾「持續依數據改善」。
- **不捏造**客戶名稱、見證、數字、案例。`/cases/` 只放真實已上線作品（site.ts 的 CASES）。缺的證據（示範影片、成效數字）誠實標「錄製中／資料累積中」。
- 去 AI 味：不用 emoji、不用「首先/其次/綜上所述」八股、不用浮誇形容詞；半形數字。

## 單一真實來源
- **事實與文案骨幹**：`src/lib/site.ts`（品牌、聯絡、導覽、五大定位、痛點、解法、方案、精選 QA、真實案例 CASES）。
- **結構化資料**：`src/lib/seo.ts`（Organization / WebSite / Service / FAQPage / Breadcrumb / Article），由 `BaseLayout.astro` 與各頁輸出 JSON-LD。
- **SEO/AEO/GEO**：`robots.txt.ts`（開放 AI 爬蟲＋sitemap）、`llms.txt.ts`（純文字摘要）、sitemap priority 差異化（astro.config.mjs）。

## 待補（交接）
- **聯絡管道**：`site.ts` 的 `SITE.email` / `SITE.line` 目前為空。填入後，`/website-check/` 表單會自動改用 mailto 送出、關於頁會顯示聯絡方式——這是讓整條「傳網址」漏斗真正收得到名單的關鍵。
- **GA4**：設 repo 變數/建置環境變數 `PUBLIC_GA_ID=G-XXXX` 即開啟追蹤（`BaseLayout.astro` 已接）。
- **GSC**：DNS 驗證 `sc-domain:arthurs.tw`，提交 sitemap。
- **品牌色**：目前為深藍青＋暖琥珀佔位，用戶確認後可調 `variables.css`。
- **收費模型（2026-07-21 更新）**：一次性顧問費、無月費、不綁約；**不公開固定金額**，改「多少錢直接問我（加 LINE 或來信）」，詳見檔案頂端「價格政策」。若日後要恢復標價或加「後續協助/月費」層級，需回頭調 `site.ts`（`FEE_NOTE`）、pricing、service、diy 與 is-consulting-required / what-does-the-service-include / can-beginners-use-ai QA（目前這些都寫「不強制、日後再另談、金額直接問、不報月費數字」）。
- 第二階段內容：真實案例內頁、操作示範影片、法律頁（/privacy、/terms、/disclaimer）。
