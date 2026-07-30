// JSON-LD 結構化資料產生器（GEO/AEO：讓搜尋引擎與 AI 更容易理解本站）。
// 只描述真實事實，不杜撰。
import { SITE, LEGAL, SERVICE_AREAS } from "./site";

const ORIGIN = SITE.url;
export const abs = (p: string) => new URL(p, ORIGIN).href;

export function organizationSchema() {
  // sameAs：只放能相互佐證的真實外部識別（LINE 官方帳號、公開的 GitHub org）。
  // 待補（有了再加，勿杜撰）：Wikidata、FB 粉專、LinkedIn 公司頁。
  const sameAs = [SITE.line, LEGAL.gbpUrl, "https://github.com/yao-care"].filter(Boolean);
  // 型別同時宣告 Organization 與 ProfessionalService（LocalBusiness 子型），讓同一個實體
  // 既是品牌也是可被地域理解的在地服務業者。地址與統編來自公開商業登記（LEGAL），
  // 必須與 Google 商家檔案寫法一致，否則 Google 無法把本網域對上那個商家檔案。
  // 沒有實體門市可供上門，故不放 openingHours；沒有經緯度就不放 geo（勿杜撰）。
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${ORIGIN}/#organization`,
    name: SITE.name,
    ...(LEGAL.company ? { legalName: LEGAL.company } : {}),
    ...(LEGAL.taxId ? { taxID: LEGAL.taxId } : {}),
    ...(LEGAL.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: LEGAL.address.replace(/^臺中市西區/, ""),
            addressLocality: "西區",
            addressRegion: "臺中市",
            addressCountry: "TW",
          },
        }
      : {}),
    ...(LEGAL.phone ? { telephone: LEGAL.phone } : {}),
    areaServed: [
      ...SERVICE_AREAS.meetup.map((name) => ({ "@type": "AdministrativeArea", name })),
      { "@type": "Country", name: "臺灣" },
    ],
    url: ORIGIN,
    logo: abs("/og.png"),
    image: abs("/og.png"),
    description: `${SITE.tagline}。不分行業，提供一次性顧問服務：客戶自有、可用 AI 聊天更新的網站建置與帶你上手。`,
    knowsAbout: ["AI 網站建置", "AEO", "GEO", "SEO", "網站內容維護", "Google Search Console", "Google Analytics"],
    ...(SITE.email ? { email: SITE.email, contactPoint: { "@type": "ContactPoint", email: SITE.email, contactType: "customer support", areaServed: "TW", availableLanguage: ["zh-Hant"] } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${ORIGIN}/#website`,
    name: SITE.name,
    url: ORIGIN,
    inLanguage: "zh-Hant-TW",
    publisher: { "@id": `${ORIGIN}/#organization` },
  };
}

// opts.local：在地頁（/taichung/）用。把 areaServed 從整個台灣收斂到可當面談的那幾個縣市，
// 讓這一頁講的服務範圍和頁面正文一致；其餘頁面照舊宣告全台。
export function serviceSchema(opts: { local?: boolean } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.local ? "台中與中部 AI 網站顧問服務" : "AI 網站顧問服務",
    serviceType: "顧問服務",
    provider: { "@id": `${ORIGIN}/#organization` },
    areaServed: opts.local
      ? SERVICE_AREAS.meetup.map((name) => ({ "@type": "AdministrativeArea", name }))
      : "TW",
    description: opts.local
      ? `一次性顧問服務，服務提供者位於${SERVICE_AREAS.base}：用 AI 把既有資料建成一個客戶自有、可聊天更新、並串接 Google Search Console 與 Analytics 的網站，並手把手帶你上手。${SERVICE_AREAS.meetupLabel}可約當面談，${SERVICE_AREAS.remoteNote}沒有月費、不綁約。`
      : "一次性顧問服務：替看不懂 AI、沒空管網站的人（不分行業），用 AI 把既有資料建成一個客戶自有、可聊天更新、並串接 Google Search Console 與 Analytics 的網站，並手把手帶你上手；沒有月費、不綁約。",
    // Offer 只描述委任形式，不放金額（依價格政策：全站不公開固定金額，費用洽詢報價）。
    offers: {
      "@type": "Offer",
      priceCurrency: "TWD",
      availability: "https://schema.org/InStock",
      url: abs("/pricing/"),
      description: "一次性顧問費、無月費、不綁約；費用洽詢報價。",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}

export function articleSchema(a: { title: string; description: string; path: string; created?: string; updated?: string; citations?: { name: string; url: string }[] }) {
  // citation：文章論點實際依據的外部權威來源（GEO：讓 AI 有可佐證的引用來源）。只放真實公開文獻，勿杜撰。
  const cites = (a.citations ?? []).filter((c) => c.url);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: abs("/og.png"),
    mainEntityOfPage: abs(a.path),
    inLanguage: "zh-Hant-TW",
    ...(a.created ? { datePublished: a.created } : {}),
    ...(a.updated ? { dateModified: a.updated } : {}),
    author: { "@id": `${ORIGIN}/#organization` },
    publisher: { "@id": `${ORIGIN}/#organization` },
    ...(cites.length ? { citation: cites.map((c) => ({ "@type": "CreativeWork", name: c.name, url: c.url })) } : {}),
  };
}
