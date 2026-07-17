/**
 * S03: Audience Question - Where does your time go?
 * CONFERENCE HALL EDITION: Centered layout, large text, full screen usage
 */
import { useState } from 'react';
import { BarChart3, Calendar, CheckCircle2, PenLine, RefreshCw, Search, TrendingUp, UserPlus } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const OPTIONS = [
  { id: 'coordination', label: 'תיאומים ותזכורות', icon: RefreshCw },
  { id: 'writing', label: 'כתיבה חוזרת', icon: PenLine },
  { id: 'data-entry', label: 'הזנת נתונים', icon: BarChart3 },
  { id: 'searching', label: 'חיפוש מידע', icon: Search },
  { id: 'approvals', label: 'מעקב אחר אישורים', icon: CheckCircle2 },
  { id: 'onboarding', label: 'קליטת עובדים', icon: UserPlus },
  { id: 'reporting', label: 'הכנת דוחות', icon: TrendingUp },
  { id: 'scheduling', label: 'תיאום פגישות', icon: Calendar },
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
            fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.12em',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            שאלה לקהל
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 6cqw, 5.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'white',
            margin: 0,
            lineHeight: 1.1,
          }}>
            איפה הזמן שלכם נעלם?
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.62)',
            marginTop: '0.75rem',
            fontSize: 'clamp(1.2rem, 1.8cqw, 1.7rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            בחרו עד שלושה תחומים
          </p>
        </div>

        {/* Options grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)',
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
                  padding: 'clamp(1.25rem, 2cqw, 2rem)',
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
                <div style={{ fontSize: 'clamp(2rem, 3.5cqw, 3rem)', marginBottom: '0.625rem' }}><opt.icon size="1em" /></div>
                <p style={{
                  fontSize: 'clamp(1.1rem, 1.8cqw, 1.7rem)',
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
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(1.1rem, 1.6cqw, 1.5rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            בחרתם {audienceSelections.length} תחומים, נחזור אליהם בסוף
          </p>
        )}
      </div>
    </SceneBase>
  );
}
