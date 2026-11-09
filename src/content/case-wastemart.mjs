// WasteMart mobile app case study.
// Sources: screens captured from the designer's interactive prototype
// (assets/images/wastemart) and the designer's own project notes.

import { figure, placeholder, phInline, button } from '../shared.mjs';
import { decision, flow, tree, screens, pair } from '../case.mjs';

const phone = (ctx, key, alt, caption) =>
  figure(ctx, { key, alt, caption, frame: 'phone', sizes: '(min-width: 1024px) 280px, 60vw' });

export default {
  slug: 'wastemart',
  lede:
    'WasteMart’s driver app supports a waste-collection driver through the working day — from choosing a truck and starting the day, through each job on the route, to closing the day out. The design goal was simple to state and hard to do: at any moment, the driver should know what to do next.',
  introCtx: (ctx) => [
    ['Users', 'Waste-collection drivers, with operations staff reviewing their records'],
    ['Collaborators', phInline(ctx, 'WasteMart: collaborators — client contact, developers, product owner')],
    ['Timeline', phInline(ctx, 'WasteMart: design timeline and when development started')],
  ],
  cover: (ctx) => `
    <div class="cover-phones">
      ${phone(ctx, 'wastemart/04-startday-ready', 'Start of day screen with the date, the assigned truck and a Start Day button', 'Start the day')}
      ${phone(ctx, 'wastemart/06-jobs', 'Job list showing jobs done, the disposal site and nine assigned jobs in route order', 'The day’s jobs')}
      ${phone(ctx, 'wastemart/07-job-detail', 'Job detail for a client site with directions, call site, job description and a Confirm & Check In button', 'One job')}
    </div>
    <p class="cover-note">Screens from the WasteMart design prototype, with demo data.</p>`,

  sections: [
    {
      id: 'context',
      title: 'Product context',
      short: 'Context',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">A driver’s day is a chain of connected tasks, done in the cab and on site, often with one hand free and patchy signal.</p>
          <p>The app covers the driver’s side of waste collection: picking a vehicle and starting the shift, working through a route of assigned jobs, checking in at each client site, recording what was collected and where it went, capturing evidence and the customer’s sign-off, and ending the day.</p>
          <p>The records the driver creates are used later by someone who wasn’t there — an operations team checking manifests, bins and disposal. So the app has two audiences: the driver using it now, and the person relying on its record afterwards.</p>
        </div>
        ${placeholder(ctx, {
          need: 'WasteMart: what the wider product is and who the client is.',
          detail: 'Confirm what WasteMart offers beyond the driver app (for example a customer portal or office system), and whether the client can be named.',
        })}`,
    },
    {
      id: 'challenge',
      title: 'Design challenge',
      short: 'Challenge',
      body: (ctx) => `
        <div class="prose"><p class="lead">How do you design detailed operational software for people who are busy doing the actual work?</p></div>
        <ul class="points points--four" role="list">
          <li><h3>Operational depth</h3><p>Manifests, bin numbers, waste types, quantities, barcodes, photos and signatures all need to be captured correctly.</p></li>
          <li><h3>Speed</h3><p>Drivers can’t fight through menus between stops. The next action has to be obvious.</p></li>
          <li><h3>Accuracy</h3><p>A missing or wrong detail can cause problems hours later, for someone in an office.</p></li>
          <li><h3>Unreliable signal</h3><p>Connectivity drops in the field. The driver must never wonder whether their work was lost.</p></li>
        </ul>
        <div class="prose">
          <p>I framed the product around four questions the driver should be able to answer at any point: <em>What am I doing now? What is already done? What still needs to happen? What happens if something goes wrong?</em></p>
        </div>`,
    },
    {
      id: 'journeys',
      title: 'User journeys',
      short: 'Journeys',
      body: (ctx) => `
        <div class="journey">
          <h3 class="journey__title">Journey 1 · Starting the day</h3>
          ${flow(['Log in', 'Choose a vehicle', 'Confirm start', 'See the day’s jobs'], { label: 'Starting the day', dense: true })}
          ${screens(ctx, [
            { key: 'wastemart/01-login', alt: 'Login screen with username, password and remember password', caption: 'Log in' },
            { key: 'wastemart/04-startday-ready', alt: 'Start of day with the truck selected and Start Day enabled', caption: 'Vehicle chosen; the day can start' },
            { key: 'wastemart/06-jobs', alt: 'Job list for the day, in route order', caption: 'The route, in order' },
          ])}
        </div>
        <div class="journey">
          <h3 class="journey__title">Journey 2 · Completing a job</h3>
          ${flow(['Open job', 'Check in on site', 'Capture details', 'Evidence & sign-off', 'Save manifest', 'Check out'], { label: 'Completing a job', dense: true })}
          ${screens(ctx, [
            { key: 'wastemart/08-checkin-confirm', alt: 'Confirm check-in dialog with client, address, time and vehicle', caption: 'Confirm the check-in' },
            { key: 'wastemart/09-capture-top', alt: 'Capture screen with manifest numbers, waste description, quantity and service allocation', caption: 'Capture the collection' },
            { key: 'wastemart/12-signoff', alt: 'Customer sign-off with name, surname and a signature pad', caption: 'Customer signs off' },
            { key: 'wastemart/14-manifest-saved', alt: 'Job detail after capture, with captured details and a Check Out button', caption: 'Ready to check out' },
          ], 'screens--four')}
        </div>
        <p class="small muted">Journeys are drawn from the designed workflow. No formal user research or personas were produced for this project.</p>`,
    },
    {
      id: 'ia',
      title: 'Information architecture',
      short: 'Structure',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">Three tabs, with the working day as the backbone.</p>
          <p>The app is structured around the shape of a shift rather than a set of isolated screens. Jobs are where the day happens; Activity holds the records around it; Shift Controls is where the day is managed and ended.</p>
        </div>
        ${tree('WasteMart driver app', [
          { name: 'Start of day', items: ['Log in', 'Select vehicle', 'Start day'] },
          { name: 'Jobs', items: ['Today’s jobs, in route order', 'Job detail', 'Check in / check out', 'Capture details', 'Evidence & sign-off'] },
          { name: 'Activity', items: ['Dump records', 'Fuel activity', 'Manifests'] },
          { name: 'Shift Controls', items: ['Sync status', 'Offline queue', 'Help & support', 'End day'] },
        ])}
        ${flow(['Workday', 'Jobs', 'Job execution', 'Evidence', 'Completion', 'End of day'], { label: 'The backbone of the app', dense: true })}
        ${screens(ctx, [
          { key: 'wastemart/16-jobs-progress', alt: 'Job list with the first job completed and progress at 1 of 9', caption: 'Jobs — progress for the day stays at the top' },
          { key: 'wastemart/17-activity', alt: 'Activity screen with dump records, fuel activity and manifests', caption: 'Activity — the records around the jobs' },
          { key: 'wastemart/18-shift', alt: 'Shift controls with shift status, sync status, offline queue and End Day', caption: 'Shift Controls — sync and end of day' },
        ])}`,
    },
    {
      id: 'decisions',
      title: 'Interaction decisions',
      short: 'Decisions',
      body: (ctx) => [
        decision(ctx, {
          n: '01',
          title: 'The primary action follows the job’s state',
          challenge: 'A job moves through several stages. Drivers shouldn’t have to remember which step they’re on or hunt for the right button.',
          considerations: 'Showing every action at once is flexible but puts the burden of choosing on the driver, in the moment they’re least able to think about it.',
          decision: 'Each job has one primary button at the bottom of the screen, and its label changes with the job’s state: Confirm & Check In, Save Manifest, Check Out.',
          rationale: 'The workflow manages the interface, not the other way round. One job, one next action.',
          evidence: `<div class="screens screens--two">${phone(ctx, 'wastemart/07-job-detail', 'Job detail with a Confirm & Check In button', 'Before arrival: Confirm & Check In')}${phone(ctx, 'wastemart/14-manifest-saved', 'Job detail after capture with a Check Out button', 'After capture: Check Out')}</div>`,
        }),
        decision(ctx, {
          n: '02',
          title: 'Treat each kind of evidence as its own flow',
          challenge: 'The record needs proof — of the paperwork, of which bins moved, of the bags collected and of the customer’s agreement. These are different capture problems.',
          considerations: 'A single generic “add photo” feature would be simpler to build, but would mix four kinds of proof together and make the record harder to check later.',
          decision: 'Separate flows for the manifest photo, bin movements (removed and placed are tracked separately), barcode scanning for recycling bags, and a drawn customer signature that the manifest can’t be saved without.',
          rationale: 'Each piece of proof stays readable on its own, which matters to the person reconstructing the job afterwards.',
          evidence: `<div class="screens screens--three">${phone(ctx, 'wastemart/10-bin-mismatch', 'Bin movements with separate Bin Removed and Bin Placed tabs and a bin number field', 'Bin movements, removed and placed')}${phone(ctx, 'wastemart/11-scan', 'Recycling bag scanner with a list of scanned bags and waste type tags', 'Scanning recycling bags')}${phone(ctx, 'wastemart/12-signoff', 'Customer sign-off screen with signature pad', 'Customer signature')}</div>`,
        }),
        decision(ctx, {
          n: '03',
          title: 'Make sync visible without making it the focus',
          challenge: 'Signal drops in the field. If the app doesn’t say whether work was saved, drivers repeat it or worry about it.',
          considerations: 'Blocking pop-ups for every connection change would be loud and disruptive; hiding sync entirely would erode trust.',
          decision: 'A quiet, persistent strip with four states — Online, Syncing, Offline (saved on the phone), Sync failed — plus a Sync Status and Offline Queue in Shift Controls.',
          rationale: 'The driver can always check that nothing has been lost, without connectivity becoming the centre of the experience.',
          evidence: `<ul class="states" role="list" aria-label="Sync states">
              <li><span class="states__mark states__mark--ok" aria-hidden="true"></span><strong>Online</strong> All data synced</li>
              <li><span class="states__mark states__mark--busy" aria-hidden="true"></span><strong>Syncing</strong> Uploading recent changes</li>
              <li><span class="states__mark states__mark--queue" aria-hidden="true"></span><strong>Offline</strong> Saved on this phone, queued to send</li>
              <li><span class="states__mark states__mark--fail" aria-hidden="true"></span><strong>Sync failed</strong> Needs attention</li>
            </ul>
            ${phone(ctx, 'wastemart/18-shift', 'Shift controls showing sync status and offline queue', 'Sync status and offline queue in Shift Controls')}
            ${placeholder(ctx, { need: 'Screenshot of the sync strip in the offline and failed states.', detail: 'Export from the WasteMart design file or prototype.' })}`,
        }),
        decision(ctx, {
          n: '04',
          title: 'Ending the day is a review, not a button',
          challenge: 'An early or incomplete close-out is exactly when the office needs the most information — and when a driver is most likely to rush.',
          considerations: 'A simple confirmation is fast but lets unfinished work slip through without explanation.',
          decision: 'End Day opens a summary of jobs completed and remaining, pending uploads and failed syncs. If work is outstanding, ending anyway asks for a reason code and an optional note.',
          rationale: 'Whoever reviews the day sees not only that something was left undone, but why, in the driver’s own words.',
          evidence: `${phone(ctx, 'wastemart/19-endday-review', 'End Workday dialog listing completed jobs, remaining jobs, pending uploads and failed syncs, with a review-required warning', 'End of day review')}
            ${placeholder(ctx, { need: 'Screenshot of the end-of-day reason-code sheet.', detail: 'Export from the WasteMart design file or prototype.' })}`,
        }),
      ].join(''),
    },
    {
      id: 'system',
      title: 'Visual system',
      short: 'Visual system',
      body: (ctx) => `
        <div class="prose"><p class="lead">A restrained system built for glanceability: strong hierarchy, high-contrast primary actions, clear status and large touch targets.</p></div>
        <div class="vs">
          <div class="vs__block">
            <p class="label">Colour</p>
            <ul class="swatches" role="list">
              <li><span style="background:#063a3f"></span>Deep teal — headers</li>
              <li><span style="background:#22b8a8"></span>Teal — primary action</li>
              <li><span style="background:#d7eeeb"></span>Mint — notices</li>
              <li><span style="background:#e25b5b"></span>Red — ending the day</li>
              <li><span style="background:#f4f7f4;border:1px solid #ddd"></span>Neutral — surface</li>
            </ul>
          </div>
          <div class="vs__block">
            <p class="label">Components in the design</p>
            <ul class="inline-list" role="list"><li>Full-width primary button</li><li>Secondary and text buttons</li><li>Labelled form fields</li><li>Segmented control</li><li>Job cards with status chip</li><li>Confirmation sheets</li><li>Toast</li><li>Bottom tab bar</li></ul>
          </div>
          <div class="vs__block">
            <p class="label">Spacing</p>
            <p>8 · 16 · 24 · 40 · 64 — large touch targets by default.</p>
          </div>
        </div>
        <p class="small muted">Colour values are sampled from the screens shown here.</p>
        ${placeholder(ctx, { need: 'WasteMart type ramp and exact colour tokens.', detail: 'Export the typography styles and colour variables from the design file to replace the sampled values.' })}`,
    },
    {
      id: 'progress',
      title: 'Development progress',
      short: 'Progress',
      body: (ctx) => `
        ${pair(
          `<p class="label">Complete</p><h3 class="h4">Design</h3><ul class="check" role="list"><li>Full driver workflow designed, start of day to end of day</li><li>Interactive prototype covering the state changes, evidence flows, audit trail for corrections and the two-stage close-out</li></ul>`,
          `<p class="label">Underway</p><h3 class="h4">Development</h3><p>The app is being built by the development team. It has not launched and has not yet been tested with drivers.</p>${placeholder(ctx, { need: 'Which WasteMart features are implemented and which are still in development.', detail: 'A short list from the development team, plus screenshots of the implemented build if they can be shared.' })}`,
        )}
        <div class="btn-row">${button(ctx, { label: 'Open the interactive prototype', href: 'prototypes/wastemart.html', variant: 'secondary', ic: 'external', external: true })}</div>
        <p class="small muted">The prototype runs in the browser. Log in with any details and pick truck CT-WM-417 to run a job end to end. It is a design prototype, not the production app.</p>`,
    },
    {
      id: 'reflection',
      title: 'Reflection',
      short: 'Reflection',
      body: (ctx) => `
        <div class="prose">
          <p class="lead">Complexity should live in the system, not in the driver’s head.</p>
          <p>The app handles several jobs, many states, four kinds of evidence, exceptions and offline work. The driver shouldn’t have to hold any of that in mind; the interface’s job is to make the next right action obvious, and the record it leaves behind has to make sense to someone who wasn’t there.</p>
          <h3 class="h4">What to evaluate once it reaches testing</h3>
          <ul>
            <li>Whether drivers can complete a job without help on their first shift.</li>
            <li>Whether the state-driven primary button is understood, or whether people look for other actions.</li>
            <li>How the bin-mismatch and correction flows hold up against real paperwork.</li>
            <li>Whether the sync strip is noticed, and trusted, when signal drops.</li>
            <li>Whether operations staff find the end-of-day reasons useful.</li>
          </ul>
        </div>`,
    },
  ],
};
