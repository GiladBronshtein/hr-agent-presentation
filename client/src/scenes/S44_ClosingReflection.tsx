/**
 * S44 — Closing Reflection
 * Conference Hall Edition — The emotional crescendo
 * "אנחנו..." — cycling words, cinematic reveal
 */
import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const WORDS = [
  { text: 'מבינים', color: '#818CF8' },
  { text: 'רואים', color: '#22D3EE' },
  { text: 'בונים', color: '#34D399' },
  { text: 'מטמיעים', color: '#F59E0B' },
];

const QUESTIONS = [
  { q: 'מה תהליך אחד שתרצו לבדוק?', icon: '🎯', color: '#6366F1' },
  { q: 'מי השותף הנכון ב-IT?', icon: '🤝', color: '#0891B2' },
  { q: 'מה מדד ההצלחה שלכם?', icon: '📊', color: '#10B981' },
  { q: 'מה הצעד הראשון השבוע?', icon: '🚀', color: '#F59E0B' },
];

export default function S44_ClosingReflection() {
  const [mounted, setMounted] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setShowQuestions(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setWordIdx((p) => (p + 1) % WORDS.length), 2200);
    return () => clearInterval(interval);
  }, []);

  const currentWord = WORDS[wordIdx];

  return (
    <SceneBase noBg>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 40%, rgba(99,102,241,0.15) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(6,182,212,0.08) 0%, transparent 55%),
          #03030A
        `,
      }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #6366F1 30%, #22D3EE 70%, transparent 100%)',
        boxShadow: '0 0 20px rgba(99,102,241,0.5)',
      }} />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 4vw, 5rem) clamp(2rem, 6vw, 8rem) 6rem',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease',
      }}>

        {/* Main cycling headline */}
        <div className="animate-fade-in-up stagger-1" style={{ marginBottom: 'clamp(1rem, 2vw, 2rem)' }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 400, color: 'rgba(255,255,255,0.6)',
            display: 'block', marginBottom: '0.15em',
          }}>
            אנחנו
          </span>
          <span style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4.5rem, 11vw, 10rem)',
            fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
            display: 'block',
            color: currentWord.color,
            filter: `drop-shadow(0 0 40px ${currentWord.color}80)`,
            transition: 'color 0.4s ease, filter 0.4s ease',
          }}>
            {currentWord.text}
          </span>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-3" style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1rem, 1.9vw, 1.7rem)',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 clamp(2rem, 4vw, 4rem)',
          maxWidth: '680px', lineHeight: 1.6,
        }}>
          AI Agents אינם פרויקט IT — הם שינוי בדרך שעבודה מתבצעת.<br />
          <span style={{ color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>HR הוא לא רק לקוח — הוא אחד המעצבים.</span>
        </p>

        {/* Questions grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(0.75rem, 1.5vw, 1.25rem)',
          maxWidth: '700px', width: '100%',
          opacity: showQuestions ? 1 : 0,
          transform: showQuestions ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}>
          {QUESTIONS.map((item, i) => (
            <div key={i} style={{
              padding: 'clamp(1rem, 1.8vw, 1.5rem)',
              borderRadius: '16px',
              background: item.color + '08',
              border: `1px solid ${item.color}18`,
              textAlign: 'right',
              opacity: showQuestions ? 1 : 0,
              transform: showQuestions ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s`,
            }}>
              <span style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', display: 'block', marginBottom: '0.5rem' }}>{item.icon}</span>
              <p style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)',
                color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5,
              }}>{item.q}</p>
            </div>
          ))}
        </div>

        {/* Word cycle dots */}
        <div style={{
          display: 'flex', gap: '0.5rem', marginTop: 'clamp(1.5rem, 3vw, 3rem)',
          opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease 0.8s',
        }}>
          {WORDS.map((w, i) => (
            <div key={i} style={{
              width: i === wordIdx ? '24px' : '8px',
              height: '8px', borderRadius: '4px',
              background: i === wordIdx ? w.color : 'rgba(255,255,255,0.15)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
