import { ArrowLeft } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

/** Value of the agent program itself (not of a course): illustrative pilot numbers */
const METRICS = [
  { category: 'מהירות', items: [
    { name: 'מבקשה ועד קורס מוכן', before: '6 שבועות', after: '10 ימים' },
    { name: 'טיוטת חידון ראשונה', before: '3 שע׳', after: '20 דק׳' },
  ], color: '#F2A93B' },
  { category: 'איכות', items: [
    { name: 'הערות מומחה ליחידה', before: '12', after: '4' },
    { name: 'שאלות שנפסלו בבדיקה', before: '25%', after: '8%' },
  ], color: '#F2A93B' },
  { category: 'איפה הזמן שלנו', items: [
    { name: 'זמן על אבחון ושיחות עם השטח', before: '15%', after: '35%' },
    { name: 'קורסים שנמדדים עד רמת התנהגות', before: '10%', after: '60%' },
  ], color: '#F2A93B' },
];

/** Kirkpatrick, applied to the program: are we, the L&D team, better off? */
const LEVELS = [
  { level: 'תגובה', q: 'הצוות רוצה להמשיך?' },
  { level: 'למידה', q: 'התוכן יוצא טוב יותר?' },
  { level: 'התנהגות', q: 'משתמשים בזה כל שבוע?' },
  { level: 'תוצאות', q: 'זמן ואיכות השתפרו?' },
];

export default function S39_MeasuringValue() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.4cqw,2.5rem)' }}>
          <div>
            <SceneEyebrow color="#F2A93B">מודדים את התוכנית, לא את הקורס</SceneEyebrow>
            <SceneTitle size="md">מדידת ערך</SceneTitle>
            <SceneSubtitle>איך נדע שהאייג׳נטים שווים את זה? מספרים לדוגמה מפיילוט</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {METRICS.map((cat, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                <p className="text-3xl font-bold mb-3" style={{ color: textTint(cat.color) }}>{cat.category}</p>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div key={item.name}>
                      <p className="text-white/70 mb-1" style={{ fontSize: 'clamp(1.15rem, 1.5cqw, 1.65rem)', lineHeight: 1.35 }}>{item.name}</p>
                      <div className="flex items-center gap-3">
                        {/* Old value gets a drawn strike, then the new value rises in.
                            RTL: old on the right, arrow points left to the new value */}
                        <span className="text-white/65 mo-strike" style={{ '--mo-strike-delay': `${0.55 + i * 0.12 + j * 0.1}s`, whiteSpace: 'nowrap', fontSize: 'clamp(1.2rem, 1.6cqw, 1.75rem)' } as React.CSSProperties}>{item.before}</span>
                        <ArrowLeft aria-hidden size={26} strokeWidth={2.25} className="shrink-0" style={{ color: 'rgba(243,238,228,0.55)' }} />
                        <span className="font-black mo-rise-sm" style={{ animationDelay: `${0.77 + i * 0.12 + j * 0.1}s`, color: textTint(cat.color), fontSize: 'clamp(1.7rem, 2.5cqw, 2.6rem)', lineHeight: 1.1, fontFamily: "'Heebo', sans-serif", unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}>{item.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="rounded-xl mo-rise" style={{ padding: 'clamp(0.9rem,1.4cqw,1.4rem)', background: 'rgba(243,238,228,0.08)', border: '1px solid rgba(243,238,228,0.15)', animationDelay: '0.9s' }}>
            <p className="text-white/70 text-center" style={{ fontSize: 'clamp(1.1rem, 1.4cqw, 1.55rem)', margin: '0 0 0.6rem' }}>
              ארבע הרמות של Kirkpatrick, על הצוות שלנו:
            </p>
            <div className="grid grid-cols-4" style={{ gap: 'clamp(0.5rem,1cqw,1rem)' }}>
              {LEVELS.map((l) => (
                <div key={l.level} className="text-center">
                  <span className="font-bold" style={{ color: '#F2A93B', fontSize: 'clamp(1.15rem, 1.5cqw, 1.65rem)' }}>{l.level}</span>
                  <p className="text-white/75" style={{ fontSize: 'clamp(1.05rem, 1.3cqw, 1.45rem)', margin: 0 }}>{l.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
