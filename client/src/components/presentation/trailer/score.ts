/**
 * The trailer score (A minor, 90 BPM): every musical and sound-design event
 * on the trailer timeline, in seconds. Rendered offline into one buffer.
 * Instruments: felt piano, soft strings, the pen on paper, and the opening
 * heartbeat, which returns as the pulse of the last two chapters. Every line
 * drawn on screen has its pen sound, panned to where it is drawn.
 *
 * Timing: the trailer was authored on a 96 BPM grid ("story time"). `W` maps
 * story time onto the final, slightly slower cut: chapters land on 90 BPM
 * downbeats, chapter titles hold longer, each act is stretched to give the
 * text reading time (the demo act gets an extra bar), and the finale keeps
 * its original pace. Only start times move; every animation keeps its speed.
 *
 * It ships pre-rendered as client/public/audio/trailer-score.flac. After any
 * change here (or to the instruments in lib/sound.ts), regenerate it: run the
 * dev server, open the deck with ?render-score, call
 * `await window.__downloadTrailerScore()` in the console, then
 * `ffmpeg -i trailer-score.wav -af "volume=4.5dB,alimiter=limit=0.89:attack=5:release=80:level=false" -c:a flac -compression_level 12 client/public/audio/trailer-score.flac`
 * (about -13 LUFS, peaks at -1 dBFS).
 */
import { sound, type ScoreEvent } from '../../../lib/sound';
import * as L from './lines';

// ── Musical grid (final cut) ──
export const BPM = 90;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
// story-time grid the acts were authored on (pre-music ticking keeps it)
const OLD_BEAT = 0.625;

/** Chapter downbeats: bed bars 0, 5, 11 (the demo gets 6 bars), 15; finale at bar 19. */
const CH1 = 16.4;
export const CH_AT = [CH1, CH1 + 5 * BAR, CH1 + 11 * BAR, CH1 + 15 * BAR];
export const FIN_AT = CH1 + 19 * BAR;
/** Extra hold on each chapter title (seconds). */
export const CARD_HOLD = 0.45;

const OLD_CH = [15, 27.5, 40, 50];
const OLD_FIN = 60;
const SEGS: [number, number, number, number][] = (() => {
  const segs: [number, number, number, number][] = [
    [0, 12.9, 0, 13.55],                         // cold open + the invisible work
    [12.9, 13.75, 13.55, CH_AT[0] - 1.25],       // the freeze and its question hold longer
    [13.75, 15, CH_AT[0] - 1.25, CH_AT[0]],      // lead-in to the jump: rigid
  ];
  for (let i = 0; i < 4; i++) {
    const S = OLD_CH[i];
    const E = i < 3 ? OLD_CH[i + 1] : OLD_FIN;
    const N = CH_AT[i];
    const M = i < 3 ? CH_AT[i + 1] : FIN_AT;
    segs.push([S, S + 1.3, N, N + 1.3 + CARD_HOLD]);   // chapter title (held)
    segs.push([S + 1.3, E - 1.25, N + 1.3 + CARD_HOLD, M - 1.25]); // the act, stretched
    segs.push([E - 1.25, E, M - 1.25, M]);             // exit into the next jump: rigid
  }
  return segs;
})();

/** Story time (96 BPM authoring grid) to final time. */
export function W(t: number): number {
  if (t >= OLD_FIN) return FIN_AT + (t - OLD_FIN);  // the finale keeps its pace
  for (const [a, b, A, B] of SEGS) if (t <= b) return A + ((Math.max(t, a) - a) * (B - A)) / (b - a);
  return t;
}

/** When the trailer hands over to the title slide. */
export const TRAILER_END = W(65.85);

export const CH = [
  { at: CH_AT[0], num: '01', label: 'להבין', desc: 'מה הם אייג׳נטים ואיך הם עובדים' },
  { at: CH_AT[1], num: '02', label: 'לראות', desc: 'דוגמאות מהלמידה ודמו חי' },
  { at: CH_AT[2], num: '03', label: 'לבנות', desc: 'כלים, אמון וגבולות' },
  { at: CH_AT[3], num: '04', label: 'להטמיע', desc: 'פיילוט ב-90 יום' },
];
/** The chapter number starts writing this long before its downbeat. */
export const NUM_LEAD = 0.45;
export const NUM_DUR = 1.0;

