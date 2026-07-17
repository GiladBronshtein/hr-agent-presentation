import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';
import { AlertTriangle } from 'lucide-react';

export default function RecruitingAgent() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לפתיחת משרה</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">3-5 ימים ממנהל ל-HR</p>
            </GlassCard>
            <GlassCard style={{ background: '#6366F110', border: '1px solid #6366F125' }}>
              <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">2-4 שעות</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">הופך בקשה עמומה לבקשה שאפשר לבחון</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl inline-flex shrink-0" style={{ marginTop: '0.15em' }}><AlertTriangle size="1em" /></span>
            <p className="text-white/60 text-3xl">האייג׳נט אינו מחליט אם צריך לגייס</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
