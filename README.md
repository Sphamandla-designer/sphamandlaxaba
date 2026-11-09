# Sphamandla Xaba — Product Design Portfolio

A full rebuild of the portfolio of Sphamandla Xaba, Product Designer (UI/UX),
Johannesburg. Static HTML, CSS and a small amount of JavaScript — no framework,
no runtime dependencies, compatible with GitHub Pages.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Any static server works. Opening the files
directly with `file://` won't resolve the folder-style links such as `about/`.)

## Edit and rebuild

The HTML in the repository root is **generated**. Edit the sources in `src/`,
then rebuild (Node 18+, no `npm install` needed):

```bash
node src/build.mjs
```

| To change… | Edit |
| --- | --- |
| Email, LinkedIn, CV path, site URL | `src/site.mjs` |
| Project titles, status, summaries, roles, “More work” | `src/content/projects.mjs` |
| Experience, education, tools | `src/content/experience.mjs` |
| A case study's sections | `src/content/case-managem.mjs`, `case-wastemart.mjs`, `case-gemis.mjs` |
| Homepage, About, Contact | `src/pages/*.mjs` |
| Shared components (buttons, figures, placeholders, header, footer) | `src/layout.mjs`, `src/case.mjs` |
| Styles and design tokens | `src/styles/01-tokens.css` … `03-components.css` (built into `assets/css/site.css`) |
| Behaviour (theme, menu, image viewer, copy email) | `assets/js/main.js` |

**Adding a case study:** add an entry to `projects.mjs`, create
`src/content/case-<slug>.mjs` (copy an existing one), and register it in
`caseContent` in `src/build.mjs`. The homepage, navigation, next-project link
and sitemap pick it up.

**Adding images:** save WebP files to `assets/images/<folder>/` and add an
entry to `src/content/images.json` with the original width/height and the
widths generated (`-1600`/`-960` suffixes when there are two sizes).

## Content still needed

Missing evidence is never written as fact. To keep pages clean it is left off
the page entirely; each gap is recorded with `todo(...)` in `src/content/` and
listed in **`CONTENT-NEEDED.md`**, which the build regenerates.

## Structure

```
index.html  about/  contact/  work/{managem,wastemart,gemis}/  404.html   ← generated
managem.html wastemart.html gemis-studio.html …                         ← redirects from the old site
prototypes/          interactive design prototypes (ManaGEM, WasteMart)
assets/css/site.css  built from src/styles
assets/js/main.js    the only script
assets/images/       optimised WebP screenshots, og-default.jpg
assets/fonts/        Inter (variable), self-hosted (OFL)
assets/docs/         CV (PDF)
src/                 build script, content, components, styles
sitemap.xml robots.txt CONTENT-NEEDED.md                                 ← generated
```

## Design system

Black-and-white only: black is the single conversion colour, white the
canvas, grayscale for everything else — no accent colour. Every interactive
element is a pill (999px); cards are 16px; inputs 8px. Inter 700 for
headlines (52/36/32/24/20px, sentence case, no letter-spacing), Inter
400/500 for text. Flat by default; shadow only on the hero card. Black
promo cards break up the white rhythm, and the footer is a black band.
Dark mode flips the same grayscale.

## Notes

- Light theme by default; follows the OS setting until the visitor picks a
  theme, which is then remembered.
- Accessibility: semantic landmarks, one H1 per page, skip link, visible focus,
  keyboard-operable menu, image viewer and experience rows, status shown with
  words and shapes (never colour alone), `prefers-reduced-motion` respected.
- There is no contact form: no backend is configured, and email works.
- The previous portfolio is preserved in git history (commit `8bd489f`).
