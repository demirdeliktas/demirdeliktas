# Makas Kuaför Kızılay — Instagram postları

Hayali bir kuaför için 6 adet 1080×1350 Instagram postu (konsept çalışma).

| # | Konu | HTML | PNG |
|---|---|---|---|
| 1 | Açılış kampanyası | `posts/01-acilis.html` | `png/01-acilis.png` |
| 2 | Önce–sonra saç boyama | `posts/02-once-sonra.html` | `png/02-once-sonra.png` |
| 3 | Hizmet fiyat listesi | `posts/03-fiyat-listesi.html` | `png/03-fiyat-listesi.png` |
| 4 | Saat dilimi duyurusu | `posts/04-saat-dilimleri.html` | `png/04-saat-dilimleri.png` |
| 5 | Gelin başı paketi | `posts/05-gelin-basi.html` | `png/05-gelin-basi.png` |
| 6 | Randevu için DM | `posts/06-randevu-dm.html` | `png/06-randevu-dm.png` |

## Tasarım sistemi (`posts/common.css`)
- **Renkler:** mürdüm `#26121f`, pudra `#f3d9d4`, limon yeşili vurgu `#d9f05a`
- **Fontlar:** Bricolage Grotesque (başlık), Instrument Serif italik (vurgu kelimesi), Manrope (metin)
- **Motif:** makas logosu, kesik çizgi, hap şeklinde etiketler

## PNG üretme
```bash
node render.js   # posts/*.html → png/*.png (Playwright, 1080x1350)
```

## Görseller
Fotoğraflar Unsplash'ten doğrudan bağlantıyla yüklenir (Unsplash Lisansı). Önce–sonra postundaki
iki fotoğraf farklı kişilere aittir; post üzerinde "Temsili görsellerdir" notu bulunur.