// ── Harmony: A minor, one chord per bar from chapter 1 to the finale ──
const N = {
  E2: 82.41, F2: 87.31, G2: 98, A2: 110, C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196, A3: 220, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, Gs4: 415.3, A4: 440, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51,
};
type Chord = { str: number[]; bass: number; arp: number[] };
const Am: Chord = { str: [N.A3, N.C4, N.E4, N.B4], bass: N.A2, arp: [N.A3, N.E4, N.A4, N.B4, N.C5, N.E5] };
const Fm7: Chord = { str: [N.F3, N.A3, N.C4, N.E4], bass: N.F2, arp: [N.F3, N.C4, N.F4, N.A4, N.C5, N.E5] };
const C9: Chord = { str: [N.C4, N.E4, N.G4, N.D5], bass: N.C3, arp: [N.C4, N.E4, N.G4, N.C5, N.D5, N.G5] };
const G6: Chord = { str: [N.G3, N.B3, N.D4, N.E4], bass: N.G2, arp: [N.G3, N.D4, N.G4, N.B4, N.D5, N.E5] };
const E7: Chord = { str: [N.E3, N.B3, N.D4, N.Gs4], bass: N.E2, arp: [N.E3, N.B3, N.E4, N.Gs4, N.B4, N.D5] };
const BARS: Chord[] = [Am, Fm7, C9, G6, Am, C9, G6, Am, Fm7, C9, G6, Fm7, C9, G6, Am, G6, Am, Fm7, E7];
/** Melody on beat 1 (and beat 3 from chapter 3), one phrase per chapter. */
const MEL: (number | null)[][] = [
  [null], [null], [null], [null], [null],
  [N.E5], [N.D5], [N.C5], [N.A4], [N.C5], [N.D5],
  [N.A5, N.G5], [N.G5, N.E5], [N.D5, N.B4], [N.C5, N.E5],
  [N.D5, N.B4], [N.E5, N.C5], [N.F5, N.E5], [N.D5, N.B4],
];
const PENTA = [N.A3, N.C4, N.D4, N.E4, N.G4, N.A4, N.C5, N.D5, N.E5, N.G5, N.A5, N.C6];
const ARP = [0, 2, 4, 3, 1, 3, 5, 2];

/** Length of the rendered audio: the score plus the final chord's tail. */
export const TRAILER_AUDIO_SECONDS = Math.ceil(FIN_AT + 11);

