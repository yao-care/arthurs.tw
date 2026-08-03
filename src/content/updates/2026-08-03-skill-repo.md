---
title: "公開的建站 skill 移到獨立 repo，並補上守門腳本與範本"
date: "2026-08-03"
page: "/diy/"
reason: "原本 skill 只有一份 SKILL.md 掛在網站底下，照著做要自己刻設定。改成獨立的公開 repo，補上兩支 build 守門腳本和五份可直接改的範本，讓拿去用的人少走一段路。"
source: "站外資源清單第 4 項（開源 skill 進 awesome list）"
aiHelp: "整理通用版檔案、清除內部設定痕跡、撰寫說明"
humanReview: "2026-08-03 逐檔確認不含任何客戶站名與內部設定，兩支腳本實測可用"
watch: "repo 是否有人使用、投稿的清單是否收錄"
status: "published"
---

建站 skill 移到 [yao-care/ai-ready-website](https://github.com/yao-care/ai-ready-website)（MIT 授權），日後以該 repo 為正本，本站這份保持同步。除了原有的建站流程，補上兩支 build 守門腳本（設計規範、中文 AI 腔）與五份範本：設計 token、內容集 schema、JSON-LD 產生器、sitemap 設定（含逐頁 lastmod）、GitHub Pages 部署 workflow。搬進 repo 前逐檔清掉指向其他網站的內部註記。
