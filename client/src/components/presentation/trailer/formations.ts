/**
 * Particle formations for the lecture trailer. Every formation assigns ALL
 * particles a position, color, size, morph delay and group:
 *   - shapes are laid out in screen percentages so they line up with the DOM
 *     typography drawn on top (camera is fixed at z = CAM_Z looking at origin);
 *   - particles not used by a shape fall back into a deep starfield, so the
 *     backdrop persists while subsets form figures;
 *   - `delay` (0..1) staggers each particle's arrival inside a morph;
 *   - `group` lets the timeline light up / tint parts of a figure.
 */

export const N = 16000;
export const CAM_Z = 10;
export const FOV = 45;
const VIEW_H = 2 * CAM_Z * Math.tan((FOV / 2) * (Math.PI / 180));
const VIEW_W = VIEW_H * (16 / 9);
export const GROUP_STARS = 15;

export interface Formation {
  pos: Float32Array;
  col: Float32Array;
  size: Float32Array;
  delay: Float32Array;
  group: Float32Array;
}

type RGB = [number, number, number];

export function hex(h: string, mul = 1): RGB {
  const v = parseInt(h.replace('#', ''), 16);
  return [((v >> 16) & 255) / 255 * mul, ((v >> 8) & 255) / 255 * mul, (v & 255) / 255 * mul];
}

/** Deterministic PRNG so formations are identical on every run. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Screen percentage (x right, y down) at depth z -> world coordinates. */
export function toWorld(xPct: number, yPct: number, z = 0): [number, number, number] {
  const k = (CAM_Z - z) / CAM_Z;
  return [(xPct / 100 - 0.5) * VIEW_W * k, (0.5 - yPct / 100) * VIEW_H * k, z];
}

/** World units per screen percent (horizontal) at z = 0. */
export const PCT = VIEW_W / 100;

