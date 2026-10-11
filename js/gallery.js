/* ==========================================================================
   gallery.js — gallery.html only: category filter + full-screen lightbox
   Photos and categories come from js/config.js (SITE.photos).
   Only photo files that really exist are shown (no empty tiles).
   Keyboard: Esc closes, left/right arrows change photo.
   ========================================================================== */
(function () {
  const { photoCategories } = window.SITE;
  let photos = window.SITE.photos; // narrowed down to the photos that really exist (see start())
  const { icon, refresh } = window.UI;
  const filters = document.getElementById("filters");
  const grid = document.getElementById("gallery-grid");
  const box = document.getElementById("lightbox");
  let category = "All";
  let list = photos;
  let index = null;

  function renderFilters() {
    filters.innerHTML = photoCategories
      .map((c) => `<button class="filter${c === category ? " is-active" : ""}" type="button" data-cat="${c}">${c}</button>`)
      .join("");
  }

  function renderGrid() {
    list = photos.filter((p) => category === "All" || p.category === category);
    if (!list.length) { grid.innerHTML = `<p class="empty" style="grid-column:1/-1">Photos coming soon.</p>`; return; }
    grid.innerHTML = list
      .map(
        (p, i) => `
      <div class="reveal" data-delay="${(i % 4) * 60}">
        <button class="tile" type="button" data-index="${i}">
          <img src="${p.src}" alt="${p.alt}" loading="lazy">
          <span>${p.category}</span>
        </button>
      </div>`
      )
      .join("");
    refresh();
  }

  function show() {
    if (index === null) { box.hidden = true; box.innerHTML = ""; return; }
    const p = list[index];
    box.hidden = false;
    box.innerHTML = `
      <button class="lightbox__close" type="button" aria-label="Close">${icon("x")}</button>
      <button class="lightbox__prev" type="button" aria-label="Previous">${icon("chevron-left")}</button>
      <img src="${p.src}" alt="${p.alt}">
      <button class="lightbox__next" type="button" aria-label="Next">${icon("chevron-right")}</button>`;
  }
  const step = (n) => { index = (index + n + list.length) % list.length; show(); };

  filters.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    category = b.dataset.cat;
    renderFilters();
    renderGrid();
  });
  grid.addEventListener("click", (e) => {
    const t = e.target.closest("[data-index]");
    if (t) { index = Number(t.dataset.index); show(); }
  });
  box.addEventListener("click", (e) => {
    if (e.target.closest(".lightbox__prev")) step(-1);
    else if (e.target.closest(".lightbox__next")) step(1);
    else if (e.target.tagName !== "IMG") { index = null; show(); } // close button or backdrop
  });
  window.addEventListener("keydown", (e) => {
    if (index === null) return;
    if (e.key === "Escape") { index = null; show(); }
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  /* Does this photo file exist? (HEAD request = asks the server without downloading the image).
     If the check itself cannot run (for example the page is opened as a plain file), assume it exists. */
  const exists = (src) =>
    fetch(src, { method: "HEAD" }).then((r) => r.ok).catch(() => true);

  function start() {
    Promise.all(photos.map((p) => exists(p.src))).then((found) => {
      photos = photos.filter((_, i) => found[i]); // keep only photos that exist
      renderFilters();
      renderGrid();
    });
  }
  start();
})();
