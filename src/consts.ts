// Site-wide values. Change them here, not in the pages.

export const SITE = {
  name: 'Nikolas Hošek',
  /** Homepage title. Other pages use "Page — Name". */
  title: 'Nikolas Hošek — Designer & Frontend Developer',
  description:
    'Designer and frontend developer in Olomouc, Czechia. I design interfaces and then build them — portfolio, selected work and contact.',
  jobTitle: 'Designer & Frontend Developer',
  /** Must match `site` in astro.config.mjs. */
  url: 'https://hosek.cc',
  locale: 'en',
  /** Path in /public used as the default social share image. */
  ogImage: '/og.png',
};

export const CONTACT = {
  email: 'hosek@weborio.cz',
  /** `phone` is shown, `phoneRaw` is copied. */
  phone: '+420 605 485 485',
  phoneRaw: '+420605485485',
  city: 'Olomouc',
  country: 'CZ',
};

export const SOCIALS = {
  instagram: 'https://www.instagram.com/hobenyamin/',
  github: 'https://github.com/hobenyamin',
};

export const NAV: { label: string; href: string }[] = [
  { label: 'Index', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];
