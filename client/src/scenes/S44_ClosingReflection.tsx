/**
 * S44: Closing Reflection
 * Conference Hall Edition: The emotional crescendo
 * "אנחנו...": cycling words, cinematic reveal
 */
import { useEffect, useState } from 'react';
import { BarChart3, Handshake, Rocket, Target } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const WORDS = [
  { text: 'נבין', color: '#F2A93B' },
  { text: 'נראה', color: '#F3EEE4' },
  { text: 'נבנה', color: '#F2A93B' },
  { text: 'נטמיע', color: '#F2A93B' },
];

const QUESTIONS = [
  { q: 'איזה תהליך למידה חוזר אצלנו כל שבוע?', icon: Target, color: '#F2A93B' },
  { q: 'איזה מומחה תוכן יהיה שותף ראשון?', icon: Handshake, color: '#8A93A8' },
  { q: 'איך נדע שהלמידה השתפרה, ולא רק שנחסך זמן?', icon: BarChart3, color: '#F2A93B' },
  { q: 'מה הצעד הראשון השבוע?', icon: Rocket, color: '#F2A93B' },
];

export default function S44_ClosingReflection() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordSwaps, setWordSwaps] = useState(0);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const t2 = setTimeout(() => setShowQuestions(true), 900);
    return () => { clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((p) => (p + 1) % WORDS.length);
      setWordSwaps((n) => n + 1);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const currentWord = WORDS[wordIdx];

  return (
    <SceneBase noBg>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          #070B17
        `,
      }} />
      <div className="noise-overlay" />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(2rem, 4cqw, 5rem) clamp(2rem, 6cqw, 8rem) 6rem',
      }}>

        {/* Main cycling headline */}
        <div className="animate-fade-in-up stagger-1" style={{ marginBottom: 'clamp(1rem, 2cqw, 2rem)' }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(2rem, 5cqw, 4.5rem)',
            fontWeight: 400, color: 'rgba(243,238,228,0.6)',
            display: 'block', marginBottom: '0.15em',
          }}>
            אנחנו
          </span>
          {/* Re-keyed per word so each new verb rises into place instead of snapping */}
          <span key={wordSwaps} className={wordSwaps > 0 ? 'mo-rise-sm' : undefined} style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(4.5rem, 11cqw, 10rem)',
            fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
            display: 'block',
            color: currentWord.color,
            transition: 'color 0.4s ease, filter 0.4s ease',
          }}>
            {currentWord.text}
          </span>
        </div>

        {/* Subtitle */}
        <p className="animate-fade-in-up stagger-3" style={{
          fontFamily: "'Heebo', sans-serif",
          fontSize: 'clamp(1rem, 1.9cqw, 1.7rem)',
          color: 'rgba(243,238,228,0.62)',
          margin: '0 0 clamp(2rem, 4cqw, 4rem)',
          maxWidth: '900px', lineHeight: 1.6,
          textWrap: 'balance',
        } as React.CSSProperties}>
          אייג׳נטים הם לא עוד מכונה לייצור תוכן.<br />
          הם זמן שמתפנה למה שבאמת משנה למידה.<br />
          <span style={{ color: 'rgba(243,238,228,0.85)', fontWeight: 600 }}>ל-L&D יש מקום בעיצוב הדרך, לא רק בשימוש בה.</span>
        </p>

        {/* Questions grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(0.75rem, 1.5cqw, 1.25rem)',
          maxWidth: '980px', width: '100%',
          opacity: showQuestions ? 1 : 0,
          transform: showQuestions ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}>
          {QUESTIONS.map((item, i) => (
            <div key={i} style={{
              padding: 'clamp(1rem, 1.8cqw, 1.5rem)',
              borderRadius: '16px',
              background: item.color + '0D',
              border: `1px solid ${item.color}30`,
              display: 'flex', alignItems: 'center', gap: '0.85rem',
              textAlign: 'right',
              opacity: showQuestions ? 1 : 0,
              transform: showQuestions ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.1}s`,
            }}>
              <span style={{ fontSize: 'clamp(1.5rem, 2cqw, 2.1rem)', display: 'inline-flex', flexShrink: 0, color: textTint(item.color) }}><item.icon size="1em" /></span>
              <p style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600,
                color: 'rgba(243,238,228,0.85)', margin: 0, lineHeight: 1.4,
              }}>{item.q}</p>
            </div>
          ))}
        </div>

        {/* Word cycle dots */}
        <div style={{
          display: 'flex', gap: '0.5rem', marginTop: 'clamp(1.5rem, 3cqw, 3rem)',
          animationDelay: '0.8s',
        }} className="mo-fade">
          {WORDS.map((w, i) => (
            <div key={i} style={{
              width: i === wordIdx ? '24px' : '8px',
              height: '8px', borderRadius: '4px',
              background: i === wordIdx ? w.color : 'rgba(243,238,228,0.15)',
              transition: 'all 0.4s ease',
            }} />
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
