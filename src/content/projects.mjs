// Project summaries — the single source for the homepage cards, case-study
// headers and "next case study" links.

export const projects = [
  {
    slug: 'managem',
    name: 'ManaGEM ERP',
    category: 'Enterprise software · ERP · Product redesign',
    status: { label: 'Design approved · In development', kind: 'progress' },
    title: 'Reimagining the experience behind everyday business operations.',
    summary: 'Redesigning an established ERP platform to make complex business workflows clearer, more consistent and easier to navigate.',
    role: 'Product Design / UX/UI Design',
    platform: 'Web application',
    cover: { key: 'mockups/managem', alt: 'ManaGEM dashboard shown on a laptop' },
    pageTitle: 'ManaGEM ERP Redesign — Product Design Case Study | Sphamandla Xaba',
    description: 'A product design case study exploring the redesign of ManaGEM, an ERP platform developed by GEMIS, covering complex business workflows, UX/UI design and an AI-assisted onboarding concept.',
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
    category: 'Corporate website · Brand identity · UX strategy',
    status: { label: 'Live website', kind: 'live' },
    title: 'Giving a decade of technical experience a digital identity.',
    summary: 'Led the UX, brand identity and website design for GEMIS, from discovery to implementation support.',
    role: 'UI/UX Designer and design lead',
    platform: 'Responsive website',
    cover: { key: 'gemis/gm-home', alt: 'The GEMIS website home page' },
    pageTitle: 'GEMIS Website and Brand Identity — Product Design Case Study | Sphamandla Xaba',
    description: 'How Sphamandla Xaba led the UX strategy, brand identity, design system and website design for GEM Information Systems, a South African software company, from discovery to implementation support.',
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
