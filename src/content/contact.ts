import type { Lang } from '../i18n/ui';

export interface ContactDetail {
  label: string;
  value: string;
  href?: string;
}

export interface ContactContent {
  eyebrow: string;
  headline: string;
  intro: string[];
  details: ContactDetail[];
  note: string;
  cvCta: string;
}

export const contact: Record<Lang, ContactContent> = {
  en: {
    eyebrow: 'Contact',
    headline: 'Let’s talk.',
    intro: [
      'I am open to senior backend roles — full-time and fully remote — and to specific projects where the problem is a system that has to hold up under real load.',
      'The short version of the last 18 years is one document away. The longer version is the profile page, or a conversation.',
    ],
    details: [
      {
        label: 'Email',
        value: 'contacto@consultores-tic.com',
        href: 'mailto:contacto@consultores-tic.com',
      },
      { label: 'Location', value: 'Lambayeque, Peru · GMT-5' },
      {
        label: 'Availability',
        value: 'Full-time, 100% remote · compatible with LATAM and US time zones',
      },
      { label: 'Languages', value: 'Spanish (native) · English (technical, written)' },
      { label: 'Code', value: 'github.com/azaqero', href: 'https://github.com/azaqero' },
    ],
    note: 'There is no contact form here on purpose — this site has no backend. Email reaches me directly.',
    cvCta: 'Download the CV',
  },

  es: {
    eyebrow: 'Contacto',
    headline: 'Hablemos.',
    intro: [
      'Estoy abierto a posiciones senior de backend — full-time y completamente remoto — y a proyectos puntuales donde el problema sea un sistema que tenga que aguantar carga real.',
      'La versión corta de los últimos 18 años está a un documento de distancia. La versión larga es la página de perfil, o una conversación.',
    ],
    details: [
      {
        label: 'Correo',
        value: 'contacto@consultores-tic.com',
        href: 'mailto:contacto@consultores-tic.com',
      },
      { label: 'Ubicación', value: 'Lambayeque, Perú · GMT-5' },
      {
        label: 'Disponibilidad',
        value: 'Full-time, 100% remoto · compatible con husos de LATAM y Estados Unidos',
      },
      { label: 'Idiomas', value: 'Español (nativo) · Inglés (técnico, escrito)' },
      { label: 'Código', value: 'github.com/azaqero', href: 'https://github.com/azaqero' },
    ],
    note: 'No hay formulario de contacto a propósito: este sitio no tiene backend. El correo me llega directo.',
    cvCta: 'Descargar el CV',
  },
};
