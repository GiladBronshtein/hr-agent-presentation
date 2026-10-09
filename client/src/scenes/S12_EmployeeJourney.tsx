/**
 * S12: Employee Journey
 * Conference Hall Edition - full-screen, RTL arrows, massive cards
 */
import { useState } from 'react';
import { Bot, DoorOpen, MessageCircle, Target, TrendingUp, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneBase, SceneEyebrow, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

type RiskLevel = 'low' | 'medium' | 'high';

const STAGES: {
  id: string; label: string; icon: LucideIcon; risk: RiskLevel;
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
    agents: ['שירות HR', 'תובנות'],
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
    agents: ['תוכנית קליטה', 'הכנת שיחות ניהול'],
    description: 'Onboarding מותאם, ציוד, גישות, הכנת הצוות',
    color: '#F59E0B',
  },
  {
    id: 'attract', label: 'גיוס', icon: Target, risk: 'low',
    agents: ['פתיחת משרה', 'חוויית מועמדות'],
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
        justifyContent: 'center', alignItems: 'center',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <SceneEyebrow color="#67E8F9">פרק שני: לראות</SceneEyebrow>
          <SceneTitle size="md">מסע ההעסקה</SceneTitle>
          <SceneSubtitle>לחיצה על שלב לפרטים</SceneSubtitle>
        </div>

        {/* Journey Steps - RTL: right to left = גיוס → קליטה → פיתוח → מעורבות → עזיבה */}
        <div style={{
          display: 'flex', alignItems: 'stretch',
          gap: 'clamp(0.5rem, 1cqw, 1rem)',
          justifyContent: 'center',
          flex: '0 0 auto',
        }}>
          {STAGES.slice().reverse().map((stage, i, arr) => (
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
                  fontSize: 'clamp(1.1rem, 1.5cqw, 1.6rem)',
                  fontWeight: 700,
                  color: selected === stage.id ? '#fff' : 'rgba(255,255,255,0.7)',
                }}>{stage.label}</span>
                <div style={{
                  width: 'clamp(6px, 0.8cqw, 10px)', height: 'clamp(6px, 0.8cqw, 10px)',
                  borderRadius: '50%', background: stage.color,
                  boxShadow: selected === stage.id ? `0 0 10px ${stage.color}` : 'none',
                }} />
              </button>
              {/* RTL arrow: ← pointing right-to-left */}
              {i < arr.length - 1 && (
                <span aria-hidden className="mo-wipe-rtl" style={{
                  color: 'rgba(255,255,255,0.5)',
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
          background: sel.color + '0D',
          border: `1px solid ${sel.color}30`,
          boxShadow: `0 0 40px ${sel.color}10`,
          transition: 'all 0.3s ease',
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          alignItems: 'center',
          gap: 'clamp(1.25rem, 3cqw, 3rem)',
        }}>
          {/* Content re-keys on selection so a new stage crossfades in */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.4cqw, 1.25rem)', minWidth: 0 }}>
            <div key={`${sel.id}-head`} className="mo-rise-sm" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 'clamp(2rem, 3cqw, 3rem)', display: 'inline-flex', color: sel.color }}><sel.icon size="1em" /></span>
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
                background: sel.color + '20', color: textTint(sel.color),
                border: `1px solid ${sel.color}40`,
              }}>{RISK_LABELS[sel.risk]}</span>
            </div>

            <p key={`${sel.id}-desc`} className="mo-rise-sm" style={{
              animationDelay: '0.04s',
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1.2rem, 1.56cqw, 1.875rem)',
              color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5,
              textWrap: 'pretty',
            } as React.CSSProperties}>{sel.description}</p>
          </div>

          <div key={`${sel.id}-agents`} className="mo-rise-sm" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 0.8cqw, 0.75rem)', animationDelay: '0.08s', minWidth: 0 }}>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(255,255,255,0.62)' }}>אייג׳נטים בשלב הזה</span>
            {sel.agents.map(a => (
              <span key={a} style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1.15rem, 1.4cqw, 1.6rem)',
                padding: 'clamp(0.5rem, 0.8cqw, 0.75rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', gap: '0.5em',
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
                fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
                color: 'rgba(255,255,255,0.68)',
              }}>{RISK_LABELS[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
