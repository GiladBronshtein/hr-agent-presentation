import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const PROCESSES = [
  { name: 'פתיחת משרה', systems: ['Slack', 'Drive', 'Jira', 'Finance'], steps: 4, hours: 3 },
  { name: 'קליטה לארגון', systems: ['Gmail', 'Calendar', 'IT', 'HR', 'Slack'], steps: 12, hours: 6 },
  { name: 'עדכון מדיניות', systems: ['Drive', 'Gmail', 'Slack', 'HRIS'], steps: 5, hours: 2 },
  { name: 'שאלה מהצוות', systems: ['Slack', 'HRIS', 'Drive', 'Gmail'], steps: 3, hours: 0.5 },
];

/** Counts up once on mount; keeps one decimal for non-integer targets (0.5). */
function CountUp({ value, delay = 0, duration = 1000 }: { value: number; delay?: number; duration?: number }) {
  const { isReducedMotion } = usePresentationStore();
  const decimals = Number.isInteger(value) ? 0 : 1;
  const [shown, setShown] = useState(isReducedMotion ? value : 0);

  useEffect(() => {
    if (isReducedMotion) { setShown(value); return; }
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(Math.max((now - start - delay) / duration, 0), 1);
      setShown(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, delay, duration, isReducedMotion]);

  return <>{shown.toFixed(decimals)}</>;
}

export default function S04_HRWorkday() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div>
            <SceneEyebrow>ניתוח תהליכים</SceneEyebrow>
            <SceneTitle size="md">יום העבודה של HR</SceneTitle>
            <SceneSubtitle>המידע קיים, החיבור עדיין ידני</SceneSubtitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {PROCESSES.map((proc, i) => (
              <GlassCard key={i}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-bold text-3xl">{proc.name}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.3rem' }}>
                    <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(2.2rem, 3.4cqw, 3.4rem)', fontWeight: 900, lineHeight: 1, color: '#F43F5E', textShadow: '0 0 32px rgba(244,63,94,0.4)', fontVariantNumeric: 'tabular-nums', direction: 'ltr' }}><CountUp value={proc.hours} delay={300 + i * 80} /></span>
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
                    <div className="h-full rounded-full mo-grow-x" style={{ width: `${(proc.steps / 12) * 100}%`, background: 'linear-gradient(90deg, #6366F1, #10B981)', animationDelay: `${0.35 + i * 0.08}s` }} />
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
