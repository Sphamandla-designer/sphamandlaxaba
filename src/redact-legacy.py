# Usage: python3 src/redact-legacy.py <out-dir> <folder-with-original-screenshots>
# Kept so the redaction can be reproduced if new legacy screenshots are added.
# Never commit the unredacted originals: they contain client names, contact
# details and financial figures, and this repository is published publicly.
# Redacts personal and financial data in the legacy ManaGEM screenshots.
# Every text run inside the listed regions is replaced with a neutral bar in
# its original position, so layout, alignment problems and table density stay
# visible while names, emails, phone numbers and amounts are removed.
# Charts are replaced by a heavy blur. Output goes to the scratchpad for review.
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = (sys.argv[2].rstrip('/') + '/') if len(sys.argv) > 2 else './'  # folder holding the original screenshots
OUT = sys.argv[1]
BAR = (205, 210, 218)
BAR_DARK = (78, 92, 108)

def runs(arr, gap):
    idx = np.flatnonzero(arr)
    if not len(idx): return []
    out, start, prev = [], idx[0], idx[0]
    for i in idx[1:]:
        if i - prev > gap: out.append((start, prev)); start = i
        prev = i
    out.append((start, prev)); return out

def redact(im, rect, mode='dark', gap=11):
    x0, y0, x1, y1 = rect
    a = np.asarray(im.crop(rect).convert('RGB')).astype(int)
    lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    sat = a.max(axis=2) - a.min(axis=2)
    mask = (lum < 165) | ((sat > 60) & (lum < 200)) if mode == 'dark' else (lum > 175)
    d = ImageDraw.Draw(im)
    for ra, rb in runs(mask.any(axis=1), 2):
        band = mask[ra:rb + 1]
        for ca, cb in runs(band.any(axis=0), gap):
            d.rounded_rectangle((x0 + ca - 2, y0 + ra - 2, x0 + cb + 2, y0 + rb + 2), radius=3, fill=BAR if mode == 'dark' else BAR_DARK)

def blur(im, rect, r=18):
    reg = im.crop(rect).filter(ImageFilter.GaussianBlur(r)).filter(ImageFilter.GaussianBlur(r))
    im.paste(reg, rect[:2])

TOP = [('light', (14, 26, 205, 72)), ('light', (1580, 4, 1745, 42))]  # user name, client account button

JOBS = {
    'legacy-dashboard': ('Screenshot 2026-11-21 204432.png', TOP + [('dark', (255, 128, 625, 170)), ('dark', (670, 128, 1040, 170)), ('dark', (1088, 128, 1455, 170)), ('dark', (1503, 128, 1872, 170))], [(245, 288, 1872, 498)]),
    'legacy-customers': ('Screenshot 2026-11-21 204452.png', TOP + [('dark', (312, 362, 1868, 899))], []),
    'legacy-suppliers': ('Screenshot 2026-11-21 204527.png', [('light', (14, 34, 205, 80)), ('light', (1580, 12, 1745, 50)), ('dark', (329, 290, 1853, 746))], []),
    'legacy-products': ('Screenshot 2026-11-21 204603.png', TOP + [('dark', (453, 325, 1120, 902))], []),
    'legacy-invoices': ('Screenshot 2026-11-21 204647.png', TOP + [('dark', (358, 315, 1338, 896)), ('dark', (1408, 315, 1488, 896)), ('dark', (1492, 315, 1598, 360)), ('dark', (1492, 530, 1598, 560)), ('dark', (1492, 695, 1598, 725)), ('dark', (1492, 370, 1598, 400)), ('dark', (1492, 424, 1598, 454)), ('dark', (1492, 478, 1598, 508))], []),
    'legacy-receipts': ('Screenshot 2026-11-21 204711.png', TOP + [('dark', (346, 398, 1853, 899))], []),
    'legacy-warranties': ('Screenshot 2026-11-21 204800.png', [('light', (18, 26, 210, 70)), ('light', (1600, 2, 1760, 38)), ('dark', (450, 376, 1800, 404))], []),
    'legacy-projects': ('Screenshot 2026-11-21 205713.png', [('dark', (258, 196, 1850, 900))], []),
    'legacy-purchase-orders': ('Screenshot 2026-11-21 205746.png', TOP + [('dark', (352, 374, 1760, 814))], []),
}

for name, (f, rects, blurs) in JOBS.items():
    im = Image.open(SRC + f).convert('RGB')
    for r in blurs: blur(im, r)
    for mode, r in rects: redact(im, r, mode)
    im.save(f'{OUT}/{name}.png'); print(name, im.size)