class Builder {
  f: Formation;
  i = 0;
  r: () => number;
  constructor(seed: number) {
    this.r = rng(seed);
    this.f = {
      pos: new Float32Array(N * 3),
      col: new Float32Array(N * 3),
      size: new Float32Array(N),
      delay: new Float32Array(N),
      group: new Float32Array(N),
    };
  }
  put(p: [number, number, number], c: RGB, size: number, delay: number, group: number) {
    if (this.i >= N) return;
    const k = this.i++;
    this.f.pos.set(p, k * 3);
    this.f.col.set(c, k * 3);
    this.f.size[k] = size;
    this.f.delay[k] = Math.max(0, Math.min(1, delay));
    this.f.group[k] = group;
  }
  gauss() {
    return (this.r() + this.r() + this.r() - 1.5) / 1.5;
  }
  /** Soft ball cluster centred on a screen point. */
  ball(xPct: number, yPct: number, radius: number, count: number, color: RGB, group: number, delay: number, spread = 0.06, size = 2.2) {
    const [cx, cy, cz] = toWorld(xPct, yPct);
    for (let n = 0; n < count; n++) {
      const u = this.r() * 2 - 1;
      const th = this.r() * Math.PI * 2;
      const rr = radius * Math.pow(this.r(), 0.55);
      const s = Math.sqrt(1 - u * u);
      const bright = 0.7 + this.r() * 0.6;
      this.put([cx + rr * s * Math.cos(th), cy + rr * u, cz + rr * s * Math.sin(th)],
        [color[0] * bright, color[1] * bright, color[2] * bright],
        size * (0.5 + this.r()), delay + this.r() * spread, group);
    }
  }
  /** Particles along a straight segment; delay grows along it (it "draws"). */
  line(a: [number, number], b: [number, number], count: number, color: RGB, group: number, d0: number, d1: number, jitter = 0.03, size = 1.6) {
    const A = toWorld(a[0], a[1]);
    const B = toWorld(b[0], b[1]);
    for (let n = 0; n < count; n++) {
      const t = n / (count - 1);
      this.put([A[0] + (B[0] - A[0]) * t + this.gauss() * jitter, A[1] + (B[1] - A[1]) * t + this.gauss() * jitter, this.gauss() * jitter],
        color, size * (0.6 + this.r() * 0.8), d0 + (d1 - d0) * t, group);
    }
  }
  /** Ellipse ring around a screen point, drawn around its circumference. */
  ring(xPct: number, yPct: number, rxPct: number, ryPct: number, count: number, color: RGB, group: number, d0: number, d1: number, size = 1.5, wobble = 0.05) {
    const [cx, cy] = toWorld(xPct, yPct);
    const rx = rxPct * PCT;
    const ry = (ryPct / 100) * VIEW_H;
    for (let n = 0; n < count; n++) {
      const a = (n / count) * Math.PI * 2;
      this.put([cx + Math.cos(a) * rx + this.gauss() * wobble, cy + Math.sin(a) * ry + this.gauss() * wobble, Math.sin(a * 3) * 0.3],
        color, size * (0.6 + this.r() * 0.8), d0 + (d1 - d0) * (n / count), group);
    }
  }
  /** Rigid lattice block (the world of automation). */
  lattice(xPct: number, yPct: number, sizePct: number, nPer: number, color: RGB, group: number, delay: number) {
    const [cx, cy] = toWorld(xPct, yPct);
    const s = sizePct * PCT;
    for (let ix = 0; ix < nPer; ix++)
      for (let iy = 0; iy < nPer; iy++)
        for (let iz = 0; iz < 2; iz++) {
          this.put([cx + (ix / (nPer - 1) - 0.5) * s, cy + (iy / (nPer - 1) - 0.5) * s, (iz - 0.5) * s * 0.4],
            color, 2.0, delay, group);
        }
  }
  /** Tilted disc (a stack layer) seen from slightly above. */
  disc(xPct: number, yPct: number, rxPct: number, count: number, color: RGB, group: number, delay: number) {
    const [cx, cy] = toWorld(xPct, yPct);
    const rx = rxPct * PCT;
    for (let n = 0; n < count; n++) {
      const a = this.r() * Math.PI * 2;
      const rr = Math.sqrt(this.r());
      const edge = rr > 0.92 ? 1.6 : 1;
      this.put([cx + Math.cos(a) * rx * rr, cy + Math.sin(a) * rx * rr * 0.16, Math.sin(a) * rx * rr * 0.5],
        [color[0] * edge, color[1] * edge, color[2] * edge], 1.7 * (0.6 + this.r() * 0.8) * edge, delay + this.r() * 0.05, group);
    }
  }
  /** Points sampled from rendered Hebrew text. */
  text(lines: { text: string; xPct: number; yPct: number; fontPx: number; color: (u: number) => RGB; letterSpacing?: number; baseline?: CanvasTextBaseline }[], group: number, d0: number, d1: number, step = 4) {
    // sampled at half resolution (4x less pixel data, same particle density)
    const K = 0.5;
    const W = 1920 * K;
    const H = 1080 * K;
    step = Math.max(1, Math.round(step * K));
    const cv = document.createElement('canvas');
    cv.width = W;
    cv.height = H;
    const g = cv.getContext('2d', { willReadFrequently: true });
    if (!g) return;
    const pts: { x: number; y: number; line: number }[] = [];
    lines.forEach((ln, li) => {
      g.clearRect(0, 0, W, H);
      g.fillStyle = '#fff';
      g.font = `900 ${ln.fontPx * K}px Heebo, sans-serif`;
      g.textAlign = 'center';
      g.textBaseline = ln.baseline ?? 'middle';
      g.direction = 'rtl';
      if ('letterSpacing' in g && ln.letterSpacing) (g as unknown as { letterSpacing: string }).letterSpacing = `${ln.letterSpacing * K}px`;
      g.fillText(ln.text, (ln.xPct / 100) * W, (ln.yPct / 100) * H);
      const img = g.getImageData(0, 0, W, H).data;
      for (let y = 0; y < H; y += step)
        for (let x = 0; x < W; x += step)
          if (img[(y * W + x) * 4 + 3] > 140) pts.push({ x, y, line: li });
    });
    // shuffle so a capped count still covers every letter evenly
    for (let k = pts.length - 1; k > 0; k--) {
      const j = Math.floor(this.r() * (k + 1));
      [pts[k], pts[j]] = [pts[j], pts[k]];
    }
    const cap = Math.min(pts.length, Math.floor(N * 0.62));
    for (let k = 0; k < cap; k++) {
      const p = pts[k];
      const ln = lines[p.line];
      const u = p.x / W;
      const w = toWorld((p.x / W) * 100, (p.y / H) * 100);
      this.put([w[0] + this.gauss() * 0.008, w[1] + this.gauss() * 0.008, this.gauss() * 0.05], ln.color(u), 1.6 * (0.7 + this.r() * 0.6),
        d0 + (d1 - d0) * (1 - u), group);
    }
  }
  /** Fill every remaining particle into the deep starfield (plus near dust). */
  stars(dim = 1, delaySpread = 0.35) {
    while (this.i < N) {
      const near = this.r() < 0.1;
      const th = this.r() * Math.PI * 2;
      const u = this.r() * 2 - 1;
      const s = Math.sqrt(1 - u * u);
      const rr = near ? 4 + this.r() * 6 : 16 + this.r() * 34;
      const z = near ? -2 + this.r() * 8 : rr * s * Math.sin(th) - 18;
      const tint = this.r();
      const base: RGB = tint < 0.6 ? [0.55, 0.6, 0.95] : tint < 0.85 ? [0.4, 0.8, 0.95] : [0.95, 0.85, 0.7];
      const b = (0.25 + this.r() * 0.45) * dim * (near ? 0.6 : 1);
      this.put([rr * s * Math.cos(th) * 1.6, rr * u * 0.9, z], [base[0] * b, base[1] * b, base[2] * b],
        near ? 2.4 + this.r() * 2 : 0.8 + this.r() * 1.6, this.r() * delaySpread, GROUP_STARS);
    }
    return this.f;
  }
}

