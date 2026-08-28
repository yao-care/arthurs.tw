#!/usr/bin/env node
// 產生 /cases/ 用的實站截圖（public/images/cases/<slug>.webp）。
//
// 為什麼是截圖不是示意圖（2026-08-26）：案例頁不得放任何非真實的圖。這裡抓的是各站
// 首頁當下的實際畫面，1280x800 視窗、縮到 800 寬、webp q80，一張約 16-45KB。
//
// 用法：node scripts/case-shots.mjs
// 相依：playwright 與 sharp 都不在本 repo 的相依裡，走絕對路徑借用主機上既有的安裝。
// 網站改版後要重跑，否則卡片上的圖會跟實站對不起來。

import pw from '/root/seo-ops/node_modules/playwright/index.js';
const { chromium } = pw;
import sharpPkg from '/mnt/yao-care/arthurs.tw/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js';
const sharp = sharpPkg.default || sharpPkg;
import fs from 'node:fs';
const OUT='/mnt/yao-care/arthurs.tw/public/images/cases';
fs.mkdirSync(OUT,{recursive:true});
const sites=[
 ['arthurs','https://arthurs.tw/'],
 ['evidencetoday','https://evidencetoday.news/'],
 ['yao-care','https://www.yao.care/'],
 ['crin-healthcare','https://crinhealthcare.org/'],
 ['dreamer868','https://www.dreamer868.com/'],
 ['appi-news','https://appi.news/'],
 ['weiqi-kids','https://www.weiqi.kids/'],
 ['folk','https://folk.tw/'],
 ['sutta-io','https://sutta.io/'],
 ['olderkkk','https://www.olderkkk.com/'],
 ['vuko','https://www.vuko.life/'],
 ['twdro','https://twdro.net/'],
];
const b=await chromium.launch();
for(const [slug,url] of sites){
  const p=await b.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
  try{
    await p.goto(url,{waitUntil:'networkidle',timeout:45000});
    await p.waitForTimeout(1200);
    const buf=await p.screenshot();
    const info=await sharp(buf).resize(800).webp({quality:80}).toFile(`${OUT}/${slug}.webp`);
    console.log(`✓ ${slug.padEnd(18)} ${info.width}x${info.height} ${(info.size/1024).toFixed(0)}KB`);
  }catch(e){ console.log(`✗ ${slug.padEnd(18)} ${e.message.slice(0,70)}`); }
  await p.close();
}
await b.close();


// ── 第二批：各案例的「代表內頁」截圖（<slug>-deep.webp），插在案例內文對應段落 ──
// 為什麼要捲到指定文字：代表內頁的重點常在頁面下方（例如 yao.care 的「透明度：各國差異與限制」
// 章節），直接截頂端只會拍到頁首，圖就跟旁邊那段文字對不起來。第三欄是要捲到的文字，null 代表截頂端。
// 錨點要挑得夠精確：先前用「透明度」會命中頁面標題而不是那個章節，改用「各國差異與限制」才對。
const deepList = [
  ['yao-care',        'https://www.yao.care/medical/txgnn/methodology/',                                    '各國差異與限制'],
  ['vuko',            'https://www.vuko.life/guides/binaural-beats-for-sleep.html',                          '參考'],
  ['twdro',           'https://twdro.net/rules/compare/',                                                    '比較'],
  ['sutta-io',        'https://sutta.io/topics/marana/',                                                     null],
  ['folk',            'https://folk.tw/deities/mazu',                                                        '來源'],
  ['dreamer868',      'https://www.dreamer868.com/articles/family-story-42/',                                '化名'],
  ['appi-news',       'https://appi.news/articles/taiwan-health-data-why-now/',                              '風險與限制'],
  ['evidencetoday',   'https://evidencetoday.news/articles/autonomic-nervous-dysfunction-anxiety-guide/',    '參考'],
  ['crin-healthcare', 'https://crinhealthcare.org/case-studies/ndmc-kaohsiung/',                             '成果'],
  ['olderkkk',        'https://www.olderkkk.com/method/',                                                    '就醫'],
  ['arthurs',         'https://arthurs.tw/updates/',                                                         null],
  // weiqi-kids 沒有代表內頁，只有首圖，內文不插圖。
];

const b2 = await chromium.launch();
for (const [slug, url, anchor] of deepList) {
  const p = await b2.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    let where = '頂端';
    if (anchor) {
      const el = p.locator(`text=${anchor}`).first();
      if (await el.count()) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600); where = `捲到「${anchor}」`; }
    }
    await p.waitForTimeout(800);
    const buf = await p.screenshot();
    const i = await sharp(buf).resize(800).webp({ quality: 80 }).toFile(`${OUT}/${slug}-deep.webp`);
    console.log(`\u2713 ${slug.padEnd(17)} ${(i.size / 1024).toFixed(0)}KB  ${where}`);
  } catch (e) { console.log(`\u2717 ${slug.padEnd(17)} ${e.message.slice(0, 60)}`); }
  await p.close();
}
await b2.close();
