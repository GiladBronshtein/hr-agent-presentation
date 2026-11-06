/**
 * The learning-path line: the one visual motif of the deck's motion.
 * A single continuous stroke that draws, connects and opens each slide.
 * Shared geometry for slide transitions, chapter cards and the trailer.
 * Coordinates live in a 1920x1080 design box.
 */
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

/** Restrained palette: no neon, no glow. One warm accent. */
export const INK = {
  navy: '#070B17',
  navy2: '#0D1326',
  paper: '#F3EEE4',
  amber: '#F2A93B',
  slate: '#8A93A8',
  line: 'rgba(243,238,228,0.18)',
} as const;

export type Pt = [number, number];

/** Deterministic random, so every transition has its own (repeatable) curve. */
export function rng(seed: number) {
  let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/** Smooth path through points (Catmull-Rom as cubic Bezier segments). */
export function spline(points: Pt[]): string[] {
  const p = [points[0], ...points, points[points.length - 1]];
  const segs: string[] = [];
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    segs.push(`C ${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`);
  }
  return segs;
}
const f = (n: number) => n.toFixed(1);

/** Join spline segments into a path string that starts at `from`. */
export function pathFrom(from: Pt, segs: string[]) {
  return `M ${f(from[0])} ${f(from[1])} ${segs.join(' ')}`;
}

/** Radius that covers the whole 1920x1080 box from a point. */
export function coverRadius([x, y]: Pt) {
  return Math.max(Math.hypot(x, y), Math.hypot(1920 - x, y), Math.hypot(x, 1080 - y), Math.hypot(1920 - x, 1080 - y)) + 24;
}

/**
 * A transition route: enters from the reading side (right, in this RTL deck),
 * passes a node where the next slide opens, and leaves on the other side.
 * Returns two paths split at the node, so the cover and the reveal can each
 * follow their half of the stroke.
 */
export function route(seed: number, dir: 1 | -1) {
  const r = rng(seed * 7919 + 13);
  const nodes: Pt[] = [[1186, 412], [734, 668], [1186, 668], [734, 412], [960, 540], [1090, 540], [830, 540]];
  const node = nodes[Math.floor(r() * nodes.length)];
  const yIn = 180 + r() * 720;
  const yOut = 180 + r() * 720;
  const inX = dir === 1 ? 2010 : -90;
  const outX = dir === 1 ? -90 : 2010;
  const midA: Pt = [(inX + node[0]) / 2 + (r() - 0.5) * 160, node[1] + (r() - 0.5) * 520];
  const midB: Pt = [(outX + node[0]) / 2 + (r() - 0.5) * 160, node[1] + (r() - 0.5) * 520];
  const segs = spline([[inX, yIn], midA, node, midB, [outX, yOut]]);
  return {
    node,
    a: pathFrom([inX, yIn], segs.slice(0, 2)),
    b: pathFrom(node, segs.slice(2)),
  };
}

// ── Single-stroke digits (monoline, 120x180 box, y down) ──
const DIGITS: Record<string, string> = {
  '0': 'M 60 12 C 24 12 10 56 10 92 C 10 132 26 170 60 170 C 94 170 110 132 110 92 C 110 56 96 12 60 12',
  '1': 'M 32 46 C 46 36 58 24 70 10 L 70 170',
  '2': 'M 16 52 C 16 24 40 10 62 10 C 90 10 108 30 108 56 C 108 88 78 112 16 170 L 112 170',
  '3': 'M 18 32 C 34 14 50 10 64 10 C 92 10 106 28 106 50 C 106 72 86 86 58 86 C 88 86 110 102 110 128 C 110 154 90 172 60 172 C 38 172 22 164 12 150',
  '4': 'M 84 170 L 84 10 L 10 118 L 116 118',
};

/** Transform a path made of absolute M/L/C commands. */
function place(d: string, dx: number, dy: number, s: number) {
  return d.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f(Number(x) * s + dx)} ${f(Number(y) * s + dy)}`);
}

/**
 * One continuous stroke that enters from the right edge, passes over the
 * number, writes its two digits the way digits are written (left to right,
 * also in Hebrew), and leaves under the number through the left edge.
 * The number is centered on (cx, cy).
 */
export function writeNumber(num: string, cx: number, cy: number, scale = 1.25) {
  const w = 120 * scale;
  const h = 180 * scale;
  const gap = 34 * scale;
  const left = cx - w - gap / 2;
  const right = cx + gap / 2;
  const top = cy - h / 2;
  const [dl, dr] = num.padStart(2, '0').split('');
  const Ld = place(DIGITS[dl], left, top, scale);
  const Rd = place(DIGITS[dr], right, top, scale);
  const start = (d: string) => d.match(/M (\S+) (\S+)/)!.slice(1).map(Number) as Pt;
  const end = (d: string) => { const n = d.match(/(-?\d+(?:\.\d+)?)/g)!.map(Number); return [n[n.length - 2], n[n.length - 1]] as Pt; };
  const [sx, sy] = start(Ld);
  const entry = spline([[2010, cy - h * 0.95], [cx + w * 1.6, cy - h * 0.82], [sx + w * 0.35, sy - h * 0.06], [sx, sy]]);
  const [ex, ey] = end(Ld);
  const [rx, ry] = start(Rd);
  const link = spline([[ex, ey], [(ex + rx) / 2, (ey + ry) / 2 - h * 0.08], [rx, ry]]);
  const exit = spline([end(Rd), [cx, cy + h * 0.78], [cx - w * 2.4, cy + h * 0.74], [-90, cy + h * 0.55]]);
  const body = (d: string) => d.replace(/^M \S+ \S+ /, '');
  return [
    `M 2010 ${f(cy - h * 0.95)}`, entry.join(' '),
    body(Ld), link.join(' '), body(Rd), exit.join(' '),
  ].join(' ');
}
