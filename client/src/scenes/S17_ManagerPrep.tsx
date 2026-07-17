import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

export default function ManagerPrep() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט להכנת מנהלים</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">מנהל מגיע ל-1:1 לא מוכן</p>
            </GlassCard>
            <GlassCard style={{ background: '#F59E0B10', border: '1px solid #F59E0B25' }}>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">סדר יום, פעולות פתוחות, שאלות coaching</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">האייג׳נט מכין. המנהל מחליט, מדבר ומוביל.</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl">⚠️</span>
            <p className="text-white/60 text-3xl">אבחון אישיות, כוונת עזיבה, נשאר אנושי</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
