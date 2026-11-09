// WasteMart case study. Screens are from the design prototype, with demo data.

import { figure, todo, button } from '../shared.mjs';
import { decision, flow, list } from '../case.mjs';

const phone = (ctx, key, alt, caption = '') => figure(ctx, { key, alt, caption, kind: 'phone', sizes: '(min-width: 1120px) 260px, 45vw' });
const phones = (ctx, items) => `<div class="phones">${items.map((i) => phone(ctx, ...i)).join('')}</div>`;

export default {
  slug: 'wastemart',
  lede: 'A driver’s day is a chain of jobs done in the cab, on site and often offline. The app makes sure the driver always knows what to do next.',
  meta: (ctx) => [['Timeline', todo(ctx, 'WasteMart: design timeline and when development started')]],
  cover: (ctx) => figure(ctx, { key: 'mockups/wastemart', alt: 'WasteMart driver app shown on a phone', kind: 'mockup', eager: true, sizes: '(min-width: 1200px) 1136px, 100vw' }),

  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      body: (ctx) => `
        <p class="lead">Detailed records, captured by people who are busy doing the work.</p>
        ${list([
          'Manifests, bins, photos and signatures must be right first time',
          'No time to fight through menus between stops',
          'Signal drops — work must never feel lost',
        ])}
        ${todo(ctx, 'WasteMart: the wider product and whether the client can be named')}`,
    },
    {
      id: 'journey',
      title: 'Core journey',
      body: (ctx) => `
        ${flow(['Start day', 'Open job', 'Check in', 'Capture', 'Sign-off', 'Check out', 'End day'], 'Driver journey')}
        ${phones(ctx, [
          ['wastemart/04-startday-ready', 'Start of day with the truck selected', 'Start the day'],
          ['wastemart/06-jobs', 'The day’s jobs in route order', 'Jobs in order'],
          ['wastemart/09-capture-top', 'Capture screen with manifest and quantity fields', 'Capture'],
          ['wastemart/12-signoff', 'Customer sign-off with signature pad', 'Sign-off'],
        ])}`,
    },
    {
      id: 'decisions',
      title: 'Key decisions',
      body: (ctx) =>
        [
          decision(ctx, {
            n: '01',
            title: 'One job, one next action',
            problem: 'Drivers shouldn’t have to remember which step they’re on.',
            choice: 'One primary button whose label follows the job: Check in → Save manifest → Check out.',
            why: 'The workflow drives the interface, not the driver.',
            evidence: phones(ctx, [
              ['wastemart/07-job-detail', 'Job with a Confirm & Check In button', 'Before'],
              ['wastemart/14-manifest-saved', 'Job with a Check Out button', 'After'],
            ]),
          }),
          decision(ctx, {
            n: '02',
            title: 'Separate flows for evidence',
            problem: 'Paperwork, bins, bags and signatures are different kinds of proof.',
            choice: 'A dedicated flow for each — the manifest can’t be saved without a signature.',
            why: 'Each record stays clear for whoever checks it later.',
            evidence: phones(ctx, [
              ['wastemart/10-bin-mismatch', 'Bin movements with removed and placed tabs', 'Bins'],
              ['wastemart/11-scan', 'Recycling bag barcode scanner', 'Bags'],
            ]),
          }),
          decision(ctx, {
            n: '03',
            title: 'Ending the day is a review',
            problem: 'Drivers rush the close-out — when the office needs the most information.',
            choice: 'End Day shows what’s done, left and unsynced, and asks for a reason if work is outstanding.',
            why: 'The office sees not just what was missed, but why.',
            evidence: phones(ctx, [
              ['wastemart/18-shift', 'Shift controls with sync status and End Day', 'Shift'],
              ['wastemart/19-endday-review', 'End workday summary of jobs and syncs', 'Review'],
            ]),
          }),
        ].join(''),
    },
    {
      id: 'status',
      title: 'Status',
      dark: true,
      body: (ctx) => `
        <div class="split">
          <div><p class="label-strong">Design</p><p>Complete, with a working interactive prototype.</p></div>
          <div><p class="label-strong">Development</p><p>Underway. Not launched or tested with drivers yet.</p></div>
        </div>
        <div class="btn-row">${button(ctx, { label: 'Open prototype', href: 'prototypes/wastemart.html', variant: 'secondary', ic: 'external', external: true })}</div>
        ${todo(ctx, 'WasteMart: which features are implemented, plus build screenshots')}`,
    },
    {
      id: 'next',
      title: 'What to test next',
      body: () => `
        ${list([
          'Can drivers finish a job unaided on their first shift?',
          'Is the changing primary button understood?',
          'Is the sync status noticed — and trusted — offline?',
        ])}`,
    },
  ],
};
