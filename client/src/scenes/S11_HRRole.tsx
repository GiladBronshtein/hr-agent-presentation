import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const ROLES = [
  { icon: '🎯', title: 'מגדיר גבולות', desc: 'HR קובע מה מותר לאייג׳נט לעשות ומה אסור' },
  { icon: '📚', title: 'מאשר מקורות', desc: 'HR מחליט אילו מסמכים ומדיניות הם מקורות מאושרים' },
  { icon: '✋', title: 'מעצב נקודות אישור', desc: 'HR קובע מתי האייג׳נט עוצר ומחכה לאדם' },
  { icon: '📊', title: 'מגדיר מדדי הצלחה', desc: 'HR מחליט מה מדדים, לא רק "זה עובד"' },
  { icon: '🔍', title: 'בודק ומאמת', desc: 'HR מוודא שהאייג׳נט מתנהג כמצופה' },
  { icon: '🌱', title: 'מפתח ומשפר', desc: 'HR מוביל את שיפור האייג׳נט לאורך זמן' },
];

export default function S11_HRRole() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">תפקיד HR</SceneTitle>
            <p className="text-white/50 mt-2">HR הוא לא רק לקוח, הוא אחד המעצבים</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ROLES.map((role, i) => (
              <GlassCard key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both', opacity: 0 }}>
                <div className="text-2xl mb-3">{role.icon}</div>
                <h3 className="text-white font-bold text-sm mb-1">{role.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{role.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-white/70 text-sm">
              <strong className="text-white">IT</strong> מחבר את הכלים.{' '}
              <strong style={{ color: '#6366F1' }}>HR</strong> עוזר להגדיר איך עבודה טובה נראית.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
