import type { ReactNode } from 'react';
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';
import { ClipboardList, FileText, PenLine, Timer } from 'lucide-react';
import { PALETTE, SPECTRUM_STOPS, alpha, textOn } from '../lib/palette';


const ACTIONS: { icon: typeof ClipboardList; title: string; desc: ReactNode; cta: string }[] = [
  { icon: ClipboardList, title: 'לבחור תהליך', desc: 'שחוזר כל שבוע, למשל חידון', cta: 'היום' },
  { icon: FileText, title: 'למפות בדף אחד', desc: 'מה נכנס, מה יוצא, ומי מאשר', cta: 'מחר' },
  // The Latin run is isolated, so "AI" never flips sides in RTL
  { icon: PenLine, title: 'לנסות טיוטה', desc: <>עוזר <bdi>AI</bdi> ומסמך מקור אחד</>, cta: 'עד סוף השבוע' },
  { icon: Timer, title: 'לרשום כמה זמן', desc: 'לעומת הדרך הרגילה', cta: 'עד סוף השבוע' },
];

/** The four steps, today first: amber (the chapter) into the spectrum */
const STEP_COLORS = [PALETTE.amber, ...SPECTRUM_STOPS.slice(0, 3).reverse()] as string[];

export default function S45_FinalAction() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full space-y-8 text-center" style={{ maxWidth: '80rem' }}>
          <div>
            <SceneEyebrow>צעד אחד קטן, כבר השבוע</SceneEyebrow>
            <SceneTitle size="lg" variant="glow">
              מה נעשה<br />
              <span className="fx-spectrum-text fx-shine-once">מחר בבוקר?</span>
            </SceneTitle>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {ACTIONS.map((action, i) => (
              <div key={i} className="p-7 rounded-xl text-center mo-rise flex flex-col items-center fx-glass fx-sheen"
                style={{
                  '--fx-c': STEP_COLORS[i],
                  '--fx-sheen-delay': `${1.1 + i * 0.25}s`,
                  background: `radial-gradient(100% 60% at 50% 0%, ${alpha(STEP_COLORS[i], 0.18)}, transparent 70%), rgba(12,17,50,0.64)`,
                  animationDelay: `${0.2 + i * 0.07}s`,
                } as React.CSSProperties}>
                <span className="block mb-3" style={{ fontSize: 'clamp(2.6rem, 4.2cqw, 4rem)', color: textOn(STEP_COLORS[i]), display: 'flex', justifyContent: 'center', filter: `drop-shadow(0 0 14px ${alpha(STEP_COLORS[i], 0.8)})` }}><action.icon size="1em" /></span>
                <h3 className="text-white font-bold text-3xl mb-1">{action.title}</h3>
                <p className="text-white/80 mb-4 flex-1" style={{ fontSize: 'clamp(1.15rem, 1.5cqw, 1.65rem)', lineHeight: 1.4, textWrap: 'balance' } as React.CSSProperties}>{action.desc}</p>
                <span className="px-4 py-1 rounded-full mo-fade"
                  style={{ background: alpha(STEP_COLORS[i], 0.16), color: textOn(STEP_COLORS[i]), border: `1px solid ${alpha(STEP_COLORS[i], 0.45)}`, boxShadow: i === 0 ? `0 0 22px -4px ${STEP_COLORS[i]}` : 'none', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600, animationDelay: `${0.6 + i * 0.07}s`, whiteSpace: 'nowrap' }}>
                  {action.cta}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/85 text-3xl mo-rise" style={{ animationDelay: '0.75s', textWrap: 'balance' } as React.CSSProperties}>
            בלי תקציב ובלי צוות פיתוח. תהליך אחד וחצי שעה.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
