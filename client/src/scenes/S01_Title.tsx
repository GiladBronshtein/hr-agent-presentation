/**
 * S01 — Title Slide: מהאוטומציה לאייג׳נט
 * Design: Cinematic hero — large display type, animated gradient, floating chapter pills
 * Style: AI-Native UI — Space Grotesk, deep space bg, indigo/cyan gradient
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const CHAPTERS = [
  { label: 'להבין', color: '#6366F1', desc: 'מה הם ואיך עובדים', num: '01' },
  { label: 'לראות', color: '#0891B2', desc: 'שימושים ב-HR', num: '02' },
  { label: 'לבנות', color: '#10B981', desc: 'דמו חי של אייג׳נט', num: '03' },
  { label: 'להטמיע', color: '#F59E0B', desc: 'פיילוט ב-90 יום', num: '04' },
];

export default function S01_Title() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <SceneBase>
      {/* Deep space background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 70% at 50% 35%, rgba(99,102,241,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 40% 40% at 80% 70%, rgba(8,145,178,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 20% 80%, rgba(16,185,129,0.06) 0%, transparent 60%),
            #0A0A1A
          `,
        }}
      />

      {/* Fine grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
        }}
      />

      {/* Noise */}
      <div className="noise-overlay" />
      <div className="accent-line-top" />

      {/* Content */}
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
          padding: '2rem 3rem 5rem',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      >
        {/* Event badge */}
        <div
          className="animate-fade-in-up stagger-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 1rem',
            borderRadius: '100px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            marginBottom: '2rem',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366F1', display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
            HR LEADERS SUMMIT 2026
          </span>
        </div>

        {/* Main title */}
        <div className="animate-fade-in-up stagger-2" style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: 'white',
              margin: 0,
            }}
          >
            מהאוטומציה
          </h1>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              margin: '0.1em 0 0',
              background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 40%, #22D3EE 80%, #10B981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            לאייג׳נט
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="animate-fade-in-up stagger-3"
          style={{
            color: 'rgba(255,255,255,0.48)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            maxWidth: '560px',
            fontFamily: "'DM Sans', sans-serif",
            margin: '0 0 2.5rem',
          }}
        >
          כיצד AI Agents משנים את עבודת HR — ומה תפקידכם בעיצוב השינוי
        </p>

        {/* Chapter pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.625rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
          }}
        >
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                background: ch.color + '0E',
                border: `1px solid ${ch.color}28`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${0.4 + i * 0.08}s, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.4 + i * 0.08}s`,
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.6rem',
                  color: ch.color + '80',
                  fontWeight: 600,
                }}
              >
                {ch.num}
              </span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.875rem', color: ch.color }}>
                {ch.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Sans', sans-serif" }}>
                {ch.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation hint */}
        <div
          className="animate-fade-in stagger-9"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255,255,255,0.2)',
            fontSize: '0.75rem',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span>לחצו על חץ ימינה להתחלה</span>
          <span style={{ fontFamily: 'monospace', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>→</span>
        </div>
      </div>
    </SceneBase>
  );
}
