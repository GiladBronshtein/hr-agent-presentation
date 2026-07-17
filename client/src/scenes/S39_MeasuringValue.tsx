import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';

const METRICS = [
  { category: 'יעילות', items: [
    { name: 'זמן לסיום תהליך', before: '6h', after: '45m', unit: '' },
    { name: 'שגיאות ידניות', before: '12%', after: '1%', unit: '' },
  ], color: '#4F7CFF' },
  { category: 'חוויה', items: [
    { name: 'שביעות רצון עובד', before: '3.2', after: '4.6', unit: '/5' },
    { name: 'זמן תגובה לשאלה', before: '4h', after: '3m', unit: '' },
  ], color: '#70D6A7' },
  { category: 'עסקי', items: [
    { name: 'עלות לתהליך', before: '₪800', after: '₪120', unit: '' },
    { name: 'זמן ל-productivity', before: '45d', after: '28d', unit: '' },
  ], color: '#FFD166' },
];

export default function S39_MeasuringValue() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <SceneTitle size="md">מדידת ערך</SceneTitle>
            <p className="text-white/50 mt-2 text-sm">מדדים שמשכנעים את ה-CFO</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {METRICS.map((cat, i) => (
              <GlassCard key={i}>
                <p className="text-xs font-bold mb-3" style={{ color: cat.color }}>{cat.category}</p>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div key={item.name}>
                      <p className="text-white/40 text-xs mb-1">{item.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-white/30 text-sm line-through">{item.before}</span>
                        <span className="text-white/20">→</span>
                        <span className="font-bold text-sm" style={{ color: cat.color }}>{item.after}{item.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(79,124,255,0.08)', border: '1px solid rgba(79,124,255,0.15)' }}>
            <p className="text-white/60 text-sm">
              מדדו לפני ואחרי — ה-ROI מספר את הסיפור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
