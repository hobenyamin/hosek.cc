/// <reference types="astro/client" />

import type Lenis from 'lenis';

declare global {
  interface Window {
    // Set in Frame.astro. Not `window.lenis` — Lenis uses that name itself.
    lenisInstance?: Lenis;
  }
}

export {};
