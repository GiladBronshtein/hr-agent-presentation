/**
 * S43: Objections - the hard questions as big flip-style quote cards.
 * Click a quote: the card fills with its accent color and reveals the answer.
 */
import { useState } from 'react';
import { Quote, CornerDownLeft } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, TakeawayBar } from '../components/presentation/SceneBase';

const OBJECTIONS = [
  {
    q: 'אין לנו IT לזה',
    a: 'n8n ו-Make מאפשרים בנייה ללא קוד. פיילוט ראשון, שבועיים עם שני אנשים.',
    color: '#6366F1',
  },
  {
    q: 'עובדים יפחדו מ-AI',
    a: 'שקיפות פותרת פחד. כשעובד יודע שהאייג׳נט עוזר לו, לא מחליף, הוא שותף.',
    color: '#22D3EE',
  },
  {
    q: 'מה עם פרטיות?',
    a: 'הרשאות מינימליות + Audit Log + אישור אנושי. יותר בטוח מאשר מייל ידני.',
    color: '#10B981',
  },
  {
    q: 'זה יקר',
    a: 'פיילוט ראשון: ~$50 לחודש בכלים. ROI נמדד בשבועות.',
    color: '#F59E0B',
  },
  {
    q: 'מה אם האייג׳נט טועה?',
    a: 'לכן יש Approval Gates. האייג׳נט מציע, האדם מחליט.',
    color: '#F43F5E',
  },
  {
    q: 'ה-CISO לא יאשר',
    a: 'הציגו את ארכיטקטורת האמון: הרשאות מוגדרות, תיעוד מלא, ביקורת תקופתית.',
    color: '#A78BFA',
  },
];

export default function S43_Objections() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl flex flex-col" style={{ gap: 'clamp(1.25rem, 2.6cqh, 2.25rem)', paddingBottom: 'clamp(3rem, 5cqh, 4rem)' }}>
          <div style={{ textAlign: 'center' }}>
            <SceneTitle size="md">השאלות הקשות</SceneTitle>
            <p className="text-white/60" style={{ fontSize: 'clamp(1.1rem, 1.5cqw, 1.4rem)', marginTop: '0.4rem' }}>
              לחצו על שאלה לתשובה ישירה
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.875rem, 1.5cqw, 1.5rem)',
          }}>
            {OBJECTIONS.map((obj, i) => {
              const on = open === i;
              return (
                <button
                  key={i}
                  onClick={() => setOpen(on ? null : i)}
                  className="interactive-card"
                  style={{
                    minHeight: 'clamp(150px, 24cqh, 230px)',
                    padding: 'clamp(1.25rem, 2.2cqh, 1.9rem) clamp(1.1rem, 1.8cqw, 1.75rem)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem',
                    background: on ? obj.color + '1C' : 'rgba(255,255,255,0.035)',
                    border: on ? `1px solid ${obj.color}60` : '1px solid rgba(255,255,255,0.09)',
                    boxShadow: on ? `0 0 40px ${obj.color}30` : 'none',
                    animation: `fadeInUp 0.45s ease ${0.1 + i * 0.07}s both`,
                  }}
                >
                  {on ? (
                    <>
                      <span style={{ display: 'inline-flex', color: obj.color, fontSize: 'clamp(1.3rem, 1.8cqw, 1.7rem)', animation: 'popIn 0.3s ease both' }}>
                        <CornerDownLeft size="1em" />
                      </span>
                      <p style={{
                        margin: 0, fontFamily: "'Heebo', sans-serif",
                        fontSize: 'clamp(1.15rem, 1.7cqw, 1.6rem)', fontWeight: 600,
                        color: 'white', lineHeight: 1.5,
                        animation: 'fadeIn 0.35s ease 0.1s both',
                      }}>
                        {obj.a}
                      </p>
                    </>
                  ) : (
                    <>
                      <span style={{ display: 'inline-flex', color: obj.color + '99', fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)' }}>
                        <Quote size="1em" />
                      </span>
                      <p style={{
                        margin: 0, fontFamily: "'Heebo', sans-serif",
                        fontSize: 'clamp(1.35rem, 2.1cqw, 2rem)', fontWeight: 800,
                        color: 'rgba(255,255,255,0.88)', lineHeight: 1.35,
                      }}>
                        &rdquo;{obj.q}&rdquo;
                      </p>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </ContentLayout>
      <TakeawayBar>
        לכל חשש יש תשובה מעשית. <span style={{ color: '#F59E0B', fontWeight: 700 }}>הפחד הכי יקר הוא לא להתחיל.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
