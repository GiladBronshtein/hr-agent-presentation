import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';

const STEPS = [
  { label: 'שולח מייל ברכה', status: 'done', time: '0.3s' },
  { label: 'מוסיף לקבוצת Slack #product', status: 'done', time: '0.5s' },
  { label: 'יוצר אירוע קליטה ב-Calendar', status: 'done', time: '0.8s' },
  { label: 'מעדכן HRIS: סטטוס: Active', status: 'done', time: '1.1s' },
  { label: 'שולח סיכום ל-HR ולדוד', status: 'done', time: '1.4s' },
];

const RAIL_GAP = 'clamp(1.25rem, 2cqw, 2rem)';

export default function S30_DemoExecution() {
  const { isReducedMotion } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 500 + i * 600)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout step={7} title="ביצוע">
          <div className="space-y-2 relative">
            {/* Progress rail beside the steps: fills as each action completes (absolute, no layout impact) */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, bottom: 0,
              right: `calc(-1 * ${RAIL_GAP})`, width: '3px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                background: 'linear-gradient(180deg, #10B981, #34D399)',
                boxShadow: '0 0 12px rgba(16,185,129,0.45)',
                transformOrigin: 'top',
                transform: `scaleY(${visible / STEPS.length})`,
                transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }} />
            </div>
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-5 rounded-xl transition-all duration-500"
                style={{
                  padding: 'clamp(0.6rem, 1.1cqh, 0.9rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  opacity: i < visible ? 1 : 0.2,
                  background: i < visible ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
                  border: i < visible ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                <div className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 'clamp(2rem, 2.2cqw, 2.6rem)', height: 'clamp(2rem, 2.2cqw, 2.6rem)', fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', fontWeight: 700, background: i < visible ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)', color: i < visible ? '#6EE7B7' : 'rgba(255,255,255,0.45)' }}>
                  <span key={i < visible ? 'done' : 'todo'} className={i < visible ? 'mo-pop' : undefined}>
                    {i < visible ? '✓' : (i + 1)}
                  </span>
                </div>
                <span className="flex-1 text-3xl" style={{ color: i < visible ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
                  {step.label}
                </span>
                {i < visible && <span className="text-white/65" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontVariantNumeric: 'tabular-nums' }}><bdi>{step.time}</bdi></span>}
              </div>
            ))}
          </div>
          {visible >= STEPS.length && (
            <div className="p-6 rounded-xl text-center animate-fade-in" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
              <p className="text-3xl font-bold flex items-center justify-center gap-2" style={{ color: '#6EE7B7' }}><CheckCircle2 size="1em" /> הושלם</p>
              <p className="text-white/65 text-3xl mt-1">כל הפעולות בוצעו ותועדו</p>
            </div>
          )}
      </DemoStepLayout>
    </SceneBase>
  );
}
