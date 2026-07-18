/**
 * S03: Audience Question - Where does your time go?
 * CONFERENCE HALL EDITION: Centered layout, large text, full screen usage
 */
import { useState } from 'react';
import { BarChart3, Calendar, CheckCircle2, PenLine, RefreshCw, Search, TrendingUp, UserPlus } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const OPTIONS = [
  { id: 'coordination', label: 'תיאומים ותזכורות', icon: RefreshCw, color: '#6366F1' },
  { id: 'writing', label: 'כתיבה חוזרת', icon: PenLine, color: '#22D3EE' },
  { id: 'data-entry', label: 'הזנת נתונים', icon: BarChart3, color: '#10B981' },
  { id: 'searching', label: 'חיפוש מידע', icon: Search, color: '#F59E0B' },
  { id: 'approvals', label: 'מעקב אחר אישורים', icon: CheckCircle2, color: '#A78BFA' },
  { id: 'onboarding', label: 'קליטת עובדים', icon: UserPlus, color: '#F43F5E' },
  { id: 'reporting', label: 'הכנת דוחות', icon: TrendingUp, color: '#34D399' },
  { id: 'scheduling', label: 'תיאום פגישות', icon: Calendar, color: '#FCD34D' },
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.875rem', marginTop: '0.875rem' }}>
            <p style={{
              color: 'rgba(255,255,255,0.62)',
              margin: 0,
              fontSize: 'clamp(1.2rem, 1.8cqw, 1.7rem)',
              fontFamily: "'Heebo', sans-serif",
            }}>
              בחרו עד שלושה תחומים
            </p>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[0, 1, 2].map((slot) => {
                const filled = slot < audienceSelections.length;
                const color = filled ? OPTIONS.find(o => o.id === audienceSelections[slot])?.color || '#818CF8' : 'transparent';
                return (
                  <span key={slot} style={{
                    width: 'clamp(14px, 1.4cqw, 18px)', height: 'clamp(14px, 1.4cqw, 18px)', borderRadius: '50%',
                    background: color,
                    border: filled ? 'none' : '2px solid rgba(255,255,255,0.25)',
                    boxShadow: filled ? `0 0 12px ${color}90` : 'none',
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
          maxWidth: '1200px',
        }}>
          {OPTIONS.map((opt) => {
            const isSelected = audienceSelections.includes(opt.id);
            return (
              <button
                key={opt.id}
                onClick={() => toggleAudienceSelection(opt.id)}
                className="interactive-card"
                style={{
                  padding: 'clamp(1.5rem, 2.6cqh, 2.4rem) clamp(1.25rem, 2cqw, 2rem)',
                  borderRadius: '18px',
                  textAlign: 'center',
                  background: isSelected ? opt.color + '1A' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? `1px solid ${opt.color}60` : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isSelected ? `0 0 32px ${opt.color}30` : 'none',
                }}
              >
                <div style={{ fontSize: 'clamp(2.2rem, 3.8cqw, 3.4rem)', marginBottom: '0.625rem', color: isSelected ? opt.color : 'rgba(255,255,255,0.65)', display: 'flex', justifyContent: 'center', transition: 'color 0.25s ease' }}><opt.icon size="1em" /></div>
                <p style={{
                  fontSize: 'clamp(1.15rem, 1.9cqw, 1.8rem)',
                  fontWeight: 600,
                  fontFamily: "'Heebo', sans-serif",
                  margin: 0,
                  color: isSelected ? 'white' : 'rgba(255,255,255,0.75)',
                  lineHeight: 1.3,
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
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(1.1rem, 1.6cqw, 1.5rem)',
            fontFamily: "'Heebo', sans-serif",
          }}>
            בחרתם {audienceSelections.length} מתוך 3
          </p>
        )}
        {audienceSelections.length === 3 && (
          <div style={{
            padding: 'clamp(0.75rem, 1.4cqh, 1.2rem) clamp(1.5rem, 2.6cqw, 2.5rem)',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(6,182,212,0.12))',
            border: '1px solid rgba(99,102,241,0.4)',
            boxShadow: '0 0 40px rgba(99,102,241,0.25)',
            animation: 'popIn 0.45s cubic-bezier(0.23,1,0.32,1) both',
          }}>
            <p style={{
              margin: 0, textAlign: 'center',
              color: 'white', fontWeight: 700,
              fontSize: 'clamp(1.2rem, 1.9cqw, 1.8rem)',
              fontFamily: "'Heebo', sans-serif",
            }}>
              מעולה. בדיוק בתחומים האלה אייג׳נטים חזקים, נראה איך
            </p>
          </div>
        )}
      </div>
    </SceneBase>
  );
}
