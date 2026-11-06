import { SceneBase, ContentLayout, SceneTitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';
import { useEffect } from 'react';
import { sound } from '../lib/sound';

/** This slide's chapter accent (fills) and its text-safe tint */
const { t: ACC_T } = accentFor('demo-result');

const STATS = [
  { val: 3, suffix: ' שעות', label: 'בתרחיש שלנו, מבקשה ועד תוכנית מאושרת', color: textOn(PALETTE.blue) },
  { val: 40, suffix: ' דקות', label: 'למידה בסך הכול, רק מה שחסר', color: textOn(PALETTE.violet) },
  { val: 1, suffix: ' אישור', label: 'אדם מחליט לפני שמשהו יוצא', color: PALETTE.amber },
  { val: 30, suffix: ' יום', label: 'ואז מודדים את אחוז הסגירה', color: PALETTE.teal },
];

export default function S32_DemoResult() {
  // each card lands with a rising note; light settles as the numbers stop counting
  useEffect(() => {
    const stops = [
      ...STATS.map((_, i) => sound.demo.land(i * 2, 0.35 + i * 0.22)),
      sound.demo.glow(1.75),
    ];
    return () => stops.forEach((f) => f());
  }, []);

  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-7xl text-center" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4cqh, 3rem)' }}>
          <SceneTitle size="md" variant="glow">מה ראינו?</SceneTitle>
          <div className="grid grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <GlassCard key={stat.label} className="text-center mo-rise" padding="clamp(1.5rem, 3cqh, 2.25rem) clamp(1rem, 1.4cqw, 1.5rem)" style={{ '--fx-c': stat.color, '--fx-sheen-delay': `${1.6 + i * 0.12}s`, animationDelay: `${0.15 + i * 0.22}s`, background: `radial-gradient(90% 70% at 50% 0%, ${alpha(stat.color, 0.16)}, transparent 70%), rgba(12,17,50,0.62)` } as React.CSSProperties}>
                <div className="font-black mb-2" style={{ textShadow: `0 0 22px ${alpha(stat.color, 0.5)}`, color: stat.color, fontSize: 'clamp(2.25rem, 2.5cqw, 3rem)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                  <AnimatedNumber value={stat.val} suffix={stat.suffix} color={stat.color} fontFamily="'Heebo', sans-serif" />
                </div>
                <p className="text-white/75 text-3xl" style={{ textWrap: 'balance' } as React.CSSProperties}>{stat.label}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-7 rounded-xl mo-rise fx-accent fx-sheen" style={{ '--fx-sheen-delay': '1.3s', animationDelay: '0.7s' } as React.CSSProperties}>
            <p className="text-white/85 text-3xl leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
              האייג׳נט לא החליף את אנשי ה-L&D. הוא לקח את העבודה שסביב הלמידה,<br />
              <strong style={{ color: ACC_T }}>כדי שנוכל להתמקד באבחון, בתרגול ובאימפקט</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
