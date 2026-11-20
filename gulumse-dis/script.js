/* Gülümse Diş Polikliniği — etkileşimler */
(function () {
  "use strict";

  // WhatsApp numarası (ülke kodu ile, başında + olmadan)
  const WHATSAPP_NUMBER = "905550000000";

  /* ---------- Header gölgesi ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobil menü ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const setNav = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
  };
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- SSS: aynı anda tek soru açık ---------- */
  const faqs = document.querySelectorAll(".faq details");
  faqs.forEach((d) => d.addEventListener("toggle", () => {
    if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
  }));

  /* ---------- Randevu formu → WhatsApp mesajı ---------- */
  const form = document.getElementById("appt-form");
  const errorEl = document.getElementById("form-error");
  const dateInput = document.getElementById("f-date");
  dateInput.min = new Date().toISOString().slice(0, 10);

  const f = form.elements;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = f.name.value.trim();
    const phone = f.phone.value.trim();
    const digits = phone.replace(/\D/g, "");

    f.name.classList.toggle("invalid", name.length < 3);
    f.phone.classList.toggle("invalid", digits.length < 10);

    if (name.length < 3 || digits.length < 10) {
      errorEl.textContent = name.length < 3
        ? "Lütfen adınızı ve soyadınızı yazın."
        : "Lütfen geçerli bir telefon numarası yazın (en az 10 rakam).";
      errorEl.hidden = false;
      (name.length < 3 ? f.name : f.phone).focus();
      return;
    }
    errorEl.hidden = true;

    let dateText = "";
    if (f.date.value) {
      const [y, m, d] = f.date.value.split("-").map(Number);
      dateText = new Date(y, m - 1, d).toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" });
    }

    const lines = [
      "Merhaba, randevu almak istiyorum.",
      `Ad Soyad: ${name}`,
      `Telefon: ${phone}`,
      `Tedavi: ${f.treatment.value}`,
      dateText && `Tercih ettiğim gün: ${dateText}`,
      f.note.value.trim() && `Not: ${f.note.value.trim()}`,
    ].filter(Boolean);

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });

  ["name", "phone"].forEach((n) => f[n].addEventListener("input", () => f[n].classList.remove("invalid")));

  /* ---------- Mobil alt çubuk: randevu bölümündeyken gizle ---------- */
  const cta = document.getElementById("mobile-cta");
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => cta.classList.toggle("hide", en.isIntersecting), { threshold: 0.15 })
      .observe(document.getElementById("randevu"));
  }

  /* ---------- Açık / kapalı (Türkiye saati) ---------- */
  const HOURS = { 0: null, 1: [540, 1140], 2: [540, 1140], 3: [540, 1140], 4: [540, 1140], 5: [540, 1140], 6: [540, 900] };
  const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

  const updateStatus = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Istanbul", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const now = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

    document.querySelectorAll(".hours tr").forEach((tr) => {
      tr.classList.toggle("today", tr.dataset.days.split(",").map(Number).includes(day));
    });

    const el = document.getElementById("open-status");
    const today = HOURS[day];
    if (today && now >= today[0] && now < today[1]) {
      el.textContent = `Şu an açığız · Kapanış ${fmt(today[1])}`;
      el.className = "open-status is-open";
      return;
    }
    // Bir sonraki açılışı bul
    let label = "";
    if (today && now < today[0]) {
      label = `Bugün ${fmt(today[0])}`;
    } else {
      const names = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
      for (let i = 1; i <= 7; i++) {
        const d = (day + i) % 7;
        if (HOURS[d]) { label = `${i === 1 ? "Yarın" : names[d]} ${fmt(HOURS[d][0])}`; break; }
      }
    }
    el.textContent = `Şu an kapalıyız · Açılış: ${label}`;
    el.className = "open-status is-closed";
  };
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  document.getElementById("year").textContent = new Date().getFullYear();
})();
