/**
 * PortraitFinale - the last moment of the talk, on the closing slide.
 * The trailer's particle universe returns as one point of light, bursts
 * into a spinning galaxy in every color of the talk, and assembles into
 * the speaker's face: each particle takes the position and color of a pixel
 * of the photo, exactly where the photo sits on the slide. The heartbeat
 * that opened the trailer comes back as the face forms, the deck's melody
 * runs once more, and on the final chord the particles dissolve into the
 * real photo and the slide appears around it.
 *
 * Mounted by S50 only when arriving forward (not with reduced motion).
 * Its audio cue is rendered offline ahead of time (prepareFinale).
 */
import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { sound, type ScoreEvent, type BufferPlayback } from '../../lib/sound';
import { Universe, createUniverseCtl, type UniverseApi } from './trailer/Universe';
import * as F from './trailer/formations';
import { PALETTE } from '../../lib/palette';
import { LITE, loadAudio } from '../../lib/device';

// ── Timing (seconds from the start of the finale): unhurried, a long breath ──
const BURST = 1.2;
const FORM = 3.8;
const LAND = 6.6;
const REVEAL = 7.2;
const CUE_SECONDS = 22;

/**
 * The closing music: slow and warm, like the last page of a book. A soft
 * string swell, the deck's melody once more at a walking pace, the opening
 * heartbeat (slow and steady) as the face forms, a wide felt-piano chord on
 * the landing, and a quiet outro that rings under the thank-you.
 */
function cue(): ScoreEvent[] {
  const ev: ScoreEvent[] = [];
  const at = (t: number, play: ScoreEvent['play']) => ev.push({ at: t, play });
  const A = { A1: 55, A2: 110, C3: 130.81, E3: 164.81, F2: 87.31, F3: 174.61, G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880 };
  // a slow breath of strings while the light gathers
  at(0, (b, t) => {
    sound.strings(b, t, [A.A2, A.E3, A.A3, A.C4], FORM + 0.4, 0.05, 1.6, 1400);
    sound.swell(b, t + BURST - 0.9, 0.9, 0.04);
  });
  // the galaxy opens: a soft chord, rolled slowly
  at(BURST, (b, t) => {
    [A.A3, A.E4, A.B4, A.C5, A.E5].forEach((f, k) => sound.felt(b, t + k * 0.11, f, 0.06, 4.5, (k / 4 - 0.5) * 0.7));
    sound.felt(b, t, A.A2, 0.07, 5);
    sound.shimmer(b, t + 0.5, [A.A5, A.E5 * 2], 0.018);
  });
  // the deck's melody, once more, at a walking pace
  [A.A4, A.C5, A.E5, A.D5, A.C5, A.E5, A.G5].forEach((f, k) => at(BURST + 0.7 + k * 0.36, (b, t) => sound.felt(b, t, f, 0.055, 2.6, Math.sin(k * 0.8) * 0.4)));
  // the face forms on the heartbeat that opened the talk, slow and steady
  at(FORM, (b, t) => {
    sound.strings(b, t, [A.F2, A.F3, A.A3, A.C4, A.E4], LAND - FORM + 0.6, 0.055, 1.4, 1700);
    sound.sub(b, t, A.F2 / 2, A.F2 / 2 * 0.99, 0.16, LAND - FORM);
  });
  [0, 0.95, 1.9].forEach((d, k) => at(FORM + 0.2 + d, (b, t) => sound.heartbeat(b, t, 0.26 + k * 0.03)));
  [A.E5, A.D5, A.C5, A.B4].forEach((f, k) => at(FORM + 0.5 + k * 0.6, (b, t) => sound.felt(b, t, f, 0.045, 2.4, 0.2)));
  // the landing: one wide, warm chord that rings
  at(LAND, (b, t) => {
    [A.A1, A.A2, A.E3, A.A3, A.C4, A.E4, A.B4, A.E5].forEach((f, k) => sound.felt(b, t + k * 0.05, f, k < 2 ? 0.09 : 0.06, 8, (k / 7 - 0.5) * 0.8));
    sound.strings(b, t, [A.A2, A.E3, A.A3, A.C4, A.E4, A.B4], 7, 0.05, 1.2, 1900);
    sound.sub(b, t, A.A1, A.A1 * 0.985, 0.2, 5);
  });
  // a quiet outro under the thank-you
  at(REVEAL + 0.6, (b, t) => { sound.felt(b, t, A.E5, 0.045, 4); sound.felt(b, t + 0.7, A.A5, 0.04, 5); });
  at(REVEAL + 4, (b, t) => {
    sound.strings(b, t, [A.F3, A.A3, A.C4, A.E4], 4.5, 0.03, 2, 1300);
    [A.C5, A.E5].forEach((f, k) => sound.felt(b, t + 0.3 + k * 0.8, f, 0.035, 4));
  });
  at(REVEAL + 8.5, (b, t) => {
    sound.strings(b, t, [A.A2, A.E3, A.A3, A.C4], 5, 0.026, 2, 1200);
    sound.felt(b, t + 0.4, A.A4, 0.035, 6);
  });
  return ev;
}

