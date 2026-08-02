---
title: "sitemap 補上每頁的最後更新日期"
date: "2026-08-02"
page: "/sitemap-0.xml"
reason: "查收錄卡住的原因，發現前提搞錯了。原以為是 Google 看過決定不收，實際翻 13 天資料：Google 爬過的頁 100% 收錄，一次退件都沒有，卡住的 20 頁全部沒有被爬過的紀錄。瓶頸是爬取速度，不是內容品質。而站上的 sitemap 一直沒有 lastmod，只給了 Google 明說不看的兩個欄位。"
source: "GSC index coverage 13 天資料回溯＋sitemap 內容檢查"
aiHelp: "回溯每日資料、比對爬取時間與收錄狀態、實作 lastmod"
humanReview: "2026-08-02 實作後驗證 53 個網址全數帶真實日期且日期各異，未整份塞當天"
watch: "接下來兩週的爬取速度是否回升、Discovered 頁數是否下降"
status: "published"
---

`astro.config.mjs` 的 sitemap 設定補上逐頁 `lastmod`：文章與常見問題取內容檔案裡的更新日期，固定頁面取該頁原始檔最後一次修改的日期，查不到就不寫。刻意不整份填今天的日期，那會讓 Google 認定整份 sitemap 不可信。同時修正一項先前的誤判紀錄：`/pricing/` 卡住的原因不是與首頁重複（7-30 已為此改過一輪但狀態未變），是根本還沒被爬到。
