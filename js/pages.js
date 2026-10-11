/* ==========================================================================
   pages.js — fills in content that comes from js/config.js
   - about.html   -> #teacher-grid (photos: assets/images/teachers/)
   - contact.html -> #contact-info (address / phone / email cards + map)
   - admission.html -> [data-figure] uniform illustrations
   ========================================================================== */
(function () {
  const { school, teachers } = window.SITE;
  const { icon, refresh, studentFigure } = window.UI;

  // <div data-figure="boy"> -> uniform illustration
  document.querySelectorAll("[data-figure]").forEach((el) => (el.innerHTML = studentFigure(el.dataset.figure)));

  // Principal photo: if assets/images/principal/principal.jpg does not exist yet, show a person icon
  const principalPhoto = document.querySelector(".principal__avatar");
  if (principalPhoto) {
    const showIcon = () => {
      const box = document.createElement("div");
      box.className = "principal__avatar principal__avatar--icon";
      box.innerHTML = icon("user");
      principalPhoto.replaceWith(box);
    };
    principalPhoto.addEventListener("error", showIcon);
    if (principalPhoto.complete && principalPhoto.naturalWidth === 0) showIcon(); // already failed
  }

  const teacherGrid = document.getElementById("teacher-grid");
  if (teacherGrid) {
    // If a photo file is missing, show the teacher's initials instead of a broken image
    teacherGrid.addEventListener("error", (e) => {
      if (e.target.tagName === "IMG") e.target.parentElement.textContent = e.target.dataset.initials;
    }, true);
    teacherGrid.innerHTML = teachers
      .map((t, i) => {
        const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
        return `
        <div class="reveal" data-delay="${(i % 4) * 60}">
          <div class="card teacher">
            <div class="teacher__avatar"><img src="${t.photo}" alt="${t.name}" loading="lazy" data-initials="${initials}"></div>
            <p class="teacher__name">${t.name}</p>
            <p class="teacher__subject">${t.subject}</p>
            <p class="teacher__qual">${t.qual}</p>
          </div>
        </div>`;
      })
      .join("");
  }

  const info = document.getElementById("contact-info");
  if (info) {
    const rows = [
      { i: "map-pin", t: "Address", v: school.address },
      { i: "phone", t: "Phone", v: school.phone, href: `tel:${school.phone}` },
      { i: "mail", t: "Email", v: school.email, href: `mailto:${school.email}` },
    ];
    info.innerHTML =
      rows
        .map(
          (r) => `
        <div class="card info-card">
          <div class="icon-box">${icon(r.i)}</div>
          <div>
            <p class="info-card__title">${r.t}</p>
            ${r.href ? `<a href="${r.href}">${r.v}</a>` : `<p>${r.v}</p>`}
          </div>
        </div>`
        )
        .join("") +
      `<iframe class="map" title="School location map" loading="lazy"
         src="https://www.google.com/maps?q=${encodeURIComponent(school.mapQuery)}&output=embed"></iframe>`;
  }

  refresh();
})();
