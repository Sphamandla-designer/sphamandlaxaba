// WasteMart case study (work/wastemart/). Screens are from the design
// prototype, with demo data. Built on the shared case-study system (cs.mjs).

import { url, todo, status } from '../shared.mjs';
import { shot, stage, header, cover, glance, toc, sec, points, steps, split, decision, close, action } from './cs.mjs';

const PROTO = 'prototypes/wastemart.html';
const SRC = 'Design prototype · demo data';
const phone = (ctx, key, alt, cap) => shot(ctx, `wastemart/${key}`, alt, { cap, frame: 'phone', sizes: '220px' });
const pair = (ctx, a, b) => stage(phone(ctx, ...a) + phone(ctx, ...b), 'phones');

const SECTIONS = [['challenge', 'Challenge'], ['journey', 'Journey'], ['decisions', 'Decisions'], ['status', 'Status']];

export default {
  slug: 'wastemart',
  render(ctx, { p, next }) {
    const proto = { label: 'View prototype', href: url(ctx, PROTO), primary: true, external: true };
    return `
  <article class="cx">
    ${header(ctx, {
      kicker: 'Mobile app · UX/UI · Interaction design',
      title: p.title,
      summary: 'A waste-collection driver’s day is a chain of jobs done in the cab, on site and often offline. I designed the app so the driver always knows the next step.',
      actions: [proto],
      facts: [
        ['Role', 'Product Designer'],
        ['Platform', 'Mobile app'],
        ['Scope', 'Jobs, evidence capture, sign-off, end of day'],
        ['Status', status(p.status.label, p.status.kind)],
      ],
    })}
    ${cover(shot(ctx, 'mockups/wastemart', 'WasteMart driver app shown on a phone', { frame: 'plain', eager: true, sizes: '(min-width: 1200px) 1040px, 92vw' }))}
    ${glance([
      ['Problem', 'Drivers must capture detailed records, such as manifests, bins, photos and signatures, while busy doing the work.'],
      ['My part', 'The full driver workflow: start of day, jobs, evidence capture, customer sign-off and end-of-day review.'],
      ['Outcome', 'Design complete, with a working prototype. Development is underway; not yet tested with drivers.'],
    ])}
    ${toc(SECTIONS, action({ ...proto, primary: true }))}

    ${sec('challenge', { label: 'Challenge', title: 'Detailed records, captured by people who are busy.', intro: 'The app is used between stops, often with no signal. Three constraints shaped every screen.' },
      points([
        ['Right first time', 'Manifests, bins, photos and signatures cannot be fixed back at the office.'],
        ['No time for menus', 'Between stops, a driver should not have to search for the next step.'],
        ['Work must never feel lost', 'When signal drops, the driver needs to know the record is safe.'],
      ]))}

    ${sec('journey', { label: 'Journey', title: 'One day, seven steps, always in the same order.', intro: 'The app follows the driver’s day. Each screen answers one question: what do I do now?' },
      `${steps(['Start day', 'Open job', 'Check in', 'Capture', 'Sign-off', 'Check out', 'End day'], 'Driver journey')}
      ${stage(
        phone(ctx, '04-startday-ready', 'Start of day with the truck selected', '1 · Start the day')
        + phone(ctx, '06-jobs', 'The day’s jobs in route order', '2 · Jobs in route order')
        + phone(ctx, '09-capture-top', 'Capture screen with manifest and quantity fields', '4 · Capture the load')
        + phone(ctx, '12-signoff', 'Customer sign-off with signature pad', '5 · Customer signs off'),
        'phones', { note: SRC })}`,
      { soft: false })}

    ${sec('decisions', { label: 'Decisions', title: 'Three decisions that keep the driver moving.' },
      `${split(
        decision(1, 'One job, one next action', [
          ['Problem', 'Drivers should not have to remember which step they are on.'],
          ['Decision', 'One primary button whose label follows the job: Check in, Save manifest, Check out.'],
          ['Why', 'The workflow drives the interface, not the driver’s memory.'],
        ]),
        pair(ctx, ['07-job-detail', 'Job with a Confirm and Check In button', 'Before work: Check in'], ['14-manifest-saved', 'Job with a Check Out button', 'After capture: Check out']))}
      ${split(
        decision(2, 'Separate flows for each kind of evidence', [
          ['Problem', 'Paperwork, bins, bags and signatures are different kinds of proof.'],
          ['Decision', 'A dedicated flow for each. A manifest cannot be saved without a signature.'],
          ['Why', 'Each record stays clear for whoever checks it later.'],
        ]),
        pair(ctx, ['10-bin-mismatch', 'Bin movements with removed and placed tabs', 'Bins removed and placed'], ['11-scan', 'Recycling bag barcode scanner', 'Bags scanned']))}
      ${split(
        decision(3, 'Ending the day is a review', [
          ['Problem', 'Drivers rush the close-out, when the office needs the most information.'],
          ['Decision', 'End Day shows what is done, left and unsynced, and asks for a reason if work is outstanding.'],
          ['Why', 'The office sees what was missed, and why.'],
        ]),
        pair(ctx, ['18-shift', 'Shift controls with sync status and End Day', 'Shift and sync status'], ['19-endday-review', 'End workday summary of jobs and syncs', 'End-of-day review']))}`)}

    ${sec('status', { label: 'Status', title: 'Designed and prototyped. Next: testing with drivers.', intro: 'The design is complete and development is underway. It has not launched or been tested with drivers, so no results are claimed.' },
      points([
        ['First shift', 'Can a driver finish a job unaided on their first shift?'],
        ['The changing button', 'Is the primary button understood as its label changes?'],
        ['Offline trust', 'Is the sync status noticed, and trusted, when signal drops?'],
      ]))}

    ${close(ctx, next, [proto])}
    ${todo(ctx, 'WasteMart: design timeline and when development started')}
    ${todo(ctx, 'WasteMart: the wider product and whether the client can be named')}
    ${todo(ctx, 'WasteMart: which features are implemented, plus build screenshots')}
  </article>`;
  },
};
