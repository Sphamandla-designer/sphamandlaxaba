// Project summaries — the single source for the homepage features, the
// case-study headers and the "next project" links. Edit a title, status or
// description here and every place that shows it updates on the next build.

export const projects = [
  {
    slug: 'managem',
    num: '01',
    name: 'ManaGEM ERP',
    category: 'Enterprise Product Design · ERP · SaaS',
    tags: ['Enterprise', 'ERP', 'SaaS'],
    status: { label: 'Live product', kind: 'live' },
    title: 'Designing an ERP experience around the complexity of business operations.',
    summary:
      'Product design work focused on shaping an ERP experience, making UX/UI decisions and structuring practical digital workflows.',
    role: 'Owned most UX/UI and product design decisions.',
    platform: 'Web application',
    cover: { key: 'managem/mg-dashboard', alt: 'ManaGEM dashboard showing enquiry, quote and sales totals, a monthly sales chart and current project cards' },
    description:
      'Case study: designing the ManaGEM ERP — information architecture, plain-language status, search-first lists and guided workflows for trade businesses.',
  },
  {
    slug: 'wastemart',
    num: '02',
    name: 'WasteMart Mobile App',
    category: 'Mobile Product Design · UX/UI · Interaction Design',
    tags: ['Mobile', 'UX/UI', 'Interaction design'],
    status: { label: 'Design complete · Development underway', kind: 'progress' },
    title: 'Designing a focused mobile experience for WasteMart.',
    summary:
      'A mobile application design project focused on translating product requirements into a structured, usable mobile experience.',
    role: 'Product Designer — designed the driver app end to end and built its interactive prototype.',
    platform: 'Mobile application (driver app)',
    cover: { key: 'wastemart/06-jobs', alt: 'WasteMart driver app job list showing progress for the day and assigned jobs in order' },
    description:
      'Case study: designing the WasteMart driver app — a mobile workflow for waste-collection jobs, evidence capture, offline sync and end-of-day review.',
  },
  {
    slug: 'gemis',
    num: '03',
    name: 'GEMIS Corporate Website',
    category: 'Web UX/UI · Information Architecture · Design Leadership',
    tags: ['Web', 'Information architecture', 'Design leadership'],
    status: { label: 'Live website', kind: 'live' },
    title: 'Redesigning the GEMIS digital experience.',
    summary:
      'A corporate website redesign led through UX/UI design and collaboration with a development team.',
    role: 'Led the redesign and worked with a development team.',
    platform: 'Responsive website',
    cover: null, // Screenshots of the live site still to be supplied.
    description:
      'Case study: leading the redesign of the GEM Information Systems corporate website, working with a development team.',
  },
];

// Secondary work — deliberately quieter than the three flagship case studies.
export const moreWork = [
  {
    name: 'GEMIS Design Studio Website',
    note: 'Website for the product and interface design practice of GEM Information Systems — a published services ladder, with each case study tied to a named service. Design and front-end build.',
    meta: 'Web design · Front-end · Live',
    href: 'https://sphamandla-designer.github.io/gemis-site/studio/',
    image: { key: 'gemis-studio/gs-01-hero', alt: 'GEMIS Studio website hero with the headline “Designed to be used.”' },
  },
  {
    name: 'FINOS',
    note: 'A self-initiated concept for a financial operating system: cash flow, forecasts, risk and decisions brought into one workspace. Personal exploration, not client work.',
    meta: 'Self-initiated · Product concept',
    href: null,
    image: { key: 'finos/finos-hero', alt: 'FINOS concept dashboard displayed on a laptop' },
  },
  {
    name: 'ManaGEM Landing Page',
    note: 'The public landing page for ManaGEM. It supports the ERP case study rather than standing on its own.',
    meta: 'Web · Supports the ManaGEM case study',
    href: null,
    image: null,
  },
];
