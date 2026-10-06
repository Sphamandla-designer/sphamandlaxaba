"""Build the FINOS LinkedIn carousel (9 slides, 1080x1350) as HTML, PNG previews and one PDF.

Usage: python3 linkedin/build_finos_carousel.py
Crops are given in original screenshot pixels (2880x1900).
"""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "linkedin"
IMG = (ROOT / "assets/img/finos").as_uri()
FONT = (ROOT / "assets/fonts/archivo-latin-wdth-normal.woff2").as_uri()

W, H, M = 1080, 1350, 88          # slide size and side margin
CW = W - 2 * M                    # content width
TOTAL = 9

# --- brand tokens (swap these for your own) ---
NAVY, NAVY2 = "#0B1526", "#111E33"
INK, MUTED = "#F2F5FA", "#A3B0C4"
ACCENT = "#7FB2FF"


def shot(src, x, y, w, h, callouts=(), markers=(), width=CW):
    """A zoomed crop of a real screen in a card. Boxes use original-pixel coords.
    callout: dict(box=(x,y,w,h), text=..., at=(left, top) of label in card px)."""
    s = width / w
    ch = round(h * s)
    out = [f'<div class="shot" style="width:{width}px;height:{ch}px">'
           f'<div class="crop"><img src="{IMG}/{src}" style="width:{round(2880*s)}px;left:{-round(x*s)}px;top:{-round(y*s)}px"></div>']

    def ring(b):
        bx, by = (b[0] - x) * s, (b[1] - y) * s
        bw, bh = min(b[2] * s, width - bx - 6), b[3] * s
        out.append(f'<div class="ring" style="left:{bx:.0f}px;top:{by:.0f}px;width:{bw:.0f}px;height:{bh:.0f}px"></div>')
        return bx, by, bw, bh

    for c in callouts:
        bx, by, bw, bh = ring(c["box"])
        lx, ly = c["at"]
        out.append(f'<div class="tag" style="left:{lx}px;top:{ly}px">{c["text"]}</div>')
        if ly >= by + bh:      # label below the ring
            x1, y1, x2, y2 = lx + 40, ly, lx + 40, by + bh
        elif lx >= bx + bw:    # label right of the ring
            x1, y1, x2, y2 = lx, ly + 29, bx + bw, ly + 29
        else:                  # label above the ring
            x1, y1, x2, y2 = lx + 40, ly + 58, lx + 40, by
        out.append(f'<svg class="lead" width="{width}" height="{ch}"><line x1="{x1:.0f}" y1="{y1:.0f}" x2="{x2:.0f}" y2="{y2:.0f}"/>'
                   f'<circle cx="{x2:.0f}" cy="{y2:.0f}" r="6"/></svg>')
    for n, b in markers:
        bx, by, _, _ = ring(b)
        out.append(f'<div class="num" style="left:{bx-28:.0f}px;top:{by-28:.0f}px">{n}</div>')
    out.append("</div>")
    return "".join(out)


def slide(n, body, cls="", arrow=True):
    foot = f'<div class="foot"><span>{n}/{TOTAL}</span>{"<span class=arr>→</span>" if arrow else ""}</div>'
    return f'<section class="slide {cls}">{body}{foot}</section>'


slides = []

# 1 Cover — blurred real Decision Room behind the text
slides.append(slide(1, f'''
  <div class="bgshot"><img src="{IMG}/decision-room.jpg"></div>
  <div class="cover">
    <div class="eyebrow">FINOS · Case study</div>
    <h1 class="xl">No CFO will approve R2&nbsp;million because ‘the AI recommended it.’</h1>
    <p class="lede">3 trust patterns I designed into FINOS.</p>
  </div>''', "c1"))

# 2 Problem — text only
slides.append(slide(2, '''
  <div class="center">
    <div class="eyebrow">The problem</div>
    <h1 class="xl">AI can analyse faster than any finance team.</h1>
    <h1 class="xl accent">But speed means nothing without trust.</h1>
  </div>'''))

