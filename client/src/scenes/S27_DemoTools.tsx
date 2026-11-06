import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { DEMO_SCENARIO, DEMO_TOOL_CALLS } from '../data/demoData';
import { CODE_FONT } from '../lib/typeTokens';
import { usePresentationStore } from '../store/presentationStore';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, textOn } from '../lib/palette';
import { sound } from '../lib/sound';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('demo-tools');

const TOOL_CALLS = DEMO_TOOL_CALLS;
/** Each call types in over TYPE_MS; the next one starts STEP_MS later */
const TYPE_MS = 600;
const STEP_MS = 950;

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
    const stops: (() => void)[] = [];
    const timers = TOOL_CALLS.map((call, i) =>
      setTimeout(() => {
        setVisible(i + 1);
        const line = `${call.tool} ${call.args}`;
        stops.push(sound.typing(line, TYPE_MS / line.length, 0, 0.022));
        stops.push(sound.demo.land(i, (TYPE_MS + 150) / 1000));
      }, 350 + i * STEP_MS)
    );
    timers.push(setTimeout(() => setDemoStep(4), 350 + TOOL_CALLS.length * STEP_MS + 300));
    return () => { timers.forEach(clearTimeout); stops.forEach((f) => f()); };
  }, []);

  const statusText = { success: PALETTE.teal, pending: PALETTE.amber, error: textOn(PALETTE.coral) };
  const StatusIcons = { success: CheckCircle2, pending: Loader2, error: XCircle };

  return (
    <SceneBase>
      <DemoStepLayout eyebrow="דמו מורחב" title="שימוש בכלים" subtitle="האייג׳נט מכין הכול בכלים שכבר יש בארגון" gap="clamp(0.6rem, 1.2cqh, 1rem)">
          {/* Code reads left to right: the whole window is LTR, so the JSON
              keeps its order and the title-bar dots sit red, amber, green
              from the left like a real macOS window */}
          <div className="terminal-window" dir="ltr" style={{ flexShrink: 0 }}>
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: PALETTE.coral }} />
              <div className="terminal-dot" style={{ background: PALETTE.amber }} />
              <div className="terminal-dot" style={{ background: PALETTE.teal }} />
              <span className="ml-3" style={{ fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: 'rgba(246,242,234,0.68)' }}>{DEMO_SCENARIO.agent}: tool calls</span>
            </div>
            <div className="terminal-body space-y-2" style={{ textAlign: 'left', fontFamily: CODE_FONT, fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', lineHeight: 1.5 }}>
              {TOOL_CALLS.map((call, i) => (
                <div key={i}
                  style={{ opacity: i < visible ? 1 : 0, transition: 'opacity 0.2s ease' }}>
                  <div className="terminal-line" style={{
                    display: 'flex', gap: '0.6em', alignItems: 'baseline',
                    clipPath: i < visible ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                    transition: `clip-path ${TYPE_MS}ms linear`,
                  }}>
                    <span style={{ color: ACC_T, flexShrink: 0 }}>→</span>
                    <span style={{ overflowWrap: 'anywhere' }}>
                      <span style={{ color: '#F6F2EA', fontWeight: 600 }}>{call.tool}</span>{' '}
                      <span style={{ color: 'rgba(246,242,234,0.8)' }}><Json text={call.args} /></span>
                    </span>
                  </div>
                  {i < visible && (
                    <div className="terminal-line mo-rise-sm" style={{ animationDelay: `${TYPE_MS + 150}ms`, paddingLeft: '1.6em' }}>
                      <span style={{ color: statusText[call.status as keyof typeof statusText], display: 'inline-flex', alignItems: 'center', gap: '0.45em' }}>
                        {(() => { const S = StatusIcons[call.status as keyof typeof StatusIcons]; return <S size="1em" className={call.status === 'pending' ? 'animate-spin' : undefined} />; })()} <Json text={call.result} />
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-center" style={{ margin: 0, color: 'rgba(246,242,234,0.72)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>
            טיוטות נוצרות מיד. <span style={{ color: ACC_T, fontWeight: 600 }}>רישום ושליחה מחכים לאישור.</span> כל פעולה מתועדת.
          </p>
      </DemoStepLayout>
    </SceneBase>
  );
}
