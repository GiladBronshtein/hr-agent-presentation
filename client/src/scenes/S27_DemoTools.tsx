import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const TOOL_CALLS = [
  { tool: 'calendar.create_event', args: '{ "title": "1:1 יעל + דוד", "date": "2025-07-14", "time": "09:00" }', result: 'event_id: cal_4829', status: 'success' },
  { tool: 'it_system.request_access', args: '{ "user": "yael.cohen", "tools": ["Jira", "Figma", "Slack"] }', result: 'ticket: IT-2847', status: 'success' },
  { tool: 'gmail.draft', args: '{ "to": "yael.cohen@co.il", "subject": "ברוכה הבאה! יום ראשון שלך" }', result: 'draft_id: msg_9921 (ממתין לאישור)', status: 'pending' },
  { tool: 'learning.enroll', args: '{ "user": "yael.cohen", "courses": ["PM-101", "Product-Strategy"] }', result: 'enrolled: 2 courses', status: 'success' },
];

export default function S27_DemoTools() {
  const { setDemoStep } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers = TOOL_CALLS.map((_, i) =>
      setTimeout(() => setVisible(i + 1), 300 + i * 700)
    );
    timers.push(setTimeout(() => setDemoStep(4), 300 + TOOL_CALLS.length * 700 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  const statusColors = { success: '#10B981', pending: '#F59E0B', error: '#F43F5E' };
  const StatusIcons = { success: CheckCircle2, pending: Loader2, error: XCircle };

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">שלב 4</p>
            <SceneTitle size="md">שימוש בכלים</SceneTitle>
          </div>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#F43F5E' }} />
              <div className="terminal-dot" style={{ background: '#F59E0B' }} />
              <div className="terminal-dot" style={{ background: '#10B981' }} />
              <span className="text-white/65 text-3xl mr-2">OnboardBot: tool calls</span>
            </div>
            <div className="terminal-body space-y-3">
              {TOOL_CALLS.map((call, i) => (
                <div key={i} className="transition-all duration-500"
                  style={{ opacity: i < visible ? 1 : 0 }}>
                  <div className="terminal-line">
                    <span className="terminal-prompt">→</span>
                    <span className="text-blue-300">{call.tool}</span>
                  </div>
                  <div className="terminal-line mr-4 text-white/60 text-3xl">{call.args}</div>
                  {i < visible && (
                    <div className="terminal-line mr-4">
                      <span style={{ color: statusColors[call.status as keyof typeof statusColors], display: 'inline-flex', alignItems: 'center', gap: '0.35em' }}>
                        {(() => { const S = StatusIcons[call.status as keyof typeof StatusIcons]; return <S size="1em" className={call.status === 'pending' ? 'animate-spin' : undefined} />; })()} {call.result}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/60 text-3xl text-center">
            כל פעולה מתועדת, מי, מה, מתי, למה
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