# 3 Confidence ratings — Insights screen
slides.append(slide(3, '''
  <div class="eyebrow">Pattern 1 · Confidence ratings</div>
  <h1>The AI shows how sure it is.</h1>
  <p class="body">Low confidence means ‘check this.’</p>''' + shot(
    "insights.jpg", 565, 1030, 680, 520,
    callouts=[dict(box=(574, 1455, 312, 62), text="Confidence on every insight", at=(70, 720))],
) + '<div class="spacer"></div>'))

# 4 Visible reasoning — Decision Room recommendation panel
slides.append(slide(4, '''
  <div class="eyebrow">Pattern 2 · Visible reasoning</div>
  <h1>Every recommendation shows the data behind it.</h1>''' + shot(
    "decision-room.jpg", 1728, 960, 680, 440,
    callouts=[dict(box=(1736, 1206, 700, 182), text="The evidence behind it", at=(70, 635))],
) + '<div class="spacer"></div>'))

# 5 Stated assumptions — Forecasts assumptions panel
slides.append(slide(5, '''
  <div class="eyebrow">Pattern 3 · Stated assumptions</div>
  <h1>‘This forecast assumes Q4 revenue holds.’</h1>
  <p class="body">Now the CFO can challenge the logic.</p>''' + shot(
    "forecasts.jpg", 572, 880, 700, 215,
    callouts=[dict(box=(580, 944, 700, 84), text="Assumptions stated upfront", at=(70, 320))],
) + '<div class="spacer"></div>'))

# 6 Where it comes together — Decision Room, three numbered markers
slides.append(slide(6, '''
  <div class="eyebrow">Where it comes together</div>
  <h1>Approvals: all three patterns at the moment of decision.</h1>''' + shot(
    "decision-room.jpg", 1712, 850, 800, 650,
    markers=[(1, (2174, 862, 322, 60)), (2, (1734, 980, 800, 410)), (3, (1734, 1440, 800, 58))],
) + '''<div class="legend"><span><b>1</b> Confidence</span><span><b>2</b> Reasoning</span><span><b>3</b> Assumptions</span></div>'''))

# 7 What I'd improve — Decision History
slides.append(slide(7, '''
  <div class="eyebrow">What I’d improve</div>
  <h1>Decision History records what happened, but not why.</h1>
  <p class="body">That’s my next iteration.</p>''' + shot(
    "history.jpg", 585, 440, 680, 420,
    callouts=[dict(box=(666, 728, 700, 86), text="What happened, not why", at=(70, 620))],
) + '<div class="spacer"></div>'))

# 8 Principle — text only
slides.append(slide(8, '''
  <div class="center">
    <div class="eyebrow">The principle</div>
    <h1 class="xl">AI in finance shouldn’t replace judgement.</h1>
    <h1 class="xl accent">It should give people enough context to use their own.</h1>
  </div>'''))

# 9 Closing — no arrow
slides.append(slide(9, '''
  <div class="center close">
    <h1 class="xl">Sphamandla Xaba</h1>
    <p class="lede">Product Designer | AI UX for fintech &amp; insurance</p>
    <p class="link">sphamandla-designer.github.io/sphamandlaxaba</p>
    <div class="rule"></div>
    <p class="lede ink">Follow for more on designing trustworthy AI.</p>
  </div>''', arrow=False))

