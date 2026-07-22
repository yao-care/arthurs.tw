// 全站事實與文案的單一來源（SEO / 導覽 / 首頁區塊共用）。
// 要改品牌名、聯絡方式、導覽、價格 → 改這裡。

export const SITE = {
  name: "Arthurs",
  domain: "arthurs.tw",
  url: "https://arthurs.tw",
  // 一句話定位（顧問服務視角；餵全站預設 meta、footer、Organization schema）
  tagline: "看不懂 AI、沒空管網站？我用 AI 幫你把網站建好、帶你上手",
  // 對外聯絡（用戶提供）
  email: "service@yao.care",
  line: "https://line.me/ti/p/i0_EpxFQVc",
  priceModel: "一次性顧問費",  // 一次性委任、沒有月費、不綁約；網站不談價，金額走私下聯絡（LINE/email）
  ownerNote: "帳號、網址、網站資料都屬於你自己。",
  themeColor: "#10323f", // 供 <meta theme-color>；HTML 屬性不能用 var()，故置於 .ts（不受設計守門掃描）
  gaId: "G-86T9ZDJGYH", // GA4 評估 ID（公開值，全站輸出）；BaseLayout 亦支援 PUBLIC_GA_ID 覆寫
};

// 核心定位一句話（全站共用）：賣的是顧問服務，不是便宜建站。網站上不談價（金額走私下聯絡）。
export const POSITIONING =
  "大家都能享受 AI 紅利。看不懂、沒空管網站也沒關係——把網站交給我，用 AI 幫你做好、帶你上手，之後你自己用聊天更新。";

// 主選單（桌面）。href 指向 MVP 已建立的頁面。
export const NAV = [
  { label: "服務方式", href: "/service/" },
  { label: "AI 如何運作", href: "/how-it-works/" },
  { label: "案例", href: "/cases/" },
  { label: "服務範圍", href: "/pricing/" },
  { label: "常見問題", href: "/qa/" },
];

// 全站兩個核心行動的唯一來源。所有 CTA 按鈕都經 <Cta/> 元件讀這裡，
// 不再各頁硬編文字或 markup。要改文案/落點，只改這兩行。
// （表單送出鈕「送出網站網址」、LINE 鈕屬情境專用，留在各自頁面。）
export const CTA = {
  primary: { label: "我想升級網站", href: "/website-check/" },
  secondary: { label: "看 AI 怎麼做", href: "/how-it-works/" },
};

// 五大定位支柱（全站唯一來源）—— 品牌名 Arthurs 拆字：AI-Ready 一字給了 A＋R（AI + Ready），
// Trackable→T、Human-Owned→H、Updatable→U，Rankable 給尾巴的 R，合起來拼成 ARTHUR；結尾 s＝複數。
// 順序即拼字順序。欄位：chars=在拼字裡佔的字母（hero 字母欄／揭曉大字／卡片徽章共用）、
// label=英文名、title=中英合併標題、note=短描述（hero／llms 用）、desc=長描述（卡片用）。
export const BRAND = { word: "Arthurs", acronym: "Arthur", plural: "s" };
// hi = label 裡要上品牌色的字母索引（即該承諾在 Arthurs 拼字裡佔的字母）：
// AI-Ready 佔 A（index 0）與 R（index 3，"AI-Ready" 的 R），其餘取首字。由上往下讀＝ARTHUR。
export const PILLARS = [
  { key: "ai-ready", chars: "AR", hi: [0, 3], label: "AI-Ready", title: "AI-Ready 可交給 AI 維護", note: "能交給 ChatGPT、Claude 等 AI 協助維護", desc: "網站能交給 ChatGPT、Claude 等 AI 協助更新，不必回頭找廠商。" },
  { key: "trackable", chars: "T", hi: [0], label: "Trackable", title: "Trackable 資料看得到", note: "串接 Search Console、Google Analytics", desc: "串接 Google Search Console 與 Analytics，知道客戶怎麼找到你、看了什麼。" },
  { key: "human-owned", chars: "H", hi: [0], label: "Human-Owned", title: "Human-Owned 網站是你的", note: "帳號、網址、網站資料都屬於你", desc: "帳號、網址、網站資料全部屬於你，隨時可以自己管理或交給別人接手。" },
  { key: "updatable", chars: "U", hi: [0], label: "Updatable", title: "Updatable 聊天就能更新", note: "不必操作複雜後台，用聊天就能更新", desc: "新增產品、修改介紹、更新案例，用一般說話的方式告訴 AI 就好。" },
  { key: "rankable", chars: "R", hi: [0], label: "Rankable", title: "Rankable 容易被找到", note: "為 Google 搜尋、AEO、GEO 打好基礎", desc: "資料結構化、該有的頁面都齊，為 Google 搜尋與 AI 問答（AEO、GEO）打好基礎，讓客戶更容易找到你。" },
];

// 網站六大痛點
export const PAINS = [
  { title: "網站多年沒有更新", desc: "新產品、新設備、成功案例和公司消息，還停留在幾年前。" },
  { title: "修改內容還得找廠商", desc: "改一段文字、增加一項產品，還要詢價、等待、來回確認。" },
  { title: "Google 搜尋找不到公司", desc: "網站內容太舊、太少，搜尋引擎不知道你真正提供哪些服務。" },
  { title: "有人進網站也不知道在看什麼", desc: "不知道訪客從哪裡來、看了哪些內容，也不知道下一步該改善什麼。" },
  { title: "控制權不在自己手上", desc: "帳號、主機、程式或設定掌握在原廠商手中，想換人管理也很困難。" },
];

