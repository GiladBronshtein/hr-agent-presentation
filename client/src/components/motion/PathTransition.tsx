/**
 * PathTransition - the slide-to-slide motion of the deck, in the
 * learning-path language: a single line draws in from the reading side, an
 * amber pen tip leading. Where the stroke reaches its node, a navy shape
 * with an amber drawn edge spreads out and covers the slide. Under it the
 * slides swap, and the next slide opens out of the same node while the line
 * draws on through the far edge and its tail erases.
 *
 * Pure SVG + GSAP (DrawSVG, MotionPath). Nothing is drawn between slides.
 */
import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { INK, route, coverRadius, type Pt } from './path';

export interface PathHandle {
  /** Start a transition. Returns ms until the stage is fully covered (swap time). */
  cover: (dir: 1 | -1, seed: number) => number;
  /** Open the next slide out of the node (call after the swap). */
  reveal: () => void;
  /** Cancel everything and clear the overlay. */
  clear: () => void;
}

export const COVER_MS = 520;
const REVEAL_S = 0.62;

export const PathTransition = forwardRef<PathHandle>(function PathTransition(_, ref) {
  const maskId = `pt-${useId().replace(/[:]/g, '')}`;
  const svg = useRef<SVGSVGElement>(null);
  const a = useRef<SVGPathElement>(null);
  const b = useRef<SVGPathElement>(null);
  const tip = useRef<SVGCircleElement>(null);
  const blob = useRef<SVGCircleElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const curtain = useRef<SVGRectElement>(null);
  const hole = useRef<SVGCircleElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const state = useRef<{ node: Pt; R: number; covered: boolean }>({ node: [960, 540], R: 1200, covered: false });

  useImperativeHandle(ref, () => {
    const all = () => [a.current, b.current, tip.current, blob.current, ring.current, curtain.current, hole.current];
    const clear = () => {
      tl.current?.kill();
      tl.current = null;
      state.current.covered = false;
      if (svg.current) gsap.set(svg.current, { autoAlpha: 0 });
      gsap.set(all(), { clearProps: 'all' });
    };
    return {
      clear,
      cover: (dir, seed) => {
        const wasCovered = state.current.covered;
        tl.current?.kill();
        const { node, a: dA, b: dB } = route(seed, dir);
        const R = coverRadius(node);
        state.current = { node, R, covered: false };
        a.current!.setAttribute('d', dA);
        b.current!.setAttribute('d', dB);
        const [x, y] = node;
        gsap.set(svg.current, { autoAlpha: 1 });
        gsap.set([blob.current, ring.current, hole.current], { attr: { cx: x, cy: y } });
        gsap.set(b.current, { drawSVG: '0% 0%', autoAlpha: 1 });
        gsap.set(curtain.current, { autoAlpha: 0 });
        const t = gsap.timeline({ onComplete: () => { state.current.covered = true; } });
        tl.current = t;
        if (wasCovered) {
          // already covered (fast clicking): stay covered, swap right away
          gsap.set(curtain.current, { autoAlpha: 1 });
          gsap.set(hole.current, { attr: { r: 0 } });
          gsap.set([a.current, tip.current, blob.current, ring.current], { autoAlpha: 0 });
          state.current.covered = true;
          return 0;
        }
        gsap.set(a.current, { drawSVG: '0% 0%', autoAlpha: 1 });
        gsap.set(tip.current, { autoAlpha: 1, attr: { r: 7 } });
        gsap.set(blob.current, { attr: { r: 0 }, autoAlpha: 1 });
        gsap.set(ring.current, { attr: { r: 0 }, autoAlpha: 1 });
        t.to(a.current, { drawSVG: '0% 100%', duration: 0.34, ease: 'power2.inOut' }, 0)
          .to(tip.current, { motionPath: { path: a.current!, align: a.current!, alignOrigin: [0.5, 0.5] }, duration: 0.34, ease: 'power2.inOut' }, 0)
          .to([blob.current, ring.current], { attr: { r: R }, duration: 0.3, ease: 'power3.in' }, 0.22)
          .set(curtain.current, { autoAlpha: 1 }, COVER_MS / 1000)
          .set(hole.current, { attr: { r: 0 } }, COVER_MS / 1000)
          .set([blob.current, ring.current, a.current], { autoAlpha: 0 }, COVER_MS / 1000);
        return COVER_MS;
      },
      reveal: () => {
        const { R } = state.current;
        tl.current?.kill();
        state.current.covered = false;
        gsap.set(curtain.current, { autoAlpha: 1 });
        gsap.set([blob.current, a.current], { autoAlpha: 0 });
        gsap.set(ring.current, { autoAlpha: 1, attr: { r: 0 } });
        const t = gsap.timeline({ onComplete: clear });
        tl.current = t;
        t.to(hole.current, { attr: { r: R }, duration: REVEAL_S, ease: 'expo.out' }, 0)
          .to(ring.current, { attr: { r: R }, duration: REVEAL_S, ease: 'expo.out' }, 0)
          .to(ring.current, { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, REVEAL_S * 0.45)
          .to(b.current, { drawSVG: '0% 100%', duration: 0.5, ease: 'power2.out' }, 0)
          .to(tip.current, { motionPath: { path: b.current!, align: b.current!, alignOrigin: [0.5, 0.5] }, duration: 0.5, ease: 'power2.out' }, 0)
          .to(b.current, { drawSVG: '100% 100%', duration: 0.42, ease: 'power2.in' }, 0.32)
          .to(tip.current, { autoAlpha: 0, duration: 0.18 }, 0.5);
      },
    };
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden
      data-decorative
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 40, opacity: 0, visibility: 'hidden' }}
    >
      <defs>
        <mask id={maskId}>
          <rect width="1920" height="1080" fill="white" />
          <circle ref={hole} cx="960" cy="540" r="0" fill="black" />
        </mask>
      </defs>
      <rect ref={curtain} width="1920" height="1080" fill={INK.navy} mask={`url(#${maskId})`} />
      <circle ref={blob} cx="960" cy="540" r="0" fill={INK.navy} />
      <circle ref={ring} cx="960" cy="540" r="0" fill="none" stroke={INK.amber} strokeWidth="3" />
      <path ref={a} fill="none" stroke={INK.paper} strokeWidth="3.5" strokeLinecap="round" />
      <path ref={b} fill="none" stroke={INK.paper} strokeWidth="3.5" strokeLinecap="round" />
      <circle ref={tip} cx="0" cy="0" r="7" fill={INK.amber} />
    </svg>
  );
});
