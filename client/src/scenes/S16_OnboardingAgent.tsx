import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

export default function OnboardingAgent() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לקליטת עובד</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">4-6 שעות עבודה ידנית</p>
            </GlassCard>
            <GlassCard style={{ background: '#F43F5E10', border: '1px solid #F43F5E25' }}>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">30 דקות בדיקה ואישור</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">מסלול כניסה מותאם, מלא ומאושר</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl">⚠️</span>
            <p className="text-white/60 text-3xl">HR מאשר לפני שליחה וביצוע</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