// ── Palette ──
// the deck's Spectrum palette (lib/palette.ts)
const INDIGO = hex('#9B6BFF');
const CYAN = hex('#2DD4BF');
const WHITE: RGB = [1, 1, 1];
const SPECTRUM_RGB = ['#4F7CFF', '#9B6BFF', '#F0469E', '#FF7A59', '#FFC24B', '#2DD4BF'].map((h) => hex(h));

export const SYSTEM_COLORS = ['#E01E5A', '#EA4335', '#4285F4', '#34A853', '#F59E0B', '#2BB673', '#2684FF'];
export const HUB = { x: 40, y: 48 };
export const SYSTEM_POS = SYSTEM_COLORS.map((_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
  return { x: HUB.x + Math.cos(a) * 21, y: HUB.y + Math.sin(a) * 27 };
});

export const AGENT_CENTER = { x: 26, y: 51 };
export const COMPONENT_POS = Array.from({ length: 7 }, (_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
  return { x: AGENT_CENTER.x + Math.cos(a) * 9.5, y: AGENT_CENTER.y + Math.sin(a) * 16.5 };
});
export const COMPONENT_COLORS = ['#9B6BFF', '#2DD4BF', '#4F7CFF', '#FFC24B', '#F0469E', '#FF7A59', '#2DD4BF'];

export const AGENT_GRID = Array.from({ length: 9 }, (_, i) => ({
  x: 50 + ((i % 3) - 1) * -24,   // RTL: first column on the right
  y: 33 + Math.floor(i / 3) * 19,
}));
export const AGENT_COLORS = ['#9B6BFF', '#4F7CFF', '#2DD4BF', '#F0469E', '#FF7A59', '#FFC24B', '#9B6BFF', '#2DD4BF', '#FFC24B'];

export const STACK_Y = [24, 32.5, 41, 49.5, 58];
export const STACK_COLORS = ['#9B6BFF', '#4F7CFF', '#2DD4BF', '#FFC24B', '#FF7A59'];

