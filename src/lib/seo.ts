// JSON-LD 結構化資料產生器（GEO/AEO：讓搜尋引擎與 AI 更容易理解本站）。
// 只描述真實事實，不杜撰。
import { SITE } from "./site";

const ORIGIN = SITE.url;
export const abs = (p: string) => new URL(p, ORIGIN).href;

export function organizationSchema() {
  // sameAs：只放能相互佐證的真實外部識別（LINE 官方帳號、公開的 GitHub org）。
  // 待補（有了再加，勿杜撰）：Wikidata、FB 粉專、LinkedIn 公司頁。
  const sameAs = [SITE.line, "https://github.com/yao-care"].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: SITE.name,
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

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI 網站顧問服務",
    serviceType: "顧問服務",
    provider: { "@id": `${ORIGIN}/#organization` },
    areaServed: "TW",
    description:
      "一次性顧問服務：替看不懂 AI、沒空管網站的人（不分行業），用 AI 把既有資料建成一個客戶自有、可聊天更新、並串接 Google Search Console 與 Analytics 的網站，並手把手帶你上手；沒有月費、不綁約。",
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

export function articleSchema(a: { title: string; description: string; path: string; created?: string; updated?: string }) {
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
  };
}
