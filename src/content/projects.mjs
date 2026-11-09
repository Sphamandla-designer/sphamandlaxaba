// Project summaries — the single source for the homepage cards, case-study
// headers and "next case study" links.

export const projects = [
  {
    slug: 'managem',
    name: 'ManaGEM ERP',
    category: 'Enterprise · ERP · SaaS',
    status: { label: 'Live product', kind: 'live' },
    title: 'Designing an ERP around how a business actually runs.',
    summary: 'One clear structure for sales, operations and admin — so a large product stays easy to find your way around.',
    role: 'Owned most UX/UI and product design decisions',
    platform: 'Web application',
    cover: { key: 'mockups/managem', alt: 'ManaGEM dashboard shown on a laptop' },
    description: 'Case study: designing the ManaGEM ERP — navigation, plain-language status and guided workflows for trade businesses.',
  },
  {
    slug: 'wastemart',
    name: 'WasteMart',
    category: 'Mobile · UX/UI · Interaction design',
    status: { label: 'Design complete · In development', kind: 'progress' },
    title: 'A driver app where the next step is always obvious.',
    summary: 'A mobile workflow for waste-collection drivers — jobs, evidence, sign-off and end of day, built for the field.',
    role: 'Product Designer',
    platform: 'Mobile app',
    cover: { key: 'mockups/wastemart', alt: 'WasteMart driver app shown on a phone' },
    description: 'Case study: designing the WasteMart driver app — jobs, evidence capture, offline sync and end-of-day review.',
  },
  {
    slug: 'gemis',
    name: 'GEMIS Website',
    category: 'Web · Information architecture · Design leadership',
    status: { label: 'Live website', kind: 'live' },
    title: 'Redesigning the GEMIS corporate website.',
    summary: 'Led the redesign of the company website and worked with the development team that built it.',
    role: 'Led the redesign, worked with a development team',
    platform: 'Responsive website',
    cover: null, // No mockup of the live site yet — see CONTENT-NEEDED.md
    description: 'Case study: leading the redesign of the GEM Information Systems corporate website with a development team.',
  },
];

export const moreWork = [
  {
    name: 'GEMIS Studio website',
    note: 'Design and front-end build for the GEMIS design practice.',
    href: 'https://sphamandla-designer.github.io/gemis-site/studio/',
    image: { key: 'mockups/gemis-studio', alt: 'GEMIS Studio website services page' },
  },
  {
    name: 'FINOS',
    note: 'Self-initiated concept for a personal financial operating system.',
    href: null,
    image: { key: 'mockups/finos', alt: 'FINOS dashboard concept shown on a laptop' },
  },
];
