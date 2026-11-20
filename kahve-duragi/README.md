# Kahve Durağı Bahçelievler

Ankara Bahçelievler'deki hayali bir kafe için tek sayfalık, mobil öncelikli tanıtım sitesi.
Saf HTML/CSS/JS — derleme adımı yok.

## Dosyalar
| Dosya | Açıklama |
|---|---|
| `index.html` | Tüm içerik: hero, menü, galeri, yorumlar, saatler, harita |
| `style.css` | Mobil öncelikli stiller (640px / 900px / 1100px kırılımları) |
| `script.js` | Mobil menü, menü sekmeleri, galeri lightbox, "şu an açık mı" göstergesi |
| `favicon.svg` | Site ikonu |
| `netlify.toml` | Netlify yayın ve önbellek ayarları |

## Netlify'a yükleme
1. **Sürükle-bırak:** https://app.netlify.com/drop adresine `kahve-duragi` klasörünü sürükleyin.
2. **Git ile:** Netlify'da "Add new site → Import from Git" deyip bu repoyu seçin,
   *Base directory* alanına `kahve-duragi` yazın. Build komutu boş kalabilir.

## Yayına almadan önce değiştirin
- **WhatsApp / telefon:** `905550000000` yer tutucu numaradır; `index.html` içinde arayıp gerçek numarayla değiştirin (3 yer).
- **Harita:** `maps?q=...` sorgusunu kafenin tam adresiyle güncelleyin.
- **Instagram:** `@kahveduragi.bahcelievler` bağlantısı şu an instagram.com ana sayfasına gider.
- **Çalışma saatleri:** hem tablodaki metni hem `script.js` içindeki `HOURS` nesnesini güncelleyin.

Görseller Unsplash'ten doğrudan bağlantıyla yüklenir; bir görsel açılmazsa yerinde kahve tonlarında bir arka plan görünür.
