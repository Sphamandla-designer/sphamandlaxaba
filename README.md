# Sphamandla Xaba® — Portfolio

A cinematic, animation-rich portfolio for Sphamandla Xaba — Product Designer &
AI Experience Designer (Gauteng, South Africa). Fully static — no build step,
no audio.

> "I don't design screens. I design understanding."

## Experience highlights

- **Preloader** — "DESIGNING 000 UNDERSTANDING" counter with side-curtain
  wipe straight into the hero timeline.
- **Cinematic hero** — centered portrait over a giant outline XABA wordmark,
  AI-generated gem video loop (Higgsfield / Veo 3.1 Lite), Three.js emerald
  particle field, floating glass cards, live SAST clock nav and a glass
  stats strip — all with pointer + scroll parallax.
- **Portrait slot** — replace `assets/img/portrait.jpg` with your photo
  (dark background, chest-up crop) and the hero + about sections pick it up.
- **Smooth scrolling** — Lenis + GSAP ScrollTrigger orchestration throughout.
- **Scroll storytelling** — word-by-word manifesto scrub, line-mask titles,
  pinned horizontal work gallery with counter-parallax imagery, stacked
  sticky principle cards, velocity-reactive marquees.
- **Selected work** — ManaGem, WasteMart Portal & Driver (case-study pages),
  NeuraCalm AI concept (live CSS phone mock), SmartStart Learning.
- **Footer** — AI-generated liquid-emerald video under giant split-type CTA,
  magnetic buttons, rotating badge, oversized outline wordmark.
- **Custom cursor** — lerped dot + trailing ring with contextual labels,
  magnetic hover targets, full-screen overlay menu with SAST clock.
- **Accessibility & performance** — `prefers-reduced-motion` fallbacks,
  videos play only in view, capped DPR on WebGL, semantic markup,
  keyboard-closable menu.

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
assets/video/               # AI-generated background loops (see README inside)
assets/js/*.min.js          # vendored gsap, ScrollTrigger, lenis, three
assets/fonts/               # vendored variable fonts (Archivo, Space Grotesk, JetBrains Mono)
```

Libraries: [GSAP](https://gsap.com) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering), [Three.js](https://threejs.org).
Media: generated with [Higgsfield](https://higgsfield.ai) (Google Veo 3.1 Lite).
