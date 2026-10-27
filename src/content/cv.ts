/**
 * Single source of truth for the CV.
 *
 * The page at /cv/ renders this object for humans; scripts/generate-cv-pdf.mjs
 * prints that page to public/cv.pdf. Never edit the PDF by hand.
 *
 * Claim discipline: every line here must be defensible in an interview. Metrics
 * state what was measured and under which conditions.
 */

import { identity } from '../config';

export interface CvJob {
  role: string;
  company: string;
  period: string;
  intro?: string;
  entries: Array<{
    name: string;
    detail?: string;
    bullets: string[];
  }>;
}

export interface CvContent {
  name: string;
  title: string;
  contact: {
    location: string;
    email: string;
    phone: string;
    github: string;
    site: string;
  };
  summary: string[];
  selectedWork: Array<{ title: string; body: string }>;
  skills: Array<{ label: string; items: string }>;
  experience: CvJob[];
  otherWork: string[];
  languages: string[];
}

export const cv: CvContent = {
  name: identity.displayName,
  title: 'Senior Software Engineer | Backend Products, APIs & AI-Assisted Development',
  contact: {
    location: 'Lambayeque, Peru (GMT-5)',
    email: 'contacto@consultores-tic.com',
    github: 'github.com/azaqero',
    site: 'consultores-tic.com',
  },
  summary: [
    'Senior software engineer with 18+ years building and operating backend products and APIs used by real customers. Production experience in PHP and Node.js/TypeScript, AWS (Lambda, API Gateway, EC2, RDS), queue-based processing (BullMQ, Redis) and third-party API integrations (Twilio, Stripe, FTC).',
    'I work spec-first with specialized coding agents across several model providers, choosing each model by cost and quality. I review, test and take responsibility for everything I ship. I own products end to end — infrastructure through production support. Available full-time, 100% remote.',
  ],
  selectedWork: [
    {
      title: 'High-burst lead ingestion with self-provisioning infrastructure',
      body: 'Migrated a native PHP lead engine to AWS Lambda and API Gateway, then rebuilt it in TypeScript with BullMQ and Redis Cluster (2025). Each inbound request fans out to multiple outbound POSTs to third-party buyers, so capacity is bound by outbound concurrency, not request rate. Built a controller that watches live concurrency and provisions ephemeral t4g.small workers ahead of demand — instance boot takes 1–2 minutes, so the trigger threshold was calibrated empirically. Validated under automated load testing: ~10k inbound requests over ~4 minutes, scaling to ~30 instances (hard-capped at 50) with ~300 outbound workers each, measured via CloudWatch, Bull Board and PgBouncer.',
    },
    {
      title: 'Full product ownership',
      body: 'Designed, built and shipped ArticleAI end to end — React/TypeScript/MySQL front and back end, proprietary API, automated SEO content generation, multiple export formats, plus an official WordPress plugin published on wordpress.org.',
    },
    {
      title: 'Paid integration platform',
      body: 'Built DialReveal, an anti-spam call detection service combining Twilio, FTC data and scraping automation behind a dashboard with Stripe billing.',
    },
  ],
  skills: [
    {
      label: 'Backend',
      items: 'PHP (native, OOP), Node.js, TypeScript, Fastify, RESTful APIs (JSON/XML)',
    },
    {
      label: 'Data & async processing',
      items:
        'PostgreSQL, MySQL/MariaDB (query optimization, indexing), Redis, BullMQ, PgBouncer',
    },
    {
      label: 'Cloud & infrastructure',
      items:
        'AWS (Lambda, API Gateway, EC2, RDS, S3, CloudFront, ELB), Linux, Apache/Nginx, shared hosting and DNS management',
    },
    {
      label: 'Frontend',
      items: 'React, Next.js, JavaScript, Astro',
    },
    {
      label: 'AI-assisted development',
      items:
        'Spec-driven development, OpenCode, specialized agents, multi-model workflow selected by cost and quality',
    },
    {
      label: 'Also',
      items: 'WordPress and WooCommerce (18+ years), Git and GitHub',
    },
  ],
  experience: [
    {
      role: 'Founder and Senior Software Engineer',
      company: 'Consultores TIC',
      period: '2008 — present',
      intro:
        'Software and hosting company serving local and international clients, handling everything from infrastructure setup to technical support. Selected products:',
      entries: [
        {
          name: 'ApiFuel.com',
          detail: 'High-traffic lead management system, 2012 — 2025',
          bullets: [
            'Built in native PHP for performance (2012–2016), moved to AWS Lambda and API Gateway (2016–2020), and rebuilt in TypeScript with BullMQ and Redis Cluster (2025).',
            'Capacity is bound by outbound concurrency: each lead fans out to multiple third-party buyer APIs. Built a provisioning controller that scales an ephemeral EC2 fleet ahead of demand, since a new t4g.small takes 1–2 minutes to become ready.',
            'Load-tested with automated POST campaigns: ~10k inbound requests over ~4 minutes, reaching ~30 instances (hard cap 50) at ~300 outbound workers each, validated against CloudWatch, Bull Board and PgBouncer metrics.',
          ],
        },
        {
          name: 'ArticleAI.io',
          detail: 'SaaS content generation platform',
          bullets: [
            'Developed the full product: React, TypeScript and MySQL across front and back end, a proprietary API, automated SEO content generation and multiple export formats.',
            'Published the official ArticleAI Fetcher plugin on wordpress.org.',
          ],
        },
        {
          name: 'DialReveal.com',
          detail: 'Anti-spam call detection platform',
          bullets: [
            'Integrated Twilio, FTC data and scraping automation behind a working dashboard with Stripe payments (PHP, jQuery, MySQL).',
          ],
        },
        {
          name: 'Opticaz.pe',
          detail: 'Optometry management system',
          bullets: [
            'Delivered a web app, an Android app and an admin dashboard sharing a REST API: appointments, inventory, clients and reports (PHP, MySQL).',
          ],
        },
      ],
    },
  ],
  otherWork: [
    'WordPress multisite optimization (USA client): stabilized 30 sites on shared hosting with selective plugin loading, caching and bot filtering.',
    'Next.js multilingual site: rapidpersonalloans.com/es.',
    'Airbnb calendar integration: metrorailhouse.com.',
  ],
  languages: [
    'Spanish (native); English (technical, written communication).',
    'Full-time, 100% remote from Lambayeque, Peru, GMT-5 (compatible with LATAM and US time zones).',
  ],
};
