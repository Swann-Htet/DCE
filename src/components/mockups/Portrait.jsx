// "Codey" the cat: a base face plus separate open-eyes and closed-eyes layers (public/mascot/*.webp).
// The base face had painted closed-eye marks; they were painted out of public/mascot/face.webp. The eye layers sit 34 image-pixels
// above their original position (tuned by eye). Everything is placed in a 320x240 SVG box.
//   .fm-head   whole head (face + eyes); pivots near the chin when the head turns
//   .fm-pupils the open eyes; they slide sideways to "glance"
//   blink      open and closed eye layers swap every few seconds (CSS, disabled with reduced motion)

// Layer boxes in the source art (1000x1000 px space), after cropping to content.
const FACE = { x: 194, y: 246, w: 612, h: 513 };
const EYES_OPEN = { x: 343, y: 438, w: 313, h: 89 };
const EYES_CLOSED = { x: 340, y: 461, w: 325, h: 59 };
const S = 0.3; // art px -> svg units
const X0 = 10;
const Y0 = -32.6;
const place = (b) => ({ x: X0 + b.x * S, y: Y0 + b.y * S, width: b.w * S, height: b.h * S });

// Head outline (ears included) in svg units, for the dashed detection boxes.
export const HEAD_BOX = { x: 62, y: 34, width: 196, height: 168 };

// Variants are the same artwork tinted with CSS filters, so each student looks a little different.
export const PALETTES = {
  main: { filter: 'none' },
  other: { filter: 'grayscale(0.9) contrast(1.05)' },
  c: { filter: 'hue-rotate(-18deg) saturate(0.55) brightness(1.06)' },
  d: { filter: 'sepia(0.6) hue-rotate(-30deg) saturate(1.5) brightness(0.62)' },
  e: { filter: 'grayscale(0.5) sepia(0.4) brightness(0.88)' },
  f: { filter: 'grayscale(1) brightness(0.5) contrast(1.15)' },
};

export default function Portrait({ p = PALETTES.main, animated = false, blinkDelay = 0 }) {
  const face = place(FACE);
  const open = place(EYES_OPEN);
  const closed = place(EYES_CLOSED);
  return (
    <g className={animated ? 'fm-head' : undefined}>
      <image href="/mascot/face.webp" {...face} style={{ filter: p.filter }} />
      <image className="cat-eyes-closed" href="/mascot/eyes-closed.webp" {...closed} style={{ animationDelay: `${blinkDelay}s` }} />
      <image className={`cat-eyes-open${animated ? ' fm-pupils' : ''}`} href="/mascot/eyes-open.webp" {...open} style={{ animationDelay: `${blinkDelay}s` }} />
    </g>
  );
}
