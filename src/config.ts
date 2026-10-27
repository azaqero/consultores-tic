/**
 * Identity shown anywhere on the site.
 *
 * Single source of truth: the display name appears in page titles, the profile
 * headline and the CV. Nothing else in the codebase should hardcode a person
 * name, so changing it here changes it everywhere.
 */
export const identity = {
  /** Name rendered on the site, in page titles and on the CV. */
  displayName: 'Gustavo Azañero',
  email: 'contacto@consultores-tic.com',
  location: 'Lambayeque, Peru',
  githubUser: 'azaqero',
  githubUrl: 'https://github.com/azaqero',
  siteUrl: 'https://www.consultores-tic.com',
  adrUrl: 'https://github.com/azaqero/consultores-tic/tree/main/docs/adr',
} as const;
