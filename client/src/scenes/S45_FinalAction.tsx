import type { ReactNode } from 'react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';
import { ClipboardList, FileText, PenLine, Timer } from 'lucide-react';

const ACTIONS: { icon: typeof ClipboardList; title: string; desc: ReactNode; cta: string }[] = [
  { icon: ClipboardList, title: 'לבחור תהליך', desc: 'שחוזר כל שבוע, למשל חידון', cta: 'היום' },
  { icon: FileText, title: 'למפות בדף אחד', desc: 'מה נכנס, מה יוצא, ומי מאשר', cta: 'מחר' },
  // The Latin run is isolated, so "AI" never flips sides in RTL
  { icon: PenLine, title: 'לנסות טיוטה', desc: <>עוזר <bdi>AI</bdi> ומסמך מקור אחד</>, cta: 'עד סוף השבוע' },
  { icon: Timer, title: 'לרשום כמה זמן', desc: 'לעומת הדרך הרגילה', cta: 'עד סוף השבוע' },
];

export default function S45_FinalAction() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full space-y-8 text-center" style={{ maxWidth: '80rem' }}>
          <div>
            <SceneEyebrow>צעד אחד קטן, כבר השבוע</SceneEyebrow>
            <SceneTitle size="lg">
              מה נעשה<br />
              <span style={{ color: '#F2A93B' }}>מחר בבוקר?</span>
            </SceneTitle>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {ACTIONS.map((action, i) => (
              <div key={i} className="p-7 rounded-xl text-center mo-rise flex flex-col items-center"
                style={{
                  background: 'rgba(243,238,228,0.04)',
                  border: '1px solid rgba(243,238,228,0.08)',
                  animationDelay: `${0.2 + i * 0.07}s`,
                }}>
                <span className="block mb-3" style={{ fontSize: 'clamp(2.6rem, 4.2cqw, 4rem)', color: '#F2A93B', display: 'flex', justifyContent: 'center' }}><action.icon size="1em" /></span>
                <h3 className="text-white font-bold text-3xl mb-1">{action.title}</h3>
                <p className="text-white/70 mb-4 flex-1" style={{ fontSize: 'clamp(1.15rem, 1.5cqw, 1.65rem)', lineHeight: 1.4, textWrap: 'balance' } as React.CSSProperties}>{action.desc}</p>
                <span className="px-4 py-1 rounded-full mo-fade"
                  style={{ background: 'rgba(242,169,59,0.14)', color: '#F2A93B', border: '1px solid rgba(242,169,59,0.35)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600, animationDelay: `${0.6 + i * 0.07}s`, whiteSpace: 'nowrap' }}>
                  {action.cta}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/75 text-3xl mo-rise" style={{ animationDelay: '0.75s', textWrap: 'balance' } as React.CSSProperties}>
            בלי תקציב ובלי צוות פיתוח. תהליך אחד וחצי שעה.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
