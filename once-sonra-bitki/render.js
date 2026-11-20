// node render.js → post.html dosyasını post.png (1080x1350) olarak kaydeder
const { chromium } = require("playwright");
const path = require("path");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto("file://" + path.join(__dirname, "post.html"), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, "post.png"), clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await b.close();
  console.log("post.png hazır");
})();
