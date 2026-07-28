# arthurs.tw — 維運手冊

AI 網站銷售漏斗站。**核心商品＝一次性顧問服務**（含用 AI 建站＋交接＋帶你上手；**沒有月費**）。定位（2026-07-26 老闆改口徑，`site.ts` 的 `POSITIONING`）：「AI 這波，人人都用得上。你看不懂、沒空管網站也沒關係，把網站交給我。」原本的「大家都能享受 AI 紅利」被文案守門判為浮誇口號而換掉；**注意 about/service/index/llms.txt/can-i-diy-myself 等處仍留著舊說法，尚未決定是否一併掃**——**不是**便宜的按頁建站/網頁外包，別把它寫成「建站費/按頁數計費」。**網站本身即服務的活體示範**（用同一套方式建置、由 AI 持續協助更新內容）。

> 💰 **價格政策（2026-07-21 老闆定案，取代先前的固定定價）**：**全站不公開固定金額**，改為「多少錢直接問我」——讀者可見處用直接口語（首頁 Hero／§8、service、diy、QA：「多少錢直接問我，加 LINE 或來信」）；meta description 與 `llms.txt` 用「費用洽詢報價」；`seo.ts` 的 `Service.Offer` 只留描述、**不放 price 數字**。**沒有集中的價格常數**（2026-07-26 校正：舊文寫的 `FEE_NOTE` 已隨 `PRICE_LABEL`、`SITE.price` 一起移除，全 repo 只剩本檔提過它；`priceModel="一次性顧問費"` 仍在 `site.ts` 但無頁面引用）。**口徑的正本＝QA `how-much-does-it-cost`**（「為什麼不寫價格、怎麼問、費用性質」都在那題講完整），其餘頁面只寫一句口語並連向該題。**別再把任何金額寫回站上**；要恢復標價，得同時改該題 QA＋各頁口語＋`seo.ts` 的 `Service.Offer`。原含舊定價字樣的 QA slug 已改名為 `what-does-the-service-include`。
>
> 📛 **`/pricing/` 的顯示名稱＝「方案與費用」**（2026-07-26 全站統一）：NAV、Footer、麵包屑、`<title>`、breadcrumb JSON-LD、`llms.txt`、`llms-full.txt` 都已改成這個名字，原本混用的「服務範圍」「方案與價格」已清掉。要改名得七處一起改。**例外不要動**：`site.ts` 的 QA 分類名「價格與服務範圍」是分類、不是頁名（改它要連動各 QA frontmatter 的 `category`）；seo-ops `sites/arthurs.tw.json` 的 `flagship` 標籤同步改過。

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
- **記一筆更新**：在 `src/content/updates/` 新增 `<date>-<slug>.md`（會顯示在 `/updates/`）。**注意：站上沒有 content-lab 這一頁**——`/content-lab/` 實測 404、不在 sitemap、全站無連結，2026-07-26 前它一直被誤列在 seo-ops 的追蹤與催收錄清單裡（日報天天報「Google 還沒發現」，其實是頁根本不存在），現已移除。別再把它寫回任何清單或連結。
- **新增內容頁後要同步 seo-ops 追蹤清單**：`/root/seo-ops/sites/arthurs.tw.json` 的 `trackUrls`（GSC 逐頁收錄檢查）與 `indexPing.urls`（每日推 Google Indexing API）**不會自動跟著 sitemap 長**。2026-07-26 前這兩份清單只有固定頁與列表頁，而近一週 11 次曝光 100% 來自文章／QA 內頁 → 真正在賺搜尋的資產全在監測盲區，日報的「文章 收錄 1/1」其實只是列表頁自己（補進內頁後實測為 5/8、QA 7/13）。新增一篇文章或一題 QA，記得兩份清單各加一行。

## 文案原則（務必遵守）
- **受眾中性、不分行業（2026-07-20 老闆定案）**：受眾＝任何想搭上 AI 紅利、但看不懂 AI／沒空管網站的人，不論行業、不論懂不懂 AI。**不得**把受眾綁定任何特定行業別（早期曾誤寫成某某『產業老闆』，已全數清掉，別再寫回），也**不得**換成另一個窄族群（中小企業／小店／工作室／接案者…）。泛稱用「老闆」「很多人」「不少公司」「你」即可；痛點（網站沒人更新、沒有行銷人手、資料零散過時、不懂技術後台）是普世的，不要冠上任何行業。
- **老闆語言**：首頁級頁面不出現 GitHub / repository / Pages / deploy / source code；改說「客戶自己持有的網站空間／帳號」。技術細節放 QA。
- **誠實不灌水**：不保證 Google 排名、不保證被 AI 推薦、不保證訂單或固定時間成效；只承諾「持續依數據改善」。
- **不捏造**客戶名稱、見證、數字、案例。`/cases/` 只放真實已上線作品（site.ts 的 CASES）。缺的證據（示範影片、成效數字）誠實標「錄製中／資料累積中」。
- 去 AI 味：不用 emoji、不用「首先/其次/綜上所述」八股、不用浮誇形容詞；半形數字。

## 單一真實來源
- **事實與文案骨幹**：`src/lib/site.ts`（品牌、聯絡、導覽、五大定位、痛點、解法、方案、精選 QA、真實案例 CASES）。
- **結構化資料**：`src/lib/seo.ts`（Organization / WebSite / Service / FAQPage / Breadcrumb / Article），由 `BaseLayout.astro` 與各頁輸出 JSON-LD。
- **SEO/AEO/GEO**：`robots.txt.ts`（開放 AI 爬蟲＋sitemap）、`llms.txt.ts`（純文字**目錄**：站台簡介＋分區連結）、`llms-full.txt.ts`（純文字**全文**：服務說明＋全部 QA 與文章正文＋真實案例，讓 AI 一次讀完直接引用，不必逐頁爬；內容一律取自 `src/content/` 正本與 `site.ts`，勿手寫成第二份會漂移的副本）、sitemap priority 差異化（astro.config.mjs）。

