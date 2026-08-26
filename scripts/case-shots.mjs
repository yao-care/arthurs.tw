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
import sharpPkg from '/root/arthurs.tw/node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js';
const sharp = sharpPkg.default || sharpPkg;
import fs from 'node:fs';
const OUT='/root/arthurs.tw/public/images/cases';
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
