// Kullanım: node render.js  → posts/*.html dosyalarını png/ klasörüne 1080x1350 PNG olarak çıkarır
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const postsDir = path.join(__dirname, "posts");
  const outDir = path.join(__dirname, "png");
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".html")).sort();

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  for (const f of files) {
    await page.goto("file://" + path.join(postsDir, f), { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; })));
    });
    const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
    const out = path.join(outDir, f.replace(".html", ".png"));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
    console.log(`${f} → png/${path.basename(out)}${broken.length ? "  ⚠ yüklenmeyen görsel: " + broken.join(", ") : ""}`);
  }
  await browser.close();
})();
