/**
 * The trailer score (A minor, 90 BPM): every musical and sound-design event
 * on the trailer timeline, in seconds. Rendered offline into one buffer.
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
 * `ffmpeg -i trailer-score.wav -c:a flac -compression_level 12 client/public/audio/trailer-score.flac`.
 */
import { sound, type ScoreEvent } from '../../../lib/sound';
import * as F from './formations';

// ── Musical grid (final cut) ──
export const BPM = 90;
export const BEAT = 60 / BPM;
export const BAR = BEAT * 4;
const SIX = BEAT / 4;
// story-time grid the acts were authored on (pre-music ticking keeps it)
const OLD_BEAT = 0.625;
const OLD_SIX = OLD_BEAT / 4;

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
  { at: CH_AT[0], num: '01', label: 'להבין', desc: 'מה הם אייג׳נטים ואיך הם עובדים', color: '#818CF8' },
  { at: CH_AT[1], num: '02', label: 'לראות', desc: 'תשעה שימושים ודמו חי', color: '#22D3EE' },
  { at: CH_AT[2], num: '03', label: 'לבנות', desc: 'כלים, ארכיטקטורה ואמון', color: '#34D399' },
  { at: CH_AT[3], num: '04', label: 'להטמיע', desc: 'פיילוט ב-90 יום', color: '#FCD34D' },
];

// A minor colours: add9, maj7, add9, 6sus
const CHORDS = [
  { pad: [220, 261.63, 329.63, 493.88], bass: 110, arp: [220, 329.63, 440, 493.88, 523.25, 659.25] },
  { pad: [174.61, 220, 261.63, 329.63], bass: 87.31, arp: [174.61, 261.63, 349.23, 440, 523.25, 659.25] },
  { pad: [196, 261.63, 329.63, 587.33], bass: 130.81, arp: [261.63, 329.63, 392, 523.25, 587.33, 783.99] },
  { pad: [196, 246.94, 293.66, 329.63], bass: 98, arp: [196, 293.66, 392, 493.88, 587.33, 659.25] },
];
const ARP = [0, 2, 4, 3, 1, 3, 5, 4, 0, 2, 4, 3, 1, 4, 5, 2];
const PENTA = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
const panX = (x: number) => (x / 50 - 1) * 0.8;


/** Length of the rendered audio: the score plus the final pad's tail. */
export const TRAILER_AUDIO_SECONDS = Math.ceil(FIN_AT + 11);

