#!/usr/bin/env node
// 部署後把「這次真的變動到的頁面」通知 IndexNow（Bing / Yandex 等即時重爬）。
// IndexNow 金鑰是公開設計（同時 serve 在 /<key>.txt），非機密，故可寫在原始碼。
// 用法：node scripts/indexnow.mjs <這次 push 變動的檔案清單...>
//   （由 .github/workflows/deploy.yml 用 `git diff --name-only HEAD^ HEAD` 帶入）
// 只推變更頁、避免對未變動 URL 重複轟炸（IndexNow 準則）；查無對應頁時只推首頁。

const KEY = "e1ac139fe05122f9abf28476511e3c1d";
const HOST = "arthurs.tw";
const ORIGIN = `https://${HOST}`;

const base = (f) => f.split("/").pop().replace(/\.[^.]+$/, "");

// 把 repo 檔路徑對應成正式站 URL（結尾斜線版；GH Pages 目錄式路由）。
function toUrl(file) {
  if (!file) return null;
  if (file.startsWith("src/content/qa/") && file.endsWith(".md")) return `${ORIGIN}/qa/${base(file)}/`;
  if (file.startsWith("src/content/articles/") && file.endsWith(".md")) return `${ORIGIN}/articles/${base(file)}/`;
  // 更新紀錄無個別頁，變動時推 /updates/ 列表
  if (file.startsWith("src/content/updates/") && file.endsWith(".md")) return `${ORIGIN}/updates/`;
  // 首頁區塊/事實骨幹/schema 變動 → 影響面大，推首頁
  if (file === "src/pages/index.astro" || file === "src/lib/site.ts" || file === "src/lib/seo.ts") return `${ORIGIN}/`;
  // src/pages/<name>/index.astro 或 src/pages/<name>.astro → /<name>/
  const m = file.match(/^src\/pages\/(.+?)(?:\/index)?\.astro$/);
  if (m && m[1] !== "index") return `${ORIGIN}/${m[1].replace(/\/index$/, "")}/`;
  return null;
}

const changed = process.argv.slice(2);
const urls = new Set(changed.map(toUrl).filter(Boolean));
// 內容有變一律連帶推首頁與列表頁（它們會列出新內容）
if ([...urls].some((u) => u.includes("/articles/"))) urls.add(`${ORIGIN}/articles/`);
if ([...urls].some((u) => u.includes("/qa/"))) urls.add(`${ORIGIN}/qa/`);
if (urls.size === 0) urls.add(`${ORIGIN}/`);

const urlList = [...urls];
console.log(`[indexnow] 送出 ${urlList.length} 個 URL：`);
urlList.forEach((u) => console.log("  •", u));

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});
// IndexNow 成功回 200 或 202；失敗不讓部署紅（收錄是加速手段、非硬門檻）。
console.log(`[indexnow] HTTP ${res.status} ${res.statusText}`);
if (!res.ok) {
  console.warn(`[indexnow] 提交未成功（不影響部署）：${await res.text().catch(() => "")}`);
}
