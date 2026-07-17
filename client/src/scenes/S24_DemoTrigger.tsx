import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
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
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שלב 1</p>
            <SceneTitle size="md">הטריגר</SceneTitle>
          </div>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#F43F5E' }} />
              <div className="terminal-dot" style={{ background: '#F59E0B' }} />
              <div className="terminal-dot" style={{ background: '#10B981' }} />
              <span className="text-white/30 text-3xl mr-2">Slack → OnboardBot</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-prompt">@OnboardBot</span>
                <span className="text-white/70 mr-2">דוד לוי:</span>
              </div>
              <div className="terminal-line mt-1">
                <span className="text-white/80">{text}</span>
                {typing && <span className="animate-pulse text-indigo-400">|</span>}
              </div>
            </div>
          </div>
          {demoStep >= 1 && (
            <div className="p-6 rounded-xl animate-fade-in" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-white/60 text-3xl">
                <span style={{ color: '#6366F1' }}>🤖 OnboardBot:</span>{' '}
                קיבלתי. מתחיל לאסוף מידע על יעל כהן ועל תפקיד Product Manager...
              </p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
