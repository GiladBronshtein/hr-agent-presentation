/**
 * S43: Objections - the hard questions as big flip-style quote cards.
 * Click a quote: the card fills with its accent color and reveals the answer.
 */
import { useState } from 'react';
import { Quote, CornerDownLeft } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, TakeawayBar } from '../components/presentation/SceneBase';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { t: ACC_T } = accentFor('objections');

/** A Hebrew prefix glued to a Latin term (ה-LMS, מ-AI) never breaks at the hyphen */
const PREFIXED = /([\u0590-\u05FF]+-[A-Za-z0-9][\w.-]*[?.!]?)/;
const NoBreak = ({ text }: { text: string }) => (
  <>{text.split(PREFIXED).map((part, i) => (PREFIXED.test(part) ? <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span> : part))}</>
);

const OBJECTIONS = [
  {
    q: 'תוכן של AI הוא שטחי',
    a: 'בלי הקשר, נכון. עם מטרות למידה, קהל ותרחיש אמיתי, הטיוטה טובה. העומק מגיע מהמומחה שעורך.',
    color: PALETTE.blue,
  },
  {
    q: 'זה יחליף את מי שמעצב למידה',
    a: 'הוא לוקח את העבודה השחורה: תמלול, טיוטה ראשונה, רישום ותזכורות. ההחלטה מה ללמד ולמה נשארת אצלנו.',
    color: PALETTE.violet,
  },
  {
    q: 'ומה אם יש טעויות בתוכן?',
    a: 'יהיו. גם בטיוטה שכתב אדם יש טעויות, ולכן מומחה בודק. כאן הבדיקה פשוט מובנית בתהליך, לפני שמשהו מתפרסם.',
    color: PALETTE.magenta,
  },
  {
    q: 'ומה הלומדים יגידו?',
    a: 'אומרים להם בגלוי מה האייג׳נט עושה, ותמיד משאירים דרך לפנות לאדם. מסלול קצר, בלי מה שכבר יודעים, משכנע יותר מכל הסבר.',
    color: PALETTE.coral,
  },
  {
    q: 'מומחי התוכן לא יסמכו על זה',
    a: 'נתחיל איתם: הם בוחרים את המקורות ומאשרים כל יחידה. כשטיוטה חוסכת להם ראיון של שעתיים, האמון מגיע.',
    color: PALETTE.amber,
  },
  {
    q: 'אין לנו IT לזה',
    a: 'פיילוט ראשון אפשר לעשות עם עוזר AI וכלי תהליכים קיים, בלי קוד. את IT משתפים מוקדם, בשביל הרשאות ואבטחת מידע.',
    color: PALETTE.teal,
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
                // The wrapper floats (out of sync per card); the button keeps its entrance
                <div key={i} className="fx-float" style={{ '--fx-float': '-6px', animationDuration: `${6.5 + (i % 3) * 0.9}s`, animationDelay: `${-i * 1.3}s`, display: 'flex' } as React.CSSProperties}>
                <button
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                  className="interactive-card mo-rise"
                  style={{
                    flex: 1,
                    minHeight: 'clamp(150px, 24cqh, 230px)',
                    padding: 'clamp(1.25rem, 2.2cqh, 1.9rem) clamp(1.1rem, 1.8cqw, 1.75rem)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '0.75rem',
                    background: on
                      ? `radial-gradient(100% 80% at 50% 0%, ${alpha(obj.color, 0.28)}, ${alpha(obj.color, 0.08)} 70%), #0B1030`
                      : `radial-gradient(100% 70% at 50% 0%, ${alpha(obj.color, 0.1)}, transparent 70%), rgba(12,17,50,0.64)`,
                    border: on ? `1px solid ${alpha(obj.color, 0.7)}` : `1px solid ${alpha(obj.color, 0.24)}`,
                    boxShadow: on ? `0 0 50px -14px ${obj.color}` : '0 20px 40px -26px rgba(0,0,0,0.85)',
                    transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 220ms cubic-bezier(0.23, 1, 0.32, 1)',
                    animationDelay: `${0.1 + i * 0.06}s`,
                  }}
                >
                  {on ? (
                    <>
                      <span style={{ display: 'inline-flex', color: textOn(obj.color), filter: `drop-shadow(0 0 8px ${obj.color})`, fontSize: 'clamp(1.3rem, 1.8cqw, 1.7rem)', animation: 'popIn 0.3s ease both' }}>
                        <CornerDownLeft size="1em" />
                      </span>
                      <p style={{
                        margin: 0, fontFamily: "'Heebo', sans-serif",
                        fontSize: 'clamp(1.15rem, 1.7cqw, 1.6rem)', fontWeight: 600,
                        color: '#F6F2EA', lineHeight: 1.5,
                        animation: 'fadeIn 0.35s ease 0.1s both',
                        textWrap: 'pretty',
                      } as React.CSSProperties}>
                        <NoBreak text={obj.a} />
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Opening-quote mark mirrored for RTL */}
                      <span aria-hidden style={{ display: 'inline-flex', color: textOn(obj.color), filter: `drop-shadow(0 0 10px ${alpha(obj.color, 0.7)})`, fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)', transform: 'scaleX(-1)' }}>
                        <Quote size="1em" />
                      </span>
                      <p style={{
                        margin: 0, fontFamily: "'Heebo', sans-serif",
                        fontSize: 'clamp(1.35rem, 2.1cqw, 2rem)', fontWeight: 800,
                        color: 'rgba(246,242,234,0.9)', lineHeight: 1.35,
                        textWrap: 'balance',
                      } as React.CSSProperties}>
                        "<NoBreak text={obj.q} />"
                      </p>
                    </>
                  )}
                </button>
                </div>
              );
            })}
          </div>
        </div>
      </ContentLayout>
      <TakeawayBar>
        החששות האלה מוצדקים. <span style={{ color: ACC_T, fontWeight: 700 }}>התשובה היא לא לוותר, אלא להתחיל קטן ובשליטה.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
