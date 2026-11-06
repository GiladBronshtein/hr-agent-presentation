/**
 * PathTransition - the slide-to-slide motion of the deck: a line of light in
 * the arriving chapter's color draws in from the reading side, a small sun
 * leading it. Where it reaches its node it bursts: colored light floods out
 * from the node with a glowing ring and a spray of sparks, and covers the
 * slide. Under it the slides swap, and the next slide opens out of the same
 * node through a glowing ring while the line flies on through the far edge.
 *
 * Pure SVG + GSAP (DrawSVG, MotionPath). Nothing is drawn between slides.
 */
import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { gsap } from 'gsap';
import { route, coverRadius, type Pt } from './path';
import { CHAPTERS } from '../../data/scenes';
import { PALETTE, CHAPTER_COLORS } from '../../lib/palette';

export interface PathHandle {
  /** Start a transition. Returns ms until the stage is fully covered (swap time). */
  cover: (dir: 1 | -1, seed: number) => number;
  /** Open the next slide out of the node (call after the swap). */
  reveal: () => void;
  /** Cancel everything and clear the overlay. */
  clear: () => void;
}

export const COVER_MS = 520;
const REVEAL_S = 0.66;
const SPARKS = 14;

/** The color of the chapter a slide belongs to. */
function colorFor(index: number) {
  const i = CHAPTERS.findIndex((c) => index >= c.sceneRange[0] && index <= c.sceneRange[1]);
  return CHAPTER_COLORS[Math.max(0, i)] ?? PALETTE.violet;
}

