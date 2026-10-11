/* ==========================================================================
   blog.js — blog.html (list) and post.html?slug=... (single post)
   Posts come from js/config.js (SITE.posts). To add a post, add an object
   there; its page is  post.html?slug=<your-slug>
   ========================================================================== */
(function () {
  const { posts, fallbackImages, school } = window.SITE;
  const { icon, formatDate, refresh } = window.UI;

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]));
  const image = (url, i = 0) => url || fallbackImages[i % fallbackImages.length];
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first

  /* ----- list page ----- */
  const grid = document.getElementById("post-grid");
  if (grid) {
    grid.innerHTML = sorted.length
      ? sorted
          .map(
            (p, i) => `
        <div class="reveal" data-delay="${(i % 3) * 80}">
          <a class="card post-card" href="post.html?slug=${encodeURIComponent(p.slug)}">
            <img src="${image(p.image, i)}" alt="${esc(p.title)}" loading="lazy">
            <div class="post-card__body">
              <p class="post-date">${icon("calendar", "icon--xs")}${formatDate(p.date)}</p>
              <h2>${esc(p.title)}</h2>
              <p class="post-card__excerpt">${esc(p.excerpt)}</p>
              <span class="post-card__more">Read more →</span>
            </div>
          </a>
        </div>`
          )
          .join("")
      : `<p class="empty">No posts yet.</p>`;
    refresh();
  }

  /* ----- single post ----- */
  const holder = document.getElementById("post");
  if (holder) {
    const slug = new URLSearchParams(location.search).get("slug");
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      document.title = `Post not found — ${school.name}`;
      holder.innerHTML = `<div class="container not-found"><h1>Post not found</h1><a href="blog.html">Back to blog</a></div>`;
    } else {
      document.title = `${post.title} — ${school.name}`;
      const desc = document.querySelector("meta[name=description]");
      if (desc) desc.content = post.excerpt;
      holder.innerHTML = `
        <article class="container container--narrow post">
          <a class="post__back" href="blog.html">${icon("arrow-left", "icon--sm")} All posts</a>
          <h1>${esc(post.title)}</h1>
          <p class="post-date">${icon("calendar", "icon--sm")}${formatDate(post.date)}</p>
          <img class="post__image" src="${image(post.image)}" alt="${esc(post.title)}">
          <div class="post__body">${post.content.split(/\n\s*\n/).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
        </article>`;
    }
  }
})();
