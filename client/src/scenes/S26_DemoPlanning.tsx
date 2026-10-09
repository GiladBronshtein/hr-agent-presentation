import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';

const PLAN_STEPS = [
  { day: 'לפני יום ראשון', tasks: ['שליחת מייל ברכה', 'תיאום פגישת 1:1 עם דוד', 'הזמנת גישות IT'] },
  { day: 'יום ראשון', tasks: ['פגישת בוקר עם צוות', 'הדרכת כלים', 'ארוחת צהריים עם דוד'] },
  { day: 'שבוע ראשון', tasks: ['פגישות היכרות עם stakeholders', 'קורסי חובה', 'בדיקת גישות'] },
  { day: '30 יום', tasks: ['check-in עם HR', 'סקר קליטה', 'הגדרת מטרות Q3'] },
];

const RAIL_GAP = 'clamp(1.25rem, 2cqw, 2rem)';

export default function S26_DemoPlanning() {
  const { setDemoStep, isReducedMotion } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = PLAN_STEPS.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 300 + i * 600)
    );
    timers.push(setTimeout(() => setDemoStep(3), 300 + PLAN_STEPS.length * 600 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout step={3} title="תכנון" subtitle="האייג׳נט בונה תוכנית קליטה מותאמת">
          <div className="space-y-3 relative">
            {/* Progress rail beside the plan: fills as each stage lands (absolute, no layout impact) */}
            <div aria-hidden style={{
              position: 'absolute', top: 0, bottom: 0,
              right: `calc(-1 * ${RAIL_GAP})`, width: '3px', borderRadius: '3px',
              background: 'rgba(255,255,255,0.07)', pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 'inherit',
                background: 'linear-gradient(180deg, #6366F1, #22D3EE)',
                boxShadow: '0 0 12px rgba(99,102,241,0.45)',
                transformOrigin: 'top',
                transform: `scaleY(${visible / PLAN_STEPS.length})`,
                transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
              }} />
            </div>
            {PLAN_STEPS.map((step, i) => (
              <div key={i} className="relative rounded-xl transition-all duration-500"
                style={{
                  padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.1rem, 1.6cqw, 1.6rem)',
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateY(10px)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                {i < visible && (
                  <span aria-hidden className="mo-pop" style={{
                    position: 'absolute', top: 'calc(50% - 6px)',
                    right: `calc(-1 * (${RAIL_GAP} + 4.5px))`,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: '#818CF8', boxShadow: '0 0 10px rgba(129,140,248,0.8)',
                    animationDelay: '0.2s', pointerEvents: 'none',
                  }} />
                )}
                <p className="font-semibold mb-2" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(255,255,255,0.68)' }}>{step.day}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tasks.map((task) => (
                    <span key={task} className="px-3 py-1 rounded-lg"
                      style={{ background: 'rgba(99,102,241,0.12)', color: '#C7D2FE', border: '1px solid rgba(99,102,241,0.3)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </DemoStepLayout>
    </SceneBase>
  );
}