export const PathTransition = forwardRef<PathHandle>(function PathTransition(_, ref) {
  const uid = useId().replace(/[:]/g, '');
  const maskId = `pt-mask-${uid}`;
  const gradId = `pt-glow-${uid}`;
  const svg = useRef<SVGSVGElement>(null);
  const lineA = useRef<SVGGElement>(null);
  const lineB = useRef<SVGGElement>(null);
  const tip = useRef<SVGGElement>(null);
  const blob = useRef<SVGCircleElement>(null);
  const rings = useRef<SVGGElement>(null);
  const sparks = useRef<SVGGElement>(null);
  const curtain = useRef<SVGRectElement>(null);
  const hole = useRef<SVGCircleElement>(null);
  const stop = useRef<SVGStopElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const state = useRef<{ node: Pt; R: number; covered: boolean }>({ node: [960, 540], R: 1200, covered: false });

  useImperativeHandle(ref, () => {
    const paths = (g: SVGGElement | null) => (g ? Array.from(g.querySelectorAll('path')) : []);
    const ringEls = () => (rings.current ? Array.from(rings.current.querySelectorAll('circle')) : []);
    const sparkEls = () => (sparks.current ? Array.from(sparks.current.querySelectorAll('circle')) : []);
    const all = () => [...paths(lineA.current), ...paths(lineB.current), tip.current, blob.current, ...ringEls(), ...sparkEls(), curtain.current, hole.current];
    const paint = (color: string) => {
      [...paths(lineA.current), ...paths(lineB.current), ...ringEls()].forEach((p) => p.setAttribute('stroke', (p as SVGElement).dataset.core ? '#FFFFFF' : color));
      tip.current?.querySelectorAll<SVGCircleElement>('[data-tint]').forEach((c) => c.setAttribute('fill', color));
      sparkEls().forEach((c, i) => c.setAttribute('fill', i % 3 ? color : '#FFFFFF'));
      stop.current?.setAttribute('stop-color', color);
    };
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
        paths(lineA.current).forEach((p) => p.setAttribute('d', dA));
        paths(lineB.current).forEach((p) => p.setAttribute('d', dB));
        paint(colorFor(seed));
        const [x, y] = node;
        gsap.set(svg.current, { autoAlpha: 1 });
        gsap.set([blob.current, hole.current, ...ringEls()], { attr: { cx: x, cy: y } });
        gsap.set(paths(lineB.current), { drawSVG: '0% 0%', autoAlpha: 1 });
        gsap.set(curtain.current, { autoAlpha: 0 });
        gsap.set(sparkEls(), { attr: { cx: x, cy: y, r: 0 }, autoAlpha: 0 });
        const t = gsap.timeline({ onComplete: () => { state.current.covered = true; } });
        tl.current = t;
        if (wasCovered) {
          // already covered (fast clicking): stay covered, swap right away
          gsap.set(curtain.current, { autoAlpha: 1 });
          gsap.set(hole.current, { attr: { r: 0 } });
          gsap.set([...paths(lineA.current), tip.current, blob.current, ...ringEls()], { autoAlpha: 0 });
          state.current.covered = true;
          return 0;
        }
        gsap.set(paths(lineA.current), { drawSVG: '0% 0%', autoAlpha: 1 });
        gsap.set(tip.current, { autoAlpha: 1 });
        gsap.set(blob.current, { attr: { r: 0 }, autoAlpha: 1 });
        gsap.set(ringEls(), { attr: { r: 0 }, autoAlpha: 1 });
        const pa = lineA.current!.querySelector('path')!;
        t.to(paths(lineA.current), { drawSVG: '0% 100%', duration: 0.34, ease: 'power2.inOut' }, 0)
          .to(tip.current, { motionPath: { path: pa, align: pa, alignOrigin: [0.5, 0.5] }, duration: 0.34, ease: 'power2.inOut' }, 0)
          // the burst: light floods out of the node, sparks fly
          .to([blob.current, ...ringEls()], { attr: { r: R }, duration: 0.3, ease: 'power3.in' }, 0.22)
          .to(sparkEls(), {
            attr: {
              cx: (i: number) => x + Math.cos((i / SPARKS) * Math.PI * 2 + 0.3) * (140 + (i % 4) * 55),
              cy: (i: number) => y + Math.sin((i / SPARKS) * Math.PI * 2 + 0.3) * (140 + (i % 4) * 55),
              r: (i: number) => 2.5 + (i % 3) * 1.5,
            },
            autoAlpha: 1, duration: 0.26, ease: 'expo.out',
          }, 0.3)
          .to(sparkEls(), { autoAlpha: 0, duration: 0.18 }, 0.42)
          .set(curtain.current, { autoAlpha: 1 }, COVER_MS / 1000)
          .set(hole.current, { attr: { r: 0 } }, COVER_MS / 1000)
          .set([blob.current, ...ringEls(), ...paths(lineA.current)], { autoAlpha: 0 }, COVER_MS / 1000);
        return COVER_MS;
      },
      reveal: () => {
        const { R } = state.current;
        tl.current?.kill();
        state.current.covered = false;
        gsap.set(curtain.current, { autoAlpha: 1 });
        gsap.set([blob.current, ...paths(lineA.current)], { autoAlpha: 0 });
        gsap.set(ringEls(), { autoAlpha: 1, attr: { r: 0 } });
        const t = gsap.timeline({ onComplete: clear });
        tl.current = t;
        const pb = lineB.current!.querySelector('path')!;
        t.to(hole.current, { attr: { r: R }, duration: REVEAL_S, ease: 'expo.out' }, 0)
          .to(ringEls(), { attr: { r: R }, duration: REVEAL_S, ease: 'expo.out' }, 0)
          .to(ringEls(), { autoAlpha: 0, duration: 0.34, ease: 'power1.in' }, REVEAL_S * 0.42)
          .to(paths(lineB.current), { drawSVG: '0% 100%', duration: 0.5, ease: 'power2.out' }, 0)
          .to(tip.current, { motionPath: { path: pb, align: pb, alignOrigin: [0.5, 0.5] }, duration: 0.5, ease: 'power2.out' }, 0)
          .to(paths(lineB.current), { drawSVG: '100% 100%', duration: 0.42, ease: 'power2.in' }, 0.32)
          .to(tip.current, { autoAlpha: 0, duration: 0.18 }, 0.5);
      },
    };
  }, []);

  /** A line of light: soft halo, colored body, white-hot core. */
  const light = (r: React.Ref<SVGGElement>) => (
    <g ref={r}>
      <path fill="none" strokeWidth={22} strokeOpacity={0.14} strokeLinecap="round" />
      <path fill="none" strokeWidth={8} strokeOpacity={0.45} strokeLinecap="round" />
      <path data-core="1" fill="none" strokeWidth={2.6} strokeLinecap="round" />
    </g>
  );

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
        <radialGradient id={gradId}>
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop ref={stop} offset="0.18" stopColor={PALETTE.violet} stopOpacity="0.9" />
          <stop offset="0.62" stopColor={PALETTE.bg1} />
          <stop offset="1" stopColor={PALETTE.bg0} />
        </radialGradient>
      </defs>
      <rect ref={curtain} width="1920" height="1080" fill={PALETTE.bg0} mask={`url(#${maskId})`} />
      <circle ref={blob} cx="960" cy="540" r="0" fill={`url(#${gradId})`} />
      <g ref={rings}>
        <circle cx="960" cy="540" r="0" fill="none" strokeWidth={18} strokeOpacity={0.22} />
        <circle data-core="1" cx="960" cy="540" r="0" fill="none" strokeWidth={3} />
      </g>
      <g ref={sparks}>
        {Array.from({ length: SPARKS }, (_, i) => <circle key={i} cx="960" cy="540" r="0" />)}
      </g>
      {light(lineA)}
      {light(lineB)}
      <g ref={tip}>
        <circle data-tint="1" cx="0" cy="0" r="24" opacity="0.18" />
        <circle data-tint="1" cx="0" cy="0" r="10" opacity="0.6" />
        <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      </g>
    </svg>
  );
});
