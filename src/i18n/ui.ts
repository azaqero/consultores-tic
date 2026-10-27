export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

/**
 * Route keys and their per-locale slugs.
 * Slugs are translated, not mirrored — see docs/adr/0003-bilingual-routing.md
 * Trailing slashes are kept so canonical and hreflang URLs stay stable.
 */
export const routes = {
  home: { en: '/', es: '/es/' },
  projects: { en: '/projects/', es: '/es/proyectos/' },
  method: { en: '/method/', es: '/es/metodo/' },
  profile: { en: '/profile/', es: '/es/perfil/' },
  cv: { en: '/cv/', es: '/es/cv/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
} as const;

export type RouteKey = keyof typeof routes;

export const navOrder: RouteKey[] = ['home', 'projects', 'method', 'profile', 'cv', 'contact'];

export const ui = {
  en: {
    skipToContent: 'Skip to content',
    siteName: 'Consultores TIC',
    nav: {
      home: 'Home',
      projects: 'Projects',
      method: 'How I work',
      profile: 'Profile',
      cv: 'CV',
      contact: 'Contact',
    },
    languageLabel: 'Language',
    switchTo: 'Ver en español',
    footer: {
      tagline: 'Backend systems, APIs and distributed processing.',
      decisions: 'Architecture decisions',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
  },
  es: {
    skipToContent: 'Ir al contenido',
    siteName: 'Consultores TIC',
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      method: 'Cómo trabajo',
      profile: 'Perfil',
      cv: 'CV',
      contact: 'Contacto',
    },
    languageLabel: 'Idioma',
    switchTo: 'View in English',
    footer: {
      tagline: 'Sistemas backend, APIs y procesamiento distribuido.',
      decisions: 'Decisiones de arquitectura',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

export function pathFor(route: RouteKey, lang: Lang): string {
  return routes[route][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

export function counterpart(route: RouteKey, lang: Lang): string {
  return routes[route][otherLang(lang)];
}
