/**
 * S03: Audience Question: where does our L&D time go?
 * CONFERENCE HALL EDITION: Centered layout, large text, full screen usage
 */
import { useState } from 'react';
import { BellRing, GraduationCap, MessageCircle, PenLine, Presentation, Search, TrendingUp, Users } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

// Ids are stable keys shared with the closing slide (S50 AUDIENCE_LABELS).
const OPTIONS = [
  { id: 'searching', label: 'אבחון צרכים', icon: Search, color: '#F2A93B' },
  { id: 'writing', label: 'פיתוח תוכן', icon: PenLine, color: '#F3EEE4' },
  { id: 'scheduling', label: 'תיאום עם מומחים', icon: Users, color: '#F2A93B' },
  { id: 'data-entry', label: 'ניהול LMS', icon: GraduationCap, color: '#F2A93B' },
  { id: 'coordination', label: 'תזכורות ומעקב', icon: BellRing, color: '#F2A93B' },
  { id: 'approvals', label: 'שאלות חוזרות', icon: MessageCircle, color: '#F2A93B' },
  { id: 'reporting', label: 'דוחות ומדידה', icon: TrendingUp, color: '#F2A93B' },
  { id: 'onboarding', label: 'הדרכה מול קהל', icon: Presentation, color: '#8A93A8' },
];

export default function S03_AudienceQuestion() {
  const { audienceSelections, toggleAudienceSelection } = usePresentationStore();

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
          padding: 'clamp(2rem, 4cqw, 4rem) clamp(3rem, 7cqw, 8rem) clamp(5rem, 8cqw, 7rem)',
          gap: 'clamp(1.5rem, 2.5cqw, 2.5rem)',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
            fontWeight: 600,
            color: 'rgba(243,238,228,0.62)',
            fontFamily: "'Heebo', sans-serif",
            marginBottom: '0.75rem',
          }}>
            שאלה לקהל
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 6cqw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#F3EEE4',
            margin: 0,
            lineHeight: 1.1,
          }}>
            לאן הולך הזמן שלנו?
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginTop: '0.875rem' }}>
            <p style={{
              color: 'rgba(243,238,228,0.62)',
              margin: 0,
              fontSize: 'clamp(1.2rem, 1.8cqw, 1.7rem)',
              fontFamily: "'Heebo', sans-serif",
            }}>
              אפשר לבחור עד שלושה תחומים שלוקחים הכי הרבה שעות
            </p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[0, 1, 2].map((slot) => {
                const filled = slot < audienceSelections.length;
                const color = filled ? OPTIONS.find(o => o.id === audienceSelections[slot])?.color || '#F2A93B' : 'transparent';
                return (
                  <span key={slot} style={{
                    width: 'clamp(14px, 1.4cqw, 18px)', height: 'clamp(14px, 1.4cqw, 18px)', borderRadius: '50%',
                    background: color,
                    border: filled ? 'none' : '2px solid rgba(243,238,228,0.25)',
                    transition: 'all 0.3s ease',
                    animation: filled ? 'popIn 0.35s cubic-bezier(0.23,1,0.32,1) both' : 'none',
                  }} />
                );
              })}
            </div>
          </div>
        </div>

        {/* Options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)',
          width: '100%',
          maxWidth: '1320px',
        }}>
          {OPTIONS.map((opt, i) => {
            const isSelected = audienceSelections.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleAudienceSelection(opt.id)}
                className="interactive-card mo-rise"
                style={{
                  animationDelay: `${0.25 + i * 0.045}s`,
                  padding: 'clamp(1.5rem, 2.6cqh, 2.4rem) clamp(1.25rem, 2cqw, 2rem)',
                  borderRadius: '18px',
                  textAlign: 'center',
                  background: isSelected ? opt.color + '1A' : 'rgba(243,238,228,0.04)',
                  border: isSelected ? `1px solid ${opt.color}60` : '1px solid rgba(243,238,228,0.08)',
                }}
              >
                <div style={{ fontSize: 'clamp(2.2rem, 3.8cqw, 3.4rem)', marginBottom: '0.625rem', color: isSelected ? opt.color : 'rgba(243,238,228,0.65)', display: 'flex', justifyContent: 'center', transition: 'color 0.25s ease' }}><opt.icon size="1em" /></div>
                <p style={{
                  fontSize: 'clamp(1.15rem, 1.9cqw, 1.8rem)',
                  fontWeight: 600,
                  fontFamily: "'Heebo', sans-serif",
                  margin: 0,
                  color: isSelected ? '#F3EEE4' : 'rgba(243,238,228,0.75)',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                }}>
                  {opt.label}
                </p>
              </button>
            );
          })}
        </div>

        {audienceSelections.length > 0 && audienceSelections.length < 3 && (
          <p className="animate-fade-in" style={{
            textAlign: 'center',
            color: 'rgba(243,238,228,0.6)',
            fontSize: 'clamp(1.1rem, 1.6cqw, 1.5rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            סומנו {audienceSelections.length} מתוך 3
          </p>
        )}
        {audienceSelections.length === 3 && (
          <div style={{
            padding: 'clamp(0.75rem, 1.4cqh, 1.2rem) clamp(1.5rem, 2.6cqw, 2.5rem)',
            borderRadius: '100px',
            background: 'rgba(242,169,59,0.1)',
            border: '1px solid rgba(243,238,228,0.4)',
            animation: 'popIn 0.45s cubic-bezier(0.23,1,0.32,1) both',
          }}>
            <p style={{
              margin: 0, textAlign: 'center',
              color: '#F3EEE4', fontWeight: 700,
              fontSize: 'clamp(1.2rem, 1.9cqw, 1.8rem)',
              fontFamily: "'Heebo', sans-serif",
            }}>
              מעולה. ברוב התחומים האלה אייג׳נט יכול לעזור. נראה איך
            </p>
          </div>
        )}
      </div>
    </SceneBase>
  );
}
