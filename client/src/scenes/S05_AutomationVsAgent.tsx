/**
 * S05 — Automation vs Agent
 * Design: AI-Native UI — side-by-side comparison, interactive toggle, visual spectrum
 */
import { useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { Settings, Brain, ArrowRight, Check } from 'lucide-react';

const AUTOMATION_TRAITS = [
  'אם X קרה → עשה Y',
  'שלבים קבועים ומוגדרים',
  'לא מבינה הקשר',
  'מהירה ואמינה',
  'אין שיקול דעת',
];

const AGENT_TRAITS = [
  'מקבל מטרה, בוחר פעולות',
  'מבין הקשר ומתאים',
  'יודע מתי לעצור ולשאול',
  'מתועד ואחראי',
  'לומד מהניסיון',
];

export default function S05_AutomationVsAgent() {
  const [hover, setHover] = useState<'automation' | 'agent' | null>(null);

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
          padding: '3rem 3rem 5rem',
          gap: '2rem',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'white',
              margin: 0,
            }}
          >
            אוטומציה לעומת{' '}
            <span style={{
              background: 'linear-gradient(135deg, #818CF8, #6366F1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              אייג׳נט
            </span>
          </h1>
        </div>

        {/* Comparison cards */}
        <div
          className="animate-fade-in-up stagger-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '900px',
            alignItems: 'stretch',
          }}
        >
          {/* Automation card */}
          <div
            onMouseEnter={() => setHover('automation')}
            onMouseLeave={() => setHover(null)}
            style={{
              padding: '1.75rem',
              borderRadius: '20px',
              background: hover === 'automation' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hover === 'automation' ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'default',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Settings size={22} style={{ color: '#F59E0B' }} />
            </div>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#F59E0B',
                margin: '0 0 0.375rem',
              }}
            >
              אוטומציה
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", margin: '0 0 1.25rem' }}>
              מבצעת מסלול קבוע. מצוינת לתהליכים צפויים.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {AUTOMATION_TRAITS.map((trait) => (
                <div key={trait} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif" }}>
                    {trait}
                  </span>
                </div>
              ))}
            </div>

            {/* Example */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(245,158,11,0.07)',
                border: '1px solid rgba(245,158,11,0.15)',
              }}
            >
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#F59E0B', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                דוגמה
              </span>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', margin: '0.25rem 0 0', fontFamily: "'DM Sans', sans-serif" }}>
                עובד מילא טופס → שלח מייל אוטומטי
              </p>
            </div>
          </div>

          {/* Center divider */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0 0.5rem',
            }}
          >
            <div style={{ flex: 1, width: '1px', background: 'rgba(255,255,255,0.07)' }} />
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
            <div style={{ flex: 1, width: '1px', background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Agent card */}
          <div
            onMouseEnter={() => setHover('agent')}
            onMouseLeave={() => setHover(null)}
            style={{
              padding: '1.75rem',
              borderRadius: '20px',
              background: hover === 'agent' ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
              border: `1px solid ${hover === 'agent' ? 'rgba(99,102,241,0.35)' : 'rgba(255,255,255,0.08)'}`,
              transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'default',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <Brain size={22} style={{ color: '#818CF8' }} />
            </div>

            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#818CF8',
                margin: '0 0 0.375rem',
              }}
            >
              אייג׳נט
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", margin: '0 0 1.25rem' }}>
              מנהל מטרה. מתאים לתהליכים שדורשים הבנה ובחירה.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {AGENT_TRAITS.map((trait) => (
                <div key={trait} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={13} style={{ color: '#818CF8', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif" }}>
                    {trait}
                  </span>
                </div>
              ))}
            </div>

            {/* Example */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.15)',
              }}
            >
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
                דוגמה
              </span>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', margin: '0.25rem 0 0', fontFamily: "'DM Sans', sans-serif" }}>
                הכן תוכנית קליטה מותאמת ומאושרת לפני יום ראשון
              </p>
            </div>
          </div>
        </div>

        {/* Spectrum bar */}
        <div
          className="animate-fade-in stagger-7"
          style={{
            width: '100%',
            maxWidth: '900px',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ color: '#F59E0B', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>תהליך צפוי</span>
          <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'linear-gradient(90deg, rgba(245,158,11,0.6), rgba(99,102,241,0.6))', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 8px rgba(245,158,11,0.6)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#818CF8', boxShadow: '0 0 8px rgba(99,102,241,0.6)' }} />
          </div>
          <span style={{ color: '#818CF8', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>תהליך מורכב</span>
        </div>
      </div>
    </SceneBase>
  );
}