// 核心解法（三項）
export const SOLUTIONS = [
  { title: "跟 AI 聊天就能更新", desc: "新增產品、修改介紹、更新案例，只要用一般說話的方式告訴 AI。" },
  { title: "網站完全屬於你", desc: "帳號、網址、網站資料都在你名下，隨時可以自己管理，或交給別人接手。" },
  { title: "為 Google 與 AI 整理好", desc: "資料結構化、該有的頁面都齊，讓搜尋引擎和 AI 問答更容易正確認識你的公司。" },
];

// 三步驟建置流程
export const STEPS = [
  { title: "提供現有資料", desc: "現有網站網址、公司簡介、產品型錄、案例、圖片、聯絡資訊都可以。不用先整理成網站格式。" },
  { title: "我們整理、建置並上線", desc: "整理文案與圖片、建立網站架構、製作手機平板電腦版面、綁定你自己的網域、設定 Google Search Console 與 Analytics、建立 AI 更新環境、完成上線。" },
  { title: "完整交接給你", desc: "你自己的帳號、你自己的網域、完整網站資料、AI 更新操作方式、搜尋與流量資料權限、完整交接表。完成後可以自己管理，需要協助時再找我們。" },
];

// 一次性顧問服務內容（這筆顧問服務幫你把整件事搞定；網站不談價，金額走私下聯絡）
export const PLAN = {
  includes: [
    "把你手上的文案與圖片整理成網站內容",
    "用 AI 幫你把公司形象與服務網站建好",
    "產品與案例內容整理",
    "手機、平板及電腦版面",
    "綁定你自己的網域",
    "設定 Google Search Console",
    "設定 Google Analytics",
    "手把手教你用 AI 更新網站（帶你上手）",
    "網站正式上線",
    "完整交接表",
  ],
  provide: [
    "公司文案或現有資料",
    "產品、服務及案例圖片",
    "公司基本資訊",
    "自有或準備申請的網域",
  ],
  extra: [
    "網域註冊費",
    "網域每年續約費",
    "你自己訂閱的 AI 服務（ChatGPT/Claude 等）",
    "額外客製功能",
  ],
  fits: [
    "公司形象網站", "產品服務介紹", "製造能力與設備介紹",
    "成功案例", "最新消息", "聯絡及詢價資訊", "內容型網站",
  ],
  notFits: [
    "購物車及線上付款", "會員登入", "即時庫存", "複雜預約",
    "大型資料庫", "ERP 或 CRM", "高度客製化互動系統",
  ],
};

// 所有權四項承諾
export const OWNERSHIP = ["帳號是你的", "網址是你的", "網站資料是你的", "完整交接文件也是你的"];

// 首頁精選 QA：只存 slug，問句一律取自 QA 集合正本（避免第二份硬編漂移、
// 也避免首頁 FAQ 結構化資料與 /qa/ 給出不同問句）。順序即首頁顯示順序。
export const FEATURED_QA = [
  "what-does-the-service-include",
  "why-no-hosting-maintenance-fee",
  "can-beginners-use-ai",
  "what-if-ai-makes-a-mistake",
  "who-owns-the-website",
  "can-google-ranking-be-guaranteed",
  "can-chatgpt-recommendation-be-guaranteed",
  "is-consulting-required",
  "what-functions-are-not-included",
];

// 真實參考案例（用戶提供的實際作品；可外連到實站。持續更新中）。
// 誠實原則：這些是真的做出來、已上線的網站；不編造客戶見證或成效數字。
export const CASES = [
  { name: "本站 Arthurs", industry: "AI 網站服務", url: "https://arthurs.tw", self: true, desc: "你現在看到的這個網站，本身就是用同一套方式建置、用聊天維護。" },
  { name: "台灣無人機足球（飛球）", industry: "運動賽事平台", url: "https://twdro.net", desc: "賽事、隊伍與規則資料平台。" },
  { name: "國際醫療減碳協會", industry: "醫療／非營利", url: "https://crinhealthcare.org/", desc: "協會理念、專案與衛教內容網站。" },
  { name: "鄭骨館體雕中心", industry: "在地健康服務", url: "https://www.olderkkk.com/", desc: "台中在地服務業官網，服務、案例與健康文章持續更新。" },
  { name: "Vuko 呼吸練習", industry: "健康工具", url: "https://vuko.life/", desc: "呼吸練習內容與工具網站。" },
  { name: "神酷 folk", industry: "文化／內容", url: "https://folk.tw/", desc: "內容型知識網站。" },
  { name: "尊茂", industry: "企業官網", url: "https://www.dreamer868.com/", desc: "公司形象與內容網站。" },
  { name: "好棋寶寶協會", industry: "兒童教育／協會", url: "https://www.weiqi.kids/", desc: "圍棋教育協會網站。" },
  { name: "本日有據", industry: "健康科普／內容", url: "https://evidencetoday.news/", desc: "整理健康研究與新聞、破除迷思的健康科普網站，來源透明、白話解讀。" },
];

// QA 分類（/qa/ 用）
export const QA_CATEGORIES = [
  "價格與服務範圍", "AI 更新網站",
  "Google 搜尋、AEO 與 GEO", "所有權、主機與安全", "顧問與後續服務",
];
