import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { AlertTriangle, ClipboardList, Eye, Hand, Lock, RefreshCw, Target } from 'lucide-react';
import { textTint } from '../lib/typeTokens';

const PRINCIPLES = [
  { icon: Eye, title: 'שקיפות', desc: 'תמיד ברור שהשיחה היא עם AI', color: '#6366F1' },
  { icon: Target, title: 'מטרה מוגדרת', desc: 'כל אייג׳נט עושה דבר אחד בלבד', color: '#10B981' },
  { icon: ClipboardList, title: 'תיעוד מלא', desc: 'כל פעולה מתועדת עם timestamp', color: '#F59E0B' },
  { icon: Hand, title: 'אישור אנושי', desc: 'פעולות רגישות דורשות אישור', color: '#F43F5E' },
  { icon: Lock, title: 'הרשאות מינימליות', desc: 'גישה רק למה שנדרש', color: '#A78BFA' },
  { icon: RefreshCw, title: 'ביקורת תקופתית', desc: 'בדיקה כל רבעון', color: '#22D3EE' },
];

export default function S36_Governance() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">ממשל ואחריות</SceneTitle>
            <SceneSubtitle>שישה עקרונות לאייג׳נט אחראי</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {PRINCIPLES.map((p, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                <div className="text-4xl mb-2" style={{ color: textTint(p.color) }}><p.icon size="1em" /></div>
                <h3 className="font-bold text-3xl mb-1" style={{ color: textTint(p.color) }}>{p.title}</h3>
                <p className="text-white/70 text-3xl leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{p.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)', animationDelay: '0.65s' }}>
            <p className="text-white/75 text-3xl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
              <AlertTriangle aria-hidden size="1em" style={{ color: '#FDA4AF', flexShrink: 0 }} />
              ממשל לא מוריד ערך, הוא מה שמאפשר לסמוך על האייג׳נט
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
