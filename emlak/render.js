// Kullanım: node render.js → emlak/*.html dosyalarını aynı klasöre PNG olarak çıkarır.
// Boyut her HTML'deki <meta name="size" content="GENxYUK"> etiketinden okunur.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const dir = __dirname;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort();
  const browser = await chromium.launch();
  for (const f of files) {
    const html = fs.readFileSync(path.join(dir, f), "utf8");
    const m = html.match(/<meta name="size" content="(\d+)x(\d+)">/);
    if (!m) { console.log(`${f}: boyut etiketi yok, atlandı`); continue; }
    const [w, h] = [Number(m[1]), Number(m[2])];
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.goto("file://" + path.join(dir, f), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const broken = await page.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
    const out = f.replace(/\.html$/, ".png");
    await page.screenshot({ path: path.join(dir, out), clip: { x: 0, y: 0, width: w, height: h } });
    console.log(`${f} → ${out} (${w}x${h})${broken.length ? "  ⚠ yüklenmeyen görsel: " + broken.join(", ") : ""}`);
    await page.close();
  }
  await browser.close();
})();
