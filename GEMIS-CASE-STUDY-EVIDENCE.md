# GEMIS case study — evidence inventory

Every section of `work/gemis/` (source: `src/content/case-gemis.mjs`) and what
supports it. Sources are the `Sphamandla-designer/gemis-site` repository
("the GEMIS repo"), facts Sphamandla supplied in the brief ("brief"), and
nothing else. Missing evidence is logged in `CONTENT-NEEDED.md` (via
`todo()`), never shown as fact on the page.

**This repository is public.** This file names no staff, clients or contact
details.

## Sources found

| Asset | Where | Used for |
|---|---|---|
| Captures of the corporate site: home (desktop and mobile), Solutions, ManaGEM product page, Insights, Our Story, home Solutions and How we work sections, the enquiry form (empty and after a failed send), phone menu, phone Solutions and phone enquiry | Rendered from the GEMIS repo root (reference build), Nov 2026 | Sections 01, 06, 07, 09, 10 |
| The earliest build: preloader, 3D knot over the copy | GEMIS repo commit `21d016d`, 12 July 2026 | Section 09, "Original direction" |
| Logo: lock-up, stacked lock-up, mark (SVG) | GEMIS repo `assets/img/logos/` | Section 08 |
| Email signature (Sphamandla's own) | GEMIS repo `brand/email-signatures/` | Section 08 |
| Social share card, 1200 × 630 | GEMIS repo `assets/img/og/gemis-share.jpg` | Section 08 |
| Colour, type and component values | GEMIS repo `assets/css/site.css` (the `.hx` system: `#0a1230`, `#0d1636`, `#071b31`, `#4a5170`, `#5d6480`; Montserrat; 48px buttons, 44px circles) | Section 08 design-system panel, rendered live |
| Script weight of the two home pages (≈ 895 KB vs ≈ 43 KB, uncompressed JS) | Measured locally on commit `21d016d` and on current `main` | Section 09 comparison |
| Accessibility, links, layout and Lighthouse results | GEMIS repo `qa/REPORT.md` (Sept 2026) and `docs/UX-REVIEW.md` (3 Nov 2026) | Section 12 |
| UX review findings and changes | GEMIS repo `docs/UX-REVIEW.md` | Section 12 |
| Sitemap and navigation | The reference build's header and pages | Section 06 |
| Competitor reference captures | GEMIS repo root, `Screenshot 2026-09-16 *.png` (28) — other companies' sites | Section 05 mentions they exist; not reproduced |
| Timeline July – November 2026 | GEMIS repo history: first commit 12 July 2026, latest 24 Nov 2026 | Section 01 (stated as "from the repository history") |

## Stated on the brief's authority

Role (UI/UX Designer and design lead), collaborators, the business background
(referral-led, since 2014, no website experience that presented the company),
discovery topics, navy as the starting preference, the business's first
preference for a 3D-heavy site and the recommendation against it, early
feasibility work with the developer, the GitHub repository's purpose (handoff
reference because the team was less familiar with Figma), the live status,
formal adoption of the design system, implementation collaboration and
testing participation.

## Shown as interpretation or assumption, and labelled so

- Requirements matrix — "My design interpretation of the brief".
- Audience profiles — "Stakeholder-informed assumptions · not validated with users".
- The "intended" acquisition path — "not measured evidence".

## Not in evidence (placeholders in `CONTENT-NEEDED.md`)

- Confirmed project dates.
- Competitor review findings.
- Wireframes.
- Figma: logo explorations, styles, spacing, component library and states.
- Business cards, social media banners, the brand guidelines document.
- Examples of stakeholder feedback shaping the identity.
- Checks on the live implementation; a design-versus-live comparison.

## Deliberately not claimed

Traffic, conversions, leads, revenue, engagement or satisfaction. No
captures of gemis.co.za (unreachable from the build environment); screens are
labelled "Reference build".
