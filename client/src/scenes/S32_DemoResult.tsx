import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';

export default function S32_DemoResult() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-8 text-center">
          <SceneTitle size="md">מה ראינו?</SceneTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: 6, suffix: ' שעות', label: 'חסכון בעבודה ידנית', color: '#10B981' },
              { val: 6, suffix: ' מערכות', label: 'מחוברות אוטומטית', color: '#6366F1' },
              { val: 1, suffix: ' נקודה', label: 'אישור אנושי', color: '#F59E0B' },
              { val: 100, suffix: '%', label: 'תיעוד מלא', color: '#A78BFA' },
            ].map((stat, i) => (
              <GlassCard key={i} className="text-center">
                <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="text-white/50 text-xs">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-5 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <p className="text-white/80 text-base leading-relaxed">
              האייג׳נט לא החליף את HR — הוא שחרר את HR מ-6 שעות תיאום<br />
              <strong style={{ color: '#10B981' }}>כדי שיוכל להתמקד בחוויית העובד האמיתית</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
