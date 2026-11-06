import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { PALETTE, alpha, textOn } from '../lib/palette';


/** Value of the agent program itself (not of a course): what to measure, and
 * where the number comes from. No invented results: the baseline is measured
 * before the pilot starts. */
const METRICS = [
  { category: 'מהירות', items: [
    { name: 'זמן מבקשה ועד מסלול מאושר', how: 'לפי מועד הבקשה ב-Slack ומועד האישור' },
    { name: 'זמן עד טיוטת חידון ראשונה', how: 'מודדים חמישה חידונים, לפני ואחרי' },
  ], color: PALETTE.blue },
  { category: 'איכות', items: [
    { name: 'הערות מומחה על כל יחידה', how: 'סופרים בסבב הבדיקה' },
    { name: 'שאלות שנפסלו בבדיקה', how: 'אחוז מכל השאלות שנכתבו' },
  ], color: PALETTE.violet },
  { category: 'איפה הזמן שלנו', items: [
    { name: 'זמן על אבחון ושיחות עם השטח', how: 'יומן זמן של שבוע אחד, פעם ברבעון' },
    { name: 'קורסים שנמדדים עד רמת התנהגות', how: 'אחוז מהקורסים שהושקו ברבעון' },
  ], color: PALETTE.teal },
];

/** Kirkpatrick, applied to the program: are we, the L&D team, better off? */
const LEVELS = [
  { level: 'תגובה', q: 'הצוות רוצה להמשיך?' },
  { level: 'למידה', q: 'התוכן יוצא טוב יותר?' },
  { level: 'התנהגות', q: 'משתמשים בזה כל שבוע?' },
  { level: 'תוצאות', q: 'זמן ואיכות השתפרו?' },
];

/** The four levels climb the spectrum toward amber (results) */
const LEVEL_COLORS = [PALETTE.blue, PALETTE.violet, PALETTE.coral, PALETTE.amber];

export default function S39_MeasuringValue() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.4cqw,2.5rem)' }}>
          <div>
            <SceneEyebrow>מודדים את התוכנית, לא את הקורס</SceneEyebrow>
            <SceneTitle size="md">מדידת ערך</SceneTitle>
            <SceneSubtitle>איך נדע שהאייג׳נטים שווים את זה? מודדים נקודת פתיחה לפני הפיילוט, ומשווים אחריו</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {METRICS.map((cat, i) => (
              <GlassCard key={i} className="mo-rise" style={{ '--fx-c': cat.color, '--fx-sheen-delay': `${0.9 + i * 0.1}s`, animationDelay: `${0.15 + i * 0.08}s`, background: `radial-gradient(100% 60% at 100% 0%, ${alpha(cat.color, 0.16)}, transparent 70%), rgba(12,17,50,0.62)` } as React.CSSProperties}>
                <p className="text-3xl font-bold mb-3" style={{ color: textTint(cat.color), display: 'flex', alignItems: 'center', gap: '0.5em' }}><span aria-hidden className="fx-beacon" style={{ width: 9, height: 9, color: cat.color }} />{cat.category}</p>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.name}>
                      <p className="text-white font-semibold" style={{ margin: 0, fontSize: 'clamp(1.2rem, 1.6cqw, 1.75rem)', lineHeight: 1.3 }}>{item.name}</p>
                      <p className="text-white/75" style={{ margin: '0.15rem 0 0', fontSize: 'clamp(1.05rem, 1.35cqw, 1.5rem)', lineHeight: 1.35 }}>איך: {item.how}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="rounded-xl mo-rise fx-glass" style={{ padding: 'clamp(0.9rem,1.4cqw,1.4rem)', animationDelay: '0.9s' }}>
            <p className="text-white/80 text-center" style={{ fontSize: 'clamp(1.1rem, 1.4cqw, 1.55rem)', margin: '0 0 0.6rem' }}>
              ארבע הרמות של Kirkpatrick, על הצוות שלנו
              <SourceChip id="kirkpatrick-model" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} />
            </p>
            <div className="grid grid-cols-4" style={{ gap: 'clamp(0.5rem,1cqw,1rem)' }}>
              {LEVELS.map((l, li) => (
                <div key={l.level} className="text-center rounded-lg" style={{ padding: '0.5rem 0.4rem', background: `linear-gradient(180deg, ${alpha(LEVEL_COLORS[li], 0.16)}, transparent)`, borderTop: `2px solid ${LEVEL_COLORS[li]}`, boxShadow: `0 -8px 24px -16px ${LEVEL_COLORS[li]}` }}>
                  <span className="font-bold" style={{ color: textOn(LEVEL_COLORS[li]), fontSize: 'clamp(1.15rem, 1.5cqw, 1.65rem)' }}>{l.level}</span>
                  <p className="text-white/80" style={{ fontSize: 'clamp(1.05rem, 1.3cqw, 1.45rem)', margin: 0 }}>{l.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
