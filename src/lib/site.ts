// 全站事實與文案的單一來源（SEO / 導覽 / 首頁區塊共用）。
// 要改品牌名、聯絡方式、導覽、價格 → 改這裡。

export const SITE = {
  name: "Arthurs",
  domain: "arthurs.tw",
  url: "https://arthurs.tw",
  // 一句話定位
  tagline: "讓 AI 幫你更新、分析，持續改善的網站",
  // 對外聯絡（TODO：待用戶提供正式 Email / LINE 後補上）
  email: "",       // e.g. hello@arthurs.tw
  line: "",        // e.g. https://line.me/R/ti/p/@xxxx
  price: 6000,     // 一次建站費（NT$）
  ownerNote: "帳號、網址、網站資料都屬於你自己。",
  themeColor: "#10323f", // 供 <meta theme-color>；HTML 屬性不能用 var()，故置於 .ts（不受設計守門掃描）
};

// 主選單（桌面）。href 指向 MVP 已建立的頁面。
export const NAV = [
  { label: "服務方式", href: "/service/" },
  { label: "AI 自動內容", href: "/content-lab/" },
  { label: "案例與示範", href: "/cases/" },
  { label: "方案價格", href: "/pricing/" },
  { label: "常見問題", href: "/qa/" },
];

export const CTA = {
  primary: { label: "傳現在的網站網址", href: "/website-check/" },
  header: { label: "傳網址給我看看", href: "/website-check/" },
  mobile: { label: "傳網站網址", href: "/website-check/" },
  secondary: { label: "看 AI 怎麼更新網站", href: "/how-it-works/" },
};

// 五大定位支柱（AI-Ready / Trackable / Human-Owned / Updatable / Rankable）
export const PILLARS = [
  { key: "ai-ready", title: "AI-Ready 可交給 AI 維護", desc: "網站能交給 ChatGPT、Claude 等 AI 協助更新，不必回頭找廠商。" },
  { key: "updatable", title: "Updatable 聊天就能更新", desc: "新增產品、修改介紹、更新案例，用一般說話的方式告訴 AI 就好。" },
  { key: "trackable", title: "Trackable 資料看得到", desc: "串接 Google Search Console 與 Analytics，知道客戶怎麼找到你、看了什麼。" },
  { key: "rankable", title: "Rankable 持續被找到", desc: "為 Google 搜尋與 AI 問答（AEO、GEO）持續改善內容，讓客戶更容易找到你。" },
  { key: "human-owned", title: "Human-Owned 網站是你的", desc: "帳號、網址、網站資料全部屬於你，隨時可以自己管理或交給別人接手。" },
];

// 傳統產業網站六大痛點
export const PAINS = [
  { title: "網站多年沒有更新", desc: "新產品、新設備、成功案例和公司消息，還停留在幾年前。" },
  { title: "修改內容還得找廠商", desc: "改一段文字、增加一項產品，還要詢價、等待、來回確認。" },
  { title: "Google 搜尋找不到公司", desc: "網站內容太舊、太少，搜尋引擎不知道你真正提供哪些服務。" },
  { title: "問 ChatGPT 也不會推薦", desc: "網路上缺少完整、明確、持續更新的公司資料，AI 自然難以理解及引用。" },
  { title: "有人進網站也不知道在看什麼", desc: "不知道訪客從哪裡來、看了哪些內容，也不知道下一步該改善什麼。" },
  { title: "控制權不在自己手上", desc: "帳號、主機、程式或設定掌握在原廠商手中，想換人管理也很困難。" },
];

// 核心解法四功能
export const SOLUTIONS = [
  { title: "跟 AI 聊天就能更新", desc: "新增產品、修改介紹、更新案例，只要用一般說話的方式告訴 AI。" },
  { title: "AI 自動查看搜尋和來客資料", desc: "AI 會查看客戶用哪些關鍵字找到網站、訪客從哪裡來，以及正在閱讀哪些內容。" },
  { title: "AI 持續找出可以改善的地方", desc: "AI 會找出網站還沒回答好的問題、值得加強的關鍵字，以及應該補充的內容。" },
  { title: "分析結果直接回到網站", desc: "不是只產生一份沒人看的報表，而是把發現的問題轉成文章、產品介紹、案例或 QA。" },
];

