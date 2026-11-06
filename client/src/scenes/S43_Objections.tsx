/**
 * S43: Objections - the hard questions as big flip-style quote cards.
 * Click a quote: the card fills with its accent color and reveals the answer.
 */
import { useState } from 'react';
import { Quote, CornerDownLeft } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, TakeawayBar } from '../components/presentation/SceneBase';

/** A Hebrew prefix glued to a Latin term (ה-LMS, מ-AI) never breaks at the hyphen */
const PREFIXED = /([\u0590-\u05FF]+-[A-Za-z0-9][\w.-]*[?.!]?)/;
const NoBreak = ({ text }: { text: string }) => (
  <>{text.split(PREFIXED).map((part, i) => (PREFIXED.test(part) ? <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span> : part))}</>
);

const OBJECTIONS = [
  {
    q: 'תוכן של AI הוא שטחי',
    a: 'בלי הקשר, נכון. עם מטרות למידה, קהל ותרחיש אמיתי, הטיוטה טובה. העומק מגיע מהמומחה שעורך.',
    color: '#F2A93B',
  },
  {
    q: 'זה יחליף את מי שמעצב למידה',
    a: 'זה מחליף את העבודה השחורה. האבחון, העיצוב והשיחה עם השטח נשארים אצלנו, וצריכים יותר מומחיות.',
    color: '#F3EEE4',
  },
  {
    q: 'ומה אם יש טעויות בתוכן?',
    a: 'זה קורה. לכן רק מקורות מאושרים, מקור ליד כל טענה, ומומחה תוכן מאשר לפני פרסום.',
    color: '#F2A93B',
  },
  {
    q: 'מה עם הפרטיות של מי שלומד?',
    a: 'נתונים מצטברים, בלי ציונים בשמות. ומסבירים מראש מה נאסף ולמה.',
    color: '#F2A93B',
  },
  {
    q: 'מומחי התוכן לא יסמכו על זה',
    a: 'נתחיל איתם: הם בוחרים את המקורות ומאשרים כל יחידה. כשטיוטה חוסכת להם ראיון של שעתיים, האמון מגיע.',
    color: '#8A93A8',
  },
  {
    q: 'אין לנו IT לזה',
    a: 'פיילוט ראשון אפשר לעשות עם עוזר AI וכלי תהליכים קיים, בלי קוד. שבועיים, שני אנשים.',
    color: '#F2A93B',
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
            <SceneSubtitle>החששות ששומעים בכל צוות L&D. לחיצה על שאלה לתשובה כנה</SceneSubtitle>
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
                  className="interactive-card mo-rise"
                  style={{
                    minHeight: 'clamp(150px, 24cqh, 230px)',
                    padding: 'clamp(1.25rem, 2.2cqh, 1.9rem) clamp(1.1rem, 1.8cqw, 1.75rem)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem',
                    background: on ? obj.color + '1C' : 'rgba(243,238,228,0.035)',
                    border: on ? `1px solid ${obj.color}60` : '1px solid rgba(243,238,228,0.09)',
                    animationDelay: `${0.1 + i * 0.06}s`,
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
                        color: '#F3EEE4', lineHeight: 1.5,
                        animation: 'fadeIn 0.35s ease 0.1s both',
                        textWrap: 'pretty',
                      } as React.CSSProperties}>
                        <NoBreak text={obj.a} />
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Opening-quote mark mirrored for RTL */}
                      <span aria-hidden style={{ display: 'inline-flex', color: obj.color, opacity: 0.8, fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)', transform: 'scaleX(-1)' }}>
                        <Quote size="1em" />
                      </span>
                      <p style={{
                        margin: 0, fontFamily: "'Heebo', sans-serif",
                        fontSize: 'clamp(1.35rem, 2.1cqw, 2rem)', fontWeight: 800,
                        color: 'rgba(243,238,228,0.9)', lineHeight: 1.35,
                        textWrap: 'balance',
                      } as React.CSSProperties}>
                        "<NoBreak text={obj.q} />"
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
        החששות האלה מוצדקים. <span style={{ color: '#F2A93B', fontWeight: 700 }}>התשובה היא לא לוותר, אלא להתחיל קטן ובשליטה.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
