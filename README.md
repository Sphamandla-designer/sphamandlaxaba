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
| The ManaGEM case study's layout and styles | `render()` in `src/content/case-managem.mjs`, `src/styles/04-case-managem.css` |
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

## ManaGEM case study

Two levels of the same story:

| Route | Source | Reading |
| --- | --- | --- |
| `work/managem/` | `src/content/case-managem.mjs` | Recruiter overview, 2–3 min — hero, at a glance, challenge, approach, four decisions with before/after evidence, Take-On, redesigned interface, status |
| `work/managem/full/` | `src/content/case-managem-full.mjs` | Full case study, 7–10 min — background, the original interface analysed, design problem, approach, detailed design stories, reusable patterns, Take-On, evaluation plan, implementation status, reflection |

Shared components (screenshots, video, before/after compare, status list,
workflow diagram) live in `src/content/managem-parts.mjs`; styles in
`src/styles/04-case-managem.css`.

**Design system.** `src/content/managem-ds.mjs` renders the ManaGEM design
system as live, animated components using the redesign's own tokens and
typefaces (Outfit and JetBrains Mono, self-hosted in `assets/fonts/`, OFL).
Styles are in `src/styles/05-managem-ds.css`; the animation controller is the
`[data-ds]` block in `assets/js/main.js`. Loops run only while the board is on
screen, and reduced-motion users see final static states. The full route is registered in
`extraPages` in `src/build.mjs`.

**Images.** `assets/images/managem/mg-*` and `to-*` are captured from the two
design prototypes (demo data). `legacy-*` are screenshots of the original
interface with every client name, contact detail and financial figure replaced
by grey bars, produced by `src/redact-legacy.py`. **Never commit unredacted
originals** — the site is public. `pat-*` are crops of the redesigned screens.

**Status wording** is defined once in `STATUS` in `managem-parts.mjs`. Do not
describe the redesign as live until it is released. Open questions are in
`CONTENT-NEEDED.md`.

## Design system

Follows the supplied `design.md`: photography-first, near-invisible UI. Pages
are stacks of edge-to-edge tiles — white, parchment (`#f5f5f7`) and near-black
(`#272729`) — where the colour change is the divider. Near-black ink
(`#1d1d1f`); one accent, Action Blue (`#0066cc`, `#2997ff` inside dark tiles),
used only for interactive elements. Primary actions are blue pills, secondary
actions ghost pills, utility cards have an 18px radius and a hairline border.
The global nav is a 44px true-black bar. Type is SF Pro on Apple platforms and
Inter elsewhere: 17px body, weight 600 headlines, no weight 500. The only
shadow is the product shadow under hero product imagery. Buttons press with
`scale(0.95)`. Dark mode keeps the same system with the surfaces flipped.

## Notes

- Light theme by default; follows the OS setting until the visitor picks a
  theme, which is then remembered.
- Accessibility: semantic landmarks, one H1 per page, skip link, visible focus,
  keyboard-operable menu, image viewer and experience rows, status shown with
  words and shapes (never colour alone), `prefers-reduced-motion` respected.
- There is no contact form: no backend is configured, and email works.
- The previous portfolio is preserved in git history (commit `8bd489f`).
