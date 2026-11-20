# Portföy — ajanslara taşeron üretim

Tek sayfalık, mobil öncelikli portföy sitesi. Saf HTML/CSS/JS, derleme adımı yok.

```
portfolyo/
├── index.html, style.css, script.js, netlify.toml
├── img/web/      kahve.jpg, gulumse.jpg (site ekran görüntüleri)
├── img/kuafor/   6 Instagram postu (+ kucuk/ galeri önizlemeleri)
├── img/emlak/    1 post + 2 story (+ kucuk/)
├── img/urun/     once.jpg, sonra.jpg (önce/sonra slider)
└── video/        kahve-reels.mp4 (+ .webm yedek, poster)
```

## Yayından önce değiştirin
- `90XXXXXXXXXX` → gerçek WhatsApp numarası (`index.html` içinde 3 yer)
- `portfolyo.` logosu → kendi adınız / markanız
- `instagram.com/kullaniciadi` → gerçek Instagram hesabı

## Netlify
`portfolyo` klasörünü app.netlify.com/drop'a sürükleyin ya da Git bağlantısında *Base directory* = `portfolyo`.

Not: `kahve-reels.mp4`, Kahve Durağı sitesinin mobil ekran kaydından üretilmiş tanıtım videosudur.

## Hız
Galeride 540px önizlemeler (30–60 KB) gösterilir, tam boy görsel yalnızca lightbox açılınca iner. Tüm görseller `loading="lazy"`; video `preload="none"` ve yalnızca ekranda görünürken oynar.
