# Sphamandla Xaba® — Portfolio

Portfolio of Sphamandla Xaba, Product Designer (Johannesburg, South Africa).
A static site served by GitHub Pages from the `main` branch. There is no build
step, apart from the generated role-specific homepages described below.

## How the site is put together

- **Direction selection screen** (`index.html`): what visitors see at the root
  URL. Three cards link to the role-specific portfolios: Product Design &
  UI/UX (`product/`), Web Design (`web/`) and AI UX (`ai-ux/`). Each is a real
  folder, so the URLs work on refresh, in a new tab and when shared. Old links
  to a homepage section (`/#work`, `/#contact` …) are forwarded to
  `home.html`.
- **General homepage** (`home.html`): the full single-page portfolio, with a
  sidebar, case-study cards, a filter, search and a grid/table toggle, a ⌘K
  command palette, light and dark themes, and stat cards that open detail
  sheets. It is also the source the three direction pages are generated from.
  Styles live in `assets/css/app.css` (the design tokens are at the top) and
  behaviour in `assets/js/app.js`. No dependencies. Its sidebar link "All
  directions" returns to the selection screen.
- **Case studies** (`managem.html`, `whatsapp-ai.html`, `finos.html`,
  `wastemart.html`, `cmaxx.html`, `gemis-studio.html`, `ax-channels.html`):
  standalone pages, each with its own inline styles. Several use the vendored
  GSAP, ScrollTrigger and Lenis. Each loads `assets/js/return.js`, which points
  its "back" links at the role-specific homepage the visitor came from.
- **Prototypes** (`*-proto.html`, `ax-channels-proto/` and the three
  `ManaGem*.html` bundles): interactive prototypes opened from their case
  studies. The bundled files unpack themselves in the browser.
- **Accessibility**: skip link, one H1 per page, alt text on images,
  `prefers-reduced-motion` support, keyboard-operable dialogs and palette,
  44px touch targets on small screens.
- **SEO**: canonical and Open Graph tags on the homepage, the role-specific
  homepages and the case studies; `sitemap.xml` lists the public landing
  pages. `robots.txt` only takes effect at the root of a host, so on this
  project site it serves as documentation; submit the sitemap in Search
  Console instead.
- **`404.html`**: GitHub Pages serves it for any missing path, so it uses
  absolute `/sphamandlaxaba/...` URLs. `.nojekyll` turns off the Jekyll build;
  the site does not use it.

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To also check `404.html` and other absolute `/sphamandlaxaba/` URLs, serve the
folder that contains the repo and open `http://localhost:8000/sphamandlaxaba/`.

## Role-specific homepages

Three "front door" homepages are generated from `home.html`, so each role
sees the most relevant work first. The selection screen (`index.html`) links
to them:

| Path              | For                         |
| ----------------- | --------------------------- |
| `/product/`       | Product Designer / UI/UX    |
| `/ai-ux/`         | AI UX                       |
| `/web/`           | Web / creative design       |

They share every case study, style, script and asset with `home.html`. Only
the meta tags, hero, card order/copy/status labels and "What I Design" order
differ. All of that lives in `tools/doors.config.json`.

**After editing `home.html` or the config, re-run the build and commit the
output** (GitHub Pages serves the generated files as-is):

```bash
node tools/build-doors.mjs
git add product/ ai-ux/ web/
```

Never edit `product/index.html`, `ai-ux/index.html` or `web/index.html` by
hand; the next build overwrites them. The script needs Node 18+ and has no
dependencies. If it stops with an error, a piece of `home.html` it relies on
(a card, a table row, a "What I Design" block, a meta tag) was renamed or
removed; update the config or the anchor in the script to match.

## Structure

```
index.html                  # direction selection screen (the root URL)
home.html                   # general homepage (source for the role-specific ones)
product/ ai-ux/ web/        # generated role-specific homepages (do not edit)
tools/                      # build-doors.mjs + doors.config.json
*.html                      # case studies, prototypes, 404.html
ax-channels-proto/          # AX-Channels site build, embedded as the live prototype
assets/css/app.css          # homepage tokens + styles
assets/js/app.js            # homepage behaviour
assets/js/return.js         # case-study back-links to the visitor's homepage
assets/js/*.min.js          # vendored GSAP, ScrollTrigger, Lenis, Three.js
assets/img/                 # case-study and card imagery
assets/fonts/               # self-hosted variable fonts
assets/docs/                # CV (PDF)
sitemap.xml robots.txt      # see "SEO" above
```
