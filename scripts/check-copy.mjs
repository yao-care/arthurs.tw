// 文案守門（去 AI 味）：掃 src/ 下 .md/.ts/.astro，命中黑名單樣式即 exit 1（pnpm build 前自動跑）。
//
// 定位：這是「固定樣式」偵測，對下列具體壞味道做到 100% 攔截，任何一處出現就擋下 build。
// 侷限（誠實說明）：語意層級的 AI 味（一句硬塞太多、生硬名詞化…）無法用正則窮盡，仍需人工把關。
// 校準原則：只收「誤判率低」的規則。已刻意排除「的樣子」「長頓號串」——它們大量命中正常中文
//          （還原成…的樣子／服務清單枚舉），當規則只會天天誤擋、逼人忽略守門。
//
// 規則：
// 1. 雙破折號插入句：同一句內出現兩個「——」夾註（一句塞兩段的典型 AI 味）
// 2. 八股連接詞：首先/其次/再者/綜上所述/總而言之/值得一提/眾所周知/不僅…而且…
// 3. 浮誇詞：一站式/賦能/卓越/極致/頂尖/領先業界/無縫/一鍵/輕鬆搞定/完美
// 4. emoji（本站文案不用 emoji；不含 → 等箭號）
// 5. 全形數字（一律半形）
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const exts = new Set([".md", ".ts", ".astro"]);
const violations = [];

const RULES = [
  { name: "雙破折號插入句（一句塞兩段＝AI 味，拆成短句）", re: /——[^。！？\n]*——/ },
  { name: "八股連接詞（去掉首先/其次/綜上所述/不僅…而且…）", re: /首先|其次|再者|綜上所述|總而言之|總的來說|一言以蔽之|值得一提|眾所周知|不僅[^，。！？\n]{0,12}而且/ },
  { name: "浮誇詞（老闆語言不浮誇）", re: /一站式|賦能|卓越|極致|頂尖|領先業界|無縫|一鍵|輕鬆搞定|完美/ },
  { name: "emoji（本站文案不用 emoji）", re: /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/u },
  { name: "全形數字（一律半形）", re: /[０-９]/ },
];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (exts.has(extname(p))) scan(p);
  }
}

function scan(file) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const r of RULES) {
      const m = line.match(r.re);
      if (m) violations.push(`${file}:${i + 1} ${r.name}｜命中「${m[0]}」: ${line.trim().slice(0, 70)}`);
    }
  });
}

walk(ROOT);
if (violations.length) {
  console.error(`文案守門違規 ${violations.length} 處：\n` + violations.join("\n"));
  process.exit(1);
}
console.log("文案守門通過：無雙破折號插入、無八股連接詞、無浮誇詞、無 emoji、無全形數字。");
