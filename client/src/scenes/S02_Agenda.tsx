/**
 * S02: Agenda: Four Questions
 * Design: AI-Native UI: bento grid layout, chapter color coding, glassmorphic cards
 * CONFERENCE HALL EDITION: All text sizes bumped for large screen readability
 */
import { SceneBase } from '../components/presentation/SceneBase';
import { BookOpen, Layers, Wrench, Rocket } from 'lucide-react';

const QUESTIONS = [
  {
    num: '01',
    q: 'מה ההבדל בין אוטומציה לאייג׳נט?',
    chapter: 'להבין',
    color: '#6366F1',
    Icon: BookOpen,
    desc: 'הגדרות, אנטומיה, ומדד בשלות',
  },
  {
    num: '02',
    q: 'איפה אייג׳נטים יכולים לעזור ב-HR?',
    chapter: 'לראות',
    color: '#0891B2',
    Icon: Layers,
    desc: '9 שימושים מגיוס עד שימור',
  },
  {
    num: '03',
    q: 'איך בונים אייג׳נט אחראי?',
    chapter: 'לבנות',
    color: '#10B981',
    Icon: Wrench,
    desc: 'דמו חי, ארכיטקטורה, ממשל',
  },
  {
    num: '04',
    q: 'איך מתחילים בארגון שלנו?',
    chapter: 'להטמיע',
    color: '#F59E0B',
    Icon: Rocket,
    desc: 'פיילוט 90 יום, מדידה, ROI',
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
          <p
            style={{
              fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.12em',
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
            }}
          >
            ארבע שאלות שנענה עליהן
          </p>
          <h1
            style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3rem, 6cqw, 5.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'white',
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
              className="animate-fade-in-up"
              style={{
                animationDelay: `${0.1 + i * 0.1}s`,
                animationFillMode: 'both',
                opacity: 0,
                padding: 'clamp(1.5rem, 2.5cqw, 2.5rem)',
                borderRadius: '20px',
                background: item.color + '0A',
                border: `1px solid ${item.color}22`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  left: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${item.color}60, transparent)`,
                }}
              />

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                {/* Icon */}
                <div
                  style={{
                    width: 'clamp(48px, 5cqw, 60px)',
                    height: 'clamp(48px, 5cqw, 60px)',
                    borderRadius: '14px',
                    background: item.color + '15',
                    border: `1px solid ${item.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <item.Icon size={24} style={{ color: item.color }} />
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
                      background: item.color + '15',
                      border: `1px solid ${item.color}25`,
                      fontSize: 'clamp(1rem, 1.1cqw, 1rem)',
                      fontWeight: 700,
                      color: item.color,
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '0.06em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span style={{ fontFamily: 'monospace' }}>{item.num}</span>
                    <span>·</span>
                    <span>{item.chapter}</span>
                  </div>

                  {/* Question */}
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: 'clamp(1.5rem, 2.2cqw, 2.1rem)',
                      fontWeight: 700,
                      lineHeight: 1.4,
                      fontFamily: "'DM Sans', 'Heebo', sans-serif",
                      margin: '0 0 0.5rem',
                    }}
                  >
                    {item.q}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.62)',
                      fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)',
                      lineHeight: 1.5,
                      fontFamily: "'DM Sans', 'Heebo', sans-serif",
                      margin: 0,
                    }}
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
            color: 'rgba(255,255,255,0.3)',
            fontSize: 'clamp(1.1rem, 1.6cqw, 1.5rem)',
            textAlign: 'center',
            fontFamily: "'DM Sans', 'Heebo', sans-serif",
          }}
        >
          המטרה: לצאת עם רעיון אחד שאפשר להתחיל לבדוק כבר השבוע
        </p>
      </div>
    </SceneBase>
  );
}
