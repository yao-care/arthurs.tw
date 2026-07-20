// JSON-LD 結構化資料產生器（GEO/AEO：讓搜尋引擎與 AI 更容易理解本站）。
// 只描述真實事實，不杜撰。
import { SITE, PRICE_LABEL } from "./site";

const ORIGIN = SITE.url;
export const abs = (p: string) => new URL(p, ORIGIN).href;

export function organizationSchema() {
  const sameAs = [SITE.line].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${ORIGIN}/#organization`,
    name: SITE.name,
    url: ORIGIN,
    description: `${SITE.tagline}。不分行業，提供一次 ${PRICE_LABEL} 元、客戶自有、可用 AI 聊天更新的網站建置服務。`,
    ...(SITE.email ? { email: SITE.email } : {}),
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
      "一次性顧問服務：替看不懂 AI、沒空管網站的人（不分行業），用 AI 把既有資料建成一個客戶自有、可聊天更新、並串接 Google Search Console 與 Analytics 的網站，並手把手帶你上手。",
    offers: {
      "@type": "Offer",
      price: String(SITE.price),
      priceCurrency: "TWD",
      description: "一次性顧問費，含用 AI 建站、交接與帶你上手；沒有月費，網域續約與 AI 訂閱另計。",
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
    mainEntityOfPage: abs(a.path),
    ...(a.created ? { datePublished: a.created } : {}),
    ...(a.updated ? { dateModified: a.updated } : {}),
    author: { "@id": `${ORIGIN}/#organization` },
    publisher: { "@id": `${ORIGIN}/#organization` },
  };
}
