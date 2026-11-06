import { useEffect, useState } from 'react';
import { BarChart3, ClipboardCheck, Lightbulb, MessagesSquare, PlayCircle, Repeat } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';
import { DEMO_PLAN } from '../data/demoData';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, SPECTRUM_STOPS, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC } = accentFor('demo-planning');

const ICONS: Record<string, typeof PlayCircle> = {
  pre: ClipboardCheck,
  units: PlayCircle,
  sim: MessagesSquare,
  review: Repeat,
  metric: BarChart3,
};

const RAIL_GAP = 'clamp(1.25rem, 2cqw, 2rem)';

/** Each plan stage lights in the next spectrum color; the metric is amber */
const stepColor = (i: number, metric: boolean) => (metric ? PALETTE.amber : SPECTRUM_STOPS[i % 4]);

export default function S26_DemoPlanning() {
  const { setDemoStep, isReducedMotion } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = DEMO_PLAN.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 250 + i * 420)
    );
    timers.push(setTimeout(() => setDemoStep(3), 250 + DEMO_PLAN.length * 420 + 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout step={2} title="התוכנית" subtitle="מסלול קצר, ממוקד במה שחסר, עם תרגול, חזרה ומדד הצלחה" gap="clamp(0.6rem, 1.2cqh, 1rem)">
        <div className="relative" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.45rem, 0.9cqh, 0.75rem)' }}>
          {/* Progress rail beside the plan: fills as each stage lands (absolute, no layout impact) */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, bottom: 0,
            right: `calc(-1 * ${RAIL_GAP})`, width: '3px', borderRadius: '3px',
            background: 'rgba(246,242,234,0.07)', pointerEvents: 'none',
          }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: 'inherit',
              background: `linear-gradient(180deg, ${PALETTE.blue}, ${PALETTE.violet}, ${PALETTE.magenta}, ${PALETTE.coral}, ${PALETTE.amber})`,
              boxShadow: `0 0 12px ${alpha(ACC, 0.6)}`,
              transformOrigin: 'top',
              transform: `scaleY(${visible / DEMO_PLAN.length})`,
              transition: isReducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }} />
          </div>
          {DEMO_PLAN.map((step, i) => {
            const Icon = ICONS[step.id] ?? PlayCircle;
            const metric = Boolean(step.isMetric);
            const accent = stepColor(i, metric);
            return (
              <div key={step.id} className="relative rounded-xl transition-all duration-500"
                style={{
                  display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)',
                  padding: 'clamp(0.6rem, 1.15cqh, 1rem) clamp(1rem, 1.5cqw, 1.5rem)',
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateY(10px)',
                  background: `linear-gradient(270deg, ${alpha(accent, metric ? 0.16 : 0.1)}, ${alpha(accent, 0.02)} 70%), rgba(12,17,50,0.66)`,
                  border: `1px solid ${alpha(accent, metric ? 0.5 : 0.26)}`,
                  boxShadow: metric ? `0 0 40px -16px ${accent}` : '0 14px 30px -22px rgba(0,0,0,0.8)',
                }}>
                {i < visible && (
                  <span aria-hidden className="mo-pop" style={{
                    position: 'absolute', top: 'calc(50% - 6px)',
                    right: `calc(-1 * (${RAIL_GAP} + 4.5px))`,
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: accent, boxShadow: `0 0 12px ${accent}`,
                    animationDelay: '0.2s', pointerEvents: 'none',
                  }} />
                )}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  width: 'clamp(2.4rem, 2.8cqw, 3.2rem)', height: 'clamp(2.4rem, 2.8cqw, 3.2rem)', borderRadius: '12px',
                  background: `linear-gradient(160deg, ${alpha(accent, 0.32)}, ${alpha(accent, 0.1)})`,
                  border: `1px solid ${alpha(accent, 0.5)}`,
                  boxShadow: `0 0 20px -6px ${alpha(accent, 0.7)}`,
                  color: textOn(accent), fontSize: 'clamp(1.2rem, 1.5cqw, 1.7rem)',
                }}>
                  <Icon size="1em" />
                </span>
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: '0.75rem', rowGap: '0.15rem' }}>
                    <span style={{ fontWeight: 700, color: metric ? PALETTE.amber : '#F6F2EA', fontSize: 'clamp(1.25rem, 1.5cqw, 1.8rem)', lineHeight: 1.25 }}>{step.title}</span>
                    <span style={{ color: 'rgba(246,242,234,0.8)', fontSize: 'clamp(1.1rem, 1.25cqw, 1.5rem)', lineHeight: 1.3 }}>{step.detail}</span>
                  </div>
                  {step.chips && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {step.chips.map((chip, ci) => (
                        <span key={chip} style={{
                          padding: '0.1rem 0.65rem', borderRadius: '8px',
                          background: alpha(accent, 0.14), color: '#F6F2EA',
                          border: `1px solid ${alpha(accent, 0.42)}`,
                          fontSize: 'clamp(1.05rem, 1.2cqw, 1.4rem)', lineHeight: 1.45,
                        }}>
                          <span style={{ color: textOn(accent), fontWeight: 700, marginLeft: '0.4rem' }}>{ci + 1}</span>
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span style={{
                  flexShrink: 0, whiteSpace: 'nowrap',
                  padding: '0.2rem 0.7rem', borderRadius: '100px',
                  background: 'rgba(246,242,234,0.06)', border: `1px solid ${alpha(accent, 0.3)}`,
                  color: 'rgba(246,242,234,0.84)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontVariantNumeric: 'tabular-nums',
                }}>
                  {step.when}
                </span>
              </div>
            );
          })}
        </div>
        {visible >= DEMO_PLAN.length && (
          <div className="mo-rise rounded-xl fx-accent" style={{
            '--fx-c': PALETTE.amber,
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: 'clamp(0.55rem, 1.1cqh, 0.9rem) clamp(1rem, 1.5cqw, 1.5rem)',
            animationDelay: '0.2s',
          } as React.CSSProperties}>
            <span style={{ display: 'inline-flex', color: PALETTE.amber, filter: `drop-shadow(0 0 8px ${PALETTE.amber})`, fontSize: 'clamp(1.2rem, 1.5cqw, 1.7rem)', flexShrink: 0 }}><Lightbulb size="1em" /></span>
            <p style={{ margin: 0, color: 'rgba(246,242,234,0.85)', fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)', lineHeight: 1.4 }}>
              <span style={{ color: PALETTE.amber, fontWeight: 700 }}>למה דווקא מחיר?</span> בסקר האחרון הצוות כתב: &quot;את המוצר מכירים, הקושי הוא בשאלות על מחיר&quot;.
            </p>
          </div>
        )}
      </DemoStepLayout>
    </SceneBase>
  );
}