CSS = f"""
@font-face {{ font-family: Archivo; src: url({FONT}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }}
* {{ box-sizing: border-box; margin: 0; }}
@page {{ size: {W}px {H}px; margin: 0; }}
html, body {{ background: {NAVY}; }}
body {{ font-family: Archivo, sans-serif; color: {INK}; -webkit-font-smoothing: antialiased; }}
.slide {{ width: {W}px; height: {H}px; padding: 120px {M}px 150px; position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 36px; page-break-after: always;
  background: radial-gradient(120% 70% at 85% 0%, {NAVY2} 0%, {NAVY} 60%); }}
.eyebrow {{ font-size: 28px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: {ACCENT}; }}
h1 {{ font-size: 62px; line-height: 1.08; font-weight: 600; font-stretch: 92%; letter-spacing: -0.015em; }}
h1.xl {{ font-size: 80px; line-height: 1.05; }}
h1.accent {{ color: {ACCENT}; }}
.body, .lede {{ font-size: 36px; line-height: 1.3; color: {MUTED}; margin-top: -12px; }}
.lede {{ font-size: 40px; margin-top: 0; }}
.ink {{ color: {INK}; }}
.center {{ flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 36px; }}
.spacer {{ flex: 1; }}
.shot {{ position: relative; overflow: visible; border-radius: 20px; margin-top: 20px; flex: none;
  box-shadow: 0 40px 80px -30px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.08); background: #f4f4f4; }}
.crop {{ position: absolute; inset: 0; overflow: hidden; border-radius: 20px; }}
.crop > img {{ position: absolute; max-width: none; -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 0px), transparent); }}
.crop::after {{ content: ''; position: absolute; top: 0; bottom: 0; right: 0; width: 120px; background: linear-gradient(90deg, rgba(244,244,244,0), #f4f4f4); }}
.ring {{ position: absolute; border: 3px solid {ACCENT}; border-radius: 12px; box-shadow: 0 0 0 6px rgba(127,178,255,.18); }}
.tag {{ position: absolute; transform: translateY(0); white-space: nowrap; background: {ACCENT}; color: {NAVY};
  font-size: 32px; font-weight: 600; padding: 12px 22px; border-radius: 999px; z-index: 3; }}
.lead {{ position: absolute; left: 0; top: 0; overflow: visible; z-index: 2; }}
.lead line {{ stroke: {ACCENT}; stroke-width: 3; }}
.lead circle {{ fill: {ACCENT}; }}
.num {{ position: absolute; width: 56px; height: 56px; border-radius: 50%; background: {ACCENT}; color: {NAVY};
  font-size: 32px; font-weight: 700; display: grid; place-items: center; box-shadow: 0 6px 16px rgba(0,0,0,.35); }}
.legend {{ display: flex; gap: 36px; font-size: 32px; color: {MUTED}; margin-top: 8px; }}
.legend b {{ display: inline-grid; place-items: center; width: 44px; height: 44px; border-radius: 50%;
  background: {ACCENT}; color: {NAVY}; font-size: 26px; margin-right: 10px; }}
.foot {{ position: absolute; left: {M}px; right: {M}px; bottom: 80px; display: flex; justify-content: space-between;
  font-size: 28px; font-weight: 500; color: {MUTED}; letter-spacing: .06em; }}
.arr {{ color: {ACCENT}; font-size: 36px; line-height: 28px; }}
.c1 .bgshot {{ position: absolute; inset: 0; overflow: hidden; }}
.c1 .bgshot img {{ position: absolute; width: 2400px; left: -760px; top: -120px; filter: blur(5px) grayscale(.3); opacity: .22; }}
.c1 .bgshot::after {{ content: ''; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(11,21,38,.55) 0%, rgba(11,21,38,.92) 55%, {NAVY} 100%); }}
.cover {{ position: relative; flex: 1; display: flex; flex-direction: column; justify-content: flex-end; gap: 40px; padding-bottom: 60px; }}
.close {{ gap: 28px; }}
.link {{ font-size: 36px; color: {ACCENT}; font-weight: 500; }}
.rule {{ width: 120px; height: 3px; background: {ACCENT}; margin: 28px 0; }}
"""

html = f"<!doctype html><html><head><meta charset=utf-8><title>FINOS Carousel</title><style>{CSS}</style></head><body>{''.join(slides)}</body></html>"
(OUT / "finos-carousel.html").write_text(html)

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome")
    pg = b.new_page(viewport={"width": W, "height": H})
    pg.goto((OUT / "finos-carousel.html").as_uri())
    pg.wait_for_timeout(500)
    prev = OUT / "preview"
    prev.mkdir(exist_ok=True)
    for i, el in enumerate(pg.query_selector_all(".slide"), 1):
        el.screenshot(path=str(prev / f"slide-{i}.png"))
    pg.pdf(path=str(OUT / "FINOS-trust-patterns-carousel.pdf"), width=f"{W}px", height=f"{H}px", print_background=True)
    b.close()
print("done")
