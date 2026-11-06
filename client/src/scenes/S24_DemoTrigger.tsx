import { useEffect, useRef, useState } from 'react';
import { Target } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { SlackWindow, SlackMessage, TypingIndicator, Typewriter } from '../components/presentation/SlackChat';
import { usePresentationStore } from '../store/presentationStore';
import { DEMO_SCENARIO } from '../data/demoData';
import { PALETTE, alpha } from '../lib/palette';
import { sound } from '../lib/sound';

/** LearnBot's identity color, the same on every demo slide */
const AGENT_COLOR = PALETTE.teal;
const ACC_T = PALETTE.teal;

export default function S24_DemoTrigger() {
  const { setDemoStep } = usePresentationStore();
  // 0 typing, 1 sent and the agent is typing, 2 the agent restated the goal
  const [phase, setPhase] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stops = useRef<(() => void)[]>([]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
    stops.current.forEach((f) => f());
  }, []);

  const onSent = () => {
    setPhase(1);
    stops.current.push(sound.demo.sent());
    // the agent "types" for a moment, quietly
    stops.current.push(sound.typing('קיבלתי ככה הבנתי את המטרה', 45, 350, 0.016));
    timers.current.push(setTimeout(() => {
      setPhase(2);
      setDemoStep(1);
      stops.current.push(sound.demo.arrive());
      stops.current.push(sound.demo.glow(0.45));
    }, 1700));
  };

  return (
    <SceneBase>
      <DemoStepLayout step={1} title="הבקשה" subtitle="בקשה רגילה בצ׳אט, כמו שמגיעה כל שבוע">
        <SlackWindow channel={DEMO_SCENARIO.channel}>
          <div className={phase >= 1 ? 'fx-sent' : undefined} style={{ margin: '-0.5rem -0.6rem', padding: '0.5rem 0.6rem', '--fx-c': '#FF9A80' } as React.CSSProperties}>
            <SlackMessage initials={DEMO_SCENARIO.requesterInitials} name={DEMO_SCENARIO.requester} time={DEMO_SCENARIO.requestTime} color="#FF9A80">
              <span style={{ color: ACC_T, fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@{DEMO_SCENARIO.agent}</span>{' '}
              <Typewriter text={DEMO_SCENARIO.request} startMs={550} msPerChar={42} caret onDone={onSent} />
            </SlackMessage>
          </div>

          {phase === 1 && <TypingIndicator name={DEMO_SCENARIO.agent} />}

          {phase >= 2 && (
            <div className="mo-rise-sm">
              <SlackMessage initials={DEMO_SCENARIO.agentInitials} name={DEMO_SCENARIO.agent} time={DEMO_SCENARIO.requestTime} color={AGENT_COLOR} isBot>
                <div>קיבלתי. ככה הבנתי את המטרה:</div>
                <div className="mo-pop fx-sheen" style={{
                  animationDelay: '0.4s', '--fx-sheen-delay': '0.9s', position: 'relative',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  margin: '0.55rem 0',
                  padding: 'clamp(0.55rem, 1cqh, 0.8rem) clamp(0.85rem, 1.2cqw, 1.1rem)',
                  borderRadius: '10px', borderRight: `3px solid ${AGENT_COLOR}`,
                  background: `linear-gradient(270deg, ${alpha(AGENT_COLOR, 0.2)}, ${alpha(AGENT_COLOR, 0.05)})`,
                  boxShadow: `0 0 30px -14px ${AGENT_COLOR}`,
                  color: '#F6F2EA', fontWeight: 700,
                } as React.CSSProperties}>
                  <span style={{ display: 'inline-flex', color: ACC_T, flexShrink: 0 }}><Target size="1em" /></span>
                  <span>{DEMO_SCENARIO.goal}</span>
                </div>
                <div className="mo-rise-sm" style={{ color: 'rgba(246,242,234,0.78)', animationDelay: '0.9s' }}>
                  לפני שאבנה משהו, אבדוק מה הצוות כבר יודע ואיפה הקושי, כדי לא ללמד את מה שכבר ידוע.
                </div>
              </SlackMessage>
            </div>
          )}
        </SlackWindow>
      </DemoStepLayout>
    </SceneBase>
  );
}
