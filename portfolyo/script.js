/* Portföy — etkileşimler */
(function () {
  "use strict";

  /* Header kenarlığı */
  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Lightbox (her set kendi içinde gezilir) ---------- */
  const lb = document.getElementById("lb");
  const lbImg = lb.querySelector("img");
  const lbCap = lb.querySelector("figcaption");
  let items = [], idx = 0, lastFocus = null;

  const show = (i) => {
    idx = (i + items.length) % items.length;
    const btn = items[idx];
    lbImg.src = btn.dataset.src;
    lbImg.alt = btn.querySelector("img").alt;
    lbCap.textContent = `${btn.querySelector("img").alt} · ${idx + 1}/${items.length}`;
  };
  const open = (btn) => {
    items = Array.from(btn.closest(".g").querySelectorAll(".g-item"));
    lastFocus = btn;
    show(items.indexOf(btn));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll(".g-item").forEach((b) => b.addEventListener("click", () => open(b)));
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", () => show(idx - 1));
  lb.querySelector(".lb-next").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-fig")) close(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(idx + 1);
    if (e.key === "ArrowLeft") show(idx - 1);
  });
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ---------- Önce / sonra slider ---------- */
  document.querySelectorAll(".ba").forEach((el) => {
    const range = el.querySelector(".ba-range");
    const labels = el.querySelectorAll(".ba-label");
    let dragging = false, decided = false, sx = 0, sy = 0;

    const set = (pct) => {
      pct = Math.max(0, Math.min(100, pct));
      el.style.setProperty("--pos", pct + "%");
      range.value = pct;
      labels[0].style.opacity = pct < 14 ? 0 : 1;
      labels[1].style.opacity = pct > 86 ? 0 : 1;
    };
    const pctOf = (e) => { const r = el.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100; };

    el.addEventListener("pointerdown", (e) => {
      dragging = true; decided = e.pointerType !== "touch"; sx = e.clientX; sy = e.clientY;
      if (decided) { el.setPointerCapture(e.pointerId); el.classList.add("dragging"); set(pctOf(e)); }
    });
    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      if (!decided) {
        const dx = Math.abs(e.clientX - sx), dy = Math.abs(e.clientY - sy);
        if (dx < 6 && dy < 6) return;
        if (dy > dx) { dragging = false; return; }   // dikey: sayfa kaysın
        decided = true; el.setPointerCapture(e.pointerId); el.classList.add("dragging");
      }
      set(pctOf(e));
    });
    const end = (e) => {
      if (dragging && !decided && e.type === "pointerup") set(pctOf(e));
      dragging = false; el.classList.remove("dragging");
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    range.addEventListener("input", () => set(parseFloat(range.value)));
    set(parseFloat(el.dataset.start || 50));
  });

  /* ---------- Reels: görünürken oynat, değilken durdur ---------- */
  const video = document.querySelector(".phone video");
  if (video && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting) { const p = video.play(); if (p && p.catch) p.catch(() => {}); }
      else video.pause();
    }, { threshold: 0.25 }).observe(video);
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