let cueReady: Promise<AudioBuffer | null> | null = null;
/** The playing cue (its outro rings on after the finale unmounts). */
let active: BufferPlayback | null = null;
/** Fade the closing music out, e.g. when leaving the closing slide. */
export function stopFinaleSound(fade = 0.8) {
  active?.stop(fade);
  active = null;
}
/**
 * The finale's sound, ahead of time (idempotent). It ships pre-rendered
 * (client/public/audio/finale-score.flac and .m4a, rendered by this same
 * cue); a live render is the desktop-only fallback. `?render-score` forces it.
 */
export function prepareFinale(): Promise<AudioBuffer | null> {
  if (typeof OfflineAudioContext === 'undefined') return Promise.resolve(null);
  cueReady ??= (async () => {
    if (!location.search.includes('render-score')) {
      const b = await loadAudio(`${import.meta.env.BASE_URL}audio/finale-score`);
      if (b) return b;
    }
    if (LITE) return null;
    return sound.renderScore(cue(), CUE_SECONDS).catch(() => null);
  })();
  return cueReady;
}

/** Dev helper: the cue as a 16-bit WAV (for client/public/audio/finale-score.*). */
export async function renderFinaleWav(): Promise<string> {
  const buf = await sound.renderScore(cue(), CUE_SECONDS);
  const L = buf.getChannelData(0);
  const R = buf.getChannelData(1);
  const data = new DataView(new ArrayBuffer(44 + buf.length * 4));
  const str = (o: number, t: string) => { for (let i = 0; i < t.length; i++) data.setUint8(o + i, t.charCodeAt(i)); };
  str(0, 'RIFF'); data.setUint32(4, 36 + buf.length * 4, true); str(8, 'WAVE'); str(12, 'fmt ');
  data.setUint32(16, 16, true); data.setUint16(20, 1, true); data.setUint16(22, 2, true);
  data.setUint32(24, buf.sampleRate, true); data.setUint32(28, buf.sampleRate * 4, true);
  data.setUint16(32, 4, true); data.setUint16(34, 16, true); str(36, 'data'); data.setUint32(40, buf.length * 4, true);
  for (let i = 0; i < buf.length; i++) {
    data.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true);
    data.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true);
  }
  const bytes = new Uint8Array(data.buffer);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 0x8000)));
  return btoa(bin);
}

