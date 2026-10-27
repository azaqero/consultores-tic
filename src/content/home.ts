import type { Lang } from '../i18n/ui';

export interface WorkItem {
  name: string;
  tagline: string;
  body: string;
  metric?: string;
  stack: string;
  url?: string;
}

export interface Capability {
  title: string;
  body: string;
}

export interface HomeContent {
  eyebrow: string;
  headline: string;
  lede: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  availability: string;
  work: {
    title: string;
    intro: string;
    items: WorkItem[];
    allProjects: string;
  };
  capabilities: {
    title: string;
    items: Capability[];
  };
  method: {
    title: string;
    body: string;
    cta: string;
  };
  contact: {
    title: string;
    body: string;
    cta: string;
  };
}

export const home: Record<Lang, HomeContent> = {
  en: {
    eyebrow: 'Senior Software Engineer · Backend & Distributed Systems',
    headline: 'I build backend systems that hold up under real traffic.',
    lede: '18 years designing APIs, queues and infrastructure for production systems — and I measure what I claim.',
    intro:
      'Production experience in PHP and Node.js/TypeScript, AWS, queue-based processing and third-party integrations. I own products end to end, from infrastructure to technical support, and I take responsibility for everything I ship.',
    primaryCta: 'See selected work',
    secondaryCta: 'Download CV',
    availability: 'Available full-time, 100% remote · GMT-5',
    work: {
      title: 'Selected work',
      intro:
        'Products I designed and built — not a list of technologies, but systems that solved someone’s problem.',
      allProjects: 'Read the full project write-ups',
      items: [
        {
          name: 'ApiFuel',
          tagline: 'Lead ingestion across a self-provisioning fleet',
          body: 'Built in native PHP for performance, migrated to AWS Lambda and API Gateway, then rebuilt in TypeScript with BullMQ and Redis Cluster in 2025. Every lead fans out to multiple third-party buyer APIs, so capacity is bound by outbound concurrency rather than request rate.',
          metric:
            '~10k inbound requests over ~4 minutes under automated load testing, reaching ~30 self-provisioned t4g.small instances (hard cap 50) at ~300 outbound workers each.',
          stack: 'PHP · TypeScript · AWS Lambda · BullMQ · Redis · PostgreSQL',
          url: 'https://apifuel.com',
        },
        {
          name: 'ArticleAI',
          tagline: 'SaaS content platform, built solo',
          body: 'Full product: React and TypeScript front end, MySQL back end, a proprietary API, automated SEO content generation and multiple export formats. An official WordPress plugin published on wordpress.org ships with it.',
          stack: 'React · TypeScript · MySQL · WordPress plugin',
          url: 'https://articleai.io',
        },
        {
          name: 'DialReveal',
          tagline: 'Paid integration platform',
          body: 'Anti-spam call detection combining Twilio, FTC data and scraping automation behind a customer dashboard with Stripe billing. Third-party data, normalized into one usable signal.',
          stack: 'PHP · Twilio · Stripe · MySQL',
          url: 'https://dialreveal.com',
        },
      ],
    },
    capabilities: {
      title: 'What I do',
      items: [
        {
          title: 'APIs and backend services',
          body: 'REST APIs in PHP and Node.js/TypeScript that other systems depend on. Clear contracts, predictable errors, data models that survive change.',
        },
        {
          title: 'Async and queued processing',
          body: 'Work that cannot happen in a request: queues, retries, idempotency, backoff. Redis and BullMQ in production, including clustered configurations.',
        },
        {
          title: 'Cloud and infrastructure',
          body: 'AWS Lambda, API Gateway, EC2, RDS, S3 and CloudFront. Linux, Nginx and Apache. I deploy, monitor and support what I build.',
        },
        {
          title: 'Third-party integrations',
          body: 'Payments, telephony, messaging and external data. Integration work is mostly about failure modes, not happy paths.',
        },
      ],
    },
    method: {
      title: 'How I work',
      body: 'Spec first: understand the problem, design the simplest solution that satisfies it, then break it into tasks small enough to review. I use specialized AI agents to execute deliberately chosen steps — I decide what to build and how it is structured, and I review, test and own the result. AI increases throughput; it does not replace engineering judgment.',
      cta: 'How I use AI without giving up ownership',
    },
    contact: {
      title: 'Let’s talk',
      body: 'Open to senior backend roles and to specific projects. I answer email directly — no forms.',
      cta: 'Gustavo@consultores-tic.com',
    },
  },

  es: {
    eyebrow: 'Ingeniero de Software Senior · Backend y Sistemas Distribuidos',
    headline: 'Construyo sistemas backend que aguantan tráfico real.',
    lede: '18 años diseñando APIs, colas e infraestructura para sistemas en producción — y mido lo que afirmo.',
    intro:
      'Experiencia en producción con PHP y Node.js/TypeScript, AWS, procesamiento por colas e integraciones con terceros. Me hago cargo de los productos de punta a punta, desde la infraestructura hasta el soporte técnico, y respondo por todo lo que publico.',
    primaryCta: 'Ver trabajos seleccionados',
    secondaryCta: 'Descargar CV',
    availability: 'Disponible full-time, 100% remoto · GMT-5',
    work: {
      title: 'Trabajos seleccionados',
      intro:
        'Productos que diseñé y construí — no una lista de tecnologías, sino sistemas que resolvieron el problema de alguien.',
      allProjects: 'Leer el detalle de cada proyecto',
      items: [
        {
          name: 'ApiFuel',
          tagline: 'Ingesta de leads sobre una flota auto-provisionada',
          body: 'Construido en PHP nativo por rendimiento, migrado a AWS Lambda y API Gateway, y reconstruido en TypeScript con BullMQ y Redis Cluster en 2025. Cada lead se distribuye a múltiples APIs de compradores, así que la capacidad la define la concurrencia saliente, no la tasa de peticiones.',
          metric:
            '~10k peticiones entrantes en ~4 minutos en pruebas de carga automatizadas, alcanzando ~30 instancias t4g.small auto-provisionadas (tope 50) con ~300 workers salientes cada una.',
          stack: 'PHP · TypeScript · AWS Lambda · BullMQ · Redis · PostgreSQL',
          url: 'https://apifuel.com',
        },
        {
          name: 'ArticleAI',
          tagline: 'Plataforma SaaS de contenido, hecha en solitario',
          body: 'Producto completo: front end en React y TypeScript, back end MySQL, una API propia, generación automática de contenido SEO y múltiples formatos de exportación. Incluye un plugin oficial publicado en wordpress.org.',
          stack: 'React · TypeScript · MySQL · plugin de WordPress',
          url: 'https://articleai.io',
        },
        {
          name: 'DialReveal',
          tagline: 'Plataforma de integración con cobro',
          body: 'Detección de llamadas spam combinando Twilio, datos de la FTC y automatización de scraping detrás de un panel con cobros por Stripe. Datos de terceros normalizados en una sola señal útil.',
          stack: 'PHP · Twilio · Stripe · MySQL',
          url: 'https://dialreveal.com',
        },
      ],
    },
    capabilities: {
      title: 'Qué hago',
      items: [
        {
          title: 'APIs y servicios backend',
          body: 'APIs REST en PHP y Node.js/TypeScript de las que dependen otros sistemas. Contratos claros, errores predecibles, modelos de datos que resisten cambios.',
        },
        {
          title: 'Procesamiento asíncrono y por colas',
          body: 'El trabajo que no puede ocurrir dentro de un request: colas, reintentos, idempotencia, backoff. Redis y BullMQ en producción, incluyendo configuraciones en clúster.',
        },
        {
          title: 'Cloud e infraestructura',
          body: 'AWS Lambda, API Gateway, EC2, RDS, S3 y CloudFront. Linux, Nginx y Apache. Despliego, monitoreo y doy soporte a lo que construyo.',
        },
        {
          title: 'Integraciones con terceros',
          body: 'Pagos, telefonía, mensajería y datos externos. El trabajo de integración se trata sobre todo de modos de falla, no de caminos felices.',
        },
      ],
    },
    method: {
      title: 'Cómo trabajo',
      body: 'Primero la especificación: entender el problema, diseñar la solución más simple que lo resuelva y dividirla en tareas lo bastante chicas como para revisarlas. Uso agentes de IA especializados para ejecutar pasos elegidos deliberadamente — yo decido qué construir y cómo estructurarlo, y reviso, pruebo y respondo por el resultado. La IA aumenta la capacidad de ejecución; no reemplaza el criterio de ingeniería.',
      cta: 'Cómo uso IA sin ceder la responsabilidad',
    },
    contact: {
      title: 'Hablemos',
      body: 'Abierto a posiciones senior de backend y a proyectos puntuales. Respondo el correo directamente — sin formularios.',
      cta: 'Gustavo@consultores-tic.com',
    },
  },
};
