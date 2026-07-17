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
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">ניתוח תהליכים</p>
            <SceneTitle size="md">יום העבודה של HR</SceneTitle>
            <p className="text-white/50 mt-2 text-sm">המידע קיים — החיבור עדיין ידני</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROCESSES.map((proc, i) => (
              <GlassCard key={i}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-bold text-base">{proc.name}</h3>
                  <span className="text-xs text-white/40">{proc.hours} שעות</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proc.systems.map((sys) => (
                    <span key={sys} className="text-xs px-2 py-0.5 rounded"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {sys}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${(proc.steps / 12) * 100}%`, background: 'linear-gradient(90deg, #4F7CFF, #70D6A7)' }} />
                  </div>
                  <span className="text-xs text-white/30">{proc.steps} שלבים</span>
                </div>
              </GlassCard>
            ))}
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(79,124,255,0.08)', border: '1px solid rgba(79,124,255,0.15)' }}>
            <p className="text-white/60 text-sm">
              ממוצע: <span className="text-white font-bold">6+ מערכות</span> לכל תהליך משמעותי
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