export const ROAD_Y = 38;
export const ROAD_X = [84, 61.3, 38.7, 16];
export const ROAD_COLORS = ['#9B6BFF', '#2DD4BF', '#FF7A59', '#FFC24B'];

// ── Formations ──

export function fVoid(): Formation {
  return new Builder(1).stars(0.75, 0.6);
}

export function fHeart(): Formation {
  const b = new Builder(2);
  b.ball(50, 40, 0.21, 2600, [1.45, 0.62, 1.15], 0, 0, 0.5, 1.9);
  return b.stars(0.7);
}

export function fChaos(): Formation {
  const b = new Builder(3);
  b.ball(HUB.x, HUB.y, 0.55, 1500, [0.55, 0.6, 1.5], 0, 0.0, 0.08, 2.0);
  SYSTEM_POS.forEach((p, i) => b.ball(p.x, p.y, 0.32, 700, hex(SYSTEM_COLORS[i], 1.25), i + 1, 0.05 + i * 0.045, 0.06));
  SYSTEM_POS.forEach((p, i) => {
    const dx = p.x - HUB.x;
    const dy = p.y - HUB.y;
    b.line([HUB.x + dx * 0.2, HUB.y + dy * 0.2], [HUB.x + dx * 0.8, HUB.y + dy * 0.8], 220, [0.6, 0.65, 0.95], 8, 0.25 + i * 0.07, 0.38 + i * 0.07, 0.025, 1.4);
  });
  return b.stars();
}

export function fAutomationAgent(): Formation {
  const b = new Builder(4);
  // automation: rigid boxes on a rail (right half)
  b.line([92, 56], [57, 56], 420, [0.55, 0.6, 0.7], 9, 0.0, 0.08, 0.004, 1.1);
  // boxes rest exactly on the rail (y 56): half a box is 3.02% of the height
  [88, 81, 74, 67].forEach((x) => b.lattice(x, 52.6, 3.4, 7, [0.8, 0.85, 0.95], 12, 0.02));
  // agent: core, seven components, spokes, orbit ring (left half)
  b.ball(AGENT_CENTER.x, AGENT_CENTER.y, 0.42, 1300, [0.6, 0.65, 1.6], 0, 0.5, 0.05, 2.0);
  COMPONENT_POS.forEach((p, i) => b.ball(p.x, p.y, 0.2, 380, hex(COMPONENT_COLORS[i], 1.3), i + 1, 0.56 + i * 0.035, 0.03));
  COMPONENT_POS.forEach((p, i) => {
    const dx = p.x - AGENT_CENTER.x;
    const dy = p.y - AGENT_CENTER.y;
    b.line([AGENT_CENTER.x + dx * 0.28, AGENT_CENTER.y + dy * 0.28], [AGENT_CENTER.x + dx * 0.78, AGENT_CENTER.y + dy * 0.78],
      120, hex(COMPONENT_COLORS[i], 0.9), 8, 0.6 + i * 0.035, 0.66 + i * 0.035, 0.012, 1.3);
  });
  b.ring(AGENT_CENTER.x, AGENT_CENTER.y + 1.5, 15, 25.5, 1400, [0.35, 0.5, 1.1], 10, 0.82, 1.0, 1.3);
  return b.stars();
}

export function fAgents(): Formation {
  const b = new Builder(5);
  AGENT_GRID.forEach((p, i) => {
    const c = hex(AGENT_COLORS[i], 1.3);
    b.ball(p.x, p.y - 2.2, 0.36, 760, c, i, i * 0.06, 0.08, 2.0);
    b.ring(p.x, p.y - 2.2, 3.4, 6.2, 260, [c[0] * 0.6, c[1] * 0.6, c[2] * 0.6], i, i * 0.06 + 0.08, i * 0.06 + 0.22, 1.1, 0.02);
  });
  return b.stars();
}

