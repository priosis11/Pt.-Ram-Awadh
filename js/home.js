/* ==========================================================================
   home.js — index.html only: toppers carousel (autoplay every 3s) + notices
   Data comes from js/config.js
   ========================================================================== */
(function () {
  const { toppers, notices } = window.SITE;
  const { icon, studentFigure, formatDate, refresh } = window.UI;

  /* ---------- Toppers ---------- */
  const track = document.getElementById("toppers-track");
  if (track) {
    // If a photo file is missing, show the drawn student figure instead of a broken image
    track.addEventListener("error", (e) => {
      const img = e.target;
      if (img.tagName !== "IMG") return;
      img.parentElement.classList.add("is-fallback");
      img.parentElement.innerHTML = studentFigure(img.dataset.gender);
    }, true);
    track.innerHTML = toppers
      .map(
        (t) => `
        <div class="carousel__slide">
          <div class="topper">
            <div class="topper__photo"><img src="${t.photo}" alt="${t.name}" loading="lazy" data-gender="${t.gender}"></div>
            <p class="topper__name">${t.name}</p>
            <p class="topper__class">${t.cls}</p>
            <p class="topper__score">${icon("trophy", "icon--xs")} ${t.score}</p>
          </div>
        </div>`
      )
      .join("");

    if (window.EmblaCarousel) {
      const embla = window.EmblaCarousel(document.getElementById("toppers"), { loop: true, align: "start" });
      setInterval(() => embla.scrollNext(), 3000);
    }
  }

  /* ---------- Latest notices (max 5) ---------- */
  const list = document.getElementById("notice-list");
  if (list) {
    list.innerHTML = notices.length
      ? notices
          .slice(0, 5)
          .map(
            (n) => `
          <div class="reveal">
            <div class="card notice">
              <div class="notice__icon">${icon("bell")}</div>
              <div>
                <p class="notice__date">${formatDate(n.date)}</p>
                <h3>${n.title}</h3>
                ${n.body ? `<p>${n.body}</p>` : ""}
              </div>
            </div>
          </div>`
          )
          .join("")
      : `<p class="text-muted" style="text-align:center">No notices right now.</p>`;
  }

  refresh();
})();
