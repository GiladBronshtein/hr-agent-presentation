/**
 * S11: Our role shifts: from a content factory to learning architecture.
 * Four areas where time moves from producing to designing; the expertise
 * matters more, not less.
 */
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { ArrowLeft, BarChart3, Compass, Dumbbell, Search } from 'lucide-react';
import { accentFor } from '../components/presentation/SceneBase';
import { CYCLE_COLORS, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { t: ACC_T } = accentFor('ld-role');

const SHIFTS = [
  { icon: Search, title: 'אבחון', color: CYCLE_COLORS[0], from: 'לבנות קורס לכל בקשה', to: 'לבדוק אם הדרכה היא בכלל הפתרון' },
  { icon: Compass, title: 'עיצוב', color: CYCLE_COLORS[1], from: 'להקליד שקפים ולומדות', to: 'לעצב חוויה: מטרות, רצף ועומס נכון' },
  { icon: Dumbbell, title: 'תרגול', color: CYCLE_COLORS[3], from: 'להסביר פעם אחת בכיתה', to: 'תרגול, משוב וחזרה לאורך זמן' },
  { icon: BarChart3, title: 'אימפקט', color: CYCLE_COLORS[4], from: 'לספור כמה השלימו', to: 'להראות מה השתנה בעבודה' },
];

const bodyFont = "'Heebo', sans-serif";

export default function S11_LDRole() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 3cqh, 2.25rem)' }}>
          <div className="text-center">
            <SceneEyebrow>התפקיד שלנו משתנה</SceneEyebrow>
            <SceneTitle size="md">מפס ייצור של תוכן לארכיטקטורה של למידה</SceneTitle>
            <SceneSubtitle>פחות זמן על הפקה, יותר זמן על מה שרק אנחנו יודעים לעשות</SceneSubtitle>
          </div>

          <div className="grid grid-cols-2" style={{ gap: 'clamp(0.75rem, 1.4cqw, 1.5rem)' }}>
            {SHIFTS.map((s, i) => (
              <GlassCard key={s.title} className="mo-rise" style={{ '--fx-c': s.color, '--fx-sheen-delay': `${1 + i * 0.12}s`, animationDelay: `${0.15 + i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 1.8cqw, 1.75rem)' } as React.CSSProperties}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', flexShrink: 0, minWidth: 'clamp(84px, 7.5cqw, 120px)' }}>
                  <span style={{
                    width: 'clamp(44px, 3.8cqw, 60px)', height: 'clamp(44px, 3.8cqw, 60px)', borderRadius: '14px',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(160deg, ${alpha(s.color, 0.32)}, ${alpha(s.color, 0.08)})`, border: `1px solid ${alpha(s.color, 0.55)}`, color: textOn(s.color),
                    boxShadow: `0 0 26px -6px ${alpha(s.color, 0.7)}`,
                    fontSize: 'clamp(1.4rem, 1.9cqw, 1.9rem)',
                  }}><s.icon size="1em" /></span>
                  <h3 style={{ fontFamily: bodyFont, fontWeight: 800, color: '#F6F2EA', fontSize: 'clamp(1.25rem, 1.6cqw, 1.8rem)', margin: 0 }}>{s.title}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.3rem, 0.8cqh, 0.6rem)', minWidth: 0 }}>
                  <p style={{ fontFamily: bodyFont, fontSize: 'clamp(1.05rem, 1.3cqw, 1.5rem)', color: 'rgba(246,242,234,0.66)', margin: 0, lineHeight: 1.4 }}>
                    <span className="mo-strike" style={{ '--mo-strike-delay': `${0.7 + i * 0.12}s` } as React.CSSProperties}>{s.from}</span>
                  </p>
                  <p className="mo-rise-sm" style={{ animationDelay: `${0.9 + i * 0.12}s`, display: 'flex', alignItems: 'baseline', gap: '0.5rem', fontFamily: bodyFont, fontSize: 'clamp(1.2rem, 1.6cqw, 1.85rem)', fontWeight: 700, color: 'rgba(246,242,234,0.92)', margin: 0, lineHeight: 1.35 }}>
                    <ArrowLeft aria-hidden size="0.9em" strokeWidth={2.5} style={{ color: textOn(s.color), flexShrink: 0, alignSelf: 'center' }} />
                    <span style={{ textWrap: 'balance' } as React.CSSProperties}>{s.to}</span>
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="p-6 rounded-xl text-center mo-rise fx-accent fx-sheen" style={{ '--fx-sheen-delay': '1.9s', animationDelay: '1.4s' } as React.CSSProperties}>
            <p style={{ fontFamily: bodyFont, fontSize: 'clamp(1.2rem, 1.65cqw, 1.9rem)', color: 'rgba(246,242,234,0.86)', margin: 0, lineHeight: 1.45, textWrap: 'balance' } as React.CSSProperties}>
              האייג׳נט מכין טיוטות. <strong style={{ color: ACC_T }}>אנחנו מחליטים מה נכון ללמד, למי ולמה.</strong>
              <br />
              המומחיות שלנו חשובה יותר, לא פחות.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
