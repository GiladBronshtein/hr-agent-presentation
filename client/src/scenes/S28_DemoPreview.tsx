import { SceneBase, TakeawayBar } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { SlackWindow, SlackMessage, Typewriter } from '../components/presentation/SlackChat';
import { Eye } from 'lucide-react';
import { DEMO_SCENARIO, DEMO_WELCOME } from '../data/demoData';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha } from '../lib/palette';
import { useEffect } from 'react';
import { sound } from '../lib/sound';
import { usePresentationStore } from '../store/presentationStore';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('demo-preview');

/**
 * The agent writes the draft in front of the audience: the greeting and the
 * lines type in with soft keys, the outline rows land one by one, and the
 * total types in last. One schedule (ms from mount) drives text and sound.
 */
const MS = 20;
const GAP = 180;
const SCHEDULE = (() => {
  let at = 650;
  const greet = at;
  at += DEMO_WELCOME.greeting.length * 34 + GAP;
  const lines = DEMO_WELCOME.lines.map((l) => { const s = at; at += l.length * MS + GAP; return s; });
  const box = at;
  const rows = DEMO_WELCOME.outline.map((_, i) => box + 180 + i * 300);
  const total = box + 180 + DEMO_WELCOME.outline.length * 300 + 120;
  const end = total + DEMO_WELCOME.total.length * MS;
  return { greet, lines, box, rows, total, end };
})();

export default function S28_DemoPreview() {
  const reduced = usePresentationStore((s) => s.isReducedMotion);
  useEffect(() => {
    if (reduced) return;
    const stops = [
      ...SCHEDULE.rows.map((ms, i) => sound.demo.land(i, ms / 1000)),
      sound.demo.glow(SCHEDULE.end / 1000 + 0.25),
    ];
    return () => stops.forEach((f) => f());
  }, [reduced]);

  return (
    <SceneBase>
      <DemoStepLayout step={3} title="תצוגה מקדימה" subtitle="בדיוק מה שהצוות יקבל, לפני שמשהו נשלח" gap="clamp(0.6rem, 1.2cqh, 1rem)">
        <div className="mo-rise-sm fx-chip" style={{
          alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.25rem 0.9rem', borderRadius: '100px',
          color: ACC_T, fontWeight: 600, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
        }}>
          <Eye size="1em" /> טיוטה, עוד לא נשלחה
        </div>
        <SlackWindow channel={DEMO_SCENARIO.teamChannel}>
          <SlackMessage initials={DEMO_SCENARIO.agentInitials} name={DEMO_SCENARIO.agent} time="טיוטה" color={PALETTE.teal} isBot>
            <div style={{ fontWeight: 700, color: '#F6F2EA' }}>
              <Typewriter text={DEMO_WELCOME.greeting} startMs={SCHEDULE.greet} msPerChar={34} vol={0.02} />
            </div>
            {DEMO_WELCOME.lines.map((line, i) => (
              <div key={line}><Typewriter text={line} startMs={SCHEDULE.lines[i]} msPerChar={MS} vol={0.02} /></div>
            ))}

            {/* The path outline, as each person will see it */}
            <div className="mo-rise" style={{
              animationDelay: `${SCHEDULE.box}ms`,
              marginTop: '0.75rem',
              borderRadius: '12px', borderRight: `3px solid ${ACC}`,
              background: `linear-gradient(270deg, ${alpha(ACC, 0.1)}, rgba(246,242,234,0.03))`,
              boxShadow: `inset 0 1px 0 ${alpha(ACC, 0.18)}`,
              padding: 'clamp(0.5rem, 1cqh, 0.8rem) clamp(0.875rem, 1.3cqw, 1.2rem)',
            }}>
              {DEMO_WELCOME.outline.map((row, i) => (
                <div key={row.title} className="mo-in-start" style={{
                  animationDelay: `${SCHEDULE.rows[i]}ms`,
                  display: 'flex', alignItems: 'baseline', gap: '0.75rem',
                  padding: 'clamp(0.25rem, 0.55cqh, 0.45rem) 0',
                  borderBottom: i < DEMO_WELCOME.outline.length - 1 ? '1px solid rgba(246,242,234,0.06)' : 'none',
                  fontSize: 'clamp(1.1rem, 1.35cqw, 1.5rem)',
                }}>
                  <span style={{ color: ACC_T, fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ flex: 1, minWidth: 0, color: 'rgba(246,242,234,0.88)' }}>{row.title}</span>
                  <span style={{ color: 'rgba(246,242,234,0.74)', whiteSpace: 'nowrap' }}>{row.minutes}</span>
                  <span style={{ color: ACC_T, whiteSpace: 'nowrap', minWidth: '4.5em', textAlign: 'left' }}>{row.when}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.6rem', color: 'rgba(246,242,234,0.78)' }}>
              <Typewriter text={DEMO_WELCOME.total} startMs={SCHEDULE.total} msPerChar={MS} vol={0.02} />
            </div>
          </SlackMessage>
        </SlackWindow>
      </DemoStepLayout>
      <TakeawayBar color={ACC}>
        שום דבר לא נשלח עדיין. <span style={{ color: ACC_T, fontWeight: 700 }}>הכול מחכה לאישור אנושי.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
