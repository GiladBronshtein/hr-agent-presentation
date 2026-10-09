import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { CODE_FONT } from '../lib/typeTokens';
import { usePresentationStore } from '../store/presentationStore';

const TOOL_CALLS = [
  { tool: 'calendar.create_event', args: '{ "title": "1:1 יעל + דוד", "date": "2026-07-14", "time": "09:00" }', result: 'event_id: cal_4829', status: 'success' },
  { tool: 'it_system.request_access', args: '{ "user": "yael.cohen", "tools": ["Jira", "Figma", "Slack"] }', result: 'ticket: IT-2847', status: 'success' },
  { tool: 'gmail.draft', args: '{ "to": "yael.cohen@company.co.il", "subject": "ברוכה הבאה! יום ראשון שלך" }', result: 'draft_id: msg_9921 (ממתין לאישור)', status: 'pending' },
  { tool: 'learning.enroll', args: '{ "user": "yael.cohen", "courses": ["PM-101", "Product-Strategy"] }', result: 'enrolled: 2 courses', status: 'success' },
];

/** Hebrew inside an LTR code line is isolated, so it never reorders the
 * quotes, colons and arrows around it. */
function Json({ text }: { text: string }) {
  const parts = text.split(/((?:"[^"]*[\u0590-\u05FF][^"]*")|(?:\([^)]*[\u0590-\u05FF][^)]*\)))/);
  return <>{parts.map((p, i) => (/[\u0590-\u05FF]/.test(p) ? <bdi key={i} dir="rtl">{p}</bdi> : p))}</>;
}

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

  const statusText = { success: '#6EE7B7', pending: '#FCD34D', error: '#FDA4AF' };
  const StatusIcons = { success: CheckCircle2, pending: Loader2, error: XCircle };

  return (
    <SceneBase>
      <DemoStepLayout step={4} title="שימוש בכלים">
          {/* Code reads left to right: the whole window is LTR, so the JSON
              keeps its order and the title-bar dots sit red, amber, green
              from the left like a real macOS window */}
          <div className="terminal-window" dir="ltr">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#F43F5E' }} />
              <div className="terminal-dot" style={{ background: '#F59E0B' }} />
              <div className="terminal-dot" style={{ background: '#10B981' }} />
              <span className="ml-3" style={{ fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: 'rgba(255,255,255,0.68)' }}>OnboardBot: tool calls</span>
            </div>
            <div className="terminal-body space-y-4" style={{ textAlign: 'left', fontFamily: CODE_FONT, fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', lineHeight: 1.5 }}>
              {TOOL_CALLS.map((call, i) => (
                <div key={i} className="transition-all duration-500"
                  style={{ opacity: i < visible ? 1 : 0 }}>
                  <div className="terminal-line" style={{ display: 'flex', gap: '0.6em', alignItems: 'baseline' }}>
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>→</span>
                    <span style={{ color: '#93C5FD', fontWeight: 600 }}>{call.tool}</span>
                  </div>
                  <div className="terminal-line" style={{ paddingLeft: '1.6em', color: 'rgba(255,255,255,0.72)', overflowWrap: 'anywhere' }}><Json text={call.args} /></div>
                  {i < visible && (
                    <div className="terminal-line mo-rise-sm" style={{ animationDelay: '0.25s', paddingLeft: '1.6em' }}>
                      <span style={{ color: statusText[call.status as keyof typeof statusText], display: 'inline-flex', alignItems: 'center', gap: '0.45em' }}>
                        {(() => { const S = StatusIcons[call.status as keyof typeof StatusIcons]; return <S size="1em" className={call.status === 'pending' ? 'animate-spin' : undefined} />; })()} <Json text={call.result} />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/70 text-3xl text-center">
            כל פעולה מתועדת: מי, מה, מתי, למה
          </p>
      </DemoStepLayout>
    </SceneBase>
  );
}
