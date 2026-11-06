import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';

const STATS = [
  { val: 3, suffix: ' שעות', label: 'עד תוכנית מאושרת, לא שבועות', color: '#F2A93B' },
  { val: 40, suffix: ' דקות', label: 'למידה בסך הכול, רק מה שחסר', color: '#F2A93B' },
  { val: 1, suffix: ' אישור', label: 'אדם מחליט לפני שמשהו יוצא', color: '#F2A93B' },
  { val: 30, suffix: ' יום', label: 'ואז מודדים את אחוז הסגירה', color: '#F2A93B' },
];

export default function S32_DemoResult() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-7xl text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4cqh, 3rem)' }}>
          <SceneTitle size="md">מה ראינו?</SceneTitle>
          <div className="grid grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <GlassCard key={stat.label} className="text-center mo-rise" padding="clamp(1.5rem, 3cqh, 2.25rem) clamp(1rem, 1.4cqw, 1.5rem)" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                <div className="font-black mb-2" style={{ color: stat.color, fontSize: 'clamp(2.25rem, 2.5cqw, 3rem)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} color={stat.color} fontFamily="'Heebo', sans-serif" />
                </div>
                <p className="text-white/75 text-3xl" style={{ textWrap: 'balance' } as React.CSSProperties}>{stat.label}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-7 rounded-xl mo-rise" style={{ background: 'rgba(242,169,59,0.08)', border: '1px solid rgba(242,169,59,0.2)', animationDelay: '0.7s' }}>
            <p className="text-white/85 text-3xl leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
              האייג׳נט לא החליף את אנשי ה-L&D. הוא לקח את העבודה שסביב הלמידה,<br />
              <strong style={{ color: '#F2A93B' }}>כדי שנוכל להתמקד באבחון, בתרגול ובאימפקט</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
