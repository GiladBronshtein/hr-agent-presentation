/**
 * S23: Demo Entrance: Chapter 2 Break
 * Conference Hall Edition: Maximum cinematic impact
 * "לראות": The live demo chapter begins
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { ArrowLeft, Clapperboard } from 'lucide-react';
import { textTint } from '../lib/typeTokens';

const DEMO_STEPS = [
  { num: '01', label: 'טריגר', color: '#6366F1' },
  { num: '02', label: 'איסוף', color: '#0891B2' },
  { num: '03', label: 'תכנון', color: '#0891B2' },
  { num: '04', label: 'כלים', color: '#10B981' },
  { num: '05', label: 'תצוגה', color: '#F59E0B' },
  { num: '06', label: 'אישור', color: '#F59E0B' },
  { num: '07', label: 'ביצוע', color: '#F43F5E' },
  { num: '08', label: 'משוב', color: '#F43F5E' },
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
    <SceneBase noBg variant="chapter-break" chapterColor="#0891B2">
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 75% 65% at 50% 45%, rgba(8,145,178,0.2) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 35% 35% at 80% 20%, rgba(16,185,129,0.06) 0%, transparent 55%),
          #03030A
        `,
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 1.2s ease',
      }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Slow ripple rings: the slide's single ambient loop, behind everything */}
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          width: `${(i + 1) * 240}px`, height: `${(i + 1) * 240}px`,
          marginLeft: `${-(i + 1) * 120}px`, marginTop: `${-(i + 1) * 120}px`,
          borderRadius: '50%',
          border: `1px solid rgba(8,145,178,${0.09 - i * 0.02})`,
          animation: `ripple 6s ease-out ${i * 2}s infinite`,
          pointerEvents: 'none', zIndex: 1,
        }} />
      ))}

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #0891B2 30%, #22D3EE 70%, transparent 100%)',
        boxShadow: '0 0 20px rgba(8,145,178,0.5)',
      }} />

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
            margin: 0,
            background: 'linear-gradient(135deg, #22D3EE 0%, #0891B2 50%, #0E7490 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 60px rgba(8,145,178,0.6))',
          }}>
            דמו חי
          </h1>
        </div>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1.1rem, 2.2cqw, 2rem)',
          color: 'rgba(255,255,255,0.62)',
          margin: '0 0 clamp(2rem, 4cqw, 4rem)',
          maxWidth: '700px', lineHeight: 1.5,
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          אייג׳נט קליטה, מהרגע שהצעת העבודה אושרה<br />
          ועד ליום הראשון בעבודה
        </p>

        {/* Scenario card */}
        <div style={{
          padding: 'clamp(1.25rem, 2.5cqw, 2.5rem) clamp(1.5rem, 3cqw, 3.5rem)',
          borderRadius: '20px',
          background: 'rgba(8,145,178,0.08)',
          border: '1px solid rgba(8,145,178,0.2)',
          backdropFilter: 'blur(16px)',
          maxWidth: '760px', width: '100%',
          textAlign: 'right',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(0.5rem, 1cqw, 1rem)' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 1.8cqw, 1.6rem)', display: 'inline-flex', color: '#22D3EE' }}><Clapperboard size="1em" /></span>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: '#67E8F9' }}>התרחיש</span>
          </div>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(255,255,255,0.8)', margin: '0 0 0.5rem', lineHeight: 1.55,
            textWrap: 'pretty',
          } as React.CSSProperties}>
            <span style={{ color: 'white', fontWeight: 700 }}>יעל כהן</span> קיבלה הצעת עבודה <span style={{ whiteSpace: 'nowrap' }}>כ-<bdi>Product Manager</bdi>.</span>
            {' '}יום ראשון שלה: <span style={{ color: '#FDA4AF', fontWeight: 700, whiteSpace: 'nowrap' }}>15 ביולי</span>, <span style={{ whiteSpace: 'nowrap' }}>בעוד שבועיים.</span>
          </p>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)',
            color: 'rgba(255,255,255,0.68)', margin: 0, lineHeight: 1.55,
            textWrap: 'pretty',
          } as React.CSSProperties}>
            נראה איך אייג׳נט קליטה מכין תוכנית מלאה, מתאם ומקבל אישור, בלי תיאום ידני של HR.
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
                background: step.color + '14', border: `1px solid ${step.color}40`,
              }}>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', fontWeight: 700, color: textTint(step.color), fontVariantNumeric: 'tabular-nums' }}>{step.num}</span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(255,255,255,0.82)' }}>{step.label}</span>
              </div>
              {i < DEMO_STEPS.length - 1 && (
                <ArrowLeft aria-hidden size={18} style={{ color: 'rgba(255,255,255,0.45)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
