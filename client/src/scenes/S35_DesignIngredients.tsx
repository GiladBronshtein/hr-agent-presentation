import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { SourceChip } from '../components/presentation/SourceChip';
import { Boxes, CalendarClock, Layers, LifeBuoy, ListChecks, MessageSquareText } from 'lucide-react';
import { SPECTRUM_STOPS, alpha, textOn } from '../lib/palette';


/** Learning-science principles written into the agent's instructions, each
 * with a LearnBot example and the research behind it. */
const PRINCIPLES = [
  { icon: ListChecks, title: 'שליפה, לא קריאה חוזרת', desc: 'חידון קצר מחזק את הזיכרון יותר מעוד קריאה', example: 'אבחון של 5 שאלות בתחילת המסלול', source: 'carpenter-spacing-retrieval-2022' },
  { icon: CalendarClock, title: 'חזרה מרווחת', desc: 'חוזרים לחומר אחרי שחלק ממנו כבר נשכח', example: 'חידון חזרה שבועיים אחרי היחידות', source: 'carpenter-spacing-retrieval-2022' },
  { icon: Layers, title: 'לא רק לזכור', desc: 'שאלות שדורשות להבין וליישם, לא רק לשנן', example: 'מה עונים ללקוח שמתלבט בגלל המחיר?', source: 'utah-bloom-2024' },
  { icon: MessageSquareText, title: 'משוב עם הסבר', desc: 'מה עבד, מה לא, ואיך לעשות טוב יותר', example: 'משוב מפורט מיד אחרי הסימולציה', source: 'feedback-meta-2020' },
  { icon: Boxes, title: 'מנות קטנות', desc: 'זיכרון העבודה מוגבל, אז רעיון אחד בכל יחידה', example: '3 יחידות של 7 דקות, לא שעה אחת', source: 'nsw-cognitive-load-2017' },
  { icon: LifeBuoy, title: 'פחות תמיכה עם הזמן', desc: 'מי שכבר יודע, מקבל יותר תרגול עצמאי', example: 'מי שעבר את האבחון מדלג על הבסיס', source: 'nsw-cognitive-load-2017' },
];

/** One spectrum color per principle */
const colorOf = (i: number) => SPECTRUM_STOPS[i % SPECTRUM_STOPS.length];

export default function S35_DesignIngredients() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem,3cqw,3rem)' }}>
          <div>
            <SceneTitle size="md">עקרונות למידה בתוך האייג׳נט</SceneTitle>
            <SceneSubtitle>מה כותבים בהוראות, כדי שהאייג׳נט יבנה למידה שעובדת. הדוגמה: LearnBot</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3" style={{ gap: 'clamp(1.25rem,2.5cqw,2.5rem)' }}>
            {PRINCIPLES.map((p, i) => (
              <GlassCard key={p.title} className="mo-rise" style={{ '--fx-c': colorOf(i), '--fx-sheen-delay': `${0.8 + i * 0.08}s`, animationDelay: `${0.2 + i * 0.06}s` } as React.CSSProperties}>
                <div className="flex items-center text-3xl mb-1" style={{ gap: '0.55em' }}>
                  <div className="shrink-0" style={{ color: textOn(colorOf(i)), display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '1.6em', height: '1.6em', borderRadius: '0.45em', background: `linear-gradient(160deg, ${alpha(colorOf(i), 0.32)}, ${alpha(colorOf(i), 0.08)})`, border: `1px solid ${alpha(colorOf(i), 0.5)}`, boxShadow: `0 0 22px -6px ${alpha(colorOf(i), 0.75)}` }}><p.icon size="0.9em" /></div>
                  <h3 className="text-white font-bold text-3xl" style={{ margin: 0 }}>{p.title}</h3>
                </div>
                <p className="text-white/80 text-3xl mb-3 leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{p.desc}</p>
                <div className="rounded-lg"
                  style={{ padding: '0.5rem 0.75rem', fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', lineHeight: 1.5, background: alpha(colorOf(i), 0.1), color: '#F6F2EA', border: `1px solid ${alpha(colorOf(i), 0.32)}` }}>
                  {p.example}
                </div>
                <div style={{ marginTop: '0.6rem' }}><SourceChip id={p.source} /></div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
