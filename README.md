# Pt. Ram Awadh Bal Vidya Mandir — School Website

Plain HTML + CSS + JavaScript. No build step, no framework, no login/backend.

## Run on your computer
1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

(Open it through Live Server, not by double-clicking — the icons need a local server.)

## Folder structure
```
index.html, about.html, admission.html, gallery.html,
services.html, blog.html, post.html, contact.html,
privacy.html, terms.html      -> the pages
css/base.css                  -> colours, fonts, reset, animations
css/components.css            -> header, footer, buttons, cards
css/home.css                  -> home page only
css/pages.css                 -> all other pages and forms
js/config.js                  -> ALL editable content (see below)
js/layout.js                  -> header, footer, WhatsApp button
js/main.js                    -> scroll animation, number count-up
js/home.js, gallery.js, blog.js, pages.js, forms.js  -> page scripts
assets/images/site            -> photos used on home/about/services
assets/images/gallery/*       -> gallery photos (campus 8, classrooms 12, events 16, bus 8)
assets/images/principal       -> principal photo (principal.jpg)
assets/videos                 -> hero video
favicon/                      -> browser icons
```

## How to edit
| I want to change…                     | Edit this                                   |
|---------------------------------------|---------------------------------------------|
| Phone, email, address, WhatsApp number| `js/config.js` → `school`                   |
| Menu links                            | `js/config.js` → `nav`                      |
| Toppers, teachers, notices            | `js/config.js` → `toppers`, `teachers`, `notices` |
| Blog posts                            | `js/config.js` → `posts` (copy one, change `slug`) |
| Gallery photos                        | add `campus-02.jpg`, `classroom-02.jpg`, `event-02.jpg`, `bus-02.jpg` ... to `assets/images/gallery/<category>/`. They appear automatically; missing numbers are skipped |
| Topper photos                         | add `topper-01.jpg` ... to `assets/images/toppers/` (portrait photos) |
| Teacher photos                        | add `teacher-01.jpg` ... to `assets/images/teachers/` (square photos) |
| Principal photo                       | add `principal.jpg` to `assets/images/principal/` (square photo) |
| Hero video                            | replace `assets/videos/hero.mp4` (keep it small) |
| Colours                               | `css/base.css` → `:root`                    |
| Page text (About, Services, etc.)     | the matching `.html` file                   |

Tips: keep the same file name when replacing an image or video. Compress
videos/images before uploading (GitHub rejects files over 100 MB).

## Put it online (GitHub + Vercel)
1. Push this folder to a GitHub repository.
2. In Vercel: **Add New Project** → import the repo → **Deploy**
   (Framework preset: *Other*, no build command, no output directory).
3. Every `git push` updates the live site in about a minute.

`vercel.json` makes links like `/about` and `/gallery` work without `.html`.

## Forms
Contact and Admission forms do not store anything. They check the fields and
open a ready-made WhatsApp message to the school number in `js/config.js`.
