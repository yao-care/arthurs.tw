import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://arthurs.tw");
  const sitemap = new URL("sitemap-index.xml", origin).href;
  const aiBots = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot",
    "Google-Extended", "ClaudeBot", "Claude-Web", "anthropic-ai",
    "Applebot-Extended", "meta-externalagent", "Amazonbot", "DuckAssistBot", "CCBot",
  ];
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "# AI 爬蟲：開放，以利被 AI 搜尋/助理理解與引用",
    ...aiBots.flatMap((b) => [`User-agent: ${b}`, "Allow: /"]),
    "",
    `Sitemap: ${sitemap}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
