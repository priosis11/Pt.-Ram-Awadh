/* ==========================================================================
   main.js — behaviours shared by every page
   - Scroll reveal:  <div class="reveal" data-delay="100">  (delay in ms)
   - Count-up:       <span data-countup="3000" data-suffix="+">0</span>
   Call UI.refresh() after adding new .reveal / [data-countup] elements with JS.
   ========================================================================== */
(function () {
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        revealIO.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countIO.unobserve(entry.target);
      runCount(entry.target);
    });
  });

  function runCount(el) {
    const end = Number(el.dataset.countup);
    const suffix = el.dataset.suffix || "";
    el.removeAttribute("data-countup"); // run only once
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 1400);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix; // ease-out cubic
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function refresh() {
    document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
      if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "ms";
      revealIO.observe(el);
    });
    document.querySelectorAll("[data-countup]").forEach((el) => countIO.observe(el));
  }

  window.UI = Object.assign(window.UI || {}, { refresh });
  refresh();
})();
