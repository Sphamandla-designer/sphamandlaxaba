# ManaGem prototype screen capture

`shoot-app.js` and `shoot-takeon.js` drive the bundled ManaGem prototypes in headless
Chromium (Playwright) and export every screen at 1440 CSS px wide, 2× device pixel ratio.

The exported renders live in `assets/img/managem-screens/`:

- `app/` — 24 screens of the ManaGem application, named by sidebar order
  (`00-login` … `23-master-data`). `My Companies` and `Settings` are stubs in the
  prototype and are not captured.
- `take-on/` — the 11 client-facing Take-On steps in flow order, plus the compliance
  report (`12-report`) and the GEMIS admin queue (`13-admin`).

## Running the capture

```bash
python3 -m http.server 8777 --bind 127.0.0.1     # serve the repo root
npm i playwright
node tools/shoot-app.js
node tools/shoot-takeon.js
```

`shoot-app.js` navigates by URL hash (the prototype routes off `window.location.hash`).
`shoot-takeon.js` seeds a realistic session — consents accepted, documents uploaded —
then walks `state.screen` through every step, running the real extraction animation
before capturing the AI Extraction screen.

Both scripts point `chromium.launch()` at a pinned browser path; adjust
`executablePath` for your machine or drop it to use Playwright's own download.

## Figma

These screens are also rebuilt natively — as editable, design-system-bound frames — in
the ManaGem Figma file, alongside the foundations (variables, text styles, elevation)
and the component library the screens are assembled from.