export function buildScore(): ScoreEvent[] {
  const ev: ScoreEvent[] = [];
  // story-time events (placed through W) and final-time events
  const on = (t: number, play: ScoreEvent['play']) => ev.push({ at: W(t), play });
  const onRaw = (t: number, play: ScoreEvent['play']) => ev.push({ at: t, play });
  /** A pen stroke drawn over story time [t, t + d], panned from x0 to x1. */
  const pen = (t: number, d: number, vol: number, x0: number, x1: number) =>
    on(t, (b, tt) => sound.pen(b, tt, Math.max(0.12, W(t + d) - W(t)), vol, L.panAt(x0), L.panAt(x1)));
  const felt = (t: number, f: number, vol = 0.07, decay = 2, x = 960) => on(t, (b, tt) => sound.felt(b, tt, f, vol, decay, L.panAt(x)));

  // ── Act 0: a heartbeat, then a hesitant line ──
  on(0, (b, t) => sound.strings(b, t, [N.A2, N.E3], W(12.9) - t, 0.028, 3.5, 700));
  on(0.6, (b, t) => sound.heartbeat(b, t, 0.5));
  on(1.85, (b, t) => sound.heartbeat(b, t, 0.56));
  pen(1.9, 0.6, 0.045, 1560, 1180);
  pen(2.75, 0.55, 0.045, 1180, 830);
  on(3.4, (b, t) => {
    sound.pen(b, t, 0.14, 0.07, L.panAt(820), L.panAt(760));
    sound.felt(b, t, N.A2, 0.12, 4.2);
    sound.felt(b, t + 0.01, N.E3, 0.07, 3.6);
    sound.felt(b, t + 0.02, N.A3, 0.05, 3.2);
    sound.sub(b, t, 70, 38, 0.22, 1.6);
  });
  pen(3.7, 1.0, 0.04, 762, 360);
  on(4.75, (b, t) => sound.heartbeat(b, t, 0.3));

  // ── Act 1: the invisible work ──
  on(5.3, (b, t) => sound.strings(b, t, [N.A3, N.E4], W(12.85) - t, 0.022, 2.5, 1100));
  felt(6.35, N.A4, 0.07, 2.2, L.HUB[0]);
  L.TOOL_POS.forEach(([x], i) => felt(6.5 + i * 0.12, PENTA[5 + (i % 6)], 0.05, 1.4, x));
  // a clock ticks under the whole act
  for (let t = 6.4, k = 0; t < 10.9; t += OLD_BEAT, k++) on(t, (b, tt) => sound.click(b, tt, k % 2 ? 0.035 : 0.05));
  // the scribble: out to a tool and back, again and again
  const leg = 4.4 / L.SCRIBBLE_A_VISITS;
  [0, 3, 1, 5, 2, 6, 4].forEach((ti, k) => {
    const x = L.TOOL_POS[ti][0];
    pen(6.45 + k * leg, leg * 0.5, 0.04, L.HUB[0], x);
    pen(6.45 + k * leg + leg * 0.5, leg * 0.45, 0.034, x, L.HUB[0]);
  });
  [9.0, 9.6, 10.2].forEach((t, i) => on(t, (b, tt) => { sound.felt(b, tt, [N.E5, N.G5, N.A5][i], 0.06, 1.6, 0.6); sound.click(b, tt, 0.05); }));
  // overload: the ticking doubles, the pen goes frantic, strings tighten
  for (let t = 10.9, k = 0; t < 12.85; t += OLD_BEAT / 4, k++) on(t, (b, tt) => sound.click(b, tt, 0.03 + k * 0.0022));
  for (let t = 10.9, k = 0; t < 12.8; t += 0.24, k++) pen(t, 0.22, 0.032 + k * 0.002, k % 2 ? 300 : 1100, k % 2 ? 1100 : 300);
  on(10.9, (b, t) => sound.strings(b, t, [N.A4, 466.16, N.B4], W(12.88) - t - 0.05, 0.05, W(12.85) - t, 2600));
  // freeze: silence, and one question
  on(12.9, (b, t) => { sound.felt(b, t, N.A3, 0.08, 4.5); sound.felt(b, t + 0.02, N.E4, 0.05, 4); });
  on(13.15, (b, t) => sound.felt(b, t, N.B4, 0.045, 3.5));

  // ── Chapter cards: the number is written in one stroke, the chord lands on the downbeat ──
  CH.forEach((c, i) => {
    const bar = [0, 5, 11, 15][i];
    const ch = BARS[bar];
    onRaw(c.at - NUM_LEAD, (b, t) => sound.pen(b, t, NUM_DUR, 0.055, 0.75, -0.75));
    onRaw(c.at - 0.9, (b, t) => sound.swell(b, t, 0.9, 0.05));
    onRaw(c.at, (b, t) => {
      ch.str.forEach((f, k) => sound.felt(b, t + k * 0.045, f, 0.06, 3.2, (k / 3 - 0.5) * 0.9));
      sound.felt(b, t, ch.bass, 0.1, 3.6);
      sound.felt(b, t, ch.bass / 2, 0.06, 3.6);
      sound.sub(b, t, 62, 40, 0.14, 1.4);
    });
  });

  // ── Music bed: 19 bars from the first chapter to the finale ──
  BARS.forEach((ch, bar) => {
    const t0 = CH1 + bar * BAR;
    const act = bar < 5 ? 1 : bar < 11 ? 2 : bar < 15 ? 3 : 4;
    onRaw(t0, (b, t) => sound.strings(b, t, ch.str, BAR - 0.05, [0, 0.022, 0.028, 0.034, 0.04][act], 0.7, [0, 1200, 1500, 1900, 2400][act]));
    ARP.forEach((step, k) => {
      if (act === 1 && k % 2) return;
      const f = ch.arp[step] * (act === 4 && k === 7 ? 2 : 1);
      const v = [0, 0.04, 0.045, 0.05, 0.055][act] * (k % 4 === 0 ? 1.2 : 1);
      onRaw(t0 + k * (BEAT / 2), (b, t) => sound.felt(b, t, f, v, 1.5, k % 2 ? 0.3 : -0.3));
    });
    if (act >= 2) [0, 2].forEach((q) => onRaw(t0 + q * BEAT, (b, t) => sound.felt(b, t, ch.bass, 0.07, 1.8)));
    if (act >= 3) for (let q = 0; q < 4; q++) if (act === 4 || q % 2 === 0) onRaw(t0 + q * BEAT, (b, t) => sound.heartbeat(b, t, act === 4 ? 0.3 : 0.24));
    MEL[bar].forEach((f, k) => { if (f) onRaw(t0 + k * 2 * BEAT, (b, t) => sound.felt(b, t, f, 0.07, 2.6, 0.1)); });
  });

  // ── Act 2: a rigid route jams; a goal finds its way ──
  [18.0, 18.625, 19.25].forEach((t, k) => on(t, (b, tt) => {
    sound.click(b, tt, 0.1);
    sound.felt(b, tt, N.A2, 0.06, 0.5, L.panAt(1800 - k * 170));
    sound.pen(b, tt, 0.26, 0.04, L.panAt(1900 - k * 180), L.panAt(1700 - k * 170));
  }));
  on(19.42, (b, t) => sound.whoosh(b, t, 0.3, 2400, 700, 0.05, 0.3, 0.3));
  on(19.8, (b, t) => {
    sound.felt(b, t, N.A2, 0.1, 1.2, 0.35);
    sound.felt(b, t, 116.54, 0.08, 1.2, 0.35);
    sound.sub(b, t, 66, 34, 0.28, 0.8);
    sound.click(b, t, 0.12);
  });
  pen(20.75, 1.65, 0.045, 880, L.GOAL[0]);
  L.COMP_AT.forEach((f, i) => felt(20.75 + f * 1.65, PENTA[4 + i], 0.06, 1.6, 880 - f * (880 - L.GOAL[0])));
  on(22.4, (b, t) => { sound.felt(b, t, N.E5, 0.06, 2.4, L.panAt(L.GOAL[0])); sound.felt(b, t + 0.06, N.A5, 0.05, 2.4, L.panAt(L.GOAL[0])); });
  on(24.2, (b, t) => [N.A4, N.C5, N.E5].forEach((f, k) => sound.felt(b, t + k * 0.06, f, 0.04, 2, -0.6)));

  // ── Act 3: the learning cycle, then a live request ──
  pen(28.9, 1.0, 0.045, 1200, 720);
  L.RING_NODES.forEach(([x], i) => felt(29.74 + i * 0.118, PENTA[3 + i], 0.05, 1.3, x));
  L.RING_NODES.forEach(([x], i) => felt(30.9 + i * 0.13, PENTA[11 - (i % 7)] / (i > 6 ? 2 : 1), 0.04, 1.1, x));
  for (let k = 0; k < 23; k++) onRaw(W(33.1) + k * 0.065, (b, t) => sound.click(b, t, 0.045));
  on(34.9, (b, t) => { sound.felt(b, t, N.E5, 0.06, 1.8); sound.felt(b, t + 0.09, N.A5, 0.045, 1.8); });
  [35.35, 35.75, 36.15].forEach((t, i) => on(t, (b, tt) => { sound.felt(b, tt, [N.C5, N.D5, N.E5][i], 0.055, 1.6, 0.2); sound.pen(b, tt, 0.18, 0.03, 0.2, 0.2); }));
  felt(36.55, N.G4, 0.05, 1.8);
  on(37.75, (b, t) => {
    sound.click(b, t, 0.14);
    [N.C5, N.E5, N.G5, N.C6].forEach((f, k) => sound.felt(b, t + 0.05 + k * 0.05, f, 0.06, 2.8, (k / 3 - 0.5) * 0.6));
    sound.pen(b, t + 0.08, 0.34, 0.06, 0.2, -0.1);
  });

  // ── Act 4: trust, layer by layer ──
  for (let k = 0; k < 5; k++) on(42.15 + k * 0.335, (b, t) => {
    sound.pen(b, t, 0.3, 0.04, L.panAt(1260), L.panAt(660));
    sound.felt(b, t, [N.A2, N.C3, N.E3, N.G3, N.A3][k], 0.08, 1.8);
  });
  pen(44.55, 0.9, 0.05, 1320, 600);
  felt(44.8, N.E5, 0.05, 1.6, 1650);
  felt(45.1, N.G5, 0.05, 1.6, 270);
  for (let i = 0; i < 5; i++) felt(46.4 + i * 0.12, PENTA[6 + i], 0.035, 1.2);
  felt(47.1, N.A5, 0.04, 2.2);

  // ── Act 5: the road, and what it buys ──
  pen(51.7, 1.8, 0.05, 1920, 0);
  L.ROAD_X.forEach((x, i) => felt(52.25 + i * 0.3, [N.E5, N.G5, N.A5, N.C6][i], 0.055, 1.6, x));
  felt(54.3, N.A4, 0.045, 1.8);
  pen(55.1, 0.3, 0.07, 1100, 820);
  on(55.4, (b, t) => [N.A4, N.C5, N.E5, N.A5].forEach((f, k) => sound.felt(b, t + k * 0.04, f, 0.06, 2.6, (k / 3 - 0.5) * 0.6)));
  [56.5, 57.12, 57.75].forEach((t, i) => felt(t, [N.E5, N.G5, N.A5][i], 0.05, 1.8));

  // ── Finale: the line writes the title and becomes its underline ──
  on(59.4, (b, t) => sound.strings(b, t, [N.A3, N.E4, N.A4], 4.3, 0.04, 2.2, 1800));
  pen(59.4, 0.6, 0.04, 1920, 1300);
  pen(60.0, 1.2, 0.05, 1500, 420);
  felt(60.0, N.A3, 0.06, 2.4);
  felt(60.6, N.C4, 0.05, 2.2);
  pen(61.3, 1.1, 0.05, 420, 1500);
  // a rising run that accelerates into the impact
  [0, 0.42, 0.78, 1.08, 1.32, 1.52, 1.68, 1.82, 1.94, 2.04, 2.12].forEach((d, k) =>
    felt(61.4 + d, [N.A3, N.C4, N.E4, N.A4, N.B4, N.C5, N.E5, N.G5, N.A5, N.C6, N.E6][k], 0.04 + k * 0.003, 1.4, 960 + (k % 2 ? 300 : -300)));
  pen(62.4, 1.35, 0.055, 1500, 700);
  on(61.6, (b, t) => sound.strings(b, t, [N.E4, N.A4, N.C5, N.E5], W(63.75) - t, 0.05, W(63.75) - t, 3200));
  on(63.15, (b, t) => sound.swell(b, t, 0.6, 0.08));
  on(63.75, (b, t) => {
    [N.A2 / 2, N.A2, N.E3, N.A3, N.E4, N.B4, N.C5, N.E5, N.A5].forEach((f, k) => sound.felt(b, t + k * 0.012, f, k < 2 ? 0.11 : 0.07, 5.5, (k / 8 - 0.5) * 0.8));
    sound.strings(b, t, [N.A3, N.C4, N.E4, N.B4, N.E5], 4.4, 0.045, 0.4, 2600);
    sound.sub(b, t, 70, 36, 0.3, 2.2);
  });
  on(64.6, (b, t) => sound.felt(b, t, N.E6, 0.03, 3.5, 0.3));
  return ev;
}
