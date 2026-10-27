/**
 * Single source of truth for the CV, in both languages.
 *
 * The pages at /cv/ and /es/cv/ render these objects for humans;
 * scripts/generate-cv-pdf.mjs prints them to public/cv.pdf and public/es/cv.pdf.
 * Never edit a PDF by hand.
 *
 * Claim discipline: every line must be defensible in an interview. Metrics state
 * what was measured and under which conditions.
 *
 * Drift guard: both locales must carry the same bullet counts and the same
 * numeric claims. scripts/generate-cv-pdf.mjs fails the build if they diverge,
 * because two CVs that disagree are worse than one CV.
 */
import { identity } from '../config';
import type { Lang } from '../i18n/ui';

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

export const cv: Record<Lang, CvContent> = {
  en: {
    name: identity.displayName,
    title: 'Senior Software Engineer | Backend Products, APIs & AI-Assisted Development',
    contact: {
      location: 'Lambayeque, Peru (GMT-5)',
      email: identity.publicEmail,
      github: 'github.com/azaqero',
      site: 'consultores-tic.com',
    },
    summary: [
      'Senior software engineer building and operating backend products and APIs used by real customers since 2008. Production experience in PHP and Node.js/TypeScript, AWS (Lambda, API Gateway, EC2, RDS), queue-based processing (BullMQ, Redis) and third-party API integrations (Twilio, Stripe, FTC).',
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
        items: 'WordPress and WooCommerce (since 2008), Git and GitHub',
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
  },

  es: {
    name: identity.displayName,
    title: 'Ingeniero de Software Senior | Productos Backend, APIs y Desarrollo Asistido por IA',
    contact: {
      location: 'Lambayeque, Perú (GMT-5)',
      email: identity.publicEmail,
      github: 'github.com/azaqero',
      site: 'consultores-tic.com',
    },
    summary: [
      'Ingeniero de software senior construyendo y operando productos backend y APIs usados por clientes reales desde 2008. Experiencia en producción con PHP y Node.js/TypeScript, AWS (Lambda, API Gateway, EC2, RDS), procesamiento por colas (BullMQ, Redis) e integraciones con APIs de terceros (Twilio, Stripe, FTC).',
      'Trabajo con especificación previa y agentes especializados en varios proveedores de modelos, eligiendo cada modelo por costo y calidad. Reviso, pruebo y respondo por todo lo que publico. Me hago cargo de los productos de punta a punta: desde la infraestructura hasta el soporte en producción. Disponible full-time, 100% remoto.',
    ],
    selectedWork: [
      {
        title: 'Ingesta de leads de alto volumen con infraestructura auto-provisionada',
        body: 'Migré un motor de leads en PHP nativo a AWS Lambda y API Gateway, y después lo reconstruí en TypeScript con BullMQ y Redis Cluster (2025). Cada petición entrante se distribuye en múltiples POST salientes hacia APIs de compradores, así que la capacidad la define la concurrencia saliente, no la tasa de peticiones. Construí un controlador que observa la concurrencia en vivo y provisiona workers t4g.small efímeros por delante de la demanda — el arranque de una instancia tarda 1–2 minutos, así que el umbral se calibró empíricamente. Validado con pruebas de carga automatizadas: ~10k peticiones entrantes en ~4 minutos, escalando a ~30 instancias (tope duro de 50) con ~300 workers salientes cada una, medido con CloudWatch, Bull Board y PgBouncer.',
      },
      {
        title: 'Producto completo de punta a punta',
        body: 'Diseñé, construí y publiqué ArticleAI completo — front y back end en React/TypeScript/MySQL, API propia, generación automática de contenido SEO, múltiples formatos de exportación y un plugin oficial de WordPress publicado en wordpress.org.',
      },
      {
        title: 'Plataforma de integración con cobro',
        body: 'Construí DialReveal, un servicio de detección de llamadas spam que combina Twilio, datos de la FTC y automatización de scraping detrás de un panel con cobros por Stripe.',
      },
    ],
    skills: [
      {
        label: 'Backend',
        items: 'PHP (nativo, POO), Node.js, TypeScript, Fastify, APIs REST (JSON/XML)',
      },
      {
        label: 'Datos y procesamiento asíncrono',
        items:
          'PostgreSQL, MySQL/MariaDB (optimización de consultas, índices), Redis, BullMQ, PgBouncer',
      },
      {
        label: 'Cloud e infraestructura',
        items:
          'AWS (Lambda, API Gateway, EC2, RDS, S3, CloudFront, ELB), Linux, Apache/Nginx, hosting compartido y gestión de DNS',
      },
      {
        label: 'Frontend',
        items: 'React, Next.js, JavaScript, Astro',
      },
      {
        label: 'Desarrollo asistido por IA',
        items:
          'Desarrollo guiado por especificación, OpenCode, agentes especializados, flujo multi-modelo elegido por costo y calidad',
      },
      {
        label: 'Además',
        items: 'WordPress y WooCommerce (desde 2008), Git y GitHub',
      },
    ],
    experience: [
      {
        role: 'Fundador e Ingeniero de Software Senior',
        company: 'Consultores TIC',
        period: '2008 — presente',
        intro:
          'Empresa de software y hosting que atiende clientes locales e internacionales, encargándose desde la infraestructura hasta el soporte técnico. Productos destacados:',
        entries: [
          {
            name: 'ApiFuel.com',
            detail: 'Sistema de gestión de leads de alto tráfico, 2012 — 2025',
            bullets: [
              'Construido en PHP nativo por rendimiento (2012–2016), migrado a AWS Lambda y API Gateway (2016–2020) y reconstruido en TypeScript con BullMQ y Redis Cluster (2025).',
              'La capacidad la define la concurrencia saliente: cada lead se distribuye a múltiples APIs de compradores. Construí un controlador de aprovisionamiento que escala una flota EC2 efímera por delante de la demanda, porque una t4g.small nueva tarda 1–2 minutos en estar lista.',
              'Probado con campañas automatizadas de POST: ~10k peticiones entrantes en ~4 minutos, alcanzando ~30 instancias (tope duro de 50) con ~300 workers salientes cada una, validado contra métricas de CloudWatch, Bull Board y PgBouncer.',
            ],
          },
          {
            name: 'ArticleAI.io',
            detail: 'Plataforma SaaS de generación de contenido',
            bullets: [
              'Desarrollé el producto completo: React, TypeScript y MySQL en front y back end, una API propia, generación automática de contenido SEO y múltiples formatos de exportación.',
              'Publiqué el plugin oficial ArticleAI Fetcher en wordpress.org.',
            ],
          },
          {
            name: 'DialReveal.com',
            detail: 'Plataforma de detección de llamadas spam',
            bullets: [
              'Integré Twilio, datos de la FTC y automatización de scraping detrás de un panel funcional con cobros por Stripe (PHP, jQuery, MySQL).',
            ],
          },
          {
            name: 'Opticaz.pe',
            detail: 'Sistema de gestión para optometría',
            bullets: [
              'Entregué una aplicación web, una aplicación Android y un panel de administración compartiendo una API REST: turnos, inventario, clientes y reportes (PHP, MySQL).',
            ],
          },
        ],
      },
    ],
    otherWork: [
      'Optimización de WordPress multisite (cliente de Estados Unidos): 30 sitios estabilizados en hosting compartido con carga selectiva de plugins, caché y filtrado de bots.',
      'Sitio multilenguaje en Next.js: rapidpersonalloans.com/es.',
      'Integración de calendario de Airbnb: metrorailhouse.com.',
    ],
    languages: [
      'Español (nativo); inglés (técnico, comunicación escrita).',
      'Full-time, 100% remoto desde Lambayeque, Perú, GMT-5 (compatible con husos de LATAM y Estados Unidos).',
    ],
  },
};
