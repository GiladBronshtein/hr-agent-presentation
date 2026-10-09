import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { BarChart3, BookOpen, Hand, Search, Sprout, Target } from 'lucide-react';

const ROLES = [
  { icon: Target, title: 'הגדרת גבולות', desc: 'HR קובע מה מותר לאייג׳נט לעשות ומה אסור' },
  { icon: BookOpen, title: 'אישור מקורות', desc: 'HR מחליט אילו מסמכים ומדיניות הם מקורות מאושרים' },
  { icon: Hand, title: 'עיצוב נקודות אישור', desc: 'HR קובע מתי האייג׳נט עוצר ומחכה לאדם' },
  { icon: BarChart3, title: 'הגדרת מדדי הצלחה', desc: 'HR מחליט מה למדוד, לא רק "זה עובד"' },
  { icon: Search, title: 'בדיקה ואימות', desc: 'HR מוודא שהאייג׳נט מתנהג כמצופה' },
  { icon: Sprout, title: 'פיתוח ושיפור', desc: 'HR מוביל את שיפור האייג׳נט לאורך זמן' },
];

export default function S11_HRRole() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">תפקיד HR</SceneTitle>
            <SceneSubtitle>HR הוא לא רק לקוח, הוא אחד המעצבים</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {ROLES.map((role, i) => (
              <GlassCard key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both', opacity: 0 }}>
                <div className="text-4xl mb-3"><role.icon size="1em" /></div>
                <h3 className="text-white font-bold text-3xl mb-1">{role.title}</h3>
                <p className="text-white/70 text-3xl leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{role.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', animationDelay: '0.65s' }}>
            <p className="text-white/70 text-3xl">
              <strong className="text-white">IT</strong> מחבר את הכלים.{' '}
              <strong style={{ color: '#A5B4FC' }}>HR</strong> עוזר להגדיר איך עבודה טובה נראית.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
