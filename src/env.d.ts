/// <reference types="astro/client" />

import type Lenis from 'lenis';

declare global {
  interface Window {
    /** Set once in Frame.astro; WorkRail drives programmatic scrolls through it. */
    lenis?: Lenis;
  }
}

export {};
