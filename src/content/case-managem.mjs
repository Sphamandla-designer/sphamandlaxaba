// ManaGEM ERP case study. Screens use demo data, never client data.

import { figure, todo, button, site } from '../shared.mjs';
import { decision, flow, tree, list } from '../case.mjs';

const shot = (ctx, key, alt, caption) => figure(ctx, { key, alt, caption, sizes: '(min-width: 1120px) 600px, 100vw' });

export default {
  slug: 'managem',
  lede: 'ManaGEM is an ERP for trade businesses — from first enquiry to paid invoice. My job: make a product with many moving parts feel like one simple tool.',
  meta: (ctx) => [['Team', todo(ctx, 'ManaGEM: team and collaborators')], ['Timeline', todo(ctx, 'ManaGEM: timeline and launch date')]],
  cover: (ctx) => figure(ctx, { key: 'mockups/managem', alt: 'ManaGEM dashboard shown on a laptop', kind: 'mockup', eager: true, sizes: '(min-width: 1200px) 1136px, 100vw' }),

  sections: [
    {
      id: 'context',
      title: 'Context',
      body: (ctx) => `
        <p class="lead">Trade businesses run one chain: enquiry, quote, production, stock, invoice, payment. ManaGEM puts that chain in one system.</p>
        ${flow(['Customer', 'Enquiry & quote', 'Production', 'Stock', 'Invoice', 'Payment'], 'The business chain')}
        ${todo(ctx, 'ManaGEM: who uses it day to day, and in which industries')}`,
    },
    {
      id: 'role',
      title: 'My role',
      body: (ctx) => `
        <p class="lead">Owned most UX/UI and product design decisions.</p>
        ${list([
          'Information architecture and navigation',
          'Shared patterns: lists, tables, status, forms, dashboards',
          'Core workflows — enquiries, invoicing, factory, stock, staff',
          'Take-On, the guided onboarding flow',
          'The design system the team builds from',
        ])}
        <p class="muted">Reviewed with the product owner, onboarding team and director. Built by the engineering team.</p>
        ${todo(ctx, 'ManaGEM: decisions made jointly, and who built what')}`,
    },
    {
      id: 'structure',
      title: 'Structure',
      body: () => `
        <p class="lead">Navigation follows how the business works, not how the data is stored.</p>
        ${tree([
          { name: 'Customers', items: ['Customers', 'Contacts', 'Warranties'] },
          { name: 'Sales', items: ['Enquiries', 'Invoices', 'Quote templates', 'Reports'] },
          { name: 'Operations', items: ['Products & pricing', 'Projects', 'Factory', 'Stock'] },
          { name: 'Admin', items: ['Staff records', 'Companies'] },
        ])}`,
    },
    {
      id: 'decisions',
      title: 'Key decisions',
      body: (ctx) =>
        [
          decision(ctx, {
            n: '01',
            title: 'Search first',
            problem: 'People had to learn a deep menu before the product was useful.',
            choice: 'Every list opens with search and live counts per stage.',
            why: 'Type what you want instead of hunting for it.',
            evidence: shot(ctx, 'managem/mg-open-enquiries', 'Open enquiries list with stage counts and search above the table'),
          }),
          decision(ctx, {
            n: '02',
            title: 'One status language',
            problem: 'Each module described state differently.',
            choice: 'One set of plain-word status pills — Paid, Overdue, Scheduled — used everywhere.',
            why: 'Words carry the meaning; the same colour means the same thing in every module.',
            evidence: shot(ctx, 'managem/mg-invoices', 'Invoices list where each row has a plain-word status'),
          }),
          decision(ctx, {
            n: '03',
            title: 'Production as a pipeline',
            problem: 'Factory work moves in stages that sales and finance also need to see.',
            choice: 'Five stages at a glance: Pending, In build, QC, Ready, Invoiced.',
            why: 'It mirrors how the work actually moves.',
            evidence: shot(ctx, 'managem/mg-factory', 'Factory dashboard with a five-stage production pipeline'),
          }),
          decision(ctx, {
            n: '04',
            title: 'Onboarding people can trust',
            problem: 'New clients waited weeks while their data was re-typed by hand.',
            choice: 'Take-On: upload documents, review each extracted record, confirm before anything goes live.',
            why: 'Automation only helps if people can check and correct it.',
            evidence: shot(ctx, 'managem/to-06-validation', 'Take-On review screen marking records as verified, needs review or duplicate') +
              todo(ctx, 'ManaGEM: confirm whether Take-On is live, in development or a design direction'),
          }),
        ].join(''),
    },
    {
      id: 'demo',
      title: 'See it working',
      dark: true,
      body: (ctx) => `
        <p class="lead">ManaGEM is live, so it isn’t public. I’m happy to walk you through it with demo data.</p>
        <div class="btn-row">
          ${button(ctx, { label: 'Request a walkthrough', href: `mailto:${site.email}?subject=${encodeURIComponent('ManaGEM walkthrough')}`, variant: 'secondary' })}
          ${button(ctx, { label: 'Open design prototype', href: 'prototypes/managem.html', variant: 'subtle', ic: 'external', external: true })}
        </div>
        ${todo(ctx, 'ManaGEM: approved demo link or short screen recording (demo data only)')}`,
    },
    {
      id: 'outcome',
      title: 'Outcome',
      body: (ctx) => `
        ${list([
          'A navigation model covering customers, sales, operations and admin',
          'Core workflows from enquiry to invoice',
          'One shared pattern library and design system',
        ])}
        <p class="quote">“People don’t need more on screen. They need to know where they are, what state their work is in, and what happens next.”</p>
        ${todo(ctx, 'ManaGEM: verified outcome — launch date, and usage or feedback if it can be shared')}`,
    },
  ],
};
