/**
 * S23: Demo Entrance
 * Sets up the live L&D demo in one breath: who asks, what, for whom, by when,
 * and the four steps the main track walks through. A chapter-break stage
 * with spots, rings of light radiating from the title, and the four steps
 * in four spectrum colors.
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { ArrowLeft, Clapperboard } from 'lucide-react';
import { DEMO_SCENARIO } from '../data/demoData';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('demo-entrance');
const textTint = textOn;

const DEMO_STEPS = [
  { num: '01', label: 'הבקשה', color: PALETTE.blue },
  { num: '02', label: 'התוכנית', color: PALETTE.violet },
  { num: '03', label: 'תצוגה מקדימה', color: PALETTE.magenta },
  { num: '04', label: 'אישור אנושי', color: PALETTE.amber },
];

export default function S23_DemoEntrance() {
  const { resetDemo } = usePresentationStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    resetDemo();
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase variant="chapter-break">
      {/* Slow ripple rings: the slide's single ambient loop, behind everything */}
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          width: `${(i + 1) * 240}px`, height: `${(i + 1) * 240}px`,
          marginLeft: `${-(i + 1) * 120}px`, marginTop: `${-(i + 1) * 120}px`,
          borderRadius: '50%',
          border: `1px solid ${alpha(ACC, 0.32 - i * 0.08)}`,
          boxShadow: `0 0 24px ${alpha(ACC, 0.12)}, inset 0 0 24px ${alpha(ACC, 0.08)}`,
          animation: `ripple 6s ease-out ${i * 2}s infinite`,
          pointerEvents: 'none', zIndex: 1,
        }} />
      ))}

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 4cqw, 5rem) clamp(2rem, 6cqw, 8rem) 6rem',
      }}>


        {/* Main headline */}
        <div style={{
          marginBottom: 'clamp(1rem, 2cqw, 2rem)',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.15s',
        }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4.5rem, 12cqw, 12rem)',
            fontWeight: 900, lineHeight: 0.82, letterSpacing: '-0.07em',
            margin: 0, padding: '0.06em 0.04em',
            color: '#F6F2EA',
          }}>
            <span className="fx-spectrum-text fx-shine-once">דמו חי</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1.1rem, 2.2cqw, 2rem)',
          color: 'rgba(246,242,234,0.8)',
          margin: '0 0 clamp(2rem, 4cqw, 4rem)',
          maxWidth: '700px', lineHeight: 1.5,
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          אייג׳נט למידה, מבקשה אחת בצ׳אט<br />
          ועד מסלול למידה מאושר
        </p>

        {/* Scenario card */}
        <div className="fx-glass fx-sheen" style={{
          '--fx-sheen-delay': '1.3s',
          padding: 'clamp(1.25rem, 2.5cqw, 2.5rem) clamp(1.5rem, 3cqw, 3.5rem)',
          borderRadius: '20px',
          maxWidth: '760px', width: '100%',
          textAlign: 'right',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        } as React.CSSProperties}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(0.5rem, 1cqw, 1rem)' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 1.8cqw, 1.6rem)', display: 'inline-flex', color: ACC_T }}><Clapperboard size="1em" /></span>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: ACC_T }}>התרחיש</span>
          </div>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(246,242,234,0.88)', margin: '0 0 0.5rem', lineHeight: 1.55,
            textWrap: 'pretty',
          } as React.CSSProperties}>
            בקשה חדשה מ<span style={{ color: '#F6F2EA', fontWeight: 700 }}>{DEMO_SCENARIO.requester}</span>, {DEMO_SCENARIO.requesterRole}:{' '}
            צוות של <span style={{ color: '#F6F2EA', fontWeight: 700 }}>12 אנשים</span> צריך להכיר את חבילת <bdi>Pro</bdi> החדשה{' '}
            <span style={{ color: PALETTE.amber, fontWeight: 700, whiteSpace: 'nowrap' }}>עד ה-15 בחודש.</span>
          </p>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)',
            color: 'rgba(246,242,234,0.78)', margin: 0, lineHeight: 1.55,
            textWrap: 'pretty',
          } as React.CSSProperties}>
            נראה איך האייג׳נט מבין את הצורך, בונה מסלול ומכין הכול, ומחכה לאישור שלנו לפני שמשהו יוצא.
          </p>
        </div>

        {/* Steps flow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 0.5cqw, 1rem)',
          flexWrap: 'wrap', justifyContent: 'center',
          marginTop: 'clamp(1.5rem, 3cqw, 3rem)',
          opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.5s ease',
        }}>
          {DEMO_STEPS.map((step, i) => (
            <div key={step.num} className={phase >= 3 ? 'mo-rise-sm' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 0.5cqw, 1rem)', animationDelay: `${i * 0.045}s` }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: 'clamp(0.35rem, 0.5cqw, 0.6rem) clamp(0.7rem, 1cqw, 1.1rem)',
                borderRadius: '10px',
                background: `linear-gradient(160deg, ${alpha(step.color, 0.24)}, ${alpha(step.color, 0.08)}), rgba(12,17,50,0.7)`,
                border: `1px solid ${alpha(step.color, 0.5)}`,
                boxShadow: `0 0 22px -8px ${alpha(step.color, 0.9)}`,
              }}>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', fontWeight: 700, color: textTint(step.color), fontVariantNumeric: 'tabular-nums' }}>{step.num}</span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(246,242,234,0.82)' }}>{step.label}</span>
              </div>
              {i < DEMO_STEPS.length - 1 && (
                <ArrowLeft aria-hidden size={18} style={{ color: textOn(DEMO_STEPS[i + 1].color), flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
