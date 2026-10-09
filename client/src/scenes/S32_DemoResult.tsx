import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';

export default function S32_DemoResult() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-7xl text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4cqh, 3rem)' }}>
          <SceneTitle size="md">מה ראינו?</SceneTitle>
          <div className="grid grid-cols-4 gap-6">
            {[
              { val: 6, suffix: ' שעות', label: 'חיסכון בעבודה ידנית', color: '#10B981' },
              { val: 6, suffix: ' מערכות', label: 'מחוברות אוטומטית', color: '#6366F1' },
              { val: 1, suffix: ' נקודה', label: 'אישור אנושי', color: '#F59E0B' },
              { val: 100, suffix: '%', label: 'תיעוד מלא', color: '#A78BFA' },
            ].map((stat, i) => (
              <GlassCard key={i} className="text-center mo-rise" padding="clamp(1.5rem, 3cqh, 2.25rem) clamp(1rem, 1.4cqw, 1.5rem)" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                <div className="font-black mb-2" style={{ color: stat.color, fontSize: 'clamp(2.25rem, 2.5cqw, 3rem)', lineHeight: 1.1, whiteSpace: 'nowrap', textShadow: `0 0 40px ${stat.color}45` }}>
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} color={stat.color} fontFamily="'Heebo', sans-serif" />
                </div>
                <p className="text-white/75 text-3xl" style={{ textWrap: 'balance' } as React.CSSProperties}>{stat.label}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-7 rounded-xl mo-rise" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', animationDelay: '0.7s' }}>
            <p className="text-white/85 text-3xl leading-relaxed">
              האייג׳נט לא החליף את HR: הוא שחרר את HR מ-6 שעות תיאום<br />
              <strong style={{ color: '#6EE7B7' }}>כדי להתמקד בחוויה האמיתית של האנשים</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