export function fDemo(): Formation {
  const b = new Builder(6);
  // a glowing platform the demo window stands on (never behind the window)
  b.ring(50, 77, 30, 3.2, 3600, [0.45, 0.5, 1.2], 0, 0, 1, 1.6, 0.05);
  b.ring(50, 77, 25, 2.5, 2200, [0.3, 0.75, 1.0], 0, 0.1, 1, 1.3, 0.04);
  b.ring(50, 77, 34, 3.9, 1400, [0.25, 0.3, 0.8], 0, 0.2, 1, 1.0, 0.08);
  return b.stars();
}

export function fStack(): Formation {
  const b = new Builder(7);
  // bottom layer arrives first
  STACK_Y.forEach((y, i) => b.disc(50, y + 2.6, 15, 1350, hex(STACK_COLORS[i], 1.25), i, 0.08 + (4 - i) * 0.12));
  // trust shield outline, drawn from the top centre down both sides
  const K = 1600;
  for (let n = 0; n < K; n++) {
    const t = n / K;
    const side = n % 2 ? 1 : -1;
    const u = t;
    let x: number;
    let y: number;
    // crown, tapering flanks, then a pointed base: wide enough to clear every disc
    if (u < 0.3) { const k = u / 0.3; x = 50 + side * k * 24; y = 16 + k * 2.5; }
    else if (u < 0.62) { const k = (u - 0.3) / 0.32; x = 50 + side * (24 - k * 4); y = 18.5 + k * 41.5; }
    else { const v = (u - 0.62) / 0.38; x = 50 + side * 20 * (1 - v ** 1.6); y = 60 + 19 * v; }
    const w = toWorld(x, y, 0.4);
    b.put([w[0] + b.gauss() * 0.02, w[1] + b.gauss() * 0.02, w[2]], [0.35, 1.15, 1.05], 1.5, 0.72 + t * 0.26, 5);
  }
  return b.stars();
}

export function fRoad(): Formation {
  const b = new Builder(8);
  // timeline path drawn right-to-left (RTL), with a gentle wave
  const K = 2600;
  for (let n = 0; n < K; n++) {
    const t = n / K;
    const x = 90 - t * 80;
    const y = ROAD_Y + Math.sin(t * Math.PI * 2) * 1.2;
    const c = t < 0.33 ? INDIGO : t < 0.66 ? hex('#2DD4BF') : hex('#FFC24B');
    const w = toWorld(x, y);
    b.put([w[0] + b.gauss() * 0.03, w[1] + b.gauss() * 0.03, b.gauss() * 0.05], [c[0] * 1.2, c[1] * 1.2, c[2] * 1.2], 1.5, t * 0.45, 6);
  }
  ROAD_X.forEach((x, i) => b.ball(x, ROAD_Y, 0.26, 520, hex(ROAD_COLORS[i], 1.5), i, 0.08 + i * 0.11, 0.04, 2.1));
  return b.stars();
}

export function fWord(): Formation {
  const b = new Builder(9);
  b.text([{ text: 'אוטומציה', xPct: 50, yPct: 48, fontPx: 230, color: () => [0.82, 0.86, 0.95] }], 0, 0, 0.35, 5);
  return b.stars(0.8);
}

export function fSphere(): Formation {
  const b = new Builder(10);
  const count = 7000;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 2.55 + b.gauss() * 0.05;
    const c = (i % 5 === 0) ? WHITE : SPECTRUM_RGB[i % SPECTRUM_RGB.length];
    b.put([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], [c[0] * 1.3, c[1] * 1.3, c[2] * 1.3], 1.6, b.r() * 0.4, 0);
  }
  return b.stars();
}

export function fCore(): Formation {
  const b = new Builder(11);
  b.ball(50, 50, 0.12, 9000, [1.6, 1.6, 2.2], 0, 0, 0.5, 1.6);
  return b.stars();
}

/** A title line measured from the real DOM title (stage-relative). */
export interface TitleLine { text: string; xPct: number; yPct: number; fontPx: number; letterSpacing: number; baseline: CanvasTextBaseline; widthPct?: number }

const TITLE_FALLBACK: TitleLine[] = [
  { text: 'מאוטומציה', xPct: 50, yPct: 28.67, fontPx: 176, letterSpacing: -8.8, baseline: 'middle' },
  { text: 'לאייג׳נט', xPct: 50, yPct: 44.49, fontPx: 176, letterSpacing: -8.8, baseline: 'middle' },
];

