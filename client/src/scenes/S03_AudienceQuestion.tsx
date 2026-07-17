/**
 * S03: Audience Question - Where does your time go?
 * CONFERENCE HALL EDITION: Centered layout, large text, full screen usage
 */
import { useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const OPTIONS = [
  { id: 'coordination', label: 'תיאומים ותזכורות', icon: '🔄' },
  { id: 'writing', label: 'כתיבה חוזרת', icon: '✍️' },
  { id: 'data-entry', label: 'הזנת נתונים', icon: '📊' },
  { id: 'searching', label: 'חיפוש מידע', icon: '🔍' },
  { id: 'approvals', label: 'מעקב אחר אישורים', icon: '✅' },
  { id: 'onboarding', label: 'קליטת עובדים', icon: '👋' },
  { id: 'reporting', label: 'הכנת דוחות', icon: '📈' },
  { id: 'scheduling', label: 'תיאום פגישות', icon: '📅' },
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
          padding: 'clamp(2rem, 4vw, 4rem) clamp(3rem, 7vw, 8rem) clamp(5rem, 8vw, 7rem)',
          gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.3rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.12em',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            שאלה לקהל
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'white',
            margin: 0,
            lineHeight: 1.1,
          }}>
            איפה הזמן שלכם נעלם?
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            marginTop: '0.75rem',
            fontSize: 'clamp(1.2rem, 1.8vw, 1.7rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            בחרו עד שלושה תחומים
          </p>
        </div>

        {/* Options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(0.75rem, 1.2vw, 1.25rem)',
          width: '100%',
          maxWidth: '1200px',
        }}>
          {OPTIONS.map((opt) => {
            const isSelected = audienceSelections.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleAudienceSelection(opt.id)}
                style={{
                  padding: 'clamp(1.25rem, 2vw, 2rem)',
                  borderRadius: '16px',
                  textAlign: 'center',
                  transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                  background: isSelected ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 24px rgba(99,102,241,0.25)' : 'none',
                }}
              >
                <div style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '0.625rem' }}>{opt.icon}</div>
                <p style={{
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.7rem)',
                  fontWeight: 600,
                  fontFamily: "'Heebo', sans-serif",
                  margin: 0,
                  color: isSelected ? '#818CF8' : 'rgba(255,255,255,0.75)',
                  lineHeight: 1.3,
                }}>
                  {opt.label}
                </p>
              </button>
            );
          })}
        </div>

        {audienceSelections.length > 0 && (
          <p className="animate-fade-in" style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            בחרתם {audienceSelections.length} תחומים, נחזור אליהם בסוף
          </p>
        )}
      </div>
    </SceneBase>
  );
}
