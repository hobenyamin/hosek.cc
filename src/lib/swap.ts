/**
 * Touch version of the <Reveal swap> hover roll. Phones have no hover, so a
 * tap rolls the label up, holds it, and rolls it back.
 *
 * Pass `chip` to roll to a small status chip instead of the copy of the label,
 * e.g. "Copied" after a tap on a copy button. It's styled like the desktop
 * cursor label (see `.swap-chip` in Reveal.astro).
 */

/** Must match the touch roll duration in Reveal.astro. */
const ROLL_MS = 700;

const timers = new WeakMap<HTMLElement, number>();

export interface SwapChip {
  text: string;
  /** `done` is the accent colour, `failed` is muted — as on the cursor. */
  tone: 'done' | 'failed';
}

export function rollSwap(host: HTMLElement, hold = 900, chip?: SwapChip) {
  const faces = Array.from(
    host.querySelectorAll<HTMLElement>('.reveal__swap > .reveal__face:last-child'),
  );
  if (faces.length === 0) return;

  if (chip) {
    for (const face of faces) {
      face.dataset.swapText ??= face.innerHTML;

      const el = document.createElement('span');
      el.className = 'swap-chip';
      el.dataset.tone = chip.tone;
      el.textContent = chip.text;

      face.replaceChildren(el);
      face.setAttribute('data-swap-chip', '');
    }
  }

  host.setAttribute('data-swap-on', '');

  clearTimeout(timers.get(host));
  timers.set(
    host,
    window.setTimeout(() => {
      host.removeAttribute('data-swap-on');

      // Put the label back once it has rolled out of sight.
      timers.set(
        host,
        window.setTimeout(() => {
          for (const face of faces) {
            if (face.dataset.swapText === undefined) continue;
            face.innerHTML = face.dataset.swapText;
            delete face.dataset.swapText;
            face.removeAttribute('data-swap-chip');
          }
        }, ROLL_MS),
      );
    }, hold),
  );
}
