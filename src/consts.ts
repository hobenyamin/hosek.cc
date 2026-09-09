/**
 * Site-wide values. Nothing else should hardcode your name, links or copy —
 * edit here and the metadata and page frame follow.
 */

export const SITE = {
  name: 'Nikolas Hošek',
  title: '',
  description: '',
  /** Must match `site` in astro.config.mjs. */
  url: 'https://hosek.cc',
  locale: 'en',
  /** Path in /public used as the default social share image. */
  ogImage: '/og.png',
};

export const CONTACT = {
  email: 'hosek@weborio.cz',
};

export const SOCIALS: { label: string; href: string }[] = [];

export const NAV: { label: string; href: string }[] = [
  { label: 'Index', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];