## 數據串接現況（2026-07-24 校正，原「待補」多已完成）
- **聯絡管道**：✅ 已填。`SITE.email` = `service@yao.care`、`SITE.line` = LINE 加好友連結。`/website-check/` 表單**實際走 formsubmit.co 的 ajax 端點轉寄到 `SITE.email`**（2026-07-25 讀碼校正；原本寫「走 mailto」是錯的，mailto 只是表單旁的備援按鈕）。這是唯一會把訪客資料交給第三方的地方，隱私權政策已據此列出。
- **GA4**：✅ 已接。`site.ts` `gaId: "G-86T9ZDJGYH"` 全站輸出（`BaseLayout.astro` 亦支援 `PUBLIC_GA_ID` 覆寫）。實測有數據流入。
- **GSC**：✅ 已接。`sc-domain:arthurs.tw` 驗證完成、sitemap 已提交；納入 seo-ops 每日收集（`/root/seo-ops/sites/arthurs.tw.json`，服務帳號 `/root/.config/arthurs/ga4-sa.json` 唯讀拉 GA4+GSC）。cron：collect 22:00／反思 00:40／大腦 01:15／週報週一。
- **催收錄 indexPing**：2026-07-24 起**已打開**（原 `false`）。每日 collect 後對 10 個重點頁走 Google Indexing API 推送，加速『已發現未收錄』進索引；SA 已驗證有 `indexing` scope 權限。清單見 seo-ops 站台設定 `indexPing.urls`。
- **曝光現況（2026-07-24）**：站新、自然搜尋足跡極薄（GSC 近一週曝光個位數、流量幾乎全直接進站）。增曝光靠內容量×收錄速度×站外連結，非設定問題。
- **品牌色**：目前為深藍青＋暖琥珀佔位，用戶確認後可調 `variables.css`。
- **收費模型（2026-07-21 更新）**：一次性顧問費、無月費、不綁約；**不公開固定金額**，改「多少錢直接問我（加 LINE 或來信）」，詳見檔案頂端「價格政策」。若日後要恢復標價或加「後續協助/月費」層級，需回頭調 how-much-does-it-cost QA（口徑正本）、pricing、service、diy 與 is-consulting-required / what-does-the-service-include / can-beginners-use-ai QA（目前這些都寫「不強制、日後再另談、金額直接問、不報月費數字」）。
- **法律頁（2026-07-25 完成）**：`/privacy/`、`/terms/`、`/disclaimer/` 三頁上線，頁尾 `footer-bottom` 有連結、`llms.txt` 有分區。**署名與生效日期的單一真實來源＝`site.ts` 的 `LEGAL`**（`operator`、`company`、`taxId`、`address`、`phone`、`updated`、`pages[]`）；改 `LEGAL` 一處，三頁法律頁＋Footer＋`/about/` 聯絡卡＋`seo.ts` 的 Organization JSON-LD 全部同步。**2026-07-28 老闆改口徑，登記資料改為公開**（原「暫不公開全名/統編/地址」已作廢）：`company`＝藥提醒科技有限公司、`taxId`＝83620786、`address`＝臺中市西區臺灣大道二段 239 號 13 樓。理由是這些本來就是公開商業登記資料，站上不寫並不少揭露什麼，只是讓 Google 少一個能對上 Google 商家檔案的 NAP 訊號。**`LEGAL.phone` 目前為空字串**（老闆已同意公開，號碼待提供；不可從公開黃頁抄，未必與商家檔案一致）——空字串時 Footer、about 聯絡卡、JSON-LD 的 telephone 都會自動略過，補上號碼即三處同時出現。**改這三個欄位前先確認 Google 商家檔案怎麼寫，必須一字不差**，否則 Google 無法把本網域對上那個商家檔案。隱私權政策照實列出會經手資料的第三方（formsubmit.co／Google Analytics 4＋Search Console／託管平台／LINE、Email／OpenAI），改動資料流時**必須同步改這頁**。版型共用 global.css 的 `.legal` 區塊。
- **`/ai-check/` 不靠 OpenAI 的未公開參數（2026-07-25 定案，別改回去）**：按鈕按一下同時做兩件事——問題寫進剪貼簿、開新分頁到 `https://chatgpt.com/?q=<encodeURIComponent(問題)>`；**問題原文另外直接印在頁面上**（`.ask-item`／`.ask-q`）。三條路（剪貼簿／`q=` 帶入／頁面上的原文）任一條活著這頁就能用，OpenAI 改參數也不會變死路。文案照實寫「問題已經填好就直接按 Enter，沒填就貼上再按 Enter」，**不得回到暗示會自動送出的寫法**。`hints=search` 已拿掉（老闆回報送出後有問題時它有嫌疑，且示範不需要強制搜尋模式）。老闆實測看到的 `[Statsig] .../ces/v1/rgstr 503 biscuit_baker_service_me_circuit_open` 是 OpenAI 遙測端點的斷路器，與送訊息的 `/backend-api/conversation` 無關，屬雜訊。
- 第二階段內容：真實案例內頁（目前 `/cases/` 只有案例牆，卡片外連客戶站，站內沒有個別案例頁）、操作示範影片。
