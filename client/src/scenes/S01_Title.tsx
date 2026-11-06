/**
 * S01: Title Slide: מאוטומציה לאייג׳נט
 * The trailer's particle title lands on this title glyph for glyph, and its
 * comet of light lands on the underline (data-title-line, the baseline
 * markers and data-title-underline are measured for that). The second line
 * and the underline share the Spectrum gradient with the particle title.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { LectureTrailer } from '../components/presentation/LectureTrailer';
import { usePresentationStore } from '../store/presentationStore';
import '../components/presentation/titleIntro.css';
import { PALETTE, CHAPTER_COLORS, alpha } from '../lib/palette';
import { useDecorativeCanvas } from '../hooks/useDecorativeCanvas';
import { mark } from '../lib/diag';

const P = PALETTE;
/** Left to right, as the particle title's gradient (trailer/formations.ts). */
const TITLE_GRADIENT = `linear-gradient(90deg, ${P.amber}, ${P.coral}, ${P.magenta}, ${P.violet}, ${P.blue})`;

const setupStars = (canvas: HTMLCanvasElement) => {
  const tints = [P.paper, P.paper, P.violet, P.teal, P.amber, P.blue];
  const stars = Array.from({ length: 170 }, (_, i) => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.3,
    a: Math.random() * 0.6 + 0.15, s: Math.random() * 1.6 + 0.4, o: Math.random() * 6.28, c: tints[i % tints.length],
  }));
  return (ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, { t }: { t: number }) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    for (const st of stars) {
      ctx.globalAlpha = Math.max(0, st.a * (0.55 + 0.45 * Math.sin(t * st.s + st.o)));
      ctx.fillStyle = st.c;
      ctx.beginPath();
      ctx.arc(st.x * cnv.width, st.y * cnv.height, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
};
function Stars() {
  const ref = useDecorativeCanvas(setupStars);
  return <canvas ref={ref} aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

const CHAPTERS = [
  { label: 'להבין', desc: 'מה הם ואיך עובדים', num: '01' },
  { label: 'לראות', desc: 'דוגמאות ודמו חי', num: '02' },
  { label: 'לבנות', desc: 'כלים, אמון וגבולות', num: '03' },
  { label: 'להטמיע', desc: 'פיילוט ב-90 יום', num: '04' },
];
const HAIR = 'rgba(246,242,234,0.16)';

export default function S01_Title() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  // The ~65s lecture trailer plays when arriving forward (or on load); coming
  // back from later slides shows the finished title. Enter skips, I replays.
  const [intro, setIntro] = useState(() => {
    const { previousSceneIndex, isReducedMotion } = usePresentationStore.getState();
    return !isReducedMotion && previousSceneIndex <= 1;
  });
  const [introKey, setIntroKey] = useState(0);
  useEffect(() => { mark(`title mount intro=${intro}`); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [revealed, setRevealed] = useState(!intro);
  const [played, setPlayed] = useState(intro);
  const reveal = useCallback(() => setRevealed(true), []);
  // the finished trailer is already invisible; tear its WebGL down in idle time,
  // not while the title's entrance animations are running
  const runRef = useRef(0);
  const endIntro = useCallback(() => {
    const run = runRef.current;
    const end = () => { if (runRef.current === run) setIntro(false); };
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(end, { timeout: 1500 });
    else setTimeout(end, 900);
  }, []);
  useEffect(() => {
    const replay = () => {
      if (usePresentationStore.getState().isReducedMotion) return;
      runRef.current++;
      setRevealed(false);
      setPlayed(true);
      setIntro(true);
      setIntroKey((k) => k + 1);
    };
    window.addEventListener('replay-intro', replay);
    return () => window.removeEventListener('replay-intro', replay);
  }, []);

  // measure: a hidden, unanimated copy laid out exactly like the real title,
  // rendered during the trailer so the particle title can land on it.
  const content = (measure: boolean) => (
      <div dir="rtl" aria-hidden={measure || undefined} data-title-measure={measure || undefined} style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(2rem, 4cqw, 4rem) clamp(2.5rem, 6cqw, 7rem) 6rem',
        textAlign: 'center',
        visibility: measure ? 'hidden' : undefined,
      }}>

        {/* Eyebrow badges */}
        <div className={measure ? undefined : 'animate-fade-in-up stagger-1'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: 'clamp(1.5rem, 3cqw, 3rem)', flexWrap: 'wrap' }}>
          {[
            { text: 'HR IMPACT 26', color: P.violet, font: "'Space Grotesk', sans-serif", ls: '0.1em', weight: 700 },
            { text: 'כנס למידה בעידן ה-AI', color: P.amber, font: "'Heebo', sans-serif", ls: 0, weight: 600 },
            { text: 'גלעד ברונשטיין', color: P.teal, font: "'Heebo', sans-serif", ls: 0, weight: 600 },
          ].map((b) => (
            <div key={b.text} style={{ padding: '0.45rem 1.1rem', borderRadius: '100px', background: alpha(b.color, 0.1), border: `1px solid ${alpha(b.color, 0.35)}`, boxShadow: `0 0 24px ${alpha(b.color, 0.18)}` }}>
              <span style={{ fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)', fontWeight: b.weight, color: b.color, fontFamily: b.font, letterSpacing: b.ls }}>{b.text}</span>
            </div>
          ))}
        </div>

        {/* MASSIVE title - centered, no decorative line next to text */}
        <div className={measure ? undefined : played ? 'intro-title-in' : 'animate-fade-in-up stagger-2'} style={{ marginBottom: 'clamp(0.25rem, 1cqw, 1rem)' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(5rem, 12cqw, 11rem)',
            fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
            color: P.paper, margin: 0,
          }} data-title-line="0">מאוטומציה{measure && <span data-baseline style={{ display: 'inline-block', width: 0, height: 0 }} />}</h1>
        </div>

        <div className={measure ? undefined : played ? 'intro-title-in delay-1' : 'animate-fade-in-up stagger-3'} style={{ marginBottom: 'clamp(1.5rem, 3cqw, 3.5rem)' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(5rem, 12cqw, 11rem)',
            fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
            margin: 0,
            background: TITLE_GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }} data-title-line="1">לאייג׳נט{measure && <span data-baseline style={{ display: 'inline-block', width: 0, height: 0 }} />}</h1>
          {/* The line below the title: where the trailer's pen line comes to rest */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}>
            <div data-title-underline style={{ height: '5px', width: 'clamp(4rem, 10cqw, 9rem)', background: TITLE_GRADIENT, borderRadius: '3px', boxShadow: `0 0 14px ${alpha(P.magenta, 0.55)}, 0 0 36px ${alpha(P.violet, 0.35)}` }} />
          </div>
        </div>

        {/* Subtitle */}
        <p className={measure ? undefined : 'animate-fade-in-up stagger-4'} style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1.5rem, 2.8cqw, 2.5rem)',
          fontWeight: 300, color: alpha(P.paper, 0.78),
          margin: '0 0 clamp(2rem, 4cqw, 4rem)', letterSpacing: '-0.01em',
          maxWidth: '800px', textWrap: 'balance',
        }}>
          <bdi dir="ltr">AI Agents</bdi> ללמידה ופיתוח:<br />מה זה, למה עכשיו, ואיך להתחיל
        </p>

        {/* Chapter pills */}
        <div className={measure ? undefined : 'animate-fade-in-up stagger-5'} style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.625rem, 1.2cqw, 1rem)', flexWrap: 'wrap' }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.label} style={{
              padding: 'clamp(0.75rem, 1.2cqw, 1rem) clamp(1.25rem, 2cqw, 1.75rem)',
              borderRadius: '14px',
              background: alpha(CHAPTER_COLORS[i], 0.07), border: `1px solid ${alpha(CHAPTER_COLORS[i], 0.3)}`,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: measure || mounted ? 1 : 0,
              transform: measure || mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${0.5 + i * 0.1}s, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.5 + i * 0.1}s`,
            }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem, 1.5cqw, 1.4rem)', fontWeight: 800, color: CHAPTER_COLORS[i], letterSpacing: '0.05em', textShadow: `0 0 18px ${alpha(CHAPTER_COLORS[i], 0.6)}` }}>{ch.num}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.6cqw, 1.4rem)', fontWeight: 700, color: P.paper }}>{ch.label}</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.1cqw, 1rem)', color: P.muted, marginTop: '1px' }}>{ch.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );

  return (
    <SceneBase>
      {/* the trailer's universe, at rest: midnight, colored light, stars */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 55% at 50% 38%, ${alpha(P.violet, 0.2)} 0%, transparent 62%),
          radial-gradient(ellipse 45% 40% at 18% 78%, ${alpha(P.teal, 0.12)} 0%, transparent 60%),
          radial-gradient(ellipse 40% 38% at 84% 82%, ${alpha(P.amber, 0.1)} 0%, transparent 58%),
          radial-gradient(ellipse 35% 30% at 86% 14%, ${alpha(P.magenta, 0.1)} 0%, transparent 60%),
          ${P.bg0}
        `,
      }} />
      <Stars />
      <div className="noise-overlay" />

      {intro && (
        <LectureTrailer
          key={introKey}
          onImpact={reveal}
          onDone={endIntro}
        />
      )}

      {revealed ? content(false) : intro ? content(true) : null}
    </SceneBase>
  );
}
