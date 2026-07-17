import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

export default function OnboardingAgent() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-8">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לקליטת עובד</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-base leading-relaxed">4-6 שעות עבודה ידנית</p>
            </GlassCard>
            <GlassCard style={{ background: '#FF6B6B10', border: '1px solid #FF6B6B25' }}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-base leading-relaxed">30 דקות בדיקה ואישור</p>
            </GlassCard>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-sm leading-relaxed">מסלול כניסה מותאם, מלא ומאושר</p>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
            <span className="text-red-400 text-sm">⚠️</span>
            <p className="text-white/60 text-sm">HR מאשר לפני שליחה וביצוע</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
