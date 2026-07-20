import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// QA 知識庫
const qa = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/qa" }),
  schema: z.object({
    question: z.string(),
    category: z.string(),
    answer: z.string(),
    order: z.number().default(100),
    updated: z.string().optional(),
    related: z.array(z.string()).default([]),          // 同集合（QA↔QA）
    relatedArticles: z.array(z.string()).default([]),  // 跨集合：延伸閱讀文章 slug
  }),
});

// 最新文章
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    order: z.number().default(100),
    created: z.string().optional(),
    updated: z.string().optional(),
    reason: z.string().optional(),
    sources: z.string().optional(),
    aiHelp: z.string().optional(),
    humanReview: z.string().optional(),
    related: z.array(z.string()).default([]),      // 同集合（文章↔文章）
    relatedQa: z.array(z.string()).default([]),    // 跨集合：相關常見問題 slug
  }),
});

// 網站更新紀錄（公開展示本站持續被改善）
const updates = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/updates" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    page: z.string().optional(),
    reason: z.string().optional(),
    source: z.string().optional(),
    aiHelp: z.string().optional(),
    humanReview: z.string().optional(),
    watch: z.string().optional(),
    status: z.enum(["published", "wip", "planned"]).default("published"),
  }),
});

// 網站案例：目前案例牆由 site.ts 的 CASES 陣列驅動（真實已上線站），
// 尚未改用 content collection，故此處不宣告 cases，避免死 schema。

export const collections = { qa, articles, updates };
