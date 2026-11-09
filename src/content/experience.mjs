// Employment history, taken from the supplied CV. Responsibilities are the
// CV's own wording, minus percentage claims that have no supporting evidence
// on the site yet (see CONTENT-NEEDED.md).

export const experience = [
  {
    org: 'Gem Information Systems (GEMIS)',
    role: 'UI/UX Designer',
    dates: '2025 — Present',
    current: true,
    points: [
      'Design enterprise SaaS platforms, websites and internal business applications for corporate clients.',
      'Lead UX and UI design activities from discovery, wireframing and prototyping through developer handoff.',
      'Maintain a Figma design system used across teams to keep products consistent.',
      'Work closely with developers and stakeholders to bring designs to implementation.',
    ],
    work: [
      { label: 'ManaGEM ERP', href: 'work/managem/' },
      { label: 'GEMIS Corporate Website', href: 'work/gemis/' },
    ],
  },
  {
    org: 'AX-Channels Studio',
    role: 'UI/UX Designer & WordPress Designer',
    dates: '2023 — 2025',
    current: false,
    points: [
      'Designed websites, landing pages and business platforms for clients.',
      'Led end-to-end design projects from discovery through implementation.',
      'Ran UX audits to find usability issues and improve user journeys.',
      'Designed responsive WordPress websites, working directly with clients to turn business requirements into usable experiences.',
    ],
    work: [],
  },
];

export const education = {
  school: 'University of the Witwatersrand',
  qualification: 'Bachelor of Arts — Environmental Studies & Geography',
};

export const learning = [
  'UX Design & Project Management — Great Learning',
  'GenAI Fundamentals for UX Designers & Researchers — Udemy',
  'Design Psychology: Master the Art & Science of UX Design — LinkedIn Learning',
  'Design, Industrial & Product Design — FutureLearn',
];

// Tools listed on the CV, trimmed to the ones that describe day-to-day work.
export const tools = {
  'Design & prototyping': ['Figma', 'FigJam', 'Figma Make', 'Framer'],
  'Research & analytics': ['Maze', 'Hotjar', 'Microsoft Clarity'],
  'Build & handoff': ['WordPress', 'Elementor', 'HTML & CSS (basic)'],
  'Team & delivery': ['Jira', 'Notion', 'Slack', 'Miro'],
};
