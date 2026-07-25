import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import {
  SITE, POSITIONING, PILLARS, PAINS, SOLUTIONS, STEPS, PLAN, OWNERSHIP, CASES, QA_CATEGORIES,
} from "../lib/site";

// /llms-full.txt：本站主要內容的「全文」純文字版，讓 AI 助理一次讀到內容本身，不必逐頁爬。
// 與 /llms.txt 的分工：llms.txt 是目錄（站台簡介＋連結清單），這裡是正文。
// 內容一律取自 src/content/ 的正本與 site.ts 的事實，不另外杜撰。
// 本站規模小，文章與常見問題全文收錄；更新紀錄只列標題與日期。

// 把 Markdown 轉成可讀純文字：去掉標記符號，保留段落、標題文字與條列。
function mdToText(md: string): string {
  return md
    .replace(/\r\n/g, "\n")
    .replace(/^```[\s\S]*?^```$/gm, "")            // 移除程式碼區塊（本站內容目前沒有，保險用）
    .replace(/^#{1,6}\s*/gm, "")                    // 標題符號
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")       // 圖片只留說明文字
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1（$2）") // 連結攤平成「文字（網址）」
    .replace(/\*\*([^*]+)\*\*/g, "$1")              // 粗體
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1$2")      // 斜體
    .replace(/`([^`]+)`/g, "$1")                    // 行內程式碼
    .replace(/^\s*>\s?/gm, "")                      // 引言
    .replace(/^\s*[-*+]\s+/gm, "- ")                // 條列符號統一
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL("https://arthurs.tw");
  const abs = (p: string) => new URL(p, origin).href;

  const articles = (await getCollection("articles")).sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
  const qa = await getCollection("qa");
  const updates = (await getCollection("updates")).sort((a, b) => b.data.date.localeCompare(a.data.date));

  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines);
  const rule = () => push("", "-".repeat(60), "");

  push(
    `# ${SITE.name}（${SITE.domain}）全文內容`,
    "",
    `網站：${SITE.url}`,
    `定位：${SITE.tagline}`,
    "",
    "本檔是本站主要內容的全文純文字版，提供給 AI 助理直接閱讀與引用。",
    `收錄範圍：站台與服務說明、全部 ${qa.length} 則常見問題全文、全部 ${articles.length} 篇文章全文、真實案例清單、更新紀錄標題。`,
    `法律頁、表單頁等次要頁面未收錄；完整頁面索引見 ${abs("/llms.txt")} 與 ${abs("/sitemap-index.xml")}。`,
    "引用時請標明來源網址；各節都附上該內容的正式網址。",
  );

  rule();
  push(
    "## 這個網站在賣什麼",
    "",
    POSITIONING,
    "",
    "核心商品是一次性顧問服務：沒有月費、不綁約。內容是用 AI 幫你把網站建好、交接給你、手把手帶你上手，並串接 Google Search Console 與 Google Analytics。之後網站是你的，你自己用 AI 聊天更新。",
    "費用沒有公開固定金額，因為每家要處理的資料量與網站現況差很多；金額請直接透過 LINE 或 email 詢問，通常一次就講清楚。",
    "",
    `聯絡 email：${SITE.email}`,
    `LINE：${SITE.line}`,
    `所有權：${SITE.ownerNote}`,
    "",
    "誠實聲明：不保證 Google 排名、不保證被 AI 推薦、不保證訂單或固定時間成效。承諾的是把網站建好、交接、帶你上手，資料看得到，需要時再協助。",
  );

  rule();
  push(`## 五個定位（品牌名 Arthurs 拆字：${PILLARS.map((p) => p.chars).join("·")}）`, "");
  for (const p of PILLARS) push(`### ${p.title}`, p.desc, "");

  rule();
  push("## 常見的網站問題", "");
  for (const p of PAINS) push(`- ${p.title}：${p.desc}`);
  push("", "### 這個服務怎麼解", "");
  for (const s of SOLUTIONS) push(`- ${s.title}：${s.desc}`);

  rule();
  push("## 服務流程（三步驟）", `頁面：${abs("/service/")}`, "");
  STEPS.forEach((s, i) => push(`### 步驟 ${i + 1}：${s.title}`, s.desc, ""));

  rule();
  push(
    "## 服務範圍與費用",
    `頁面：${abs("/pricing/")}`,
    "",
    "一次性顧問服務，沒有月費、不綁約，金額不公開，請直接洽詢。",
    "",
    "### 這筆顧問服務包含",
    ...PLAN.includes.map((x) => `- ${x}`),
    "",
    "### 需要你提供",
    ...PLAN.provide.map((x) => `- ${x}`),
    "",
    "### 需另外自備或另計",
    ...PLAN.extra.map((x) => `- ${x}`),
    "",
    "### 適合做成這種網站",
    ...PLAN.fits.map((x) => `- ${x}`),
    "",
    "### 不包含或需另外評估的功能",
    ...PLAN.notFits.map((x) => `- ${x}`),
    "",
    "### 所有權承諾",
    ...OWNERSHIP.map((x) => `- ${x}`),
  );

  rule();
  push(
    "## 真實案例（已上線作品）",
    `頁面：${abs("/cases/")}`,
    "",
    "以下都是實際做出來並上線的網站，不放客戶見證或成效數字。",
    "",
  );
  for (const c of CASES) {
    push(`### ${c.name}（${c.industry}）`, `網址：${c.url}`);
    if (c.deep) push(`代表內頁：${c.deep}`);
    push(c.desc, "");
  }

  rule();
  push("## 常見問題全文", `索引頁：${abs("/qa/")}`, "");
  const qaOrder = (id: string) => {
    const i = QA_CATEGORIES.indexOf(id);
    return i < 0 ? QA_CATEGORIES.length : i;
  };
  const sortedQa = [...qa].sort(
    (a, b) =>
      qaOrder(a.data.category) - qaOrder(b.data.category) ||
      a.data.order - b.data.order ||
      a.id.localeCompare(b.id),
  );
  for (const entry of sortedQa) {
    const d = entry.data;
    push(`### ${d.question}`, `網址：${abs(`/qa/${entry.id}/`)}`, `分類：${d.category}`);
    if (d.updated) push(`更新：${d.updated}`);
    push("", `短答：${d.answer}`, "", mdToText(entry.body ?? ""), "");
  }

  rule();
  push("## 文章全文", `索引頁：${abs("/articles/")}`, "");
  for (const entry of articles) {
    const d = entry.data;
    push(`### ${d.title}`, `網址：${abs(`/articles/${entry.id}/`)}`, `分類：${d.category}`);
    if (d.created) push(`發布：${d.created}`);
    if (d.updated) push(`更新：${d.updated}`);
    push("", `摘要：${d.summary}`, "", mdToText(entry.body ?? ""));
    if (d.citations.length) {
      push("", "外部參考來源：", ...d.citations.map((c) => `- ${c.name}（${c.url}）`));
    }
    const provenance = [
      ["內容產生原因", d.reason],
      ["資料來源", d.sources],
      ["AI 協助", d.aiHelp],
      ["人工確認", d.humanReview],
    ].filter(([, v]) => v) as [string, string][];
    if (provenance.length) {
      push("", "內容來源揭露：", ...provenance.map(([k, v]) => `- ${k}：${v}`));
    }
    push("");
  }

  rule();
  push(
    "## 更新紀錄",
    `頁面：${abs("/updates/")}`,
    "",
    "本站持續依搜尋與流量資料修改內容，以下是公開的修改紀錄標題。",
    "",
  );
  for (const entry of updates) {
    const d = entry.data;
    push(`- ${d.date} ${d.title}${d.page ? `（${d.page}）` : ""}${d.status === "published" ? "" : `［${d.status}］`}`);
  }

  rule();
  push(
    "## 想聯絡",
    "",
    `網站健檢（把現有網址傳來，我先看狀況）：${abs("/website-check/")}`,
    `email：${SITE.email}`,
    `LINE：${SITE.line}`,
    "",
  );

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
