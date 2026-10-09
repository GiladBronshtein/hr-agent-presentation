import type { ReactNode } from 'react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';
import { BarChart3, ClipboardList, FlaskConical, Handshake } from 'lucide-react';

const ACTIONS: { icon: typeof ClipboardList; title: string; desc: ReactNode; cta: string }[] = [
  { icon: ClipboardList, title: 'לבחור תהליך', desc: 'תהליך אחד שכדאי לשפר', cta: 'השבוע' },
  { icon: Handshake, title: 'למצוא שותף', desc: 'IT או צוות פיתוח לליווי', cta: 'השבוע' },
  // The Latin run is isolated and kept on one line, so the plus signs never flip sides
  { icon: FlaskConical, title: 'לבנות פיילוט', desc: <><bdi style={{ whiteSpace: 'nowrap' }}>n8n + Claude</bdi>{'\u00A0'}+ כלי אחד</>, cta: 'תוך חודש' },
  { icon: BarChart3, title: 'למדוד', desc: <>לפני ואחרי: <span style={{ whiteSpace: 'nowrap' }}>ROI ברור</span></>, cta: 'תוך 90 יום' },
];

export default function S45_FinalAction() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8 text-center">
          <div>
            <SceneEyebrow>הצעד הבא</SceneEyebrow>
            <SceneTitle size="lg">
              מה נעשה<br />
              <span style={{ color: '#10B981' }}>מחר בבוקר?</span>
            </SceneTitle>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {ACTIONS.map((action, i) => (
              <div key={i} className="p-7 rounded-xl text-center mo-rise"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animationDelay: `${0.2 + i * 0.07}s`,
                }}>
                <span className="block mb-3" style={{ fontSize: 'clamp(2.6rem, 4.2cqw, 4rem)', color: '#34D399', display: 'flex', justifyContent: 'center' }}><action.icon size="1em" /></span>
                <h3 className="text-white font-bold text-3xl mb-1">{action.title}</h3>
                <p className="text-white/70 text-3xl mb-4" style={{ textWrap: 'balance' } as React.CSSProperties}>{action.desc}</p>
                <span className="px-4 py-1 rounded-full mo-fade"
                  style={{ background: 'rgba(16,185,129,0.14)', color: '#6EE7B7', border: '1px solid rgba(16,185,129,0.35)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600, animationDelay: `${0.6 + i * 0.07}s`, whiteSpace: 'nowrap' }}>
                  {action.cta}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/75 text-3xl mo-rise" style={{ animationDelay: '0.75s', textWrap: 'balance' } as React.CSSProperties}>
            שאלות? המשאבים בנספחים: System Prompt, Blueprint, Evaluation Framework
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
