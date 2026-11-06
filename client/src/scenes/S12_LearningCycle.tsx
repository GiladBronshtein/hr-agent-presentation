/**
 * S12: The learning cycle (ADDIE in plain Hebrew) with the agent that helps
 * at each stage. RTL arrows, large stage cards, click a stage for its detail
 * panel. Every stage owns its CYCLE_COLORS hue, the same one its agents
 * use on the agent map and the agent slides.
 */
import { useState } from 'react';
import { Bot, ClipboardCheck, Hammer, PlayCircle, RefreshCw, Search, UserCheck, Map as MapIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneBase, SceneEyebrow, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { SourceChip } from '../components/presentation/SourceChip';
import { CYCLE_COLORS, alpha, textOn } from '../lib/palette';

const textTint = textOn;

// Display order, first stage on the right (RTL).
const STAGES: {
  id: string; label: string; icon: LucideIcon;
  description: string; human: string; agents: { name: string; main?: boolean }[]; color: string; sourceId?: string;
}[] = [
  {
    id: 'diagnose', label: 'אבחון', icon: Search,
    description: 'מבינים מה הבעיה באמת, מתוך נתונים ושיחות, ובודקים אם הדרכה היא בכלל הפתרון.',
    human: 'מחליטים אם צריך הדרכה או פתרון אחר',
    agents: [{ name: 'אייג׳נט לאבחון צרכים', main: true }, { name: 'אייג׳נט למיפוי מיומנויות' }],
    color: CYCLE_COLORS[0],
  },
  {
    id: 'design', label: 'תכנון', icon: MapIcon,
    description: 'קובעים מטרות למידה, רצף ומסלול שמתחיל מהידע שכבר קיים אצל כל אחד.',
    human: 'מאשרים מטרות ומדד הצלחה עסקי',
    agents: [{ name: 'אייג׳נט למסלול למידה אישי', main: true }],
    color: CYCLE_COLORS[1],
  },
  {
    id: 'develop', label: 'פיתוח', icon: Hammer,
    description: 'הופכים ידע של מומחים ליחידות קצרות, שאלות בכמה רמות ותרחישים מהשטח.',
    human: 'מומחה תוכן בודק ומאשר כל יחידה',
    agents: [{ name: 'אייג׳נט לפיתוח תוכן', main: true }, { name: 'אייג׳נט לשימור ידע' }],
    color: CYCLE_COLORS[2],
  },
  {
    id: 'implement', label: 'הפעלה', icon: PlayCircle,
    description: 'רישום ותזכורות, תרגול בסימולציה, תשובות קצרות בתוך העבודה וליווי בקליטה.',
    human: 'מאשרים כל הודעה לפני שהיא יוצאת לצוות',
    agents: [{ name: 'אייג׳נט לתרגול בסימולציה', main: true }, { name: 'אייג׳נט ללמידה בתוך העבודה' }, { name: 'אייג׳נט לקליטה לומדת' }],
    color: CYCLE_COLORS[3],
  },
  {
    id: 'evaluate', label: 'הערכה', icon: ClipboardCheck,
    description: 'בודקים מה השתנה בארבע רמות: תגובה, למידה, התנהגות ותוצאות.',
    sourceId: 'kirkpatrick-model',
    human: 'מפרשים את הנתונים ומחליטים מה לשפר',
    agents: [{ name: 'אייג׳נט למדידת אימפקט', main: true }],
    color: CYCLE_COLORS[4],
  },
];

export default function S12_LearningCycle() {
  const [selected, setSelected] = useState<string>('diagnose');
  const selIndex = STAGES.findIndex(s => s.id === selected);
  const sel = STAGES.find(s => s.id === selected)!;

  return (
    <SceneBase chapterColor={sel.color}>

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: 'clamp(1.5rem, 3cqw, 3rem) clamp(2rem, 5cqw, 6rem) clamp(5rem, 8cqw, 7rem)',
        boxSizing: 'border-box',
        gap: 'clamp(1.25rem, 2.5cqw, 2.5rem)',
        justifyContent: 'center', alignItems: 'center',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <SceneEyebrow>פרק שני: לראות</SceneEyebrow>
          <SceneTitle size="md">מחזור הלמידה</SceneTitle>
          <SceneSubtitle>אייג׳נט יכול לעזור בכל שלב. לחיצה על שלב לפרטים</SceneSubtitle>
        </div>

        {/* Cycle stages, RTL: right to left = אבחון, תכנון, פיתוח, הפעלה, הערכה */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          gap: 'clamp(0.5rem, 1cqw, 1rem)',
          justifyContent: 'center',
          flex: '0 0 auto',
        }}>
          {STAGES.map((stage, i, arr) => (
            <div key={stage.id} className="mo-rise" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1cqw, 1rem)', animationDelay: `${0.15 + i * 0.16}s` }}>
              <button
                onClick={() => setSelected(stage.id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: 'clamp(0.5rem, 0.8cqw, 0.75rem)',
                  padding: 'clamp(1rem, 1.8cqw, 1.75rem) clamp(1.25rem, 2cqw, 2rem)',
                  borderRadius: '16px',
                  minWidth: 'clamp(100px, 13cqw, 160px)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                  background: selected === stage.id
                    ? `linear-gradient(165deg, ${alpha(stage.color, 0.3)}, ${alpha(stage.color, 0.08)}), #0B1030`
                    : `linear-gradient(165deg, ${alpha(stage.color, 0.1)}, transparent 60%), rgba(12,17,50,0.65)`,
                  border: selected === stage.id
                    ? `2px solid ${alpha(stage.color, 0.8)}`
                    : `1px solid ${alpha(stage.color, 0.28)}`,
                  boxShadow: selected === stage.id ? `0 0 40px -8px ${alpha(stage.color, 0.8)}, 0 18px 40px -20px rgba(0,0,0,0.8)` : '0 14px 30px -20px rgba(0,0,0,0.8)',
                  transform: selected === stage.id ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
                }}
              >
                <span style={{ fontSize: 'clamp(2rem, 3.5cqw, 3.5rem)', lineHeight: 1, display: 'inline-flex', color: textOn(stage.color), filter: selected === stage.id ? `drop-shadow(0 0 12px ${alpha(stage.color, 0.9)})` : 'none' }}><stage.icon size="1em" /></span>
                <span style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 'clamp(1.1rem, 1.5cqw, 1.6rem)',
                  fontWeight: 700,
                  color: selected === stage.id ? '#fff' : 'rgba(246,242,234,0.82)',
                }}>{stage.label}</span>
                <div style={{
                  width: 'clamp(6px, 0.8cqw, 10px)', height: 'clamp(6px, 0.8cqw, 10px)',
                  borderRadius: '50%', background: stage.color, boxShadow: `0 0 10px ${stage.color}`,
                }} />
              </button>
              {/* RTL arrow: ← pointing right-to-left */}
              {i < arr.length - 1 && (
                <span aria-hidden className="mo-wipe-rtl" style={{
                  color: textOn(arr[i + 1].color),
                  textShadow: `0 0 12px ${alpha(arr[i + 1].color, 0.8)}`,
                  fontSize: 'clamp(1.2rem, 2cqw, 2rem)',
                  flexShrink: 0,
                  userSelect: 'none',
                  animationDelay: `${0.35 + i * 0.16}s`,
                }}>←</span>
              )}
            </div>
          ))}
        </div>

        {/* Detail Panel: matches the journey row width; stage summary on the
            reading side, its agents on the other */}
        <div className="mo-rise" style={{
          animationDelay: '0.95s',
          width: '100%', maxWidth: '1180px',
          minHeight: 'clamp(180px, 24cqh, 260px)',
          padding: 'clamp(1.25rem, 2.5cqw, 2.5rem) clamp(1.5rem, 3cqw, 3rem)',
          borderRadius: '20px',
          background: `linear-gradient(160deg, ${alpha(sel.color, 0.14)}, ${alpha(sel.color, 0.03)} 60%), rgba(12,17,50,0.66)`,
          border: `1px solid ${alpha(sel.color, 0.42)}`,
          boxShadow: `0 0 70px -30px ${sel.color}, inset 0 1px 0 ${alpha(sel.color, 0.3)}`,
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          alignItems: 'center',
          gap: 'clamp(1.25rem, 3cqw, 3rem)',
        }}>
          {/* Content re-keys on selection so a new stage crossfades in */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.4cqw, 1.25rem)', minWidth: 0 }}>
            <div key={`${sel.id}-head`} className="mo-rise-sm" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(2rem, 3cqw, 3rem)', display: 'inline-flex', color: textOn(sel.color), filter: `drop-shadow(0 0 10px ${alpha(sel.color, 0.8)})` }}><sel.icon size="1em" /></span>
              <h3 style={{
                fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
                fontSize: 'clamp(1.5rem, 2.5cqw, 2.5rem)',
                fontWeight: 800, color: '#fff', margin: 0,
              }}>{sel.label}</h3>
              <span style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
                fontWeight: 600,
                padding: '0.35rem 1rem', borderRadius: '100px',
                background: alpha(sel.color, 0.18), color: textTint(sel.color),
                border: `1px solid ${alpha(sel.color, 0.45)}`,
              }}>שלב {selIndex + 1} מתוך {STAGES.length}</span>
            </div>

            <p key={`${sel.id}-desc`} className="mo-rise-sm" style={{
              animationDelay: '0.04s',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1.2rem, 1.56cqw, 1.875rem)',
              color: 'rgba(246,242,234,0.86)', margin: 0, lineHeight: 1.5,
              textWrap: 'pretty',
            } as React.CSSProperties}>{sel.description}{sel.sourceId && <>{' '}<SourceChip id={sel.sourceId} style={{ verticalAlign: 'middle' }} /></>}</p>

            <p key={`${sel.id}-human`} className="mo-rise-sm" style={{
              animationDelay: '0.06s',
              display: 'flex', alignItems: 'center', gap: '0.5em',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1.1rem, 1.4cqw, 1.6rem)',
              color: 'rgba(246,242,234,0.85)', margin: 0, lineHeight: 1.4,
            }}>
              <UserCheck size="1.1em" style={{ color: textTint(sel.color), flexShrink: 0 }} />
              <span style={{ textWrap: 'balance' } as React.CSSProperties}><strong style={{ color: textTint(sel.color) }}>ההחלטה שלנו:</strong> {sel.human}</span>
            </p>
          </div>

          <div key={`${sel.id}-agents`} className="mo-rise-sm" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 0.8cqw, 0.75rem)', animationDelay: '0.08s', minWidth: 0 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(246,242,234,0.76)' }}>מי עוזר בשלב הזה</span>
            {/* Main-track agents are primary; appendix agents are quieter */}
            {sel.agents.map(a => (
              <span key={a.name} style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: a.main ? 'clamp(1.15rem, 1.4cqw, 1.6rem)' : 'clamp(1rem, 1.15cqw, 1.3rem)',
                fontWeight: a.main ? 700 : 400,
                padding: a.main
                  ? 'clamp(0.5rem, 0.8cqw, 0.75rem) clamp(0.875rem, 1.4cqw, 1.25rem)'
                  : 'clamp(0.35rem, 0.55cqw, 0.5rem) clamp(0.75rem, 1.2cqw, 1rem)',
                borderRadius: '12px',
                background: a.main ? `linear-gradient(90deg, ${alpha(sel.color, 0.08)}, ${alpha(sel.color, 0.2)})` : 'rgba(12,17,50,0.5)',
                color: a.main ? 'rgba(246,242,234,0.95)' : 'rgba(246,242,234,0.78)',
                border: a.main ? `1px solid ${alpha(sel.color, 0.5)}` : '1px solid rgba(246,242,234,0.12)',
                boxShadow: a.main ? `0 0 24px -10px ${sel.color}` : 'none',
                display: 'flex', alignItems: 'center', gap: '0.5em',
              }}>
                <Bot size="1em" style={{ color: a.main ? textOn(sel.color) : 'rgba(246,242,234,0.66)', flexShrink: 0 }} /> {a.name}
              </span>
            ))}
          </div>
        </div>

        {/* Cycle note: evaluation feeds the next diagnosis */}
        <div className="mo-fade" style={{ animationDelay: '1.2s', display: 'flex', alignItems: 'center', gap: '0.6rem', justifyContent: 'center' }}>
          <RefreshCw className="fx-orbit" size="1.2em" style={{ color: textOn(CYCLE_COLORS[4]), flexShrink: 0, fontSize: 'clamp(1.05rem, 1.3cqw, 1.5rem)', animationDuration: '9s' }} />
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1.05rem, 1.3cqw, 1.5rem)',
            color: 'rgba(246,242,234,0.82)',
          }}>מה שלמדנו בהערכה מזין את האבחון הבא. זה מחזור, לא קו.</span>
          <SourceChip id="addie-model" />
        </div>
      </div>
    </SceneBase>
  );
}
