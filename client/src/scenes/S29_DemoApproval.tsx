/**
 * S29: Demo Approval: Human-in-the-Loop
 * Design: AI-Native UI: trust moment, approval card with textarea, clear approve/reject CTAs
 */
import { useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { UserCheck, CheckCircle, XCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

export default function S29_DemoApproval() {
  const { demoApprovalState, setDemoApprovalState, goNext } = usePresentationStore();
  const [comment, setComment] = useState('');

  const handleApprove = () => {
    setDemoApprovalState('approved');
    setTimeout(() => goNext(), 1800);
  };

  const handleReject = () => {
    setDemoApprovalState('rejected');
  };

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
          padding: '2.5rem 3rem 5rem',
          gap: '1.5rem',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.875rem',
              borderRadius: '100px',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)',
              marginBottom: '0.875rem',
            }}
          >
            <Clock size={12} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#F59E0B', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
              שלב 6 · HUMAN-IN-THE-LOOP
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'white',
              margin: 0,
            }}
          >
            האייג׳נט מחכה לאישורך
          </h1>
        </div>

        {/* Pending state */}
        {demoApprovalState === 'pending' && (
          <div
            className="animate-fade-in-up stagger-2"
            style={{
              width: '100%',
              maxWidth: '640px',
              padding: '1.75rem',
              borderRadius: '20px',
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.2)',
              boxShadow: '0 0 40px rgba(245,158,11,0.08)',
            }}
          >
            {/* Agent summary */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(245,158,11,0.12)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1.7rem', color: 'white', margin: '0 0 0.25rem' }}>
                  תוכנית קליטה, יעל כהן
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.15rem', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                  האייג׳נט הכין תוכנית מלאה ומחכה לאישורך לפני שליחה
                </p>
              </div>
            </div>

            {/* Plan items */}
            <div
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.07)',
                marginBottom: '1.25rem',
              }}
            >
              {[
                'מייל ברוכים הבאים + קישור לפורטל',
                'פגישת Onboarding עם מנהל: 16/07 10:00',
                'הגדרת חשבונות: Jira, Slack, GitHub',
                'מסמך "30-60-90 ימים" ב-Google Drive',
                'פגישת היכרות עם הצוות: 17/07 14:00',
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.35rem 0',
                    borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(245,158,11,0.5)', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Comment field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.68rem', fontWeight: 600, color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em', display: 'block', marginBottom: '0.5rem' }}>
                הערות (אופציונלי)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="הוסיפו הערות לאייג׳נט לפני הביצוע..."
                rows={2}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '2.1rem',
                  fontFamily: "'DM Sans', sans-serif",
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  direction: 'rtl',
                  transition: 'border-color 200ms ease',
                }}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(245,158,11,0.35)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleApprove}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                <CheckCircle size={16} />
                אשר וצא לפועל
              </button>
              <button
                onClick={handleReject}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'rgba(244,63,94,0.08)',
                  border: '1px solid rgba(244,63,94,0.25)',
                  color: '#FB7185',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(244,63,94,0.14)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(244,63,94,0.08)'; }}
              >
                <XCircle size={16} />
                דחה ושלח לתיקון
              </button>
            </div>
          </div>
        )}

        {/* Approved state */}
        {demoApprovalState === 'approved' && (
          <div
            className="animate-scale-in"
            style={{
              textAlign: 'center',
              padding: '2.5rem',
              borderRadius: '20px',
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              maxWidth: '440px',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(16,185,129,0.15)',
                border: '2px solid rgba(16,185,129,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 32px rgba(16,185,129,0.25)',
              }}
            >
              <UserCheck size={28} style={{ color: '#34D399' }} />
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.375rem', fontWeight: 700, color: '#34D399', margin: '0 0 0.5rem' }}>
              אושר!
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              האייג׳נט מתחיל לבצע את התוכנית...
            </p>
          </div>
        )}

        {/* Rejected state */}
        {demoApprovalState === 'rejected' && (
          <div
            className="animate-scale-in"
            style={{
              textAlign: 'center',
              padding: '2rem',
              borderRadius: '20px',
              background: 'rgba(244,63,94,0.07)',
              border: '1px solid rgba(244,63,94,0.2)',
              maxWidth: '440px',
              width: '100%',
            }}
          >
            <AlertTriangle size={36} style={{ color: '#F43F5E', margin: '0 auto 1rem', display: 'block' }} />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.6rem', fontWeight: 700, color: '#F43F5E', margin: '0 0 0.5rem' }}>
              נדחה, האייג׳נט ישנה ויחזור
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif", margin: '0 0 1.25rem' }}>
              זה בדיוק המנגנון: האדם שולט, האייג׳נט מתאים
            </p>
            <button
              onClick={() => setDemoApprovalState('pending')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.82rem',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              נסה שוב
            </button>
          </div>
        )}

        {/* Insight */}
        <div
          className="animate-fade-in stagger-7"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.625rem 1rem',
            borderRadius: '10px',
            background: 'rgba(99,102,241,0.07)',
            border: '1px solid rgba(99,102,241,0.18)',
            maxWidth: '560px',
          }}
        >
          <UserCheck size={14} style={{ color: '#818CF8', flexShrink: 0 }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            Human-in-the-Loop הוא <span style={{ color: '#818CF8', fontWeight: 600 }}>עיצוב מכוון</span>, לא פשרה, הוא מה שהופך אייג׳נט לאמין
          </p>
        </div>
      </div>
    </SceneBase>
  );
}
