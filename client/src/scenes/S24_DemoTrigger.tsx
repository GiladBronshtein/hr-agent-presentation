import { useEffect, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { SlackWindow, SlackMessage, TypingIndicator } from '../components/presentation/SlackChat';
import { usePresentationStore } from '../store/presentationStore';

export default function S24_DemoTrigger() {
  const { demoState, setDemoStep } = usePresentationStore();
  const demoStep = ['idle', 'trigger', 'retrieving', 'planning', 'tools', 'preview', 'approval', 'executing', 'feedback', 'result'].indexOf(demoState);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState('');
  const fullText = 'יעל כהן קיבלה הצעה ואישרה. יום ראשון שלה: 15 ביולי. צריך תוכנית קליטה מלאה.';

  useEffect(() => {
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTyping(false);
        setTimeout(() => setDemoStep(1), 800);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout step={1} title="הטריגר">
          <SlackWindow channel="hr-onboarding">
            <SlackMessage initials="דל" name="דוד לוי" time="09:42" color="#7C3AED">
              <span style={{ color: '#818CF8', fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@OnboardBot</span>{' '}
              {text}
              {typing && <span className="animate-pulse" style={{ color: '#818CF8' }}>|</span>}
            </SlackMessage>

            {demoStep >= 1 ? (
              <div className="mo-rise-sm">
                <SlackMessage initials="OB" name="OnboardBot" time="09:42" color="#6366F1" isBot>
                  קיבלתי. מתחיל לאסוף מידע על יעל כהן ועל תפקיד <bdi dir="ltr">Product Manager</bdi>.
                </SlackMessage>
              </div>
            ) : !typing && (
              <TypingIndicator name="OnboardBot" />
            )}
          </SlackWindow>
      </DemoStepLayout>
    </SceneBase>
  );
}
