# Gülümse Ağız ve Diş Sağlığı Polikliniği

Ankara Çankaya'daki hayali bir diş polikliniği için tek sayfalık, mobil öncelikli tanıtım sitesi.
Saf HTML/CSS/JS — derleme adımı yok, dış görsel kullanılmaz (tüm ikon ve çizimler SVG).

## Bölümler
Hero + Randevu Al · Tedaviler (implant, ortodonti, beyazlatma, kanal) · Hekimler · Neden Biz ·
Randevu formu (WhatsApp'a mesaj hazırlar) · SSS · Konum + Google Harita · WhatsApp butonu

## Netlify
Klasörü https://app.netlify.com/drop adresine sürükleyin ya da Git ile bağlayıp
*Base directory* olarak `gulumse-dis` girin. Build komutu boş kalır.

## Yayından önce değiştirin
- `905550000000` (WhatsApp) — `index.html` ve `script.js` içindeki `WHATSAPP_NUMBER`
- `0312 000 00 00` telefon ve `bilgi@gulumsedis.example` e-posta
- Harita sorgusu (`maps?q=...`) ve çalışma saatleri (`index.html` tablo + `script.js` `HOURS`)
- Hekim adları ve özgeçmişleri hayalidir.

**Not:** Sağlık tanıtım mevzuatı gereği hasta yorumu ve hasta memnuniyeti puanı kullanılmamıştır.
Gerçek bir klinik için yayından önce içeriği yine de bir uzmana kontrol ettirin.
