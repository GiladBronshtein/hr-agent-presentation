import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

export default function S28_DemoPreview() {
  const { setDemoApprovalState } = usePresentationStore();

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שלב 5</p>
            <SceneTitle size="md">תצוגה מקדימה</SceneTitle>
            <p className="text-white/40 text-3xl mt-1">האייג׳נט מציג את מה שהכין, לפני ביצוע</p>
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-3xl font-medium mb-3" style={{ color: '#6366F1' }}>🤖 OnboardBot: סיכום לאישור</p>
            <div className="space-y-2 text-3xl text-white/70">
              <p>✓ פגישת 1:1 תואמה: 14/7 09:00</p>
              <p>✓ בקשת גישות IT נשלחה (Jira, Figma, Slack)</p>
              <p>✓ רישום לקורסים: PM-101, Product-Strategy</p>
              <p>⏳ מייל ברוך הבא - <strong className="text-white">ממתין לאישורך</strong></p>
            </div>
          </div>
          <GlassCard>
            <p className="text-white/60 text-3xl mb-3">טיוטת מייל לאישור:</p>
            <div className="p-3 rounded-lg text-3xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-white/40 text-3xl mb-2">אל: yael.cohen@company.co.il</p>
              <p className="text-white/40 text-3xl mb-3">נושא: ברוכה הבאה! יום ראשון שלך: 15 ביולי</p>
              <p className="text-white/70 leading-relaxed">
                יעל שלום,<br /><br />
                אנחנו שמחים שתצטרפי אלינו! הכנתי עבורך תוכנית קליטה מלאה...
              </p>
            </div>
          </GlassCard>
          <p className="text-center text-white/40 text-3xl">
            ← בשקף הבא: האם לאשר?
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
