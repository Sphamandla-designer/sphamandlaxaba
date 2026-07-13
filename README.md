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
  SmartStart Learning.
- **Accessibility & performance** — `prefers-reduced-motion` fallbacks,
  capped DPR on WebGL, semantic markup, keyboard-closable menu, no-JS
  fallback (loader hidden, content visible).

## Running locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html                  # the portfolio (single page)
managem.html                # ManaGem case study
wastemart.html              # WasteMart case study
brand-studio.html           # brand studio explorations
assets/css/home.css         # homepage design tokens + styling
assets/js/home.js           # GSAP/Lenis interaction & scroll choreography
assets/js/hero-gl.js        # Three.js hero particle field (ES module)
assets/img/hero-bust.svg    # vector hero fallback (AI render lazy-swapped)
assets/js/*.min.js          # vendored gsap, ScrollTrigger, lenis, three
assets/fonts/               # vendored variable fonts (Archivo, Space Grotesk, JetBrains Mono)
```

Libraries: [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering), [Three.js](https://threejs.org).
Media: hero render generated with [Higgsfield](https://higgsfield.ai) (Soul v2).
