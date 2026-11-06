/**
 * ChapterInterstitial - the chapter card, in the learning-path language.
 * A navy page spreads from where the line enters (the reading side), the line
 * writes the chapter number in one continuous stroke with the amber pen tip,
 * the chapter word is revealed behind the pen, and the page then opens out of
 * the number onto the chapter's first slide. Plain, editorial typography:
 * no glows, no gradients. Purely visual: pointer-events none, aria-hidden.
 * Lifetime (skip on key or navigation) is owned by SceneRenderer, which swaps
 * the slide underneath while the page is closed (CARD_SWAP_MS).
 */
import { useId, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CHAPTERS } from '../../data/scenes';
import { INK, writeNumber, coverRadius, spline, pathFrom, type Pt } from './path';

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

export function ChapterInterstitial({ chapterIndex, onDone }: { chapterIndex: number; onDone: () => void }) {
  const chapter = CHAPTERS[chapterIndex];
  const maskId = `ci-${useId().replace(/[:]/g, '')}`;
  const root = useRef<HTMLDivElement>(null);
  const isAppendix = chapterIndex >= 4;
  const number = String(chapterIndex + 1).padStart(2, '0');
  // the appendix gets a single flourish instead of a number
  const strokeD = isAppendix
    ? pathFrom([2010, 300], spline([[2010, 300], [1300, 220], [1040, 360], [900, 300], [980, 240], [1060, 320], [700, 420], [-90, 360]]))
    : writeNumber(number, NUM_C[0], NUM_C[1], 1.05);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const entry: Pt = [1920, 300];
    const R0 = coverRadius(entry);
    const R1 = coverRadius(NUM_C);
    const ctx = gsap.context(() => {
      const stroke = el.querySelector('.ci-stroke') as SVGPathElement;
      const tl = gsap.timeline({ onComplete: onDone });
      gsap.set(q('.ci-page, .ci-edge'), { attr: { cx: entry[0], cy: entry[1], r: 0 } });
      gsap.set(q('.ci-hole'), { attr: { cx: NUM_C[0], cy: NUM_C[1], r: 0 } });
      gsap.set(stroke, { drawSVG: '0% 0%' });
      gsap.set(q('.ci-word'), { clipPath: 'inset(0% 0% 0% 100%)' });
      gsap.set(q('.ci-desc'), { autoAlpha: 0, y: 14 });
      // the page spreads from the reading edge
      tl.to(q('.ci-page, .ci-edge'), { attr: { r: R0 }, duration: 0.5, ease: 'power3.in' }, 0)
        .to(q('.ci-edge'), { autoAlpha: 0, duration: 0.2 }, 0.45)
        .set(q('.ci-curtain'), { autoAlpha: 1 }, 0.5)
        .set(q('.ci-page'), { autoAlpha: 0 }, 0.5)
        // one stroke writes the number, the pen tip leading
        .to(stroke, { drawSVG: '0% 100%', duration: 1.0, ease: 'power1.inOut' }, 0.16)
        .to(q('.ci-tip'), { motionPath: { path: stroke, align: stroke, alignOrigin: [0.5, 0.5] }, duration: 1.0, ease: 'power1.inOut' }, 0.16)
        // the word is revealed behind the pen, right to left
        .to(q('.ci-word'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.62, ease: 'power2.out' }, 0.62)
        .to(q('.ci-desc'), { autoAlpha: 1, y: 0, duration: 0.5, ease: 'expo.out' }, 0.95)
        .to(q('.ci-tip'), { autoAlpha: 0, duration: 0.15 }, 1.12)
        // the page opens out of the number onto the chapter's first slide
        .to(stroke, { drawSVG: '100% 100%', duration: 0.4, ease: 'power2.in' }, 1.3)
        .to(q('.ci-type'), { autoAlpha: 0, duration: 0.22, ease: 'power1.in' }, 1.36)
        .to(q('.ci-hole'), { attr: { r: R1 }, duration: 0.58, ease: 'expo.out' }, 1.36)
        .set(el, { autoAlpha: 0 }, CHAPTER_CARD_MS / 1000);
    }, el);
    return () => ctx.revert();
    // a card is mounted once per chapter change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!chapter) return null;
  const desc = DESCS[chapter.id];

  return (
    <div ref={root} aria-hidden data-decorative style={{ position: 'absolute', inset: 0, zIndex: 80, pointerEvents: 'none' }}>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <mask id={maskId}>
            <rect width="1920" height="1080" fill="white" />
            <circle className="ci-hole" cx="0" cy="0" r="0" fill="black" />
          </mask>
        </defs>
        <rect className="ci-curtain" width="1920" height="1080" fill={INK.navy} mask={`url(#${maskId})`} style={{ opacity: 0, visibility: 'hidden' }} />
        <circle className="ci-page" cx="0" cy="0" r="0" fill={INK.navy} />
        <circle className="ci-edge" cx="0" cy="0" r="0" fill="none" stroke={INK.amber} strokeWidth="3" />
        <path className="ci-stroke" d={strokeD} fill="none" stroke={INK.paper} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="ci-tip" cx="0" cy="0" r="8" fill={INK.amber} />
      </svg>
      <div className="ci-type" dir="rtl" style={{ position: 'absolute', inset: 0 }}>
        <div className="ci-word" style={{
          position: 'absolute', left: 0, right: 0, top: '49%', textAlign: 'center',
          fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(5rem, 9.5cqw, 11rem)',
          lineHeight: 1.05, color: INK.paper, letterSpacing: '-0.02em',
        }}>{chapter.label}</div>
        {desc && (
          <div className="ci-desc" style={{
            position: 'absolute', left: 0, right: 0, top: '70%', textAlign: 'center',
            fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: 'clamp(1.3rem, 1.9cqw, 2.1rem)', color: INK.slate,
          }}>{desc}</div>
        )}
      </div>
    </div>
  );
}
