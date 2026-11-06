/**
 * S04: The L&D week. Where 40 hours actually go: most of the time goes
 * around learning (coordination, LMS admin, reminders, reports), little goes
 * into designing learning and talking to people.
 */
import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';
import { PALETTE, alpha, textOn } from '../lib/palette';

type Kind = 'around' | 'build' | 'core';

const KINDS: Record<Kind, { label: string; color: string }> = {
  // warm for the time that drains, violet for production, teal for learning itself
  around: { label: 'סביב הלמידה', color: textOn(PALETTE.coral) },
  build: { label: 'הפקת תוכן', color: textOn(PALETTE.violet) },
  core: { label: 'הלמידה עצמה', color: PALETTE.teal },
};

const TASKS: { name: string; systems: string[]; hours: number; kind: Kind }[] = [
  { name: 'תיאום עם מומחי תוכן', systems: ['Slack', 'Zoom', 'Calendar'], hours: 6, kind: 'around' },
  { name: 'ניהול LMS ורישומים', systems: ['LMS', 'Excel'], hours: 5, kind: 'around' },
  { name: 'תזכורות ומעקב השלמות', systems: ['Gmail', 'Slack', 'LMS'], hours: 5, kind: 'around' },
  { name: 'איסוף משוב ודוחות', systems: ['Forms', 'Excel'], hours: 6, kind: 'around' },
  { name: 'בניית מצגות ולומדות', systems: ['PowerPoint', 'כלי פיתוח'], hours: 12, kind: 'build' },
  { name: 'תכנון למידה ושיחות בשטח', systems: ['צוותים', 'ראשי צוותים'], hours: 6, kind: 'core' },
];

const TOTAL = TASKS.reduce((sum, t) => sum + t.hours, 0);
const MAX = Math.max(...TASKS.map((t) => t.hours));
const BY_KIND = (Object.keys(KINDS) as Kind[]).map((k) => ({
  kind: k,
  hours: TASKS.filter((t) => t.kind === k).reduce((sum, t) => sum + t.hours, 0),
}));
const CORE_HOURS = BY_KIND.find((b) => b.kind === 'core')?.hours ?? 0;

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

const bodyFont = "'Heebo', sans-serif";
const numFont = "'Space Grotesk', 'Heebo', sans-serif";

export default function S04_LDWeek() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.4cqh, 1.75rem)' }}>
          <div>
            <SceneEyebrow>לדוגמה: שבוע עבודה של {TOTAL} שעות</SceneEyebrow>
            <SceneTitle size="md">השבוע של L&amp;D</SceneTitle>
            <SceneSubtitle>רוב הזמן הולך מסביב ללמידה, לא לתכנון שלה</SceneSubtitle>
          </div>

          <div className="grid grid-cols-3" style={{ gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)' }}>
            {TASKS.map((task, i) => {
              const k = KINDS[task.kind];
              return (
                <GlassCard key={task.name} className="mo-rise" style={{ '--fx-c': k.color, '--fx-sheen-delay': `${0.6 + i * 0.08}s`, animationDelay: `${0.15 + i * 0.06}s`, display: 'flex', flexDirection: 'column' } as React.CSSProperties} padding="clamp(1rem, 1.8cqh, 1.4rem) clamp(1rem, 1.4cqw, 1.4rem)">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontFamily: bodyFont, fontWeight: 700, color: '#F6F2EA', fontSize: 'clamp(1.2rem, 1.55cqw, 1.75rem)', lineHeight: 1.25, margin: 0, textWrap: 'balance' } as React.CSSProperties}>{task.name}</h3>
                    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.3rem', flexShrink: 0 }}>
                      <span style={{ fontFamily: numFont, fontSize: 'clamp(2rem, 2.9cqw, 3rem)', fontWeight: 900, lineHeight: 1, color: k.color, fontVariantNumeric: 'tabular-nums', direction: 'ltr', textShadow: `0 0 18px ${alpha(k.color, 0.45)}` }}>
                        <CountUp value={task.hours} delay={300 + i * 80} />
                      </span>
                      <span style={{ fontFamily: bodyFont, fontSize: 'clamp(1rem, 1.15cqw, 1.3rem)', fontWeight: 600, color: 'rgba(246,242,234,0.72)' }}>שעות</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto', marginBottom: '0.75rem' }}>
                    {task.systems.map((sys) => (
                      <span key={sys} style={{
                        fontFamily: bodyFont, fontSize: 'clamp(1rem, 1.1cqw, 1.25rem)',
                        padding: '0.1rem 0.55rem', borderRadius: '6px',
                        background: 'rgba(246,242,234,0.06)', color: 'rgba(246,242,234,0.78)', border: '1px solid rgba(246,242,234,0.1)',
                      }}>{sys}</span>
                    ))}
                  </div>
                  <div style={{ height: '6px', borderRadius: '6px', background: 'rgba(246,242,234,0.07)' }}>
                    <div className="mo-grow-x" style={{ height: '100%', borderRadius: '6px', width: `${(task.hours / MAX) * 100}%`, background: `linear-gradient(270deg, ${k.color}, ${alpha(k.color, 0.55)})`, boxShadow: `0 0 12px ${alpha(k.color, 0.6)}`, animationDelay: `${0.35 + i * 0.08}s` }} />
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* The week as one bar: around / build / core */}
          <div className="mo-rise fx-glass" style={{
            animationDelay: '0.75s',
            padding: 'clamp(1rem, 2cqh, 1.5rem) clamp(1.25rem, 2cqw, 2rem)',
            borderRadius: '16px',
            display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem, 1.2cqh, 0.9rem)',
          }}>
            <div style={{ display: 'flex', height: 'clamp(14px, 2cqh, 20px)', borderRadius: '10px', overflow: 'hidden', gap: '3px' }}>
              {BY_KIND.map((b, i) => (
                <div key={b.kind} className="mo-grow-x" style={{ width: `${(b.hours / TOTAL) * 100}%`, background: `linear-gradient(180deg, ${KINDS[b.kind].color}, ${alpha(KINDS[b.kind].color, 0.7)})`, boxShadow: `0 0 16px ${alpha(KINDS[b.kind].color, 0.5)}`, animationDelay: `${0.9 + i * 0.15}s` }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.75rem, 2.5cqw, 2.5rem)', alignItems: 'center' }}>
              {BY_KIND.map((b) => (
                <span key={b.kind} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: bodyFont, fontSize: 'clamp(1.05rem, 1.3cqw, 1.5rem)', color: 'rgba(246,242,234,0.8)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: KINDS[b.kind].color, boxShadow: `0 0 10px ${KINDS[b.kind].color}`, flexShrink: 0 }} />
                  <strong style={{ color: '#F6F2EA', fontWeight: 700 }}>{b.hours} שעות</strong> {KINDS[b.kind].label}
                </span>
              ))}
            </div>
            <p style={{ fontFamily: bodyFont, fontSize: 'clamp(1.15rem, 1.6cqw, 1.85rem)', color: 'rgba(246,242,234,0.82)', margin: 0, lineHeight: 1.4 }}>
              רק <strong className="fx-glow-soft" style={{ color: PALETTE.teal, '--fx-c': PALETTE.teal } as React.CSSProperties}>{CORE_HOURS} מתוך {TOTAL} שעות</strong> הולכות לתכנון למידה ולשיחות עם אנשים
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
