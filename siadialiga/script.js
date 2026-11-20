/* SIADIALIGA — small touches */
(function () {
  "use strict";
  document.getElementById("year").textContent = new Date().getFullYear();

  // Logo follows the pointer a little (desktop only, respects reduced motion)
  const logo = document.querySelector(".logo img");
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (logo && !calm && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * 6;
      logo.style.translate = `${x}px ${y}px`;
    }, { passive: true });
  }
})();
