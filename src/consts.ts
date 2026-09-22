/**
 * Site-wide values. Nothing else should hardcode your name, links or copy —
 * edit here and the metadata and page frame follow.
 */

export const SITE = {
  name: 'Nikolas Hošek',
  /** Homepage <title>; other pages render 'Thing — Name'. */
  title: 'Nikolas Hošek — Designer & Frontend Developer',
  description:
    'Designer and frontend developer in Prague. I design interfaces and then build them — portfolio, selected work and contact.',
  /** Must match `site` in astro.config.mjs. */
  url: 'https://hosek.cc',
  locale: 'en',
  /** Path in /public used as the default social share image. */
  ogImage: '/og.png',
};

export const CONTACT = {
  email: 'hosek@weborio.cz',
  /** Human-readable; `telHref` is the dialable form. */
  phone: '(+420) 605 485 485',
  telHref: 'tel:+420605485485',
  location: 'Prague, Czechia',
  /** Shown verbatim on /about — keep it dated, not vague. */
  availability: 'Available for freelance from March 2026',
};

export const SOCIALS: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/' },
];

export const NAV: { label: string; href: string }[] = [
  { label: 'Index', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];
