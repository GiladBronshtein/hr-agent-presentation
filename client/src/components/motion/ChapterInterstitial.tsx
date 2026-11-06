/**
 * ChapterInterstitial - the chapter card. A page of the chapter's colored
 * light floods in from the reading edge, a line of light writes the chapter
 * number in one stroke (a small sun leading it), rays burst out of the
 * number as it completes, the glowing chapter word is revealed behind the
 * pen, and the page then opens out of the number through a ring of light
 * onto the chapter's first slide. Purely visual: pointer-events none,
 * aria-hidden. Lifetime (skip on key or navigation) is owned by
 * SceneRenderer, which swaps the slide underneath while the page is closed.
 */
import { useId, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CHAPTERS } from '../../data/scenes';
import { writeNumber, coverRadius, spline, pathFrom, type Pt } from './path';
import { PALETTE, CHAPTER_COLORS, alpha } from '../../lib/palette';
import { mark } from '../../lib/diag';

export const CHAPTER_CARD_MS = 1950;

// Short descriptions, matching the chapter cards of the title trailer
// (trailer/score.ts CH). Keep in sync.
const DESCS: Record<string, string> = {
  'להבין': 'מה הם אייג׳נטים ואיך הם עובדים',
  'לראות': 'דוגמאות מהלמידה ודמו חי',
  'לבנות': 'כלים, אמון וגבולות',
  'להטמיע': 'פיילוט ב-90 יום',
  'נספח': 'חומרי עומק להמשך',
};

const NUM_C: Pt = [960, 330];
const RAYS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 + 0.2;
  const [r0, r1] = [150 + (i % 2) * 20, 330 + (i % 4) * 70];
  return `M ${(NUM_C[0] + Math.cos(a) * r0).toFixed(1)} ${(NUM_C[1] + Math.sin(a) * r0 * 0.8).toFixed(1)} L ${(NUM_C[0] + Math.cos(a) * r1).toFixed(1)} ${(NUM_C[1] + Math.sin(a) * r1 * 0.8).toFixed(1)}`;
});

