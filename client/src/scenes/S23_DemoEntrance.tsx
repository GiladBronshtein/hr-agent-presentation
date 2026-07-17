/**
 * S23: Demo Entrance: Chapter 2 Break
 * Conference Hall Edition: Maximum cinematic impact
 * "לראות": The live demo chapter begins
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { ArrowLeft } from 'lucide-react';

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
      setTimeout(() => setPhase(3), 1400),
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

      {/* Pulsing rings */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: `${(i + 1) * 200}px`, height: `${(i + 1) * 200}px`,
          borderRadius: '50%',
          border: `1px solid rgba(8,145,178,${0.1 - i * 0.02})`,
          transform: 'translate(-50%, -50%)',
          animation: `ripple 3.5s ease-out ${i * 0.7}s infinite`,
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
        padding: 'clamp(2rem, 4vw, 5rem) clamp(2rem, 6vw, 8rem) 6rem',
      }}>

        {/* Chapter badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
          padding: '0.5rem 1.25rem', borderRadius: '100px',
          background: 'rgba(8,145,178,0.12)', border: '1px solid rgba(8,145,178,0.3)',
          marginBottom: 'clamp(1.5rem, 3vw, 3rem)',
          opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.5s ease',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22D3EE', display: 'inline-block', animation: 'glowPulse 1.5s ease-in-out infinite', boxShadow: '0 0 8px #22D3EE' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 700, color: '#22D3EE', letterSpacing: '0.12em' }}>
            פרק 02: לראות
          </span>
        </div>

        {/* Main headline */}
        <div style={{
          marginBottom: 'clamp(1rem, 2vw, 2rem)',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.15s',
        }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4.5rem, 12vw, 12rem)',
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
          fontSize: 'clamp(1.1rem, 2.2vw, 2rem)',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 clamp(2rem, 4vw, 4rem)',
          maxWidth: '700px', lineHeight: 1.5,
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.6s ease 0.3s',
        }}>
          אייג׳נט קליטת עובד, מהרגע שהצעת העבודה אושרה<br />
          ועד ליום הראשון בעבודה
        </p>

        {/* Scenario card */}
        <div style={{
          padding: 'clamp(1.25rem, 2.5vw, 2.5rem) clamp(1.5rem, 3vw, 3.5rem)',
          borderRadius: '20px',
          background: 'rgba(8,145,178,0.08)',
          border: '1px solid rgba(8,145,178,0.2)',
          backdropFilter: 'blur(16px)',
          maxWidth: '600px', width: '100%',
          textAlign: 'right',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(0.5rem, 1vw, 0.875rem)' }}>
            <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)' }}>🎬</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.65rem, 0.9vw, 0.82rem)', fontWeight: 700, color: '#22D3EE', letterSpacing: '0.1em' }}>התרחיש</span>
          </div>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7vw, 1.5rem)',
            color: 'rgba(255,255,255,0.8)', margin: '0 0 0.5rem', lineHeight: 1.55,
          }}>
            <span style={{ color: 'white', fontWeight: 700 }}>יעל כהן</span> קיבלה הצעת עבודה כ-Product Manager.
            {' '}יום ראשון שלה - <span style={{ color: '#F43F5E', fontWeight: 700 }}>15 ביולי</span>, בעוד שבועיים.
          </p>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(0.85rem, 1.3vw, 1.15rem)',
            color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6,
          }}>
            נראה איך אייג׳נט קליטה מכין תוכנית מלאה, מתאם, ומקבל אישור, בלי שמנהל HR יצטרך לתאם ידנית.
          </p>
        </div>

        {/* Steps flow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 0.5vw, 0.5rem)',
          flexWrap: 'wrap', justifyContent: 'center',
          marginTop: 'clamp(1.5rem, 3vw, 3rem)',
          opacity: phase >= 3 ? 1 : 0, transition: 'opacity 0.5s ease',
        }}>
          {DEMO_STEPS.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.25rem, 0.5vw, 0.5rem)' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: 'clamp(0.3rem, 0.5vw, 0.45rem) clamp(0.625rem, 1vw, 0.875rem)',
                borderRadius: '8px',
                background: step.color + '0E', border: `1px solid ${step.color}25`,
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', color: step.color + '80' }}>{step.num}</span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.75rem, 1.1vw, 1rem)', color: 'rgba(255,255,255,0.65)' }}>{step.label}</span>
              </div>
              {i < DEMO_STEPS.length - 1 && (
                <ArrowLeft size={10} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
