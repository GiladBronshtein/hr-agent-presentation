/**
 * S02: Agenda: Four Questions
 * Spectrum: one lit glass card per chapter, each in its own chapter color,
 * so the four colors the audience will meet are introduced here.
 */
import { SceneBase, SceneEyebrow } from '../components/presentation/SceneBase';
import { BookOpen, Layers, Wrench, Rocket } from 'lucide-react';
import { CHAPTER_COLORS, alpha, textOn } from '../lib/palette';

const QUESTIONS = [
  {
    num: '01',
    q: 'מה זה אייג׳נט, ומה הוא נותן ל-L&D?',
    chapter: 'להבין',
    color: CHAPTER_COLORS[0],
    Icon: BookOpen,
    desc: 'ההבדל מאוטומציה, ממה הוא בנוי, ואיך התפקיד שלנו משתנה',
  },
  {
    num: '02',
    q: 'איך זה נראה בפועל?',
    chapter: 'לראות',
    color: CHAPTER_COLORS[1],
    Icon: Layers,
    desc: 'חמישה אייג׳נטים לאורך מחזור הלמידה, ודמו חי',
  },
  {
    num: '03',
    q: 'איך לבנות את זה באחריות?',
    chapter: 'לבנות',
    color: CHAPTER_COLORS[2],
    Icon: Wrench,
    desc: 'כלים שכבר יש, אמון ושאלות קשות',
  },
  {
    num: '04',
    q: 'איך להתחיל בארגון שלנו?',
    chapter: 'להטמיע',
    color: CHAPTER_COLORS[3],
    Icon: Rocket,
    desc: 'בחירת פיילוט ראשון ומפת דרכים ל-90 יום',
  },
];

export default function S02_Agenda() {
  return (
    <SceneBase>
      <div
        dir="rtl"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4cqw, 4rem) clamp(3rem, 6cqw, 7rem) clamp(5rem, 8cqw, 7rem)',
          gap: 'clamp(1.5rem, 3cqw, 3rem)',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <SceneEyebrow>ארבע שאלות שנענה עליהן</SceneEyebrow>
          <h1
            className="fx-glow-soft"
            style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3rem, 6cqw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#F6F2EA',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            מה נלמד היום
          </h1>
        </div>

        {/* Questions grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(0.875rem, 1.5cqw, 1.5rem)',
            width: '100%',
            maxWidth: '1100px',
          }}
        >
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              className="fx-in fx-glass fx-sheen"
              style={{
                '--fx-c': item.color,
                '--i': i,
                '--fx-delay': '120ms',
                '--fx-sheen-delay': `${0.7 + i * 0.12}s`,
                padding: 'clamp(1.5rem, 2.5cqw, 2.5rem)',
                borderRadius: '20px',
                background: `radial-gradient(120% 90% at 100% 0%, ${alpha(item.color, 0.16)}, transparent 60%), rgba(12,17,50,0.62)`,
              } as React.CSSProperties}
            >
              {/* Top accent: draws in once the card has landed */}
              <div
                className="mo-grow-x-l"
                style={{
                  position: 'absolute',
                  top: -1,
                  right: 24,
                  left: 24,
                  height: '2px',
                  borderRadius: '2px',
                  background: `linear-gradient(270deg, ${item.color}, ${alpha(item.color, 0)})`,
                  boxShadow: `0 0 12px ${alpha(item.color, 0.8)}`,
                  animationDelay: `${0.4 + i * 0.1}s`,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                {/* Icon */}
                <div
                  style={{
                    width: 'clamp(48px, 5cqw, 60px)',
                    height: 'clamp(48px, 5cqw, 60px)',
                    borderRadius: '14px',
                    background: `linear-gradient(160deg, ${alpha(item.color, 0.3)}, ${alpha(item.color, 0.08)})`,
                    border: `1px solid ${alpha(item.color, 0.5)}`,
                    boxShadow: `0 0 24px -4px ${alpha(item.color, 0.6)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={24} style={{ color: textOn(item.color) }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Chapter badge */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      background: alpha(item.color, 0.14),
                      border: `1px solid ${alpha(item.color, 0.35)}`,
                      fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)',
                      fontWeight: 700,
                      color: textOn(item.color),
                      fontFamily: "'Heebo', sans-serif",
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span style={{ fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace" }}>{item.num}</span>
                    <span>·</span>
                    <span>{item.chapter}</span>
                  </div>

                  {/* Question */}
                  <p
                    style={{
                      color: 'rgba(246,242,234,0.9)',
                      fontSize: 'clamp(1.5rem, 2.2cqw, 2.1rem)',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      fontFamily: "'DM Sans', 'Heebo', sans-serif",
                      margin: '0 0 0.5rem',
                      textWrap: 'balance',
                    }}
                  >
                    {item.q}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      color: 'rgba(246,242,234,0.74)',
                      fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)',
                      lineHeight: 1.5,
                      fontFamily: "'DM Sans', 'Heebo', sans-serif",
                      margin: 0,
                      textWrap: 'balance',
                    } as React.CSSProperties}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p
          className="animate-fade-in stagger-9"
          style={{
            color: 'rgba(246,242,234,0.78)',
            fontSize: 'clamp(1.1rem, 1.6cqw, 1.5rem)',
            textWrap: 'balance',
            textAlign: 'center',
            fontFamily: "'DM Sans', 'Heebo', sans-serif",
          }}
        >
          המטרה: לצאת מכאן עם תהליך למידה אחד שאפשר לבדוק כבר השבוע
        </p>
      </div>
    </SceneBase>
  );
}