export function ChapterInterstitial({ chapterIndex, onDone }: { chapterIndex: number; onDone: () => void }) {
  const chapter = CHAPTERS[chapterIndex];
  const uid = useId().replace(/[:]/g, '');
  const maskId = `ci-mask-${uid}`;
  const pageId = `ci-page-${uid}`;
  const auraId = `ci-aura-${uid}`;
  const root = useRef<HTMLDivElement>(null);
  const color = CHAPTER_COLORS[chapterIndex] ?? PALETTE.violet;
  const isAppendix = chapterIndex >= 4;
  const number = String(chapterIndex + 1).padStart(2, '0');
  // the appendix gets a single flourish instead of a number
  const strokeD = isAppendix
    ? pathFrom([2010, 300], spline([[2010, 300], [1300, 220], [1040, 360], [900, 300], [980, 240], [1060, 320], [700, 420], [-90, 360]]))
    : writeNumber(number, NUM_C[0], NUM_C[1], 1.05);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    mark(`chapter card ${chapterIndex}`);
    const q = gsap.utils.selector(el);
    const entry: Pt = [1920, 300];
    const R0 = coverRadius(entry);
    const R1 = coverRadius(NUM_C);
    const ctx = gsap.context(() => {
      const strokes = q('.ci-stroke path');
      const lead = el.querySelector('.ci-stroke path:last-child') as SVGPathElement;
      const rays = q('.ci-ray');
      const tl = gsap.timeline({ onComplete: onDone });
      gsap.set(q('.ci-page, .ci-edge'), { attr: { cx: entry[0], cy: entry[1], r: 0 } });
      gsap.set(q('.ci-hole, .ci-ring'), { attr: { cx: NUM_C[0], cy: NUM_C[1], r: 0 } });
      gsap.set(strokes, { drawSVG: '0% 0%' });
      gsap.set(rays, { drawSVG: '0% 0%' });
      gsap.set(q('.ci-word'), { clipPath: 'inset(-20% 0% -20% 100%)' });
      gsap.set(q('.ci-desc'), { autoAlpha: 0, y: 14 });
      // a page of colored light floods in from the reading edge
      tl.to(q('.ci-page, .ci-edge'), { attr: { r: R0 }, duration: 0.5, ease: 'power3.in' }, 0)
        .to(q('.ci-edge'), { autoAlpha: 0, duration: 0.2 }, 0.45)
        .set(q('.ci-curtain'), { autoAlpha: 1 }, 0.5)
        .set(q('.ci-page'), { autoAlpha: 0 }, 0.5)
        // one stroke of light writes the number, the sun leading
        .to(strokes, { drawSVG: '0% 100%', duration: 1.0, ease: 'power1.inOut' }, 0.16)
        .to(q('.ci-tip'), { motionPath: { path: lead, align: lead, alignOrigin: [0.5, 0.5] }, duration: 1.0, ease: 'power1.inOut' }, 0.16)
        // rays burst out of the finished number
        .to(rays, { drawSVG: '0% 100%', duration: 0.3, ease: 'expo.out', stagger: 0.012 }, 0.98)
        .to(rays, { drawSVG: '100% 100%', duration: 0.4, ease: 'power2.in', stagger: 0.012 }, 1.18)
        .fromTo(q('.ci-aura'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.5)
        // the glowing word is revealed behind the pen, right to left
        .to(q('.ci-word'), { clipPath: 'inset(-20% 0% -20% 0%)', duration: 0.62, ease: 'power2.out' }, 0.62)
        .to(q('.ci-desc'), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.95)
        .to(q('.ci-tip'), { autoAlpha: 0, duration: 0.15 }, 1.12)
        // the page opens out of the number through a ring of light
        .to(strokes, { drawSVG: '100% 100%', duration: 0.4, ease: 'power2.in' }, 1.3)
        .to(q('.ci-type'), { autoAlpha: 0, duration: 0.22, ease: 'power1.in' }, 1.36)
        .to(q('.ci-hole, .ci-ring'), { attr: { r: R1 }, duration: 0.58, ease: 'expo.out' }, 1.36)
        .to(q('.ci-ring'), { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, 1.6)
        .set(el, { autoAlpha: 0 }, CHAPTER_CARD_MS / 1000);
    }, el);
    return () => ctx.revert();
    // a card is mounted once per chapter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chapter) return null;
  const desc = DESCS[chapter.id];
  const lightPath = (props: React.SVGProps<SVGPathElement>) => (
    <>
      <path {...props} fill="none" stroke={color} strokeWidth={30} strokeOpacity={0.13} strokeLinecap="round" strokeLinejoin="round" />
      <path {...props} fill="none" stroke={color} strokeWidth={11} strokeOpacity={0.45} strokeLinecap="round" strokeLinejoin="round" />
      <path {...props} fill="none" stroke="#FFFFFF" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );

  return (
    <div ref={root} aria-hidden data-decorative style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <mask id={maskId}>
            <rect width="1920" height="1080" fill="white" />
            <circle className="ci-hole" cx="0" cy="0" r="0" fill="black" />
          </mask>
          <radialGradient id={pageId}>
            <stop offset="0" stopColor={PALETTE.bg2} />
            <stop offset="0.82" stopColor={PALETTE.bg0} />
            <stop offset="0.97" stopColor={alpha(color, 0.55)} />
            <stop offset="1" stopColor={color} />
          </radialGradient>
          <radialGradient id={auraId} cx={NUM_C[0]} cy={NUM_C[1] + 160} r="760" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={color} stopOpacity="0.32" />
            <stop offset="0.5" stopColor={color} stopOpacity="0.08" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <g mask={`url(#${maskId})`}>
          <rect className="ci-curtain" width="1920" height="1080" fill={PALETTE.bg0} style={{ opacity: 0, visibility: 'hidden' }} />
          <rect className="ci-aura" width="1920" height="1080" fill={`url(#${auraId})`} style={{ opacity: 0, visibility: 'hidden' }} />
        </g>
        <circle className="ci-page" cx="0" cy="0" r="0" fill={`url(#${pageId})`} />
        <circle className="ci-edge" cx="0" cy="0" r="0" fill="none" stroke={color} strokeWidth="4" style={{ filter: `drop-shadow(0 0 12px ${color})` }} />
        <circle className="ci-ring" cx="0" cy="0" r="0" fill="none" stroke={color} strokeWidth="4" />
        <g>{RAYS.map((d, i) => <path key={i} className="ci-ray" d={d} fill="none" stroke={i % 3 ? color : '#FFFFFF'} strokeWidth={i % 3 ? 3 : 2} strokeLinecap="round" />)}</g>
        <g className="ci-stroke">{lightPath({ d: strokeD })}</g>
        <g className="ci-tip">
          <circle cx="0" cy="0" r="26" fill={color} opacity="0.2" />
          <circle cx="0" cy="0" r="11" fill={color} opacity="0.65" />
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>
      </svg>
      <div className="ci-type" dir="rtl" style={{ position: 'absolute', inset: 0 }}>
        <div className="ci-word" style={{
          position: 'absolute', left: 0, right: 0, top: '49%', textAlign: 'center',
          fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(5rem, 9.5cqw, 11rem)',
          lineHeight: 1.05, color: PALETTE.paper, letterSpacing: '-0.02em',
          textShadow: `0 0 28px ${alpha(color, 0.7)}, 0 0 90px ${alpha(color, 0.4)}`,
        }}>{chapter.label}</div>
        {desc && (
          <div className="ci-desc" style={{
            position: 'absolute', left: 0, right: 0, top: '70%', textAlign: 'center',
            fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: 'clamp(1.3rem, 1.9cqw, 2.1rem)', color: PALETTE.muted,
          }}>{desc}</div>
        )}
      </div>
    </div>
  );
}
