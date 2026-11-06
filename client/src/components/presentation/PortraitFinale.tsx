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

// ── The audio cue (seconds from the start of the finale) ──
const BURST = 0.45;
const FORM = 2.3;
const LAND = 4.45;
const REVEAL = 5.0;
const CUE_SECONDS = 10;

function cue(): ScoreEvent[] {
  const ev: ScoreEvent[] = [];
  const at = (t: number, play: ScoreEvent['play']) => ev.push({ at: t, play });
  const A = { A2: 110, E3: 164.81, A3: 220, C4: 261.63, E4: 329.63, F3: 174.61, G3: 196, B4: 493.88, A4: 440, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51, A6: 1760 };
  // one point of light gathers energy...
  at(0, (b, t) => { sound.riser(b, t, BURST, 0.22); sound.sub(b, t, 40, 70, 0.25, BURST); });
  // ...and bursts into a galaxy
  at(BURST, (b, t) => {
    sound.impact(b, t, 0.9);
    sound.braam(b, t, 55, 0.3, 3.2);
    sound.stab(b, t, [A.A4, A.C5, A.E5, A.B4 * 2], 0.08);
    sound.shimmer(b, t + 0.06, [A.A5, A.C6, A.E6, A.A6], 0.06);
    sound.whoosh(b, t, 1.2, 300, 6000, 0.22, -0.8, 0.8);
    sound.strings(b, t, [A.A3, A.C4, A.E4, A.B4], FORM - BURST + 0.3, 0.06, 0.4, 2400);
  });
  // the deck's melody, once more, as a run of light around the galaxy
  const MELODY = [A.A4, A.A4, A.C5, A.E5, A.D5, A.E5, A.C5, A.E5, A.G5, A.A5, A.G5, A.E5, A.D5, A.E5, A.C5, A.D5, A.E5, A.G5, A.E5, A.D5, A.C5, A.D5, A.E5, A.G5, A.E5, A.D5, A.C5, A.A4];
  MELODY.forEach((f, k) => at(BURST + 0.25 + k * 0.058, (b, t) => sound.felt(b, t, f, 0.05, 1.4, Math.sin(k * 0.7) * 0.8)));
  // the face forms on the heartbeat that opened the talk
  at(FORM, (b, t) => {
    sound.strings(b, t, [A.F3, A.A3, A.C4, A.E4], LAND - FORM + 0.2, 0.07, LAND - FORM - 0.3, 3000);
    sound.riser(b, t + 0.3, LAND - FORM - 0.3, 0.16);
  });
  [FORM, FORM + 0.75, FORM + 1.35, FORM + 1.8, FORM + 2.1].forEach((t, k) => at(t, (b, tt) => sound.heartbeat(b, tt, 0.42 + k * 0.06)));
  // the final chord
  at(LAND, (b, t) => {
    sound.braam(b, t, 55, 0.34, 4.2);
    sound.sub(b, t, 62, 30, 0.55, 3.4);
    [55, A.A2, A.E3, A.A3, A.E4, A.B4, A.C5, A.E5, A.A5].forEach((f, k) => sound.felt(b, t + k * 0.012, f, k < 2 ? 0.13 : 0.085, 6, (k / 8 - 0.5) * 0.9));
    sound.strings(b, t, [A.A3, A.C4, A.E4, A.B4, A.E5], 4.6, 0.065, 0.25, 3000);
    sound.shimmer(b, t + 0.08, [A.A5, A.C6, A.E6, A.A6], 0.05);
  });
  at(REVEAL + 0.3, (b, t) => { sound.felt(b, t, A.E5, 0.06, 3); sound.felt(b, t + 0.42, A.A5, 0.07, 4); });
  return ev;
}

let cueReady: Promise<AudioBuffer | null> | null = null;
/** Render the finale's sound ahead of time (idempotent, off the critical path). */
export function prepareFinale(): Promise<AudioBuffer | null> {
  if (typeof OfflineAudioContext === 'undefined') return Promise.resolve(null);
  cueReady ??= sound.renderScore(cue(), CUE_SECONDS).catch(() => null);
  return cueReady;
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
      tl.to(U, { pulse: 1.6, duration: BURST, ease: 'power2.in' }, 0)
        .fromTo(U, { shake: 0 }, { shake: 0.006, duration: BURST, ease: 'power2.in', immediateRender: false }, 0)
        // burst into a galaxy
        .call(() => api.current?.morphTo(sphere, 0.45), [], BURST)
        .fromTo(U, { morph: 0 }, { morph: 1, duration: 1.1, ease: 'expo.out', immediateRender: false }, BURST)
        .set(U, { pulse: 0, shake: 0 }, BURST)
        .fromTo(U, { aberration: 0.014 }, { aberration: 0, duration: 0.9, ease: 'expo.out', immediateRender: false }, BURST)
        .fromTo(U, { warp: 0.9 }, { warp: 0, duration: 1.0, ease: 'power2.out', immediateRender: false }, BURST)
        .fromTo(U, { bloom: 3.2 }, { bloom: 1.5, duration: 1.4, ease: 'power2.out', immediateRender: false }, BURST)
        .fromTo(q('.pf-ring'), { scale: 0.05, autoAlpha: 0.95 }, { scale: 2.6, autoAlpha: 0, duration: 1.2, ease: 'expo.out', stagger: 0.09, immediateRender: false }, BURST)
        .fromTo(q('.pf-flash'), { autoAlpha: 0.85 }, { autoAlpha: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, BURST)
        // two full turns that come to rest facing the audience, as the face forms
        .fromTo(U, { spin: 0 }, { spin: Math.PI * 4, duration: LAND - BURST, ease: 'power2.inOut', immediateRender: false }, BURST)
        .fromTo(U, { t: 0 }, { t: 12, duration: 12, ease: 'none', immediateRender: false }, 0)
        .call(() => { if (portrait) api.current?.morphTo(portrait, 0.55); }, [], FORM)
        .fromTo(U, { morph: 0 }, { morph: 1, duration: LAND - FORM, ease: 'power2.inOut', immediateRender: false }, FORM)
        .to(U, { camZ: F.CAM_Z, duration: LAND - BURST, ease: 'power2.inOut' }, BURST)
        // landing: a breath of light
        .fromTo(U, { bloom: 2.2 }, { bloom: 1.1, duration: 1.2, ease: 'power2.out', immediateRender: false }, LAND)
        .to(U, { pulse: 0.5, duration: 0.14, yoyo: true, repeat: 1, ease: 'power2.out' }, LAND)
        .fromTo(q('.pf-ring2'), { scale: 0.2, autoAlpha: 0.7 }, { scale: 2.2, autoAlpha: 0, duration: 1.4, ease: 'expo.out', immediateRender: false }, LAND)
        // the slide appears around the face, and the particles become the photo
        .call(() => onReveal(), [], REVEAL)
        .to(el, { autoAlpha: 0, duration: 1.5, ease: 'power2.inOut' }, REVEAL + 0.25)
        .call(() => finish(), [], REVEAL + 1.8);

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
        if (audio) playback = sound.playBuffer(audio, 0);
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
