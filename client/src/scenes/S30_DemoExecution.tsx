import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { DEMO_EXECUTION_STEPS } from '../data/demoData';
import { usePresentationStore } from '../store/presentationStore';

const STEPS = DEMO_EXECUTION_STEPS;

const RAIL_GAP = 'clamp(1.25rem, 2cqw, 2rem)';

export default function S30_DemoExecution() {
  const { isReducedMotion } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 300 + i * 380)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout eyebrow="דמו מורחב" title="ביצוע" subtitle="רק אחרי האישור: רישום, הודעות, זימונים ותזכורות" gap="clamp(0.6rem, 1.2cqh, 1rem)">
          <div className="relative" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem, 0.7cqh, 0.55rem)' }}>
            {/* Progress rail beside the steps: fills as each action completes (absolute, no layout impact) */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, bottom: 0,
              right: `calc(-1 * ${RAIL_GAP})`, width: '3px', borderRadius: '3px',
              background: 'rgba(243,238,228,0.07)', pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                background: '#F2A93B',
                transformOrigin: 'top',
                transform: `scaleY(${visible / STEPS.length})`,
                transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }} />
            </div>
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-5 rounded-xl transition-all duration-500"
                style={{
                  padding: 'clamp(0.45rem, 0.9cqh, 0.75rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  opacity: i < visible ? 1 : 0.2,
                  background: i < visible ? 'rgba(242,169,59,0.06)' : 'rgba(243,238,228,0.03)',
                  border: i < visible ? '1px solid rgba(242,169,59,0.15)' : '1px solid rgba(243,238,228,0.06)',
                }}>
                <div className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 'clamp(2rem, 2.2cqw, 2.6rem)', height: 'clamp(2rem, 2.2cqw, 2.6rem)', fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', fontWeight: 700, background: i < visible ? 'rgba(242,169,59,0.2)' : 'rgba(243,238,228,0.05)', color: i < visible ? '#F2A93B' : 'rgba(243,238,228,0.45)' }}>
                  <span key={i < visible ? 'done' : 'todo'} className={i < visible ? 'mo-pop' : undefined}>
                    {i < visible ? '✓' : (i + 1)}
                  </span>
                </div>
                <span className="flex-1" style={{ fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', lineHeight: 1.3, color: i < visible ? 'rgba(243,238,228,0.8)' : 'rgba(243,238,228,0.3)' }}>
                  {step.label}
                </span>
                {i < visible && <span className="text-white/65" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontVariantNumeric: 'tabular-nums' }}><bdi>{step.time}</bdi></span>}
              </div>
            ))}
          </div>
          {visible >= STEPS.length && (
            <div className="rounded-xl text-center animate-fade-in" style={{ padding: 'clamp(0.6rem, 1.2cqh, 1rem) 1.25rem', background: 'rgba(242,169,59,0.1)', border: '1px solid rgba(242,169,59,0.3)' }}>
              <p className="font-bold flex items-center justify-center gap-2" style={{ margin: 0, color: '#F2A93B', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>
                <CheckCircle2 size="1em" /> הושלם. 12 אנשים רשומים, וכל פעולה מתועדת: מה, מתי ובאישור של מי
              </p>
            </div>
          )}
      </DemoStepLayout>
    </SceneBase>
  );
}
