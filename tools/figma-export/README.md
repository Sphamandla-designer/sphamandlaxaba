# FINOS → Figma export pipeline

Converts the rendered FINOS prototype (`finos-proto.html`) into editable Figma
layers. Used to populate the **System FINOS** Figma file with all 27 product
screens.

## Why it exists

`finos-proto.html` is a self-extracting bundle: one screen is in the DOM at a
time, chosen by the sidebar. There is no static markup to hand off. This
pipeline drives the prototype in a real browser, reads the computed layout, and
replays it through the Figma Plugin API.

## Pipeline

| Step | Script | What it does |
|---|---|---|
| 1 | `capture.js` + `lib-extract.js` | Drives the prototype in Chromium (Playwright), clicks through every sidebar route, grows the viewport to the full scroll height, and serialises the DOM — geometry, fills, radii, borders, shadows, type and SVG — into one JSON tree per screen. |
| 2 | `preprocess.js` | Tokenises the trees: a shared colour palette, a type-style table, and a de-duplicated icon set. Sanitises SVG for Figma's parser (strips inline `<span>`, sizes the root `<svg>` from its `viewBox`). |
| 3 | `hoist.js` | Collapses layout-only wrappers — boxes with no paint and fewer than three children — folding their offsets into the children. Cuts ~34% of nodes with no visual change. |
| 4 | `gen4.js` | Replaces each screen's sidebar with a component-instance marker, then plans the work into units that fit inside `use_figma`'s 50k character limit, splitting oversized subtrees behind labels. |
| 5 | `emit3.js` | Emits one self-contained script per call: per-call token subsets, the builder runtime, and the node data in a compact positional-array encoding. |

## Node encoding

Nodes are positional arrays rather than objects, which roughly halves the payload:

```
box   [0, x, y, w, h, children, fill, radius, clip, opacity, borders, borderColor, shadows, label]
text  [1, x, y, w, h, characters, typeStyle, fill, wraps, align, decoration]
icon  [2, x, y, w, h, iconIndex, opacity]
side  [3, x, y, w, h, activeNavLabel]
```

`runtime.min.js` is the interpreter that runs inside Figma and builds the nodes.

## Running it

```bash
npx http-server -p 8899 -s          # serve the repo
node capture.js                     # → screens/*.json
node preprocess.js                  # → build/
node hoist.js 3                     # → build2/
node gen4.js && node emit3.js       # → build2/calls/
```

Then paste each generated call into the Figma MCP `use_figma` tool in order,
substituting the icon/sidebar component IDs returned by the preceding calls.

## Result

- 27 screens, 1440px wide, ~7,700 layers
- 53 icon and chart components, plus an `App/Sidebar` component whose nav list
  clips and whose account footer pins to the bottom when resized
- 18 colours and 121 type styles across the whole product surface
