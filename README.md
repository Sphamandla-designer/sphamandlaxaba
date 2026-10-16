# Sphamandla Xaba® — Portfolio

An award-style, animation-rich portfolio for Sphamandla Xaba — Product Designer
(Gauteng, South Africa). Fully static — no build step.

> "I start from zero, designing only what matters."

## The design

A light "silver studio" system recreating a premium creative-agency hero:

- **Cinematic hero** — AI-generated dark bust with a glowing amber visor
  (Higgsfield Soul v2), centered over a giant metallic **XABA** wordmark,
  glass widget card with mini slider, selected-clients grid, live SAST
  timezone in the nav and a dark glass bottom strip — all with pointer +
  scroll parallax.
- **Hero image strategy** — `assets/img/hero-bust.svg` is a hand-drawn vector
  placeholder that renders instantly and acts as offline fallback; the
  high-res AI render is lazy-swapped in from the Higgsfield CDN
  (`data-src` on `#heroBust`).
- **Preloader** — "FROM 000 ZERO" counter with split-curtain wipe straight
  into the hero intro timeline.
- **Smooth scrolling** — Lenis + GSAP ScrollTrigger orchestration throughout.
- **Scroll storytelling** — word-by-word manifesto scrub, animated stat
  counters, line-mask section titles, velocity-reactive marquee, parallax
  project imagery, staggered service rows, parallax footer wordmark.
- **3D & motion** — Three.js particle field (graphite dust + amber sparks)
  with mouse/scroll parallax, 3D tilt on cards, magnetic buttons, custom
  cursor with contextual labels.
- **Selected work** — ManaGem, WasteMart Portal & Driver (case-study pages),
  NeuraCalm AI coaching concept.
- **Real content** — copy sourced from Sphamandla's professional profile:
  positioning (Product Designer & AI Experience Designer at GEM Information
  Systems), five design principles, South Africa–first design approach, and
  personal studios NeuraUX & AX-Channels.
- **Accessibility & performance** — `prefers-reduced-motion` fallbacks,
  capped DPR on WebGL, semantic markup, keyboard-closable menu, no-JS
  fallback (loader hidden, content visible).

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Role-specific homepages

Three "front door" homepages are generated from `index.html`, so each role
sees the most relevant work first:

| Path              | For                         |
| ----------------- | --------------------------- |
| `/product/`       | Product Designer / UI/UX    |
| `/ai-ux/`         | AI UX                       |
| `/web/`           | Web / creative design       |

They share every case study, style, script and asset with `index.html`. Only
the meta tags, hero, card order/copy/status labels, "What I Design" order and
(on `/web/`) the position of Selected Visuals differ. All of that lives in
`tools/doors.config.json`.

**After editing `index.html` or the config, re-run the build and commit the
output** (GitHub Pages serves the generated files as-is):

```bash
node tools/build-doors.mjs
git add product/ ai-ux/ web/
```

Never edit `product/index.html`, `ai-ux/index.html` or `web/index.html` by
hand; the next build overwrites them. The script needs Node 18+ and has no
dependencies. If it stops with an error, a piece of `index.html` it relies on
(a card, a table row, a "What I Design" block, a meta tag) was renamed or
removed; update the config or the anchor in the script to match.

## Structure

```
index.html                  # the portfolio (single page)
managem.html                # ManaGem case study
wastemart.html              # WasteMart case study
brand-studio.html           # brand studio explorations
ax-channels.html            # AX-Channels case study (UX-led studio site)
ax-channels-proto/          # AX-Channels site build, embedded as the live prototype
assets/img/ax/              # AX-Channels device mockups, section captures and iteration renders
assets/css/home.css         # homepage design tokens + styling
assets/js/home.js           # GSAP/Lenis interaction & scroll choreography
assets/js/hero-gl.js        # Three.js hero particle field (ES module)
assets/img/hero-bust.svg    # vector hero fallback (AI render lazy-swapped)
assets/js/*.min.js          # vendored gsap, ScrollTrigger, lenis, three
assets/fonts/               # vendored variable fonts (Archivo, Space Grotesk, JetBrains Mono)
```

Libraries: [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering), [Three.js](https://threejs.org).
Media: hero render generated with [Higgsfield](https://higgsfield.ai) (Soul v2).