// 三步驟建置流程
export const STEPS = [
  { title: "提供現有資料", desc: "現有網站網址、公司簡介、產品型錄、案例、圖片、聯絡資訊都可以。不用先整理成網站格式。" },
  { title: "我們整理、建置並上線", desc: "整理文案與圖片、建立網站架構、製作手機平板電腦版面、綁定你自己的網域、設定 Google Search Console 與 Analytics、建立 AI 更新環境、完成上線。" },
  { title: "完整交接給你", desc: "你自己的帳號、你自己的網域、完整網站資料、AI 更新操作方式、搜尋與流量資料權限、完整交接表。完成後可以自己管理，需要協助時再找我們。" },
];

// 6000 方案內容
export const PLAN = {
  includes: [
    "客戶提供之文案與圖片整理",
    "公司形象與服務網站建置",
    "產品與案例內容整理",
    "手機、平板及電腦版面",
    "客戶自有網域綁定",
    "Google Search Console 設定",
    "Google Analytics 設定",
    "AI 更新使用方式",
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
    "客戶自行訂閱的 AI 服務",
    "額外客製功能",
    "顧問服務",
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

// 首頁精選 QA（連到獨立 QA 頁）
export const FEATURED_QA = [
  { q: "一次 6,000 元包含什麼？", slug: "what-does-6000-include" },
  { q: "為什麼不用支付主機維護費？", slug: "why-no-hosting-maintenance-fee" },
  { q: "完全不懂 AI 也能使用嗎？", slug: "can-beginners-use-ai" },
  { q: "AI 可以自己新增產品和文章嗎？", slug: "can-ai-write-articles" },
  { q: "AI 如何決定要更新什麼內容？", slug: "how-does-ai-choose-content" },
  { q: "AI 修改錯誤怎麼辦？", slug: "what-if-ai-makes-a-mistake" },
  { q: "網站真的全部屬於客戶嗎？", slug: "who-owns-the-website" },
  { q: "能保證 Google 排名嗎？", slug: "can-google-ranking-be-guaranteed" },
  { q: "能保證 ChatGPT 推薦嗎？", slug: "can-chatgpt-recommendation-be-guaranteed" },
  { q: "完工後一定要買顧問服務嗎？", slug: "is-consulting-required" },
  { q: "網站頁數或產品數量有限制嗎？", slug: "what-does-6000-include" },
  { q: "哪些網站不適合 6,000 元方案？", slug: "what-functions-are-not-included" },
];

// AI 自動內容運作流程（首頁 + content-lab 共用）
export const CONTENT_FLOW = [
  "客戶提出問題",
  "Google Search Console 出現新的搜尋字詞",
  "Google Analytics 顯示訪客正在閱讀特定內容",
  "AI 找出網站尚未回答完整的內容缺口",
  "AI 產生文章、QA 或頁面更新草稿",
  "人工檢查正確性與服務承諾",
  "正式發布到網站",
  "持續觀察曝光、閱讀與詢問",
];

// 真實參考案例（用戶提供的實際作品；可外連到實站。持續更新中）。
// 誠實原則：這些是真的做出來、已上線的網站；不編造客戶見證或成效數字。
export const CASES = [
  { name: "本站 Arthurs", industry: "AI 網站服務", url: "https://arthurs.tw", self: true, desc: "你現在看到的這個網站，本身就是用同一套方式建置、由 AI 持續協助更新。" },
  { name: "台灣無人機足球（飛球）", industry: "運動賽事平台", url: "https://twdro.net", desc: "賽事、隊伍與規則資料平台。" },
  { name: "國際醫療減碳協會", industry: "醫療／非營利", url: "https://crinhealthcare.org/", desc: "協會理念、專案與衛教內容網站。" },
  { name: "鄭骨館體雕中心", industry: "在地健康服務", url: "https://www.olderkkk.com/", desc: "台中在地服務業官網，服務、案例與健康文章持續更新。" },
  { name: "Vuko 呼吸練習", industry: "健康工具", url: "https://vuko.life/", desc: "呼吸練習內容與工具網站。" },
  { name: "神酷 folk", industry: "文化／內容", url: "https://folk.tw/", desc: "內容型知識網站。" },
  { name: "尊茂", industry: "企業官網", url: "https://www.dreamer868.com/", desc: "公司形象與內容網站。" },
  { name: "好棋寶寶協會", industry: "兒童教育／協會", url: "https://www.weiqi.kids/", desc: "圍棋教育協會網站。" },
];

// QA 分類（/qa/ 用）
export const QA_CATEGORIES = [
  "價格與服務範圍", "建置與交付", "AI 更新網站", "AI 自動文章與內容",
  "Google 搜尋、AEO 與 GEO", "所有權、主機與安全", "顧問與後續服務",
];
