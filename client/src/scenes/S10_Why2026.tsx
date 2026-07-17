import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';

const STATS = [
  { value: 73, suffix: '%', label: 'מנהלי HR מדווחים על עומס תיאום גבוה', color: '#6366F1' },
  { value: 4.2, suffix: 'ש׳', label: 'ממוצע שעות תיאום ידני ביום', color: '#10B981' },
  { value: 60, suffix: '%', label: 'מהמשימות הניתנות לאוטומציה עדיין ידניות', color: '#F59E0B' },
];

const SHIFTS = [
  { from: 'כלי AI נוסף', to: 'שינוי תהליך עבודה', icon: '🔄' },
  { from: 'מדידת שימוש', to: 'מדידת ערך', icon: '📊' },
  { from: 'פרויקט IT', to: 'שותפות HR+IT', icon: '🤝' },
];

export default function S10_Why2026() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">למה 2026 שונה?</SceneTitle>
            <p className="text-white/50 mt-2">האתגר הוא לא "להשתמש ב-AI", אלא לעצב מחדש איך עבודה מתבצעת</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat, i) => (
              <GlassCard key={i} className="text-center">
                <div className="text-3xl font-black mb-1" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-white/40 text-xs uppercase tracking-widest">השינוי הנדרש</p>
            {SHIFTS.map((shift, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl">{shift.icon}</span>
                <span className="text-white/40 text-sm line-through">{shift.from}</span>
                <span className="text-white/30">→</span>
                <span className="text-white/80 text-sm font-medium">{shift.to}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
