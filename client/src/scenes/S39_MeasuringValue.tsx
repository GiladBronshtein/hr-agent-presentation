import { ArrowLeft } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const METRICS = [
  { category: 'יעילות', items: [
    { name: 'זמן לסיום תהליך', before: '6 שע׳', after: '45 דק׳', unit: '' },
    { name: 'שגיאות ידניות', before: '12%', after: '1%', unit: '' },
  ], color: '#6366F1' },
  { category: 'חוויה', items: [
    { name: 'שביעות רצון הצוות', before: '3.2', after: '4.6', unit: '/5' },
    { name: 'זמן תגובה לשאלה', before: '4 שע׳', after: '3 דק׳', unit: '' },
  ], color: '#10B981' },
  { category: 'עסקי', items: [
    { name: 'עלות לתהליך', before: '₪800', after: '₪120', unit: '' },
    { name: 'זמן לפרודוקטיביות', before: '45 ימים', after: '28 ימים', unit: '' },
  ], color: '#F59E0B' },
];

export default function S39_MeasuringValue() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8" style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }}>
          <div>
            <SceneEyebrow color="#FCD34D">פרק רביעי: להטמיע</SceneEyebrow>
            <SceneTitle size="md">מדידת ערך</SceneTitle>
            <SceneSubtitle>מדדים שמשכנעים את ה-CFO</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {METRICS.map((cat, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                <p className="text-3xl font-bold mb-3" style={{ color: textTint(cat.color) }}>{cat.category}</p>
                <div className="space-y-3">
                  {cat.items.map((item, j) => (
                    <div key={item.name}>
                      <p className="text-white/70 text-3xl mb-1">{item.name}</p>
                      <div className="flex items-center gap-3">
                        {/* Old value gets a drawn strike, then the new value rises in.
                            RTL: old on the right, arrow points left to the new value */}
                        <span className="text-white/65 text-3xl mo-strike" style={{ '--mo-strike-delay': `${0.55 + i * 0.12 + j * 0.1}s`, whiteSpace: 'nowrap' } as React.CSSProperties}>{item.before}</span>
                        <ArrowLeft aria-hidden size={28} strokeWidth={2.25} className="shrink-0" style={{ color: 'rgba(255,255,255,0.55)' }} />
                        <span className="font-black mo-rise-sm" style={{ animationDelay: `${0.77 + i * 0.12 + j * 0.1}s`, color: textTint(cat.color), fontSize: 'clamp(2rem, 2.9cqw, 3rem)', lineHeight: 1.1, textShadow: `0 0 32px ${cat.color}45`, fontFamily: "'Heebo', sans-serif", unicodeBidi: 'isolate', whiteSpace: 'nowrap' }}>{item.after}{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-white/75 text-3xl">
              מדידה לפני ואחרי, ה-ROI מספר את הסיפור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
