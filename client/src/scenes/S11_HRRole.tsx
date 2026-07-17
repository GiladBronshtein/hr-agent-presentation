import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';
import { BarChart3, BookOpen, Hand, Search, Sprout, Target } from 'lucide-react';

const ROLES = [
  { icon: Target, title: 'מגדיר גבולות', desc: 'HR קובע מה מותר לאייג׳נט לעשות ומה אסור' },
  { icon: BookOpen, title: 'מאשר מקורות', desc: 'HR מחליט אילו מסמכים ומדיניות הם מקורות מאושרים' },
  { icon: Hand, title: 'מעצב נקודות אישור', desc: 'HR קובע מתי האייג׳נט עוצר ומחכה לאדם' },
  { icon: BarChart3, title: 'מגדיר מדדי הצלחה', desc: 'HR מחליט מה מדדים, לא רק "זה עובד"' },
  { icon: Search, title: 'בודק ומאמת', desc: 'HR מוודא שהאייג׳נט מתנהג כמצופה' },
  { icon: Sprout, title: 'מפתח ומשפר', desc: 'HR מוביל את שיפור האייג׳נט לאורך זמן' },
];

export default function S11_HRRole() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">תפקיד HR</SceneTitle>
            <p className="text-white/65 mt-2">HR הוא לא רק לקוח, הוא אחד המעצבים</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ROLES.map((role, i) => (
              <GlassCard key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both', opacity: 0 }}>
                <div className="text-4xl mb-3"><role.icon size="1em" /></div>
                <h3 className="text-white font-bold text-3xl mb-1">{role.title}</h3>
                <p className="text-white/65 text-3xl leading-relaxed">{role.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-white/70 text-3xl">
              <strong className="text-white">IT</strong> מחבר את הכלים.{' '}
              <strong style={{ color: '#6366F1' }}>HR</strong> עוזר להגדיר איך עבודה טובה נראית.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
