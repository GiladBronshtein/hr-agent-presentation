import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';
import { AlertTriangle } from 'lucide-react';

export default function KnowledgePreservation() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לשימור ידע</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">ידע עוזב עם העובד</p>
            </GlassCard>
            <GlassCard style={{ background: '#F59E0B10', border: '1px solid #F59E0B25' }}>
              <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">ידע מתועד ומאושר</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">הידע לא צריך לעזוב יחד עם העובד</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl inline-flex shrink-0" style={{ marginTop: '0.15em' }}><AlertTriangle size="1em" /></span>
            <p className="text-white/60 text-3xl">הידע מאושר על ידי העובד לפני שמירה</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
