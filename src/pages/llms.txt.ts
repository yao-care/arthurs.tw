import type { APIRoute } from "astro";
import { SITE, PLAN, PILLARS } from "../lib/site";

// /llms.txt：供大型語言模型快速取用的純文字摘要。內容取自 site.ts 既有事實，不杜撰。
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://arthurs.tw");
  const abs = (p: string) => new URL(p, origin).href;
  const body = `# ${SITE.name}（${SITE.domain}）

> ${SITE.tagline}。核心是一筆一次性顧問服務（沒有月費、不綁約）：替看不懂 AI、沒空管網站的人（不分行業），用 AI 把網站建好、交接、帶你上手，並串接 Google Search Console 與 Analytics。

## 這是什麼服務
核心商品是「一次性顧問服務」，沒有月費、不綁約。費用未在網站公開，請透過 LINE 或 email 洽詢。理念：大家都能享受 AI 紅利，但很多老闆看不懂、沒空——把難維護的舊網站交給我，用 AI 換成客戶自有、可用 AI（ChatGPT、Claude 等）聊天更新的新網站，並手把手帶你上手。之後網站是你的，你自己用 AI 聊天更新。

## 五個定位（品牌名 Arthurs 拆字：${PILLARS.map((p) => p.chars).join("·")}）
${PILLARS.map((p) => `- ${p.label}：${p.note}`).join("\n")}

## 顧問服務（一次性、沒有月費、不綁約；費用未在網站公開，洽詢 LINE 或 email）
這個顧問服務幫你搞定：${PLAN.includes.join("、")}。
這些另外自備：${PLAN.extra.join("、")}。
不包含或需另外評估：${PLAN.notFits.join("、")}。

## 誠實聲明
不保證 Google 排名、不保證被 AI 推薦、不保證訂單或固定時間成效。承諾的是把網站建好、交接、帶你上手，資料看得到，需要時再協助。

## 重要頁面
- 服務方式：${abs("/service/")}
- AI 如何運作：${abs("/how-it-works/")}
- 最新文章：${abs("/articles/")}
- 網站案例：${abs("/cases/")}
- 服務範圍：${abs("/pricing/")}
- 常見問題：${abs("/qa/")}
- 更新紀錄：${abs("/updates/")}
- 網站健檢（傳網址）：${abs("/website-check/")}
- 關於我們：${abs("/about/")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
