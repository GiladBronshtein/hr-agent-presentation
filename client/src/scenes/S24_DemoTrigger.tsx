import { useEffect, useState } from 'react';
import { Target } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { SlackWindow, SlackMessage, TypingIndicator } from '../components/presentation/SlackChat';
import { usePresentationStore } from '../store/presentationStore';
import { DEMO_SCENARIO } from '../data/demoData';
import { PALETTE, alpha } from '../lib/palette';

/** LearnBot's identity color, the same on every demo slide */
const AGENT_COLOR = PALETTE.teal;
const ACC_T = PALETTE.teal;

export default function S24_DemoTrigger() {
  const { setDemoStep } = usePresentationStore();
  const [typing, setTyping] = useState(true);
  const [text, setText] = useState('');
  // 0 typing, 1 agent is answering, 2 agent restated the goal
  const [phase, setPhase] = useState(0);
  const fullText = DEMO_SCENARIO.request;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setText(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setTyping(false);
        setPhase(1);
        timers.push(setTimeout(() => { setPhase(2); setDemoStep(1); }, 700));
      }
    }, 28);
    return () => { clearInterval(interval); timers.forEach(clearTimeout); };
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout step={1} title="הבקשה" subtitle="בקשה רגילה בצ׳אט, כמו שמגיעה כל שבוע">
        <SlackWindow channel={DEMO_SCENARIO.channel}>
          <SlackMessage initials={DEMO_SCENARIO.requesterInitials} name={DEMO_SCENARIO.requester} time={DEMO_SCENARIO.requestTime} color="#FF9A80">
            <span style={{ color: ACC_T, fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@{DEMO_SCENARIO.agent}</span>{' '}
            {text}
            {typing && <span className="animate-pulse" style={{ color: ACC_T }}>|</span>}
          </SlackMessage>

          {phase === 1 && <TypingIndicator name={DEMO_SCENARIO.agent} />}

          {phase >= 2 && (
            <div className="mo-rise-sm">
              <SlackMessage initials={DEMO_SCENARIO.agentInitials} name={DEMO_SCENARIO.agent} time={DEMO_SCENARIO.requestTime} color={AGENT_COLOR} isBot>
                <div>קיבלתי. ככה הבנתי את המטרה:</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  margin: '0.55rem 0',
                  padding: 'clamp(0.55rem, 1cqh, 0.8rem) clamp(0.85rem, 1.2cqw, 1.1rem)',
                  borderRadius: '10px', borderRight: `3px solid ${AGENT_COLOR}`,
                  background: `linear-gradient(270deg, ${alpha(AGENT_COLOR, 0.2)}, ${alpha(AGENT_COLOR, 0.05)})`,
                  boxShadow: `0 0 30px -14px ${AGENT_COLOR}`,
                  color: '#F6F2EA', fontWeight: 700,
                }}>
                  <span style={{ display: 'inline-flex', color: ACC_T, flexShrink: 0 }}><Target size="1em" /></span>
                  <span>{DEMO_SCENARIO.goal}</span>
                </div>
                <div style={{ color: 'rgba(246,242,234,0.78)' }}>
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
