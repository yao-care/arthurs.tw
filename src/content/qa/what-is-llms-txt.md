---
question: "llms.txt 是什麼？要怎麼設定，AI 才看得懂我的網站？"
category: "Google 搜尋、AEO 與 GEO"
answer: "llms.txt 是放在網站根目錄的純文字檔，把服務內容和重要頁面連結整理成 AI 容易讀取的格式；robots.txt 也要放行 AI 爬蟲，兩者搭配 AI 才進得來又看得懂。這個網站本身就是這樣設定的，你可以直接打開看。"
order: 8
updated: "2026-07-30"
related: ["can-chatgpt-recommendation-be-guaranteed", "can-google-ranking-be-guaranteed", "geo-vs-seo"]
relatedArticles: ["chatgpt-doesnt-know-my-company", "how-to-get-chatgpt-to-mention-you"]
---

## 詳細說明

網站設定分兩層，先講規則，再講內容。

第一層是 robots.txt，寫著哪些爬蟲可以進來。一般網站常常只放行 Google，沒特別處理 ChatGPT、Perplexity 這類 AI 助理用的爬蟲(GPTBot、PerplexityBot、ClaudeBot 等)，等於門沒開，AI 自然讀不到內容。這個網站的 [robots.txt](/robots.txt) 把這幾隻常見的 AI 爬蟲都列成允許讀取。

第二層是 llms.txt，這是近兩年 AI 圈慢慢在用的一份純文字摘要檔，放在網站根目錄，把「這站在做什麼、重要頁面在哪」整理成一份 AI 一讀就懂的清單，不必自己爬完整站才拼湊得出來。這個網站的 [llms.txt](/llms.txt) 就是這樣寫的：服務內容、五大定位、重要頁面連結，一段一段列清楚。另外還多做一份 [llms-full.txt](/llms-full.txt)，把全部常見問題和文章正文原文收進去，AI 助理可以一次讀到完整內容，不用逐頁爬。

這兩份檔案不會直接讓 AI 保證推薦你，但少了它們，AI 助理要理解一個網站得靠自己爬、自己猜，漏讀、誤讀的機率高很多。設定這兩份檔案加上開放 robots.txt，是把「讓 AI 讀懂」這件事講清楚，不是靠玄學。
