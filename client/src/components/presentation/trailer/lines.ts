/**
 * Geometry of the trailer, in the 1920x1080 design box. Everything the
 * trailer draws is one kind of mark: a pen line. Shared by the picture
 * (LectureTrailer) and the score (score.ts), which pans each sound to where
 * its line is drawn.
 */
import { pathFrom, rng, spline, type Pt } from '../../motion/path';

// ── Act 0: a heartbeat, then a hesitant line ──
export const A0_DOT: Pt = [1560, 470];
export const A0_PATH = [
  pathFrom(A0_DOT, spline([[1560, 470], [1420, 462], [1290, 478], [1180, 470]])),
  spline([[1180, 470], [1060, 465], [940, 477], [830, 470]]).join(' '),
  'L 818 438 L 804 502 L 790 442 L 776 498 L 762 470',
  spline([[762, 470], [640, 476], [500, 463], [360, 470]]).join(' '),
].join(' ');
/** Progress marks on A0_PATH (fractions of its length, approximate). */
export const A0_STOPS = [0.3, 0.52, 0.64, 1];

// ── Act 1: one person running between nine tools ──
export const HUB: Pt = [700, 520];
export const TOOL_POS: Pt[] = Array.from({ length: 7 }, (_, i) => {
  const a = -Math.PI / 2 + (i / 7) * Math.PI * 2;
  return [HUB[0] + Math.cos(a) * 340, HUB[1] + Math.sin(a) * 250];
});
/** The tangled scribble: hub, a tool, back, another tool, with loops. */
function scribble(seed: number, visits: number[], loop = 34): string {
  const r = rng(seed);
  const pts: Pt[] = [HUB];
  visits.forEach((i) => {
    const [x, y] = TOOL_POS[i];
    const j = () => (r() - 0.5) * 70;
    pts.push([(x + HUB[0]) / 2 + j() * 2, (y + HUB[1]) / 2 + j() * 2]);
    pts.push([x + j() + loop, y + j()]);
    pts.push([x + j(), y - loop + j()]);
    pts.push([x - loop + j(), y + j()]);
    pts.push([HUB[0] + j(), HUB[1] + j()]);
  });
  return pathFrom(HUB, spline(pts));
}
export const SCRIBBLE_A = scribble(7, [0, 3, 1, 5, 2, 6, 4]);
export const SCRIBBLE_B = scribble(23, [2, 5, 0, 6, 3, 1, 4, 0, 5, 2], 22);
export const SCRIBBLE_A_VISITS = 7;

// ── Act 2: a rigid route against a goal ──
export const AUTO_SEGS = ['M 1900 600 H 1700 V 480', 'M 1700 480 H 1540 V 600', 'M 1540 600 H 1360'];
export const AUTO_BLOCK: Pt = [1300, 600];
export const AGENT_BLOCK: Pt = [500, 600];
export const GOAL: Pt = [150, 600];
export const AGENT_PATH = pathFrom([880, 600], spline([[880, 600], [740, 602], [630, 540], [500, 452], [372, 532], [262, 598], [GOAL[0] + 16, GOAL[1]]]));
/** Where along the agent's path each of its seven components appears. */
export const COMP_AT = [0.07, 0.2, 0.33, 0.46, 0.59, 0.72, 0.85];

// ── Act 3: the learning cycle ──
export const RING_C: Pt = [960, 470];
export const RING_R = 240;
export const RING_PATH = `M ${RING_C[0]} ${RING_C[1] - RING_R} A ${RING_R} ${RING_R} 0 1 1 ${RING_C[0]} ${RING_C[1] + RING_R} A ${RING_R} ${RING_R} 0 1 1 ${RING_C[0]} ${RING_C[1] - RING_R}`;
/** Agent nodes on the ring, clockwise from the top (the reading side first). */
export const RING_NODES: Pt[] = Array.from({ length: 9 }, (_, i) => {
  const a = -Math.PI / 2 + (i / 9) * Math.PI * 2;
  return [RING_C[0] + Math.cos(a) * RING_R, RING_C[1] + Math.sin(a) * RING_R];
});

// ── Act 4: trust in layers ──
export const LAYER_Y = [330, 410, 490, 570, 650];
export const LAYER_X: [number, number] = [1260, 660];
export const FENCE = 'M 1292 280 H 628 Q 600 280 600 308 V 672 Q 600 700 628 700 H 1292 Q 1320 700 1320 672 V 308 Q 1320 280 1292 280';
export const FENCE_TIES = ['M 1320 490 H 1520', 'M 600 490 H 400'];

// ── Act 5: the 90-day road ──
export const ROAD_X = [1536, 1152, 768, 384];
export const ROAD_Y = 470;
export const ROAD_PATH = pathFrom([2010, 430], spline([[2010, 430], [1760, 492], ...ROAD_X.flatMap((x, i): Pt[] => [[x, ROAD_Y], [x - 192, ROAD_Y + (i % 2 ? -26 : 26)]]).slice(0, -1), [150, 446], [-90, 470]]));

/** Pan position (-1..1) of an x coordinate in the design box. */
export const panAt = (x: number) => (x / 960 - 1) * 0.8;
