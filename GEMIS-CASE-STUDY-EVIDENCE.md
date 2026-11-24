# GEMIS case study — evidence inventory

Source: `src/content/case-gemis.mjs` (route `work/gemis/`), built on the shared
case-study system (`src/content/cs.mjs`, `src/styles/09-case.css`). Two parts, seven
chapters. Every image is a real asset; every figure carries a short source
label. Reconstructed diagrams are labelled as such and never presented as
original artefacts.

| Label | Meaning |
|---|---|
| Live site · Nov 2026 | Screenshot of gemis.co.za, captured November 2026 |
| HTML/CSS reference | `Sphamandla-designer/gemis-site`: its pages, stylesheet and file tree |
| First 3D build · Jul 2026 | gemis-site commit `21d016d`, 12 July 2026 |
| Brand files · reference repo | Logo SVGs, email signature and share card from gemis-site |
| Reconstructed diagram | Drawn for this page from the live site and the brief |

**This repository is public.** No staff names, client names or contact
details are recorded here. The live home page's client-logo row is cropped out
of every capture.

## Visuals by chapter

| Chapter | Anchor visual | Supporting | Source |
|---|---|---|---|
| Opening | Live home, desktop and phone | — | Live site (logo row cropped) |
| 01 Opportunity | Before / intended journey | — | Reconstructed diagram |
| 02 Discovery & strategy | One question, six tensions, resolutions | Competitor review described only, no screenshots | Reconstructed diagram |
| 03 Experience design | First 3D build vs final direction, with script weight (≈ 895 KB vs ≈ 43 KB JS) | Sitemap and home hierarchy mapped to Discover → Enquire | First build; live site; reconstructed diagrams |
| 04 Brand & design system | Logo lock-ups, mark, colour and type tokens, components | Email signature, share card | Brand files; specimens rendered from the reference stylesheet |
| 05 Website experience | Solutions, Case Studies, Our Story, Contact | Four phone screens; the enquiry form error summary | Live site |
| 06 Design to development | Verbatim CSS excerpt (site.css lines 5790, 5799–5801) and file tree | UX-review changes; QA results | HTML/CSS reference |
| 07 Outcomes & reflection | Confirmed outcomes | Evidence and limits note | — |

The script weight is the uncompressed JavaScript each home page requested,
measured locally on the two builds in the reference repository. It is labelled
on the page as a script-weight comparison, not a page-speed measure.

## QA results — kept separate

| Set | Where it comes from | What the page says |
|---|---|---|
| Reference build | gemis-site `qa/REPORT.md`, `docs/UX-REVIEW.md`, Sept–Nov 2026 | axe no violations after the second round; 2,161 links, none broken; Lighthouse mobile performance 96–99 |
| Live site | Run on 24 Nov 2026 from this session (`src/content/gemis-live-qa.json`) | axe-core 4.10 WCAG A/AA: no violations on Home, Solutions, Products, Case Studies, Our Story, Contact at 1440 and 390px. Lighthouse 12 mobile: Accessibility, Best Practices, SEO 100 on Home, Solutions, Contact; Performance 88–91 (one run each, cloud machine) |

## Stated on Sphamandla's account

Role and team; the developers built and host production; the referral-led
background; discovery topics; navy as the starting preference; the first
preference for a 3D-heavy site and the recommendation against it; the reason
for the HTML/CSS reference; formal adoption of the design system;
implementation reviews and testing.

## Deliberately not claimed

- Reuse of the design system in other products (not verifiable; ManaGEM uses
  its own tokens). Headline outcome is adoption only.
- Traffic, conversions, leads, revenue, engagement, performance improvements,
  user-testing results, feedback rounds, wireframes, logo explorations.

## Placeholders (commented in `case-gemis.mjs`, render nothing while empty)

- `HINDSIGHT` — the one specific decision Sphamandla would make differently.
- `TESTIMONIAL` — a cleared statement from the business manager.
- `STUDY_RESULTS` — findings of the planned retrospective usability study.

Other open items are in `CONTENT-NEEDED.md`.
