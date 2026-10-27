import type { Lang } from '../i18n/ui';

export interface ProjectFact {
  label: string;
  value: string;
}

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  status?: string;
  name: string;
  role: string;
  period?: string;
  /** Current operational state, only where it is verified. */
  status?: string;
  summary: string;
  facts?: ProjectFact[];
  sections: ProjectSection[];
  stack: string;
  url?: string;
}

export interface ProjectsContent {
  eyebrow: string;
  headline: string;
  intro: string;
  note: string;
  items: Project[];
  otherTitle: string;
  otherItems: string[];
}

export const projects: Record<Lang, ProjectsContent> = {
  en: {
    eyebrow: 'Projects',
    headline: 'Systems I built',
    intro:
      'Four products, written up the way I would explain them in an interview: what the constraint was, what I chose, and what the choice cost.',
    note: 'The source code for all of these is private, and most are no longer under my administration. What follows describes what I built and the decisions behind it — no client code, credentials or confidential data.',
    items: [
      {
        slug: 'apifuel',
        name: 'ApiFuel',
        role: 'Lead management and dispatch',
        period: '2012 — 2025',
        status: 'Operated 2012 — 2025',
        summary:
          'Ingests leads and dispatches each one to multiple third-party buyer APIs. The interesting part is not the request rate — it is that every lead multiplies into several outbound calls.',
        facts: [
          { label: 'Inbound load tested', value: '~10k requests over ~4 minutes' },
          { label: 'Outbound workers', value: '~300 per instance' },
          { label: 'Peak fleet', value: '~30 instances (hard cap 50)' },
          { label: 'Instance type', value: 'AWS t4g.small' },
        ],
        sections: [
          {
            heading: 'The constraint that shaped everything',
            body: 'A lead arrives once and leaves several times: each one is dispatched to multiple buyer APIs, each of which can fail, slow down or reject independently. That makes capacity a function of outbound concurrency, not of how many requests arrive per second. Optimising inbound throughput would have solved the wrong problem.',
          },
          {
            heading: 'Three architectures, same product',
            body: 'Native PHP built for throughput under shared hosting (2012). Then AWS Lambda and API Gateway (2016), trading server administration for managed scaling and accepting cold starts. Then a rebuild of the dispatch layer in TypeScript with BullMQ and a Redis Cluster (2025), because the queue semantics and visibility the previous stack could not give me were now the requirement.',
          },
          {
            heading: 'Scaling ahead of demand instead of reacting to it',
            body: 'A new t4g.small takes one to two minutes to become ready, and the traffic bursts I designed for last about four. A reactive autoscaler would deliver capacity after the burst was already over. So a controller watches live concurrency and provisions workers ahead of the curve, with the trigger threshold calibrated from load tests rather than guessed. The hard cap of fifty instances is a cost guardrail, not a technical limit.',
          },
          {
            heading: 'How the numbers were obtained',
            body: 'Automated campaigns sending POSTs, with concurrency, queue depth and database connections read from CloudWatch, Bull Board and PgBouncer. This was a load test, not customer traffic — the distinction matters and I keep it explicit.',
          },
        ],
        stack: 'PHP · TypeScript · AWS Lambda · API Gateway · BullMQ · Redis Cluster · PostgreSQL · PgBouncer',
        url: 'https://apifuel.com',
      },
      {
        slug: 'articleai',
        name: 'ArticleAI',
        role: 'SaaS content platform',
        period: 'Built and shipped solo',
        status: 'Built and operated',
        summary:
          'A complete commercial product: front end, back end, API, payment-free licensing and a WordPress plugin that distributes it.',
        sections: [
          {
            heading: 'What it does',
            body: 'Generates SEO-oriented articles automatically, with multiple export formats, behind a React and TypeScript interface over a MySQL back end and a proprietary API.',
          },
          {
            heading: 'The part most people skip',
            body: 'A SaaS is not only the application. It needs distribution, and that came from the official ArticleAI Fetcher plugin published on wordpress.org — an install path for people already running WordPress rather than another signup funnel to build.',
          },
        ],
        stack: 'React · TypeScript · MySQL · WordPress plugin',
        url: 'https://articleai.io',
      },
      {
        slug: 'dialreveal',
        name: 'DialReveal',
        role: 'Anti-spam call detection',
        period: 'Integrated platform',
        status: 'Built and operated',
        summary:
          'Three unreliable external sources — telephony events, public complaint data and scraping — normalized into one signal a customer can act on.',
        sections: [
          {
            heading: 'Normalising three bad sources into one good answer',
            body: 'Twilio supplies call events, the FTC supplies complaint data, and scraping fills the gaps between them. Each source has its own latency, its own idea of what a phone number looks like, and its own way of being temporarily unavailable. The product is the reconciliation, not the integrations.',
          },
          {
            heading: 'Commerce built in',
            body: 'Access is sold through Stripe behind a dashboard, which means the integration surface includes billing state, not only the detection logic.',
          },
        ],
        stack: 'PHP · Twilio · Stripe · MySQL · jQuery',
        url: 'https://dialreveal.com',
      },
      {
        slug: 'opticaz',
        name: 'Opticaz',
        role: 'Optometry management system',
        period: 'Multi-client system',
        status: 'Still in operation, under my administration',
        summary:
          'One REST API behind three clients: a web application, an Android app and an administrative dashboard.',
        sections: [
          {
            heading: 'One API, three consumers',
            body: 'Appointments, inventory, clients and reporting, served to a web app, a native Android client and an admin dashboard. The API contract had to be stable enough that three independent interfaces could ship against it without stepping on each other.',
          },
        ],
        stack: 'PHP · MySQL · REST · Android',
      },
    ],
    otherTitle: 'Also',
    otherItems: [
      'WordPress multisite optimisation for a US client: stabilised 30 sites on shared hosting through selective plugin loading, caching and bot filtering.',
      'Multilingual Next.js site for rapidpersonalloans.com/es.',
      'Airbnb calendar integration for metrorailhouse.com.',
    ],
  },

  es: {
    eyebrow: 'Proyectos',
    headline: 'Sistemas que construí',
    intro:
      'Cuatro productos, escritos como los explicaría en una entrevista: cuál era la restricción, qué elegí y qué me costó esa elección.',
    note: 'El código de todos estos proyectos es privado, y la mayoría ya no está bajo mi administración. Lo que sigue describe qué construí y las decisiones detrás — sin código de clientes, credenciales ni datos confidenciales.',
    items: [
      {
        slug: 'apifuel',
        name: 'ApiFuel',
        role: 'Gestión y despacho de leads',
        period: '2012 — 2025',
        status: 'Operado entre 2012 y 2025',
        summary:
          'Ingesta leads y despacha cada uno a múltiples APIs de compradores. Lo interesante no es la tasa de peticiones: es que cada lead se multiplica en varias llamadas salientes.',
        facts: [
          { label: 'Carga entrante probada', value: '~10k peticiones en ~4 minutos' },
          { label: 'Workers salientes', value: '~300 por instancia' },
          { label: 'Flota máxima', value: '~30 instancias (tope 50)' },
          { label: 'Tipo de instancia', value: 'AWS t4g.small' },
        ],
        sections: [
          {
            heading: 'La restricción que definió todo',
            body: 'Un lead entra una vez y sale varias: cada uno se despacha a múltiples APIs de compradores, y cada una puede fallar, demorarse o rechazar de forma independiente. Eso hace que la capacidad sea función de la concurrencia saliente, no de cuántas peticiones entran por segundo. Optimizar el throughput de entrada habría resuelto el problema equivocado.',
          },
          {
            heading: 'Tres arquitecturas, el mismo producto',
            body: 'PHP nativo, construido para rendimiento bajo hosting compartido (2012). Después AWS Lambda y API Gateway (2016), cambiando administración de servidores por escalado gestionado y aceptando cold starts. Después una reconstrucción de la capa de despacho en TypeScript con BullMQ y Redis Cluster (2025), porque la semántica de colas y la visibilidad que el stack anterior no daba pasaron a ser el requisito.',
          },
          {
            heading: 'Escalar antes de la demanda en lugar de reaccionar',
            body: 'Una t4g.small nueva tarda entre uno y dos minutos en estar lista, y los picos que diseñé duran unos cuatro. Un autoscaler reactivo entregaría capacidad cuando el pico ya terminó. Por eso un controlador observa la concurrencia en vivo y provisiona workers por delante de la curva, con el umbral calibrado a partir de pruebas de carga en vez de estimado. El tope de cincuenta instancias es un guardrail de costo, no un límite técnico.',
          },
          {
            heading: 'Cómo se obtuvieron los números',
            body: 'Campañas automatizadas enviando POSTs, con concurrencia, profundidad de cola y conexiones a base de datos leídas desde CloudWatch, Bull Board y PgBouncer. Fue una prueba de carga, no tráfico de clientes — la distinción importa y la mantengo explícita.',
          },
        ],
        stack: 'PHP · TypeScript · AWS Lambda · API Gateway · BullMQ · Redis Cluster · PostgreSQL · PgBouncer',
        url: 'https://apifuel.com',
      },
      {
        slug: 'articleai',
        name: 'ArticleAI',
        role: 'Plataforma SaaS de contenido',
        period: 'Construida y publicada en solitario',
        status: 'Construido y operado',
        summary:
          'Un producto comercial completo: front end, back end, API, licenciamiento y un plugin de WordPress que lo distribuye.',
        sections: [
          {
            heading: 'Qué hace',
            body: 'Genera artículos orientados a SEO de forma automática, con múltiples formatos de exportación, detrás de una interfaz en React y TypeScript sobre un back end MySQL y una API propia.',
          },
          {
            heading: 'La parte que casi todos saltean',
            body: 'Un SaaS no es solamente la aplicación. Necesita distribución, y eso vino del plugin oficial ArticleAI Fetcher publicado en wordpress.org — una vía de instalación para quien ya usa WordPress, en lugar de otro embudo de registro que construir.',
          },
        ],
        stack: 'React · TypeScript · MySQL · plugin de WordPress',
        url: 'https://articleai.io',
      },
      {
        slug: 'dialreveal',
        name: 'DialReveal',
        role: 'Detección de llamadas spam',
        period: 'Plataforma integrada',
        status: 'Construido y operado',
        summary:
          'Tres fuentes externas poco confiables — eventos de telefonía, datos públicos de reclamos y scraping — normalizadas en una sola señal sobre la que el cliente puede actuar.',
        sections: [
          {
            heading: 'Normalizar tres fuentes malas en una buena respuesta',
            body: 'Twilio aporta eventos de llamada, la FTC aporta datos de reclamos, y el scraping cubre los huecos entre ambas. Cada fuente tiene su latencia, su idea de qué es un número de teléfono y su manera de estar temporalmente caída. El producto es la reconciliación, no las integraciones.',
          },
          {
            heading: 'El comercio adentro',
            body: 'El acceso se vende con Stripe detrás de un panel, lo que significa que la superficie de integración incluye el estado de facturación, no solo la lógica de detección.',
          },
        ],
        stack: 'PHP · Twilio · Stripe · MySQL · jQuery',
        url: 'https://dialreveal.com',
      },
      {
        slug: 'opticaz',
        name: 'Opticaz',
        role: 'Sistema de gestión para optometría',
        period: 'Sistema multi-cliente',
        status: 'Sigue en operación, bajo mi administración',
        summary:
          'Una API REST detrás de tres clientes: aplicación web, app Android y panel administrativo.',
        sections: [
          {
            heading: 'Una API, tres consumidores',
            body: 'Turnos, inventario, clientes y reportes, servidos a una aplicación web, un cliente Android nativo y un panel de administración. El contrato de la API tenía que ser lo bastante estable como para que tres interfaces independientes avanzaran sin pisarse.',
          },
        ],
        stack: 'PHP · MySQL · REST · Android',
      },
    ],
    otherTitle: 'Además',
    otherItems: [
      'Optimización de WordPress multisite para un cliente de Estados Unidos: 30 sitios estabilizados en hosting compartido mediante carga selectiva de plugins, caché y filtrado de bots.',
      'Sitio multilenguaje en Next.js para rapidpersonalloans.com/es.',
      'Integración de calendario de Airbnb para metrorailhouse.com.',
    ],
  },
};
