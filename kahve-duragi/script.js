/* Kahve Durağı Bahçelievler — etkileşimler */
(function () {
  "use strict";

  /* ---------- Header: kaydırınca arka plan ---------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobil menü ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const setNav = (open) => {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    header.classList.toggle("scrolled", open || window.scrollY > 40);
  };
  toggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  /* ---------- Menü sekmeleri ---------- */
  const tabs = document.querySelectorAll(".tabs [role='tab']");
  const items = document.querySelectorAll(".menu-item");
  const showCategory = (cat) => {
    tabs.forEach((t) => t.setAttribute("aria-selected", String(t.dataset.filter === cat)));
    items.forEach((it) => { it.hidden = it.dataset.cat !== cat; });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => showCategory(tab.dataset.filter));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });
  showCategory("sicak");

  /* ---------- Galeri lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = lb.querySelector("img");
  const gItems = Array.from(document.querySelectorAll(".g-item"));
  let current = 0;
  let lastFocus = null;

  const show = (i) => {
    current = (i + gItems.length) % gItems.length;
    const item = gItems[current];
    lbImg.src = item.dataset.full;
    lbImg.alt = item.querySelector("img").alt;
  };
  const openLb = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  };
  const closeLb = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };

  gItems.forEach((g, i) => g.addEventListener("click", () => openLb(i)));
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(current - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(current + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });

  // Mobilde kaydırarak geçiş
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- Görsel yüklenemezse sade yedek ---------- */
  const hideBroken = (img) => { img.style.visibility = "hidden"; };
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) hideBroken(img);
    else img.addEventListener("error", () => hideBroken(img), { once: true });
  });

  /* ---------- Çalışma saatleri: şu an açık mı? (Türkiye saati) ---------- */
  // [açılış, kapanış] dakika cinsinden; 0 = Pazar
  const HOURS = {
    0: [9 * 60, 23 * 60],
    1: [8 * 60, 23 * 60],
    2: [8 * 60, 23 * 60],
    3: [8 * 60, 23 * 60],
    4: [8 * 60, 23 * 60],
    5: [8 * 60, 23 * 60],
    6: [9 * 60, 24 * 60],
  };
  const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

  const updateStatus = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Istanbul", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    const now = parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10);

    document.querySelectorAll(".hours tr").forEach((tr) => {
      tr.classList.toggle("today", Number(tr.dataset.day) === day);
    });

    const [open, close] = HOURS[day];
    const el = document.getElementById("open-status");
    if (now >= open && now < close) {
      const soon = close - now <= 60 ? " (az kaldı)" : "";
      el.textContent = `Şu an açık · Kapanış ${fmt(close)}${soon}`;
      el.className = "open-status is-open";
    } else {
      const nextOpen = now < open ? HOURS[day][0] : HOURS[(day + 1) % 7][0];
      el.textContent = `Şu an kapalı · ${now < open ? "Bugün" : "Yarın"} açılış ${fmt(nextOpen)}`;
      el.className = "open-status is-closed";
    }
  };
  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Kaydırınca beliren bölümler ---------- */
  if ("IntersectionObserver" in window) {
    const targets = document.querySelectorAll(".section-head, .review, .g-item, .hours-card, .location-card");
    targets.forEach((t) => t.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Yıl ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