/** Sample the photo as it is drawn on the slide (size, soft-edge mask). */
function samplePhoto(img: HTMLImageElement, w: number, h: number): F.PortraitPixels | null {
  const cw = Math.max(1, Math.round(w * 0.5));
  const ch = Math.max(1, Math.round(h * 0.5));
  const cv = document.createElement('canvas');
  cv.width = cw;
  cv.height = ch;
  const g = cv.getContext('2d', { willReadFrequently: true });
  if (!g) return null;
  try {
    g.drawImage(img, 0, 0, cw, ch);
    const id = g.getImageData(0, 0, cw, ch);
    // the slide's mask: 14% fade at the sides, 10% at top and bottom
    const edge = (u: number, m: number) => Math.max(0, Math.min(1, u / m, (1 - u) / m));
    for (let y = 0; y < ch; y++) {
      const ey = edge(y / ch, 0.1);
      for (let x = 0; x < cw; x++) {
        const i = (y * cw + x) * 4 + 3;
        id.data[i] = id.data[i] * Math.min(ey, edge(x / cw, 0.14));
      }
    }
    // the backdrop: the average color near the two top corners, inside the mask
    const avg = (fx: number, fy: number) => {
      const d = g.getImageData(Math.round(cw * fx) - 4, Math.round(ch * fy) - 4, 9, 9).data;
      const c = [0, 0, 0];
      for (let i = 0; i < d.length; i += 4) { c[0] += d[i]; c[1] += d[i + 1]; c[2] += d[i + 2]; }
      return c.map((v) => v / (81 * 255));
    };
    const [a, b] = [avg(0.17, 0.12), avg(0.83, 0.12)];
    const bg: [number, number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
    return { data: id.data, width: cw, height: ch, bg };
  } catch {
    return null;
  }
}

export const PortraitFinale = memo(function PortraitFinale({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const U = useMemo(() => createUniverseCtl(), []);
  const initial = useMemo(() => F.fCore(), []);
  const startRef = useRef<() => void>(() => {});
  const api = useMemo(() => {
    let cur: UniverseApi | null = null;
    return {
      get current() { return cur; },
      set current(v: UniverseApi | null) { cur = v; if (v) startRef.current(); },
    } as React.MutableRefObject<UniverseApi | null>;
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let playback: BufferPlayback | null = null;
    let done = false;
    let canvasReady = !!api.current;
    let portrait: F.Formation | null = null;
    let audio: AudioBuffer | null | undefined;
    const sphere = F.fSphere();
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      const tl = gsap.timeline({ paused: true });
      U.camZ = F.CAM_Z + 1.4;
      U.bloom = 2.4;
      // charge
      tl.to(U, { pulse: 0.9, duration: BURST, ease: 'sine.inOut' }, 0)
        // burst into a galaxy
        .call(() => api.current?.morphTo(sphere, 0.45), [], BURST)
        .fromTo(U, { morph: 0 }, { morph: 1, duration: 2.0, ease: 'power2.out', immediateRender: false }, BURST)
        .to(U, { pulse: 0, duration: 1.0, ease: 'sine.out' }, BURST)
        .fromTo(U, { bloom: 2.6 }, { bloom: 1.5, duration: 2.4, ease: 'sine.inOut', immediateRender: false }, BURST)
        .fromTo(q('.pf-ring'), { scale: 0.1, autoAlpha: 0.7 }, { scale: 2.4, autoAlpha: 0, duration: 2.4, ease: 'power2.out', stagger: 0.25, immediateRender: false }, BURST)
        .fromTo(q('.pf-flash'), { autoAlpha: 0.45 }, { autoAlpha: 0, duration: 1.6, ease: 'sine.out', immediateRender: false }, BURST)
        // one slow turn that comes to rest facing the audience, as the face forms
        .fromTo(U, { spin: 0 }, { spin: Math.PI * 2, duration: LAND - BURST, ease: 'sine.inOut', immediateRender: false }, BURST)
        .fromTo(U, { t: 0 }, { t: 12, duration: 12, ease: 'none', immediateRender: false }, 0)
        .call(() => { if (portrait) api.current?.morphTo(portrait, 0.55); }, [], FORM)
        .fromTo(U, { morph: 0 }, { morph: 1, duration: LAND - FORM, ease: 'power2.inOut', immediateRender: false }, FORM)
        .to(U, { camZ: F.CAM_Z, duration: LAND - BURST, ease: 'power2.inOut' }, BURST)
        // landing: a breath of light
        .fromTo(U, { bloom: 1.9 }, { bloom: 1.1, duration: 2.0, ease: 'sine.inOut', immediateRender: false }, LAND)
        .to(U, { pulse: 0.3, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, LAND)
        .fromTo(q('.pf-ring2'), { scale: 0.3, autoAlpha: 0.5 }, { scale: 2.0, autoAlpha: 0, duration: 2.4, ease: 'power2.out', immediateRender: false }, LAND)
        // the slide appears around the face, and the particles become the photo
        .call(() => onReveal(), [], REVEAL)
        .to(el, { autoAlpha: 0, duration: 2.0, ease: 'sine.inOut' }, REVEAL + 0.25)
        .call(() => finish(), [], REVEAL + 2.3);

      const finish = () => {
        if (done) return;
        done = true;
        gsap.ticker.remove(tick);
        gsap.set(el, { autoAlpha: 0, pointerEvents: 'none' });
        onDone();
      };
      let t0 = 0;
      let started = false;
      const tick = () => { if (started && !done) tl.time(Math.min(playback ? playback.time() : (performance.now() - t0) / 1000, tl.duration())); };
      const begin = () => {
        if (started || done || !canvasReady || !portrait || audio === undefined) return;
        started = true;
        t0 = performance.now();
        if (audio) { playback = sound.playBuffer(audio, 0); active = playback; }
        gsap.ticker.add(tick);
      };
      startRef.current = () => { canvasReady = true; begin(); };

      // the photo, measured where it sits on the slide
      const build = async () => {
        const holder = el.parentElement?.querySelector<HTMLElement>('[data-portrait]');
        const img = holder?.querySelector('img');
        const rr = el.getBoundingClientRect();
        if (img && rr.width) {
          if (!img.complete) await new Promise((r) => { img.onload = r; img.onerror = r; });
          const r = img.getBoundingClientRect();
          const px = samplePhoto(img, r.width, r.height);
          if (px) portrait = F.fPortrait({ x: ((r.left - rr.left) / rr.width) * 100, y: ((r.top - rr.top) / rr.height) * 100, w: (r.width / rr.width) * 100, h: (r.height / rr.height) * 100 }, px);
        }
        portrait ??= F.fSphere();
        begin();
      };
      void build();
      prepareFinale().then((b) => { audio = b; begin(); });
      // never wait on the audio for long
      window.setTimeout(() => { if (audio === undefined) { audio = null; begin(); } }, 1500);
      // no WebGL: skip straight to the slide
      window.setTimeout(() => { if (!canvasReady) { onReveal(); finish(); } }, 3000);
      const skip = (e: KeyboardEvent) => { if (e.key === 'Enter') { playback?.stop(0.4); onReveal(); finish(); } };
      window.addEventListener('keydown', skip);
      return () => window.removeEventListener('keydown', skip);
    }, el);
    return () => {
      if (!done) playback?.stop(0.5);
      ctx.revert();
    };
    // mount-once sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ring: React.CSSProperties = { position: 'absolute', left: '50%', top: '50%', width: '60cqh', height: '60cqh', margin: '-30cqh 0 0 -30cqh', borderRadius: '50%', opacity: 0, pointerEvents: 'none' };
  return (
    <div ref={root} aria-hidden data-decorative style={{ position: 'absolute', inset: 0, zIndex: 70, background: PALETTE.bg0 }}>
      <Universe U={U} initial={initial} apiRef={api} />
      <div className="pf-flash" style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none', background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, ${PALETTE.violet}66 26%, transparent 62%)` }} />
      {[PALETTE.violet, PALETTE.magenta, PALETTE.teal].map((c) => (
        <div key={c} className="pf-ring" style={{ ...ring, border: `3px solid ${c}`, boxShadow: `0 0 36px ${c}99, inset 0 0 36px ${c}55` }} />
      ))}
      <div className="pf-ring2" style={{ ...ring, border: `2px solid ${PALETTE.amber}`, boxShadow: `0 0 40px ${PALETTE.amber}88` }} />
    </div>
  );
});
