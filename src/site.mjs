// Global site configuration. Every contact detail lives here once and is
// read by every page — change it here, rebuild, and the whole site follows.

export const site = {
  name: 'Sphamandla Xaba',
  title: 'Product Designer | UI/UX',
  location: 'Johannesburg, South Africa',

  // Public URL of the deployed site. Used only for canonical, Open Graph and
  // sitemap URLs. This is the existing GitHub Pages address of this repo —
  // change it if a custom domain is connected later.
  origin: 'https://sphamandla-designer.github.io',
  basePath: '/sphamandlaxaba/',

  // Contact details, as they appear on the supplied CV.
  email: 'sphamandaxaba@gmail.com',
  phone: '+27 60 102 0774',
  linkedin: 'https://www.linkedin.com/in/sphamandla-xaba-ba1602287/',
  cv: 'assets/docs/Sphamandla-Xaba-CV.pdf',
};

export const nav = [
  { label: 'Work', href: 'index.html#work', key: 'work' },
  { label: 'Approach', href: 'index.html#approach', key: 'approach' },
  { label: 'About', href: 'about/', key: 'about' },
  { label: 'Contact', href: 'contact/', key: 'contact' },
];