export function buildScore(): ScoreEvent[] {
  const ev: ScoreEvent[] = [];
  // story-time events (mapped through W) and final-time events
  const on = (t: number, play: ScoreEvent['play']) => ev.push({ at: W(t), play });
  const onRaw = (t: number, play: ScoreEvent['play']) => ev.push({ at: t, play });

  // ── Act 0 ──
  on(0, (b, t) => sound.drone(b, t, W(12.95), 0.075));
  on(0.6, (b, t) => sound.heartbeat(b, t, 0.5));
  on(1.85, (b, t) => sound.heartbeat(b, t, 0.56));
  on(3.4, (b, t) => { sound.braam(b, t, 55, 0.24, 2.6); sound.glass(b, t, 220, 0.07, 0, 2.6); });
  on(4.75, (b, t) => sound.heartbeat(b, t, 0.32));

  // ── Act 1: the invisible work ──
  on(5.3, (b, t) => sound.whoosh(b, t, 1.6, 200, 2600, 0.24, -0.6, 0.3));
  on(6.4, (b, t) => sound.glass(b, t, 440, 0.08, panX(F.HUB.x)));
  F.SYSTEM_POS.forEach((p, i) => on(6.5 + i * 0.12, (b, t) => sound.glass(b, t, PENTA[5 + i], 0.07, panX(p.x), 1.4)));
  F.SYSTEM_POS.forEach((p, i) => on(7.23 + i * 0.19, (b, t) => sound.glass(b, t, PENTA[8 + (i % 5)], 0.03, panX(p.x), 0.8)));
  for (let t = 6.4, k = 0; t < 10.9; t += OLD_BEAT / 2, k++) {
    const side = k % 2 ? 0.3 : -0.3;
    on(t, (b, tt) => sound.hat(b, tt, 0.05, false, side));
  }
  [9.0, 9.6, 10.2].forEach((t, i) => on(t, (b, tt) => { sound.glass(b, tt, [659.25, 783.99, 880][i], 0.08, 0.6); sound.click(b, tt, 0.06); }));
  for (let t = 10.9, k = 0; t < 12.85; t += OLD_SIX, k++) {
    const v = 0.05 + k * 0.004;
    const side = k % 2 ? 0.4 : -0.4;
    on(t, (b, tt) => sound.hat(b, tt, v, false, side));
  }
  for (let t = 11.0; t < 12.85; t += 0.11) {
    const f = PENTA[8 + Math.floor(Math.random() * 6)];
    const p = (Math.random() - 0.5) * 1.6;
    on(t, (b, tt) => sound.glass(b, tt, f, 0.028, p, 0.6));
  }
  on(10.9, (b, t) => sound.riser(b, t, W(12.85) - W(10.9), 0.2));
  on(12.88, (b, t) => sound.glitch(b, t, 0.45, 0.22));
  on(13.1, (b, t) => { sound.glass(b, t, 220, 0.1, -0.2, 3.2); sound.glass(b, t + 0.02, 329.63, 0.06, 0.3, 3.2); });

  // ── Chapter cards ──
  CH.forEach((c, i) => {
    onRaw(c.at - 1.2, (b, t) => sound.swell(b, t, 1.2, 0.2));
    onRaw(c.at, (b, t) => {
      sound.braam(b, t, 55, 0.3, 3.0);
      sound.stab(b, t, CHORDS[i % 4].pad.map((f) => f * 2), 0.06);
      sound.glass(b, t + 0.05, 880, 0.06, 0, 2.4);
      sound.whoosh(b, t + 0.05, 1.3, 300, 3200, 0.16, 0.5, -0.5);
    });
  });

  // ── Music bed: 19 bars from the first chapter to the finale ──
  for (let bar = 0; bar < 19; bar++) {
    const t0 = CH1 + bar * BAR;
    const ch = CHORDS[(bar + 2) % 4];
    const act = bar < 5 ? 1 : bar < 11 ? 2 : bar < 15 ? 3 : 4;
    onRaw(t0, (b, t) => sound.pad(b, t, ch.pad, BAR - 0.02, [0, 0.045, 0.05, 0.055, 0.06][act], [0, 1100, 1600, 2300, 3200][act]));
    ARP.forEach((step, k) => {
      const f = ch.arp[step] * (act === 4 && k % 4 === 3 ? 2 : 1);
      const accent = k % 4 === 0 ? 1.25 : 1;
      onRaw(t0 + k * SIX, (b, t) => sound.pluck(b, t, f, [0, 0.06, 0.07, 0.075, 0.08][act] * accent, [0, 900, 1500, 2400, 3800][act], k % 2 ? 0.35 : -0.35));
    });
    for (let q = 0; q < 4; q++) {
      const tb = t0 + q * BEAT;
      if (act >= 2) onRaw(tb, (b, t) => sound.kick(b, t, 0.7));
      if (act >= 2) onRaw(tb + BEAT / 2, (b, t) => sound.hat(b, t, 0.07, act === 4 && q === 3, 0.25));
      if (act >= 2) onRaw(tb, (b, t) => sound.bass(b, t, ch.bass, BEAT * 0.48, 0.26));
      if (act >= 3) onRaw(tb + BEAT / 2, (b, t) => sound.bass(b, t, ch.bass, BEAT * 0.45, 0.2));
      if (act >= 3 && (q === 1 || q === 3)) onRaw(tb, (b, t) => sound.clap(b, t, 0.28));
      if (act === 4) {
        onRaw(tb + SIX, (b, t) => sound.hat(b, t, 0.035, false, -0.3));
        onRaw(tb + SIX * 3, (b, t) => sound.hat(b, t, 0.035, false, -0.3));
      }
    }
  }

  // ── Act 2 ──
  [18.0, 18.625, 19.25].forEach((t) => on(t, (b, tt) => { sound.click(b, tt, 0.12); sound.glass(b, tt, 110, 0.05, 0.6, 0.4); }));
  on(19.6, (b, t) => sound.whoosh(b, t, 0.25, 3000, 600, 0.14, 0.2, 0.3));
  on(19.8, (b, t) => { sound.glitch(b, t, 0.4, 0.2); sound.sub(b, t, 70, 34, 0.38, 0.8); });
  F.COMPONENT_POS.forEach((p, i) => on(20.85 + i * 0.21, (b, t) => sound.glass(b, t, PENTA[4 + i], 0.075, panX(p.x), 1.6)));
  on(23.9, (b, t) => sound.shimmer(b, t, undefined, 0.05));

  // ── Act 3 ──
  F.AGENT_GRID.forEach((p, i) => on(30.9 + i * 0.13, (b, t) => sound.glass(b, t, PENTA[4 + i], 0.065, panX(p.x), 1.4)));
  // typing: keeps its real keystroke rhythm, wherever it starts
  for (let k = 0; k < 23; k++) onRaw(W(33.1) + k * 0.065, (b, t) => sound.click(b, t, 0.05));
  on(34.9, (b, t) => { sound.glass(b, t, 659.25, 0.07, 0); sound.glass(b, t + 0.09, 880, 0.05, 0); });
  [35.4, 35.8, 36.2].forEach((t, i) => on(t, (b, tt) => sound.glass(b, tt, [523.25, 587.33, 659.25][i], 0.06, 0.2)));
  on(36.6, (b, t) => sound.glass(b, t, 392, 0.05, 0.2, 1.8));
  on(37.8, (b, t) => {
    sound.click(b, t, 0.16);
    sound.stab(b, t, [523.25, 659.25, 783.99, 1046.5], 0.08);
    sound.shimmer(b, t + 0.04, undefined, 0.055);
    sound.whoosh(b, t, 0.9, 500, 6000, 0.14, -0.4, 0.4);
  });

  // ── Act 4 ──
  for (let k = 0; k < 5; k++) on(42.15 + k * 0.335, (b, t) => { sound.sub(b, t, 110, 45, 0.42, 0.6); sound.click(b, t, 0.1); sound.glass(b, t, PENTA[k], 0.04, 0, 0.9); });
  on(43.9, (b, t) => sound.whoosh(b, t, 0.8, 300, 4200, 0.18, -0.3, 0.3));
  on(44.7, (b, t) => sound.shimmer(b, t, [659.25, 783.99, 987.77, 1318.51], 0.05));
  [44.8, 45.1].forEach((t, i) => on(t, (b, tt) => sound.glass(b, tt, [880, 1046.5][i], 0.05, i ? 0.6 : -0.6)));

  // ── Act 5 ──
  on(51.95, (b, t) => sound.whoosh(b, t, 1.3, 400, 5000, 0.18, 0.7, -0.7));
  F.ROAD_X.forEach((x, i) => on(52.25 + i * 0.3, (b, t) => sound.glass(b, t, PENTA[5 + i * 2], 0.07, panX(x))));
  on(54.3, (b, t) => sound.glass(b, t, 440, 0.05));
  on(55.1, (b, t) => sound.whoosh(b, t, 0.25, 4000, 800, 0.12, 0, 0));
  on(55.4, (b, t) => { sound.impact(b, t, 0.42); sound.stab(b, t, [440, 554.37, 659.25, 880], 0.07); sound.shimmer(b, t + 0.05, undefined, 0.045); });
  [56.5, 57.12, 57.75].forEach((t, i) => on(t, (b, tt) => sound.glass(b, tt, [659.25, 783.99, 880][i], 0.06)));

  // ── Finale ──
  on(58.8, (b, t) => sound.swell(b, t, 0.6, 0.16));
  on(59.4, (b, t) => { sound.drone(b, t, 4.6, 0.1); sound.whoosh(b, t, 1.0, 3000, 300, 0.2, 0.4, -0.2); });
  on(60.5, (b, t) => sound.glass(b, t, 220, 0.08, 0, 1.2));
  on(60.7, (b, t) => sound.glitch(b, t, 0.6, 0.24));
  on(61.3, (b, t) => sound.riser(b, t, 2.45, 0.27));
  on(61.4, (b, t) => { sound.whoosh(b, t, 0.9, 200, 5000, 0.24, -0.6, 0.6); sound.sub(b, t, 80, 40, 0.4, 1); });
  on(63.75, (b, t) => {
    sound.impact(b, t, 0.92);
    sound.stab(b, t, [440, 523.25, 659.25, 987.77], 0.08);
    sound.shimmer(b, t + 0.08, [880, 1046.5, 1318.51, 1760, 1975.53], 0.06);
    sound.pad(b, t, [220, 261.63, 329.63, 493.88], 4.2, 0.05, 2000);
  });
  return ev;
}

