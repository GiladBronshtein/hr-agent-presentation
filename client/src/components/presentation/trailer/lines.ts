/**
 * The light pen: geometry of every line the trailer draws on top of the
 * particle universe, in the 1920x1080 design box. Positions come from the
 * particle formations (formations.ts, screen percentages), so each stroke
 * lands exactly on the figure it belongs to.
 */
import { pathFrom, rng, spline, writeNumber, type Pt } from '../../motion/path';
import * as F from './formations';

const px = (x: number, y: number): Pt => [x * 19.2, y * 10.8];

// ── Act 0: an ECG trace through the heart; the big spike lands on "ידנית." ──
export const ECG_Y = 432;
/** Story time to x along the trace (right to left, the way Hebrew is read). */
export const ECG_KEYS: [number, number][] = [[0.2, 2010], [0.6, 1700], [1.85, 1300], [3.4, 960], [4.75, 420], [4.95, 280]];
const BEATS: [number, number][] = [[1700, 120], [1300, 150], [960, 330], [420, 70]];
export const ECG_PATH = (() => {
  const y = ECG_Y;
  const d: string[] = [`M 2010 ${y}`];
  BEATS.forEach(([x, A]) => {
    d.push(`L ${x + 64} ${y}`, `L ${x + 52} ${y - A * 0.12}`, `L ${x + 40} ${y}`, `L ${x + 14} ${y}`, `L ${x + 7} ${y + A * 0.16}`,
      `L ${x} ${y - A}`, `L ${x - 9} ${y + A * 0.34}`, `L ${x - 18} ${y}`, `L ${x - 50} ${y}`, `L ${x - 64} ${y - A * 0.22}`, `L ${x - 82} ${y}`);
  });
  d.push(`L 280 ${y}`);
  return d.join(' ');
})();

// ── Act 1: one person running between the tools, then a tangle ──
export const HUB = px(F.HUB.x, F.HUB.y);
export const TOOLS = F.SYSTEM_POS.map((p) => px(p.x, p.y));
export const VISITS = [0, 3, 1, 5, 2, 6, 4];
/** One trip: hub, out to a tool, a loop around it, back to the hub. */
export const LEGS = VISITS.map((ti, k) => {
  const r = rng(31 + k * 7);
  const [x, y] = TOOLS[ti];
  const [hx, hy] = HUB;
  const j = () => (r() - 0.5) * 60;
  const pts: Pt[] = [[hx, hy], [(x + hx) / 2 + j(), (y + hy) / 2 + j()], [x + 34, y + j() * 0.5], [x, y - 34], [x - 34, y], [x + j() * 0.4, y + 30], [(x + hx) / 2 + j(), (y + hy) / 2 + j()], [hx, hy]];
  return pathFrom(pts[0], spline(pts));
});
/** The overload: one frantic stroke through everything. */
export const TANGLE = (() => {
  const r = rng(77);
  const pts: Pt[] = [HUB];
  for (let k = 0; k < 16; k++) {
    const t = TOOLS[(k * 3) % 7];
    pts.push([t[0] + (r() - 0.5) * 140, t[1] + (r() - 0.5) * 140]);
    pts.push([HUB[0] + (r() - 0.5) * 220, HUB[1] + (r() - 0.5) * 220]);
  }
  return pathFrom(pts[0], spline(pts));
})();

// ── Chapter numbers, written in light above the chapter word ──
export const NUM_C: Pt = [960, 280];
export const chapterNumber = (num: string) => writeNumber(num, NUM_C[0], NUM_C[1], 0.72);

// ── Act 2: the rigid route, and the agent's loop through its parts ──
export const RAIL_Y = 56 * 10.8;
export const RAIL_STEPS = [[1766, 1530], [1530, 1300], [1300, 1110]].map(([a, b]) => `M ${a} ${RAIL_Y} L ${b} ${RAIL_Y}`);
export const AGENT_LOOP = (() => {
  const pts = F.COMPONENT_POS.map((p) => px(p.x, p.y));
  return pathFrom(pts[0], spline([...pts, pts[0], pts[1]]).slice(0, pts.length));
})();

// ── Act 3: the nine agents, joined in reading order ──
export const AGENT_CHAIN = (() => {
  const pts = F.AGENT_GRID.map((p) => px(p.x, p.y - 2.2));
  return pathFrom(pts[0], spline(pts));
})();
/** Light rays for the approval moment: fanning out to both sides of the
 *  button (coordinates relative to its center), never over the window. */
export const RAYS = Array.from({ length: 18 }, (_, i) => {
  const side = i % 2 ? 1 : -1;
  const k = Math.floor(i / 2) / 8;
  const a = (k - 0.5) * 0.9;
  const r0 = 190 + (i % 3) * 14;
  const r1 = 360 + ((i * 37) % 5) * 55;
  const p = (r: number) => `${(side * Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r * 0.55).toFixed(1)}`;
  return `M ${p(r0)} L ${p(r1)}`;
});

// ── Act 4: the trust shield, drawn from its crown down both flanks ──
const shieldSide = (side: 1 | -1) => {
  const pts: Pt[] = [];
  for (let n = 0; n <= 40; n++) {
    const u = n / 40;
    let x: number;
    let y: number;
    if (u < 0.3) { const k = u / 0.3; x = 50 + side * k * 24; y = 16 + k * 2.5; }
    else if (u < 0.62) { const k = (u - 0.3) / 0.32; x = 50 + side * (24 - k * 4); y = 18.5 + k * 41.5; }
    else { const v = (u - 0.62) / 0.38; x = 50 + side * 20 * (1 - v ** 1.6); y = 60 + 19 * v; }
    pts.push(px(x, y));
  }
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`;
};
export const SHIELD = [shieldSide(1), shieldSide(-1)];

// ── Act 5: the 90-day road, on the particle road ──
export const ROAD = (() => {
  const pts: Pt[] = [];
  for (let n = 0; n <= 60; n++) {
    const t = n / 60;
    pts.push(px(90 - t * 80, F.ROAD_Y + Math.sin(t * Math.PI * 2) * 1.2));
  }
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`;
})();
