/**
 * Identity and contact details shown anywhere on the site.
 *
 * Single source of truth: the display name appears in page titles, the profile
 * headline and the CV. Nothing else in the codebase should hardcode a person
 * name or an address, so changing them here changes them everywhere.
 */
export const identity = {
  /** Name rendered on the site, in page titles and on the CV. */
  displayName: 'Gustavo Azañero',

  /**
   * The only address published anywhere: site, CV and PDF.
   *
   * This is a role alias that forwards to the private mailbox, not the mailbox
   * itself. If it starts receiving spam, a new alias is created and this line
   * changes — the private address was never exposed and nothing else has to
   * migrate. See docs/adr/0005-contact-channels.md
   */
  publicEmail: 'contacto@consultores-tic.com',

  /**
   * Deliberately not rendered anywhere.
   *
   * No phone number is published. A recruiter writes email; the only thing a
   * personal mobile on a public page reliably attracts is unsolicited calls.
   */
  phonePublished: false,

  /**
   * Year the practice started. Used in the footer copyright range, where the
   * span is the cheapest place to show longevity. Must match the CV.
   */
  foundedYear: 2008,

  location: 'Lambayeque, Peru',
  githubUser: 'azaqero',
  githubUrl: 'https://github.com/azaqero',
  siteUrl: 'https://www.consultores-tic.com',
  adrUrl: 'https://github.com/azaqero/consultores-tic/tree/main/docs/adr',
} as const;
