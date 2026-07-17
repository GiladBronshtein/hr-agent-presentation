/**
 * S01 — Title Slide: מהאוטומציה לאייג׳נט
 * CONFERENCE HALL EDITION — Cinematic hero, massive typography, star field
 */
import { useEffect, useState, useRef } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const CHAPTERS = [
  { label: 'להבין', color: '#6366F1', desc: 'מה הם ואיך עובדים', num: '01' },
  { label: 'לראות', color: '#0891B2', desc: 'דמו חי של אייג׳נט', num: '02' },
  { label: 'לבנות', color: '#10B981', desc: 'כלים ופלטפורמות', num: '03' },
  { label: 'להטמיע', color: '#F59E0B', desc: 'פיילוט ב-90 יום', num: '04' },
];

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    setSize();
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.3,
      opacity: Math.random() * 0.7 + 0.1,
      twinkleSpeed: Math.random() * 0.025 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.7 ? '#818CF8' : Math.random() > 0.5 ? '#22D3EE' : 'white',
    }));
    let t = 0;
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach((s) => {
        const opacity = s.opacity * (0.4 + 0.6 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

export default function S01_Title() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <SceneBase>
      <StarField />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 90% 70% at 50% 30%, rgba(99,102,241,0.2) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 15% 75%, rgba(6,182,212,0.1) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 85% 80%, rgba(245,158,11,0.07) 0%, transparent 50%),
          #03030A
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)',
        backgroundSize: '100px 100px',
      }} />
      <div className="noise-overlay" />
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #6366F1 30%, #22D3EE 70%, transparent 100%)',
        opacity: 0.8,
      }} />

      {/* Giant ghost text */}
      <div style={{
        position: 'absolute', left: '-2%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(20rem, 40vw, 36rem)',
        fontWeight: 900, lineHeight: 1, letterSpacing: '-0.08em',
        color: 'rgba(99,102,241,0.035)',
        userSelect: 'none', pointerEvents: 'none', zIndex: 2,
        direction: 'ltr',
      }}>AI</div>

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: 'clamp(2rem, 4vw, 4rem) clamp(2.5rem, 6vw, 7rem) 6rem',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease',
      }}>

        {/* Eyebrow badges */}
        <div className="animate-fade-in-up stagger-1" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1.5rem, 3vw, 3rem)', flexWrap: 'wrap' }}>
          <div style={{
            padding: '0.45rem 1.1rem', borderRadius: '100px',
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#818CF8', display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 700, color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
              HR LEADERS SUMMIT 2026
            </span>
          </div>
          <div style={{
            padding: '0.45rem 1.1rem', borderRadius: '100px',
            background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
          }}>
            <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 600, color: '#22D3EE', fontFamily: "'Space Grotesk', sans-serif" }}>
              גלעד ברונשטיין
            </span>
          </div>
        </div>

        {/* MASSIVE title */}
        <div className="animate-fade-in-up stagger-2" style={{ marginBottom: 'clamp(0.5rem, 1.5vw, 1.5rem)' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4rem, 10vw, 9.5rem)',
            fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
            color: 'white', margin: 0,
            textShadow: '0 0 80px rgba(255,255,255,0.06)',
          }}>מהאוטומציה</h1>
        </div>

        <div className="animate-fade-in-up stagger-3" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2.5vw, 2.5rem)', marginBottom: 'clamp(1.5rem, 3vw, 3.5rem)' }}>
          <div style={{ height: '5px', width: 'clamp(3rem, 7vw, 7rem)', background: 'linear-gradient(90deg, #6366F1, #22D3EE)', borderRadius: '3px', flexShrink: 0 }} />
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4rem, 10vw, 9.5rem)',
            fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
            margin: 0,
            background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 35%, #22D3EE 70%, #06B6D4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 40px rgba(99,102,241,0.5))',
          }}>לאייג׳נט</h1>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-4" style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1.25rem, 2.5vw, 2.25rem)',
          fontWeight: 300, color: 'rgba(255,255,255,0.5)',
          margin: '0 0 clamp(2rem, 4vw, 4rem)', letterSpacing: '-0.01em',
          maxWidth: '700px',
        }}>
          AI Agents for HR — מה זה, למה עכשיו, ואיך מתחילים
        </p>

        {/* Chapter pills */}
        <div className="animate-fade-in-up stagger-5" style={{ display: 'flex', gap: 'clamp(0.625rem, 1.2vw, 1rem)', flexWrap: 'wrap' }}>
          {CHAPTERS.map((ch, i) => (
            <div key={ch.label} style={{
              padding: 'clamp(0.625rem, 1vw, 0.875rem) clamp(1rem, 1.8vw, 1.5rem)',
              borderRadius: '14px',
              background: ch.color + '0F', border: `1px solid ${ch.color}28`,
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              backdropFilter: 'blur(8px)',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${0.5 + i * 0.1}s, transform 0.5s cubic-bezier(0.23,1,0.32,1) ${0.5 + i * 0.1}s`,
            }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)', fontWeight: 800, color: ch.color, opacity: 0.6, letterSpacing: '0.05em' }}>{ch.num}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)', fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>{ch.label}</div>
                <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.7rem, 1vw, 0.875rem)', color: 'rgba(255,255,255,0.38)', marginTop: '1px' }}>{ch.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Nav hint */}
        <div className="animate-fade-in stagger-9" style={{
          position: 'absolute', bottom: '5.5rem', left: 'clamp(2.5rem, 6vw, 7rem)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          <span>לחצו ← להתחלה</span>
          <span style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace' }}>←</span>
        </div>
      </div>
    </SceneBase>
  );
}
