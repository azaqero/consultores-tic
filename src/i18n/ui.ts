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

/**
 * Routes whose pages actually exist in the build.
 *
 * The navigation is derived from this list, so a page that has not been built
 * yet can never appear as a dead link. Add a route here in the same commit that
 * adds its pages.
 */
export const publishedRoutes: RouteKey[] = ['home', 'projects', 'method', 'profile', 'cv', 'contact'];

export function navItems() {
  return navOrder.filter((key) => publishedRoutes.includes(key));
}

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

/**
 * Prefix for every internal absolute path.
 *
 * Empty string when the site is served from the document root, `/new` when it
 * is staged in a subdirectory. read from astro.config's `base`.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-absolute path with the deployment base. */
export function withBase(path: string): string {
  return `${BASE}${path}`;
}

export function pathFor(route: RouteKey, lang: Lang): string {
  return withBase(routes[route][lang]);
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

export function counterpart(route: RouteKey, lang: Lang): string {
  return withBase(routes[route][otherLang(lang)]);
}
