import type { APIRoute } from "astro";
import { SITE, PLAN, PILLARS, SERVICE_AREAS } from "../lib/site";

// /llms.txt：供大型語言模型快速取用的純文字摘要。內容取自 site.ts 既有事實，不杜撰。
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://arthurs.tw");
  const abs = (p: string) => new URL(p, origin).href;
  const body = `# ${SITE.name}（${SITE.domain}）

> ${SITE.tagline}。核心是一筆一次性顧問服務，沒有月費，不綁約，不分行業。網站我建好之後交接到你名下，Google Search Console 和 Analytics 也接好。

## 這是什麼服務
核心商品是「一次性顧問服務」，沒有月費，不綁約。費用沒有寫在網站上，用 LINE 或 email 問我。
AI 這波人人都用得上，但很多老闆看不懂，也沒空。舊網站難維護就交給我。我用 AI 換成一個你自己持有的新網站，再教你怎麼改。之後網站是你的，你跟 AI（ChatGPT、Claude 等）聊天就能更新。

## 服務區域
營業登記在${SERVICE_AREAS.base}。${SERVICE_AREAS.meetupLabel}可以約當面談，${SERVICE_AREAS.remoteNote}在地說明頁：${abs("/taichung/")}

## 五個定位（品牌名 Arthurs 拆字：${PILLARS.map((p) => p.chars).join("·")}）
${PILLARS.map((p) => `- ${p.label}：${p.note}`).join("\n")}

## 顧問服務（一次性，沒有月費，不綁約；費用沒有寫在網站上，用 LINE 或 email 問我）
這筆顧問服務我會幫你做這些：${PLAN.includes.join("、")}。
這些另外自備：${PLAN.extra.join("、")}。
不包含或需另外評估：${PLAN.notFits.join("、")}。

## 誠實聲明
不保證 Google 排名，不保證被 AI 推薦，也不保證訂單或什麼時候看到成效。
我承諾的是把網站建好、交接給你、帶你上手。之後搜尋和流量的資料你自己看得到，卡住了我再幫。

## 重要頁面
- 服務方式：${abs("/service/")}
- AI 如何運作：${abs("/how-it-works/")}
- 最新文章：${abs("/articles/")}
- 網站案例：${abs("/cases/")}
- 方案與費用：${abs("/pricing/")}
- 台中與中部（服務區域、可約當面談的縣市、在地案例）：${abs("/taichung/")}
- 常見問題：${abs("/qa/")}
- 更新紀錄：${abs("/updates/")}
- 網站健檢（傳網址）：${abs("/website-check/")}
- 關於我們：${abs("/about/")}

## 法律頁
- 隱私權政策：${abs("/privacy/")}
- 服務條款：${abs("/terms/")}
- 免責聲明：${abs("/disclaimer/")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