export function fTitle(measured?: TitleLine[]): Formation {
  const b = new Builder(12);
  const lines = measured && measured.length === 2 ? measured : TITLE_FALLBACK;
  // the second line in the Spectrum gradient, right to left as it is read
  const stops = ['#FFC24B', '#FF7A59', '#F0469E', '#9B6BFF', '#4F7CFF'].map((h) => hex(h, 1.45));
  const l1 = lines[1];
  const w1 = (l1.widthPct ?? 44) / 100;
  const left = l1.xPct / 100 - w1 / 2;
  const grad = (u: number): RGB => {
    const x = Math.min(0.9999, Math.max(0, (u - left) / w1)) * (stops.length - 1);
    const i = Math.floor(x);
    const k = x - i;
    const [a, c] = [stops[i], stops[i + 1]];
    return [a[0] + (c[0] - a[0]) * k, a[1] + (c[1] - a[1]) * k, a[2] + (c[2] - a[2]) * k];
  };
  b.text(lines.map((ln, i) => ({ ...ln, color: i === 0 ? () => [1.3, 1.27, 1.22] as RGB : grad })), 0, 0, 0.25, 4);
  return b.stars(0.9);
}

/** Pixels of the closing photo, sampled at its on-screen size (alpha = the slide's soft-edge mask). */
export interface PortraitPixels { data: Uint8ClampedArray; width: number; height: number; /** the photo's backdrop color, left out */ bg?: RGB }

/**
 * The speaker's portrait, made of the universe itself: every particle takes
 * its position and color from a pixel of the photo, exactly where the photo
 * sits on the closing slide (rect in screen percentages). The face arrives
 * first, the edges last; brighter pixels sit slightly closer to the camera.
 */
export function fPortrait(rect: { x: number; y: number; w: number; h: number }, px: PortraitPixels): Formation {
  const b = new Builder(13);
  const { data, width: W, height: H } = px;
  const pts: { x: number; y: number; c: RGB; lum: number }[] = [];
  const step = Math.max(1, Math.floor(Math.sqrt((W * H) / 26000)));
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      const i = (y * W + x) * 4;
      const a = data[i + 3] / 255;
      const c: RGB = [data[i] / 255, data[i + 1] / 255, data[i + 2] / 255];
      const lum = (0.3 * c[0] + 0.59 * c[1] + 0.11 * c[2]) * a;
      const bgd = px.bg ? Math.hypot(c[0] - px.bg[0], c[1] - px.bg[1], c[2] - px.bg[2]) : 1;
      if (a > 0.25 && lum > 0.05 && bgd > 0.11) pts.push({ x, y, c, lum });
    }
  }
  for (let k = pts.length - 1; k > 0; k--) {
    const j = Math.floor(b.r() * (k + 1));
    [pts[k], pts[j]] = [pts[j], pts[k]];
  }
  const cap = Math.min(pts.length, Math.floor(N * 0.86));
  const fx = W / 2;
  const fy = H * 0.36;
  const far = Math.hypot(W / 2, H * 0.64);
  for (let k = 0; k < cap; k++) {
    const p = pts[k];
    const w = toWorld(rect.x + (p.x / W) * rect.w, rect.y + (p.y / H) * rect.h, (p.lum - 0.35) * 0.9);
    // lift the shadows so the face reads as light, not as a dark photo
    const lift = (v: number) => Math.pow(v, 0.62) * 1.45;
    const d = Math.min(1, Math.hypot(p.x - fx, p.y - fy) / far);
    b.put([w[0] + b.gauss() * 0.006, w[1] + b.gauss() * 0.006, w[2]], [lift(p.c[0]), lift(p.c[1]), lift(p.c[2])],
      1.35 + p.lum * 1.4, Math.min(0.92, d * 0.7 + b.r() * 0.18), 0);
  }
  return b.stars(0.55);
}
