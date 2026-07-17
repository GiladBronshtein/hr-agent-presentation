/**
 * S07: Anatomy of an Agent
 * Design: AI-Native UI: hexagonal component grid, interactive detail panel
 */
import { useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { Target, BookOpen, Brain, Wrench, Database, ShieldAlert, UserCheck } from 'lucide-react';

const COMPONENTS = [
  { id: 'goal', Icon: Target, label: 'מטרה', color: '#6366F1', detail: 'הגדרה ברורה של מה צריך להשיג. "עזור ל-HR" לא מספיק. "הכן תוכנית קליטה מאושרת לפני יום ראשון", זו מטרה.', required: true },
  { id: 'context', Icon: BookOpen, label: 'הקשר', color: '#10B981', detail: 'מה האייג׳נט יודע: פרופיל תפקיד, מדריך צוות, זמינות מנהל, מדיניות ארגונית. הקשר טוב = תוצאה טובה.', required: true },
  { id: 'model', Icon: Brain, label: 'מודל', color: '#A78BFA', detail: 'מנוע ההבנה והבחירה. Claude, GPT-4, Gemini, כל אחד עם חוזקות שונות. הבחירה תלויה במשימה.', required: true },
  { id: 'tools', Icon: Wrench, label: 'כלים', color: '#F59E0B', detail: 'מה מותר לגעת בו: Google Docs, Calendar, Jira, Gmail. כל כלי מוגדר עם הרשאות ספציפיות.', required: true },
  { id: 'memory', Icon: Database, label: 'זיכרון', color: '#22D3EE', detail: 'מה נשמר בין פעולות: מה כבר נעשה, מה עוד חסר, מה הוחלט. בלי זיכרון, האייג׳נט מתחיל מחדש בכל פעם.', required: false },
  { id: 'limits', Icon: ShieldAlert, label: 'גבולות', color: '#F43F5E', detail: 'מה אסור: גישה לשכר, מידע רפואי, שליחה ללא אישור, שינוי נתוני HRIS. גבולות ברורים = מערכת אמינה.', required: true },
  { id: 'approval', Icon: UserCheck, label: 'אישור', color: '#34D399', detail: 'מתי עוצרים לאדם: לפני שליחת מייל, יצירת אירוע, מתן הרשאה. Human-in-the-loop הוא עיצוב, לא פשרה.', required: true },
];

export default function S07_Anatomy() {
  const [selected, setSelected] = useState<string | null>('goal');
  const selectedComp = COMPONENTS.find(c => c.id === selected);

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
          gap: '1.75rem',
        }}
      >
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '0.5rem' }}>
            7 רכיבים · לחצו לפרטים
          </p>
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
            אנטומיה של אייג׳נט
          </h1>
        </div>

        {/* Main content: components + detail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '900px',
          }}
        >
          {/* Component grid */}
          <div
            className="animate-fade-in-up stagger-2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.625rem',
              alignContent: 'start',
            }}
          >
            {COMPONENTS.map((comp, i) => {
              const isSelected = selected === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelected(isSelected ? null : comp.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.875rem 0.5rem',
                    borderRadius: '14px',
                    background: isSelected ? comp.color + '14' : 'rgba(255,255,255,0.03)',
                    border: isSelected ? `1px solid ${comp.color}40` : '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    transition: 'all 200ms cubic-bezier(0.23, 1, 0.32, 1)',
                    transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: isSelected ? `0 0 20px ${comp.color}20` : 'none',
                    position: 'relative',
                    animationDelay: `${0.1 + i * 0.05}s`,
                    animationFillMode: 'both',
                    opacity: 0,
                  }}
                  className="animate-fade-in-up"
                >
                  {/* Required indicator */}
                  {comp.required && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: comp.color,
                        opacity: 0.7,
                      }}
                    />
                  )}
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: comp.color + '15',
                      border: `1px solid ${comp.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <comp.Icon size={16} style={{ color: comp.color }} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: isSelected ? comp.color : 'rgba(255,255,255,0.6)',
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: 'center',
                    }}
                  >
                    {comp.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            className="animate-fade-in-up stagger-3"
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              background: selectedComp ? selectedComp.color + '0A' : 'rgba(255,255,255,0.02)',
              border: selectedComp ? `1px solid ${selectedComp.color}25` : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '200px',
            }}
          >
            {selectedComp ? (
              <div style={{ animation: 'fadeInUp 0.3s ease both' }}>
                {/* Icon + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: selectedComp.color + '18',
                      border: `1px solid ${selectedComp.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <selectedComp.Icon size={20} style={{ color: selectedComp.color }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '2.6rem',
                        fontWeight: 700,
                        color: selectedComp.color,
                        margin: 0,
                      }}
                    >
                      {selectedComp.label}
                    </h3>
                    {selectedComp.required && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          color: selectedComp.color + '90',
                          fontFamily: "'Space Grotesk', sans-serif",
                          letterSpacing: '0.08em',
                        }}
                      >
                        חובה
                      </span>
                    )}
                  </div>
                </div>

                <p
                  style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1.65rem',
                    lineHeight: 1.65,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: 0,
                  }}
                >
                  {selectedComp.detail}
                </p>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '2.1rem', fontFamily: "'DM Sans', sans-serif" }}>
                  בחרו רכיב לפרטים
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Warning footer */}
        <div
          className="animate-fade-in stagger-9"
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            background: 'rgba(244,63,94,0.07)',
            border: '1px solid rgba(244,63,94,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            maxWidth: '600px',
          }}
        >
          <ShieldAlert size={14} style={{ color: '#F43F5E', flexShrink: 0 }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
            חסר רכיב אחד, המערכת לא שלמה. <span style={{ color: '#F43F5E', fontWeight: 600 }}>גבולות ואישור</span> הם הכי חשובים.
          </p>
        </div>
      </div>
    </SceneBase>
  );
}
