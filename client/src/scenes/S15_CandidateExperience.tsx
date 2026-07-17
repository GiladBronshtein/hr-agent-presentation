import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

export default function CandidateExperience() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לחוויית מועמד</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">עיכוב שבועות ללא עדכון</p>
            </GlassCard>
            <GlassCard style={{ background: '#10B98110', border: '1px solid #10B98125' }}>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">עדכון מותאם תוך שעות</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">אוטומציה שולחת הודעה. אייג׳נט מבין איזו מתאימה.</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl">⚠️</span>
            <p className="text-white/60 text-3xl">דחיות ללא אישור אנושי, אסור</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
