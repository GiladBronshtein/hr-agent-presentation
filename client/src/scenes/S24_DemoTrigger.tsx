import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
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
      <ContentLayout>
        <div className="w-full max-w-5xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3cqh, 2.5rem)' }}>
          <div style={{ textAlign: 'center' }}>
            <p className="text-white/60 uppercase tracking-widest mb-2" style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>שלב 1</p>
            <SceneTitle size="md">הטריגר</SceneTitle>
          </div>

          <SlackWindow channel="hr-onboarding">
            <SlackMessage initials="דל" name="דוד לוי" time="09:42" color="#7C3AED">
              <span style={{ color: '#818CF8', fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@OnboardBot</span>{' '}
              {text}
              {typing && <span className="animate-pulse" style={{ color: '#818CF8' }}>|</span>}
            </SlackMessage>

            {demoStep >= 1 ? (
              <SlackMessage initials="OB" name="OnboardBot" time="09:42" color="#6366F1" isBot>
                קיבלתי. מתחיל לאסוף מידע על יעל כהן ועל תפקיד <bdi dir="ltr">Product Manager</bdi>.
              </SlackMessage>
            ) : !typing && (
              <TypingIndicator name="OnboardBot" />
            )}
          </SlackWindow>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
