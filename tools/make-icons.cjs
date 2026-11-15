// アプリのアイコン（icon-192.png・icon-512.png）を作る。夜空に月と、まくらのある寝床。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a52"/><stop offset="1" stop-color="#3b4f86"/></linearGradient></defs>
      <rect width="100" height="100" fill="url(#g)"/>
      <circle cx="56" cy="40" r="22" fill="#f6d77a"/><circle cx="66" cy="33" r="20" fill="#26365f"/>
      <g fill="#fff"><circle cx="22" cy="22" r="1.6"/><circle cx="80" cy="66" r="1.4"/><circle cx="30" cy="48" r="1.2"/></g>
      <rect x="16" y="68" width="68" height="16" rx="6" fill="#e9eef8"/><rect x="18" y="62" width="20" height="10" rx="5" fill="#fff"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
