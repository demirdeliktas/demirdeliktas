# Çayyolu Gayrimenkul — sosyal medya tasarımları (konsept)

| Dosya | Boyut | İçerik |
|---|---|---|
| `01-ilan-post.html` / `.png` | 1080×1350 | Satılık ilan postu: Çayyolu'nda site içi 3+1, 8.750.000 ₺ |
| `02-story-yeni-ilan.html` / `.png` | 1080×1920 | Yeni ilan story'si, bilgi kartı + "yukarı kaydırın / DM" |
| `03-story-degerleme.html` / `.png` | 1080×1920 | Ev sahiplerine ücretsiz değerleme, 3 adımlı süreç + WhatsApp |

- **Renkler:** lacivert `#0F2A47`, sıcak beyaz `#F7F5F0`, altın/bej vurgu `#C2A571` (`common.css`)
- **Font:** Manrope
- **Story güvenli alanı:** önemli içerik 250–1670 px arasında; üst ve alt 250 px boş bırakıldı.
- **PNG üretme:** `node emlak/render.js` (boyut her HTML'deki `<meta name="size">` etiketinden okunur)
- Telefon, WhatsApp ve yetki belge numaraları yer tutucudur. Fotoğraflar Unsplash'ten.
