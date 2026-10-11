/* ==========================================================================
   layout.js — builds the header, footer and WhatsApp button on every page,
   and exposes small helpers (icon, studentFigure, formatDate) for other scripts.
   Each page sets <body data-page="home|about|..."> so the active link is highlighted.
   ========================================================================== */
(function () {
  const { school, nav } = window.SITE;
  const ICONS = "assets/icons/sprite.svg";
  const page = document.body.dataset.page || "";
  const isHome = page === "home";

  /* ---------- helpers shared with other scripts ---------- */
  const icon = (name, cls = "") =>
    `<svg class="icon ${cls}" aria-hidden="true"><use href="${ICONS}#${name}"></use></svg>`;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  const whatsappUrl = (text) => `https://wa.me/${school.phoneRaw}?text=${encodeURIComponent(text)}`;

  /** Simple student illustration in the school uniform. */
  function studentFigure(gender) {
    const boy = gender === "boy";
    const label = boy ? "Boy in school uniform" : "Girl in school uniform";
    const hair = "oklch(0.2 0.01 40)";
    const body = boy
      ? `<path d="M42 30c0-12 8-18 18-18s18 6 18 18c-4-6-10-8-18-8s-14 2-18 8Z" fill="${hair}"/>
         <path d="M34 62c4-6 14-9 26-9s22 3 26 9l4 40H30l4-40Z" fill="var(--uniform-white)" stroke="oklch(0.85 0 0)"/>
         <path d="M54 54l6 8 6-8" fill="none" stroke="oklch(0.8 0 0)" stroke-width="2"/>
         <rect x="36" y="100" width="22" height="52" rx="4" fill="var(--uniform-green)"/>
         <rect x="62" y="100" width="22" height="52" rx="4" fill="var(--uniform-green)"/>`
      : `<path d="M40 34c-2-14 8-22 20-22s22 8 20 22c-2-8-10-12-20-12s-18 4-20 12Z" fill="${hair}"/>
         <path d="M77 30c6 10 6 30 2 40" stroke="${hair}" stroke-width="6" fill="none" stroke-linecap="round"/>
         <path d="M34 62c4-6 14-9 26-9s22 3 26 9l6 62H28l6-62Z" fill="url(#stripes-girl)" stroke="oklch(0.85 0.03 355)"/>
         <path d="M44 56l16 26 16-26" fill="var(--uniform-white)"/>
         <rect x="40" y="122" width="16" height="32" rx="4" fill="var(--uniform-white)" stroke="oklch(0.85 0 0)"/>
         <rect x="64" y="122" width="16" height="32" rx="4" fill="var(--uniform-white)" stroke="oklch(0.85 0 0)"/>`;
    return `<svg viewBox="0 0 120 160" aria-label="${label}">
      <defs><pattern id="stripes-girl" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="var(--uniform-white)"/><rect width="4" height="8" fill="var(--uniform-pink)"/>
      </pattern></defs>
      <circle cx="60" cy="34" r="18" fill="oklch(0.68 0.08 55)"/>${body}</svg>`;
  }

  window.UI = { icon, formatDate, whatsappUrl, studentFigure };

  /* ---------- logo ---------- */
  const logo = (light) => `
    <span class="logo${light ? " logo--light" : ""}">
      <svg class="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <path class="shield" d="M24 3 6 9v14c0 11 7.6 19.4 18 22 10.4-2.6 18-11 18-22V9L24 3Z"/>
        <path class="book" d="M13 17c4-1.5 8-1 11 1.5 3-2.5 7-3 11-1.5v15c-4-1.5-8-1-11 1.5-3-2.5-7-3-11-1.5V17Z"/>
        <path class="spine" d="M24 18.5v15"/>
      </svg>
      <span class="logo__text">
        <span class="logo__name">${school.name}</span>
        <span class="logo__sub">${school.board} · ${school.classes}</span>
      </span>
    </span>`;

  /* ---------- header ---------- */
  const active = (p) => (p === page ? " is-active" : "");
  const header = document.getElementById("site-header");
  if (header) {
    header.className = `header${isHome ? " header--home" : ""}`;
    header.innerHTML = `
      <div class="container header__bar">
        <a href="index.html" aria-label="${school.name} — Home">${logo(false)}</a>
        <nav class="nav" aria-label="Main">
          ${nav.map((n) => `<a class="nav__link${active(n.page)}" href="${n.href}">${n.label}</a>`).join("")}
          <a class="nav__cta" href="contact.html">Contact Us</a>
        </nav>
        <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">
          ${icon("menu", "icon--open")}${icon("x", "icon--close")}
        </button>
      </div>
      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
        <div class="container">
          ${nav.map((n) => `<a class="mobile-nav__link${active(n.page)}" href="${n.href}">${n.label}</a>`).join("")}
          <a class="mobile-nav__cta" href="contact.html">Contact Us</a>
        </div>
      </nav>`;

    // transparent header on top of the home hero, solid after scrolling or when the menu is open
    const btn = header.querySelector(".menu-btn");
    const menu = header.querySelector(".mobile-nav");
    const update = () => {
      const open = menu.classList.contains("is-open");
      header.classList.toggle("is-clear", isHome && window.scrollY <= 40 && !open);
    };
    btn.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open);
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      update();
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); update(); } });
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <div class="container footer__grid">
        <div>
          ${logo(true)}
          <p class="footer__about">A UP Board school for Classes 1 to 12 in Ambedkar Nagar, shaping 3000+ students with quality education, strong values and care.</p>
        </div>
        <div>
          <h3>Links</h3>
          <ul><li><a href="index.html">Home</a></li><li><a href="about.html">About Us</a></li><li><a href="contact.html">Contact Us</a></li></ul>
        </div>
        <div>
          <h3>Others</h3>
          <ul><li><a href="blog.html">Blogs</a></li><li><a href="terms.html">Terms &amp; Conditions</a></li><li><a href="privacy.html">Privacy Policy</a></li></ul>
        </div>
        <div>
          <h3>Contacts</h3>
          <ul class="footer__contacts">
            <li>${icon("map-pin")}<span>${school.address}</span></li>
            <li><a href="tel:${school.phone}" style="display:flex;gap:.5rem">${icon("phone")}${school.phone}</a></li>
            <li><a href="mailto:${school.email}" style="display:flex;gap:.5rem">${icon("mail")}${school.email}</a></li>
          </ul>
          <div class="footer__social">
            <a href="${school.social.facebook}" target="_blank" rel="noreferrer" aria-label="Facebook">${icon("facebook")}</a>
            <a href="${school.social.instagram}" target="_blank" rel="noreferrer" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${school.social.youtube}" target="_blank" rel="noreferrer" aria-label="YouTube">${icon("youtube")}</a>
          </div>
        </div>
      </div>
      <div class="footer__copy">© ${school.name}. All rights reserved.</div>`;
  }

  /* ---------- floating WhatsApp button ---------- */
  const wa = document.createElement("a");
  wa.className = "whatsapp";
  wa.href = whatsappUrl("Hello, I would like to know about admission.");
  wa.target = "_blank";
  wa.rel = "noreferrer";
  wa.setAttribute("aria-label", "Chat on WhatsApp");
  wa.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4a.5.5 0 0 0 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>`;
  document.body.appendChild(wa);
})();
