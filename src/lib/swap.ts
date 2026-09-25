/**
 * Touch version of the <Reveal swap> hover roll. Phones have no hover, so a
 * tap rolls the label up, holds it, and rolls it back.
 *
 * Pass `label` to roll to different text instead of the copy of the label,
 * e.g. "Copied" after a tap on a copy button.
 */

/** Must match the touch roll duration in Reveal.astro. */
const ROLL_MS = 700;

const timers = new WeakMap<HTMLElement, number>();

export function rollSwap(host: HTMLElement, hold = 900, label?: string) {
  const faces = Array.from(
    host.querySelectorAll<HTMLElement>('.reveal__swap > .reveal__face:last-child'),
  );
  if (faces.length === 0) return;

  if (label !== undefined) {
    for (const face of faces) {
      face.dataset.swapText ??= face.innerHTML;
      face.textContent = label;
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
          }
        }, ROLL_MS),
      );
    }, hold),
  );
}
