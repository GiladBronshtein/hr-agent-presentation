import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const PRINCIPLES = [
  { icon: '👁️', title: 'שקיפות', desc: 'העובד יודע שמדבר עם AI', color: '#6366F1' },
  { icon: '🎯', title: 'מטרה מוגדרת', desc: 'כל אייג׳נט עושה דבר אחד בלבד', color: '#10B981' },
  { icon: '📋', title: 'תיעוד מלא', desc: 'כל פעולה מתועדת עם timestamp', color: '#F59E0B' },
  { icon: '✋', title: 'אישור אנושי', desc: 'פעולות רגישות דורשות אישור', color: '#F43F5E' },
  { icon: '🔒', title: 'הרשאות מינימליות', desc: 'גישה רק למה שנדרש', color: '#A78BFA' },
  { icon: '🔄', title: 'ביקורת תקופתית', desc: 'בדיקה כל רבעון', color: '#22D3EE' },
];

export default function S36_Governance() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <SceneTitle size="md">ממשל ואחריות</SceneTitle>
            <p className="text-white/50 mt-2 text-sm">ששה עקרונות לאייג׳נט אחראי</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PRINCIPLES.map((p, i) => (
              <GlassCard key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both', opacity: 0 }}>
                <div className="text-2xl mb-2">{p.icon}</div>
                <h3 className="font-bold text-sm mb-1" style={{ color: p.color }}>{p.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{p.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <p className="text-white/60 text-sm">
              ⚠️ ממשל לא מוריד ערך, הוא מה שמאפשר לסמוך על האייג׳נט
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
