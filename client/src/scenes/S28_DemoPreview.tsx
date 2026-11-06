import { SceneBase, TakeawayBar } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { SlackWindow, SlackMessage } from '../components/presentation/SlackChat';
import { Eye } from 'lucide-react';
import { DEMO_SCENARIO, DEMO_WELCOME } from '../data/demoData';

export default function S28_DemoPreview() {
  return (
    <SceneBase>
      <DemoStepLayout step={3} title="תצוגה מקדימה" subtitle="בדיוק מה שהצוות יקבל, לפני שמשהו נשלח" gap="clamp(0.6rem, 1.2cqh, 1rem)">
        <div className="mo-rise-sm" style={{
          alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.25rem 0.9rem', borderRadius: '100px',
          background: 'rgba(242,169,59,0.1)', border: '1px solid rgba(242,169,59,0.3)',
          color: '#F2A93B', fontWeight: 600, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
        }}>
          <Eye size="1em" /> טיוטה, עוד לא נשלחה
        </div>
        <SlackWindow channel={DEMO_SCENARIO.teamChannel}>
          <SlackMessage initials={DEMO_SCENARIO.agentInitials} name={DEMO_SCENARIO.agent} time="טיוטה" color="#F2A93B" isBot>
            <div style={{ fontWeight: 700, color: '#F3EEE4' }}>{DEMO_WELCOME.greeting}</div>
            {DEMO_WELCOME.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}

            {/* The path outline, as each person will see it */}
            <div className="mo-rise" style={{
              animationDelay: '0.35s',
              marginTop: '0.75rem',
              borderRadius: '12px', borderRight: '3px solid #F2A93B',
              background: 'rgba(243,238,228,0.04)',
              padding: 'clamp(0.5rem, 1cqh, 0.8rem) clamp(0.875rem, 1.3cqw, 1.2rem)',
            }}>
              {DEMO_WELCOME.outline.map((row, i) => (
                <div key={row.title} style={{
                  display: 'flex', alignItems: 'baseline', gap: '0.75rem',
                  padding: 'clamp(0.25rem, 0.55cqh, 0.45rem) 0',
                  borderBottom: i < DEMO_WELCOME.outline.length - 1 ? '1px solid rgba(243,238,228,0.06)' : 'none',
                  fontSize: 'clamp(1.1rem, 1.35cqw, 1.5rem)',
                }}>
                  <span style={{ color: '#F2A93B', fontWeight: 700, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ flex: 1, minWidth: 0, color: 'rgba(243,238,228,0.88)' }}>{row.title}</span>
                  <span style={{ color: 'rgba(243,238,228,0.62)', whiteSpace: 'nowrap' }}>{row.minutes}</span>
                  <span style={{ color: '#F2A93B', whiteSpace: 'nowrap', minWidth: '4.5em', textAlign: 'left' }}>{row.when}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.6rem', color: 'rgba(243,238,228,0.78)' }}>{DEMO_WELCOME.total}</div>
          </SlackMessage>
        </SlackWindow>
      </DemoStepLayout>
      <TakeawayBar color="#F2A93B">
        שום דבר לא נשלח עדיין. <span style={{ color: '#F2A93B', fontWeight: 700 }}>הכול מחכה לאישור אנושי.</span>
      </TakeawayBar>
    </SceneBase>
  );
}
