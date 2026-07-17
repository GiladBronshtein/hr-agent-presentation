/**
 * S23 — Demo Entrance: Chapter 3 Break
 * Design: Cinematic chapter reveal — emerald/rose gradient, animated steps preview
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { Wrench, ArrowLeft } from 'lucide-react';

const DEMO_STEPS = [
  { num: '01', label: 'טריגר', color: '#6366F1' },
  { num: '02', label: 'איסוף', color: '#0891B2' },
  { num: '03', label: 'תכנון', color: '#10B981' },
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
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase variant="chapter-break" chapterColor="#10B981">
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(16,185,129,0.1) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      <div
        dir="rtl"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 3rem 5rem',
          gap: '2rem',
          textAlign: 'center',
        }}
      >
        {/* Chapter badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '100px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <Wrench size={13} style={{ color: '#34D399' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34D399', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
            פרק שלישי · לבנות
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.15s',
          }}
        >
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'white',
              margin: 0,
            }}
          >
            בואו נראה
          </h1>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: '0.05em 0 0',
              background: 'linear-gradient(135deg, #34D399 0%, #10B981 40%, #6366F1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            אייג׳נט עובד
          </h1>
        </div>

        {/* Scenario card */}
        <div
          style={{
            maxWidth: '560px',
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'rgba(16,185,129,0.07)',
            border: '1px solid rgba(16,185,129,0.2)',
            textAlign: 'right',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
          }}
        >
          <p
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.12em',
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: '0.625rem',
            }}
          >
            התרחיש
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: '1rem',
              fontWeight: 500,
              lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif",
              margin: '0 0 0.75rem',
            }}
          >
            <span style={{ color: '#F59E0B', fontWeight: 700 }}>יעל כהן</span> קיבלה הצעת עבודה כ-Product Manager.
            {' '}יום ראשון שלה — <span style={{ color: '#F43F5E', fontWeight: 700 }}>15 ביולי</span>, בעוד שבועיים.
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.82rem',
              lineHeight: 1.6,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}
          >
            נראה איך אייג׳נט קליטה מכין תוכנית מלאה, מתאם, ומקבל אישור — בלי שמנהל HR יצטרך לתאם ידנית.
          </p>
        </div>

        {/* Steps flow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {DEMO_STEPS.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '8px',
                  background: step.color + '0E',
                  border: `1px solid ${step.color}25`,
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: step.color + '80' }}>{step.num}</span>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', fontFamily: "'DM Sans', sans-serif" }}>
                  {step.label}
                </span>
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
