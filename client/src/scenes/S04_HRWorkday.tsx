import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const PROCESSES = [
  { name: 'פתיחת משרה', systems: ['Slack', 'Drive', 'Jira', 'Finance'], steps: 4, hours: 3 },
  { name: 'קליטת עובד', systems: ['Gmail', 'Calendar', 'IT', 'HR', 'Slack'], steps: 12, hours: 6 },
  { name: 'עדכון מדיניות', systems: ['Drive', 'Gmail', 'Slack', 'HRIS'], steps: 5, hours: 2 },
  { name: 'שאלת עובד', systems: ['Slack', 'HRIS', 'Drive', 'Gmail'], steps: 3, hours: 0.5 },
];

export default function S04_HRWorkday() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">ניתוח תהליכים</p>
            <SceneTitle size="md">יום העבודה של HR</SceneTitle>
            <p className="text-white/65 mt-2 text-3xl">המידע קיים, החיבור עדיין ידני</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROCESSES.map((proc, i) => (
              <GlassCard key={i}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-bold text-3xl">{proc.name}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.2rem, 3.4cqw, 3.4rem)', fontWeight: 900, lineHeight: 1, color: '#F43F5E', textShadow: '0 0 32px rgba(244,63,94,0.4)', fontVariantNumeric: 'tabular-nums', direction: 'ltr' }}>{proc.hours}</span>
                    <span className="text-white/60" style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontWeight: 600 }}>שעות</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proc.systems.map((sys) => (
                    <span key={sys} className="text-3xl px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.68)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {sys}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(proc.steps / 12) * 100}%`, background: 'linear-gradient(90deg, #6366F1, #10B981)' }} />
                  </div>
                  <span className="text-3xl text-white/65">{proc.steps} שלבים</span>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-white/60 text-3xl">
              ממוצע: <span className="text-white font-bold">6+ מערכות</span> לכל תהליך משמעותי
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
