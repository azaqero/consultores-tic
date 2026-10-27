import type { Lang } from '../i18n/ui';

export interface TimelineEntry {
  period: string;
  title: string;
  body: string;
}

export interface ProductEntry {
  name: string;
  role: string;
  body: string;
  stack: string;
  url?: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface ProfileContent {
  eyebrow: string;
  headline: string;
  intro: string[];
  timeline: {
    title: string;
    intro: string;
    entries: TimelineEntry[];
  };
  products: {
    title: string;
    entries: ProductEntry[];
  };
  principles: {
    title: string;
    intro: string;
    items: Principle[];
  };
  closing: {
    title: string;
    body: string;
    cv: string;
    contact: string;
  };
}

export const profile: Record<Lang, ProfileContent> = {
  en: {
    eyebrow: 'Profile',
    headline: 'Gustavo Azañero',
    intro: [
      'I am a backend engineer. For 18 years I have built and operated systems that other people depend on — lead engines that fan out to dozens of buyer APIs, content platforms, telephony integrations, management systems.',
      'I run Consultores TIC, a small software and hosting company. That means I have never had the option of handing a problem to another team: infrastructure, deployment, monitoring, support and the customer conversation are all mine. It is not a career path I would recommend to everyone, but it removes any gap between what I build and what I have to keep alive.',
      'I work spec-first and I use AI agents to move faster. I decide what to build, how it is structured, and whether it holds. That distinction matters to me and I keep it explicit.',
    ],
    timeline: {
      title: 'How the stack evolved',
      intro:
        'The same problem — ingesting leads and dispatching them to partners — solved three times, each time with what the constraints actually required.',
      entries: [
        {
          period: '2008',
          title: 'Consultores TIC',
          body: 'Founded a software and hosting company serving local and international clients. Infrastructure, development and technical support for the same accounts for over a decade.',
        },
        {
          period: '2012',
          title: 'ApiFuel — native PHP',
          body: 'Built the lead engine in native PHP, tuned for throughput under shared-hosting constraints. Performance was a design requirement from day one, not an optimisation pass.',
        },
        {
          period: '2016',
          title: 'ApiFuel — AWS Lambda and API Gateway',
          body: 'Moved the ingestion and dispatch path to serverless. Traded server management for managed scaling, at the cost of cold starts and a harder debugging story.',
        },
        {
          period: '2025',
          title: 'ApiFuel — TypeScript, BullMQ and Redis Cluster',
          body: 'Rebuilt the dispatch layer in TypeScript with BullMQ and a Redis Cluster. The constraint that drove the design was never request rate: it was outbound concurrency, because each lead fans out to multiple partner APIs. Added a controller that provisions an ephemeral EC2 fleet ahead of demand, since a new t4g.small takes one to two minutes to become ready.',
        },
      ],
    },
    products: {
      title: 'Products I built and operate',
      entries: [
        {
          name: 'ApiFuel',
          role: 'Lead management and dispatch',
          body: 'Ingests leads and dispatches each one to multiple third-party buyer APIs. In production since 2012, on three successive architectures.',
          stack: 'PHP · TypeScript · AWS Lambda · API Gateway · BullMQ · Redis · PostgreSQL',
          url: 'https://apifuel.com',
        },
        {
          name: 'ArticleAI',
          role: 'SaaS content platform',
          body: 'Full product built solo: React and TypeScript front end, MySQL back end, proprietary API, automated SEO content generation and multiple export formats. An official WordPress plugin distributes it.',
          stack: 'React · TypeScript · MySQL · WordPress',
          url: 'https://articleai.io',
        },
        {
          name: 'DialReveal',
          role: 'Anti-spam call detection',
          body: 'Combines Twilio, FTC data and scraping automation into a single usable signal, behind a dashboard with Stripe billing.',
          stack: 'PHP · Twilio · Stripe · MySQL',
          url: 'https://dialreveal.com',
        },
        {
          name: 'Opticaz',
          role: 'Optometry management system',
          body: 'Web app, Android app and admin dashboard sharing one REST API: appointments, inventory, clients and reporting.',
          stack: 'PHP · MySQL · REST · Android',
        },
      ],
    },
    principles: {
      title: 'How I approach engineering',
      intro: 'Four things I would rather be judged on than a list of technologies.',
      items: [
        {
          title: 'Simplest thing that satisfies the requirement',
          body: 'Every dependency, service and abstraction is a cost someone pays for years. I add one when the requirement forces it, and I write down why. The decisions and the alternatives I rejected are public in this repository.',
        },
        {
          title: 'Measure before claiming',
          body: 'If I state a number, I can show how it was obtained and what it does not cover. A load test is not production traffic and I say so.',
        },
        {
          title: 'Failure modes over happy paths',
          body: 'Integrations, queues and networks fail partially and in ambiguous ways. Retries need idempotency, dispatch needs backpressure, and logs need to answer "what happened to this specific request".',
        },
        {
          title: 'Own the whole thing',
          body: 'Code that nobody operates is a guess. I deploy it, monitor it, answer the support email and fix it at 2 a.m. if that is what it takes.',
        },
      ],
    },
    closing: {
      title: 'The details',
      body: 'Full trajectory, technologies and availability in the CV.',
      cv: 'Download the CV',
      contact: 'Get in touch',
    },
  },

  es: {
    eyebrow: 'Perfil',
    headline: 'Gustavo Azañero',
    intro: [
      'Soy ingeniero backend. Hace 18 años construyo y opero sistemas de los que dependen otras personas — motores de leads que se distribuyen a decenas de APIs de compradores, plataformas de contenido, integraciones de telefonía, sistemas de gestión.',
      'Dirijo Consultores TIC, una empresa chica de software y hosting. Eso significa que nunca tuve la opción de pasarle un problema a otro equipo: la infraestructura, el despliegue, el monitoreo, el soporte y la conversación con el cliente son míos. No es un camino que le recomendaría a todo el mundo, pero elimina cualquier distancia entre lo que construyo y lo que tengo que mantener vivo.',
      'Trabajo con especificación previa y uso agentes de IA para avanzar más rápido. Yo decido qué construir, cómo estructurarlo y si resiste. Esa distinción me importa y la mantengo explícita.',
    ],
    timeline: {
      title: 'Cómo evolucionó el stack',
      intro:
        'El mismo problema —ingestar leads y despacharlos a socios— resuelto tres veces, cada una con lo que las restricciones realmente exigían.',
      entries: [
        {
          period: '2008',
          title: 'Consultores TIC',
          body: 'Fundé una empresa de software y hosting que atiende clientes locales e internacionales. Infraestructura, desarrollo y soporte técnico para las mismas cuentas durante más de una década.',
        },
        {
          period: '2012',
          title: 'ApiFuel — PHP nativo',
          body: 'Construí el motor de leads en PHP nativo, ajustado para rendimiento bajo las restricciones de hosting compartido. El rendimiento fue requisito de diseño desde el primer día, no una optimización posterior.',
        },
        {
          period: '2016',
          title: 'ApiFuel — AWS Lambda y API Gateway',
          body: 'Pasé el camino de ingesta y despacho a serverless. Cambié administración de servidores por escalado gestionado, a costa de cold starts y una depuración más difícil.',
        },
        {
          period: '2025',
          title: 'ApiFuel — TypeScript, BullMQ y Redis Cluster',
          body: 'Reconstruí la capa de despacho en TypeScript con BullMQ y Redis Cluster. La restricción que definió el diseño nunca fue la tasa de peticiones: fue la concurrencia saliente, porque cada lead se distribuye a múltiples APIs de socios. Agregué un controlador que provisiona una flota EC2 efímera por delante de la demanda, porque una t4g.small nueva tarda entre uno y dos minutos en estar lista.',
        },
      ],
    },
    products: {
      title: 'Productos que construí y opero',
      entries: [
        {
          name: 'ApiFuel',
          role: 'Gestión y despacho de leads',
          body: 'Ingesta leads y despacha cada uno a múltiples APIs de compradores. En producción desde 2012, sobre tres arquitecturas sucesivas.',
          stack: 'PHP · TypeScript · AWS Lambda · API Gateway · BullMQ · Redis · PostgreSQL',
          url: 'https://apifuel.com',
        },
        {
          name: 'ArticleAI',
          role: 'Plataforma SaaS de contenido',
          body: 'Producto completo hecho en solitario: front end en React y TypeScript, back end MySQL, API propia, generación automática de contenido SEO y múltiples formatos de exportación. Se distribuye como plugin oficial de WordPress.',
          stack: 'React · TypeScript · MySQL · WordPress',
          url: 'https://articleai.io',
        },
        {
          name: 'DialReveal',
          role: 'Detección de llamadas spam',
          body: 'Combina Twilio, datos de la FTC y automatización de scraping en una sola señal útil, detrás de un panel con cobros por Stripe.',
          stack: 'PHP · Twilio · Stripe · MySQL',
          url: 'https://dialreveal.com',
        },
        {
          name: 'Opticaz',
          role: 'Sistema de gestión para optometría',
          body: 'Aplicación web, aplicación Android y panel de administración compartiendo una única API REST: turnos, inventario, clientes y reportes.',
          stack: 'PHP · MySQL · REST · Android',
        },
      ],
    },
    principles: {
      title: 'Cómo encaro la ingeniería',
      intro: 'Cuatro cosas por las que prefiero que me juzguen antes que por una lista de tecnologías.',
      items: [
        {
          title: 'Lo más simple que satisface el requisito',
          body: 'Cada dependencia, servicio y abstracción es un costo que alguien paga durante años. Agrego una cuando el requisito la obliga, y dejo escrito por qué. Las decisiones y las alternativas que descarté están públicas en este repositorio.',
        },
        {
          title: 'Medir antes de afirmar',
          body: 'Si digo un número, puedo mostrar cómo se obtuvo y qué no cubre. Una prueba de carga no es tráfico de producción, y lo digo.',
        },
        {
          title: 'Modos de falla antes que caminos felices',
          body: 'Las integraciones, las colas y las redes fallan parcialmente y de forma ambigua. Los reintentos necesitan idempotencia, el despacho necesita backpressure, y los logs tienen que responder «qué pasó con esta petición concreta».',
        },
        {
          title: 'Hacerse cargo de todo',
          body: 'El código que nadie opera es una suposición. Lo despliego, lo monitoreo, contesto el correo de soporte y lo arreglo a las 2 de la mañana si hace falta.',
        },
      ],
    },
    closing: {
      title: 'Los detalles',
      body: 'Trayectoria completa, tecnologías y disponibilidad en el CV.',
      cv: 'Descargar el CV',
      contact: 'Ponerse en contacto',
    },
  },
};
