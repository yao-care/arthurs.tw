import type { APIRoute } from "astro";
import { SITE, PLAN } from "../lib/site";

// /llms.txt：供大型語言模型快速取用的純文字摘要。內容取自 site.ts 既有事實，不杜撰。
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://arthurs.tw");
  const abs = (p: string) => new URL(p, origin).href;
  const body = `# ${SITE.name}（${SITE.domain}）

> ${SITE.tagline}。核心是一筆 ${SITE.price} 元的一次性顧問服務：替看不懂 AI、沒空管網站的人（不分行業），用 AI 把網站建好、交接、帶你上手，並串接 Google Search Console 與 Analytics。

## 這是什麼服務
核心商品是「${SITE.price} 元一次性顧問服務」。理念：大家都能享受 AI 紅利，但很多老闆看不懂、沒空——付一次 ${SITE.price} 元顧問費，我用 AI 幫你把難維護的舊網站換成客戶自有、可用 AI（ChatGPT、Claude 等）聊天更新的新網站，並手把手帶你上手。之後網站是你的，你自己用 AI 更新；沒有月費。AI 會依搜尋資料、來客行為與客戶提問，持續找出內容缺口、產生文章草稿，經人工確認後發布。

## 五個定位
- AI-Ready：能交給 AI 協助維護
- Updatable：用聊天就能更新，不必操作複雜後台
- Trackable：串接 Google Search Console 與 Analytics
- Rankable：為 Google 搜尋、AEO、GEO 持續改善
- Human-Owned：帳號、網址、網站資料都屬於客戶

## 顧問服務（一次性 ${SITE.price} 元；沒有月費）
這筆顧問費幫你搞定：${PLAN.includes.join("、")}。
費用另計：${PLAN.extra.join("、")}。
不包含或需另外評估：${PLAN.notFits.join("、")}。

## 誠實聲明
不保證 Google 排名、不保證被 AI 推薦、不保證訂單或固定時間成效。承諾的是持續收集資料、找出內容缺口、改善內容，並用數據確認下一步。

## 重要頁面
- 服務方式：${abs("/service/")}
- AI 如何運作：${abs("/how-it-works/")}
- AI 自動內容：${abs("/content-lab/")}
- 最新文章：${abs("/articles/")}
- 網站案例：${abs("/cases/")}
- 操作示範：${abs("/demo/")}
- 方案與價格：${abs("/pricing/")}
- 常見問題：${abs("/qa/")}
- 更新紀錄：${abs("/updates/")}
- 網站健檢（傳網址）：${abs("/website-check/")}
- 關於我們：${abs("/about/")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
