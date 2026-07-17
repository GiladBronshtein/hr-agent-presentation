import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

export default function EmployeeService() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שימוש</p>
            <SceneTitle size="md">אייג׳נט לשירות עובדים</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <GlassCard>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">לפני</p>
              <p className="text-white/70 text-3xl leading-relaxed">שאלות חוזרות ל-HR</p>
            </GlassCard>
            <GlassCard style={{ background: '#22D3EE10', border: '1px solid #22D3EE25' }}>
              <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">אחרי</p>
              <p className="text-white font-medium text-3xl leading-relaxed">תשובה עם מקור ותאריך עדכון</p>
            </GlassCard>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/70 text-3xl leading-relaxed">כשמידע חסר, עוצר ושואל, לא מנחש</p>
          </div>
          <div className="flex items-start gap-5 p-6 rounded-xl" style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)' }}>
            <span className="text-red-400 text-3xl">⚠️</span>
            <p className="text-white/60 text-3xl">מקורות סותרים → הסלמה ל-HR</p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
