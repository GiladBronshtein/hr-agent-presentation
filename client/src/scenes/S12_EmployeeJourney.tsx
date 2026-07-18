/**
 * S12: Employee Journey
 * Conference Hall Edition — full-screen, RTL arrows, massive cards
 */
import { useState, useEffect } from 'react';
import { Bot, DoorOpen, MessageCircle, Target, TrendingUp, UserPlus } from 'lucide-react';
import { SceneBase, GhostWord } from '../components/presentation/SceneBase';

type RiskLevel = 'low' | 'medium' | 'high';

const STAGES: {
  id: string; label: string; icon: React.ElementType; risk: RiskLevel;
  agents: string[]; description: string; color: string;
}[] = [
  {
    id: 'exit', label: 'עזיבה', icon: DoorOpen, risk: 'high',
    agents: ['שימור ידע', 'ראיון יציאה'],
    description: 'תיעוד ידע, ראיון יציאה, העברת תפקיד',
    color: '#F43F5E',
  },
  {
    id: 'engage', label: 'מעורבות', icon: MessageCircle, risk: 'low',
    agents: ['שירות עובדים', 'תובנות'],
    description: 'סקרי מעורבות, תמיכה שוטפת, פולס-צ׳קים',
    color: '#10B981',
  },
  {
    id: 'develop', label: 'פיתוח', icon: TrendingUp, risk: 'medium',
    agents: ['למידה', 'מוביליות'],
    description: 'תוכניות למידה, מסלולי קריירה, מנטורינג',
    color: '#F59E0B',
  },
  {
    id: 'onboard', label: 'קליטה', icon: UserPlus, risk: 'medium',
    agents: ['תוכנית קליטה', 'הכנת מנהל'],
    description: 'Onboarding מותאם, ציוד, גישות, הכנת מנהל',
    color: '#F59E0B',
  },
  {
    id: 'attract', label: 'גיוס', icon: Target, risk: 'low',
    agents: ['פתיחת משרה', 'חוויית מועמד'],
    description: 'פרסום משרה, סינון קורות חיים, תיאום ראיונות',
    color: '#10B981',
  },
];

const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'סיכון נמוך',
  medium: 'דורש אישור',
  high: 'החלטה אנושית',
};

export default function S12_EmployeeJourney() {
  const [selected, setSelected] = useState<string>('onboard');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sel = STAGES.find(s => s.id === selected)!;

  return (
    <SceneBase noBg>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: '#03030A', zIndex: 0 }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(99,102,241,0.07) 0%, transparent 70%)',
      }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.6) 50%, transparent 100%)',
      }} />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        padding: 'clamp(1.5rem, 3cqw, 3rem) clamp(2rem, 5cqw, 6rem) clamp(5rem, 8cqw, 7rem)',
        boxSizing: 'border-box',
        gap: 'clamp(1.25rem, 2.5cqw, 2.5rem)',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1rem, 1cqw, 0.9rem)',
            fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(99,102,241,0.7)', marginBottom: '0.5rem',
          }}>פרק שני: לראות</p>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 5cqw, 5rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1,
            color: '#fff', margin: 0,
          }}>מסע העובד</h1>
          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.5cqw, 1.3rem)',
            color: 'rgba(255,255,255,0.6)', marginTop: '0.5rem',
          }}>לחצו על שלב לפרטים</p>
        </div>

        {/* Journey Steps — RTL: right to left = גיוס → קליטה → פיתוח → מעורבות → עזיבה */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          gap: 'clamp(0.5rem, 1cqw, 1rem)',
          justifyContent: 'center',
          flex: '0 0 auto',
        }}>
          {STAGES.slice().reverse().map((stage, i, arr) => (
            <div key={stage.id} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.5rem, 1cqw, 1rem)' }}>
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
                    ? stage.color + '18'
                    : 'rgba(255,255,255,0.04)',
                  border: selected === stage.id
                    ? `2px solid ${stage.color}60`
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: selected === stage.id
                    ? `0 0 30px ${stage.color}20, 0 8px 32px rgba(0,0,0,0.4)`
                    : '0 4px 16px rgba(0,0,0,0.3)',
                  transform: selected === stage.id ? 'translateY(-4px) scale(1.03)' : 'translateY(0) scale(1)',
                }}
              >
                <span style={{ fontSize: 'clamp(2rem, 3.5cqw, 3.5rem)', lineHeight: 1 }}><stage.icon size="1em" /></span>
                <span style={{
                  fontFamily: "'Heebo', sans-serif",
                  fontSize: 'clamp(1rem, 1.5cqw, 1.4rem)',
                  fontWeight: 700,
                  color: selected === stage.id ? '#fff' : 'rgba(255,255,255,0.6)',
                }}>{stage.label}</span>
                <div style={{
                  width: 'clamp(6px, 0.8cqw, 10px)', height: 'clamp(6px, 0.8cqw, 10px)',
                  borderRadius: '50%', background: stage.color,
                  boxShadow: selected === stage.id ? `0 0 10px ${stage.color}` : 'none',
                }} />
              </button>
              {/* RTL arrow: ← pointing right-to-left */}
              {i < arr.length - 1 && (
                <span style={{
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: 'clamp(1.2rem, 2cqw, 2rem)',
                  flexShrink: 0,
                  userSelect: 'none',
                }}>←</span>
              )}
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div style={{
          flex: 1,
          padding: 'clamp(1.25rem, 2.5cqw, 2.5rem) clamp(1.5rem, 3cqw, 3rem)',
          borderRadius: '20px',
          background: sel.color + '0D',
          border: `1px solid ${sel.color}30`,
          boxShadow: `0 0 40px ${sel.color}10`,
          transition: 'all 0.3s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          gap: 'clamp(1rem, 1.8cqw, 1.75rem)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'clamp(2rem, 3cqw, 3rem)' }}><sel.icon size="1em" /></span>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.5rem, 2.5cqw, 2.5rem)',
              fontWeight: 800, color: '#fff', margin: 0,
            }}>{sel.label}</h3>
            <span style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)',
              fontWeight: 600,
              padding: '0.35rem 1rem', borderRadius: '100px',
              background: sel.color + '20', color: sel.color,
              border: `1px solid ${sel.color}40`,
            }}>{RISK_LABELS[sel.risk]}</span>
          </div>

          <p style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.6cqw, 1.5rem)',
            color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6,
          }}>{sel.description}</p>

          <div style={{ display: 'flex', gap: 'clamp(0.5rem, 0.8cqw, 0.75rem)', flexWrap: 'wrap' }}>
            {sel.agents.map(a => (
              <span key={a} style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)',
                padding: 'clamp(0.4rem, 0.7cqw, 0.65rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.75)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'inline-flex', alignItems: 'center', gap: '0.4em',
              }}>
                <Bot size="1em" style={{ color: sel.color, flexShrink: 0 }} /> {a}
              </span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex', gap: 'clamp(1.5rem, 3cqw, 3rem)', justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {([['low', '#10B981'], ['medium', '#F59E0B'], ['high', '#F43F5E']] as const).map(([k, c]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              <span style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)',
                color: 'rgba(255,255,255,0.6)',
              }}>{RISK_LABELS[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
