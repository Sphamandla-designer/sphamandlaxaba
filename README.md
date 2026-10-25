# Sphamandla Xaba® — Portfolio

Portfolio of Sphamandla Xaba, Product Designer & AI UI/UX Designer
(Johannesburg, South Africa). A static site served by GitHub Pages from the
`main` branch. There is no build step.

The site is positioned around **product design and AI UI/UX**, specialising in
**websites, mobile apps and SaaS dashboard systems**.

## How the site is put together

- **Homepage** (`index.html`): the whole portfolio on one page — sidebar, the
  three specialisms, case-study cards with a specialism filter, search and a
  grid/table toggle, a ⌘K command palette, light and dark themes, and stat
  cards that open detail sheets. Styles live in `assets/css/app.css` (the
  design tokens are at the top) plus `assets/css/home-extras.css` for the two
  blocks app.css does not already cover; behaviour is in `assets/js/app.js`.
  No dependencies.
- **Case studies** (`managem.html`, `whatsapp-ai.html`, `wastemart.html`,
  `finos.html`, `cmaxx.html`, `ax-channels.html`, `gemis-studio.html`):
  standalone pages, each with its own inline styles. Several use the vendored
  GSAP, ScrollTrigger and Lenis. Their back-links point at `index.html`.
- **Prototypes** (`*-proto.html`, `ax-channels-proto/` and the three
  `ManaGem*.html` bundles): interactive prototypes opened from their case
  studies. The bundled files unpack themselves in the browser.
- **Accessibility**: skip link, one H1 per page, alt text on images,
  `prefers-reduced-motion` support, keyboard-operable dialogs and palette,
  44px touch targets on small screens.
- **SEO**: canonical and Open Graph tags on the homepage and the case studies;
  `sitemap.xml` lists the public landing pages. `robots.txt` only takes effect
  at the root of a host, so on this project site it serves as documentation;
  submit the sitemap in Search Console instead.
- **`404.html`**: GitHub Pages serves it for any missing path, so it uses
  absolute `/sphamandlaxaba/...` URLs. `.nojekyll` turns off the Jekyll build.

## The three specialisms

The homepage groups the work into three, with AI UI/UX running across all of
them rather than sitting beside them:

| Specialism            | `data-cat` | Case studies                                   |
| --------------------- | ---------- | ---------------------------------------------- |
| SaaS Dashboard Systems| `saas`     | ManaGem, Claims verification, FINOS            |
| Mobile Apps           | `mobile`   | WasteMart                                      |
| Websites              | `web`      | CMAXX, AX-Channels, GEMIS Studio               |

Each card and table row carries its `data-cat`; the toolbar segments, the three
specialism cards and the command palette all drive the same filter in
`app.js`. To add a case study, add the card, the matching table row and a
sitemap entry — the filter, the count and the palette pick it up from the
markup.

## Retired routes

The site used to have a direction-selection screen at the root plus three
role-specific homepages generated from `home.html`. That split is gone. The old
paths are kept as redirect stubs so shared links still resolve:

| Old path     | Now                        |
| ------------ | -------------------------- |
| `home.html`  | redirects to `/`           |
| `/product/`  | redirects to `/`           |
| `/web/`      | redirects to `/`           |
| `/ai-ux/`    | redirects to `/`           |

`tools/build-doors.mjs`, `tools/doors.config.json` and `assets/js/return.js`
were deleted with that split; they are in the git history if ever needed.

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

To also check `404.html` and other absolute `/sphamandlaxaba/` URLs, serve the
folder that contains the repo and open `http://localhost:8000/sphamandlaxaba/`.

## Structure

```
index.html                  # the single homepage (the root URL)
home.html                   # redirect stub → /
product/ web/ ai-ux/        # redirect stubs → /
*.html                      # case studies, prototypes, 404.html
ax-channels-proto/          # AX-Channels site build, embedded as the live prototype
assets/css/app.css          # design tokens + the shell and components
assets/css/home-extras.css  # specialism cards + capability columns
assets/js/app.js            # homepage behaviour
assets/js/*.min.js          # vendored GSAP, ScrollTrigger, Lenis, Three.js
assets/img/                 # case-study and card imagery
assets/fonts/               # self-hosted variable fonts
assets/docs/                # CV (PDF)
sitemap.xml robots.txt      # see "SEO" above
```
