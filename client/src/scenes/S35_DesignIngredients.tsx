import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { CODE_FONT } from '../lib/typeTokens';
import { BarChart3, BookOpen, ClipboardList, Database, Hand, Wrench } from 'lucide-react';

const INGREDIENTS = [
  { icon: ClipboardList, title: 'הוראות לאייג׳נט', desc: 'מי הוא, מה המטרה, איך הוא כותב', example: 'אתה LearnBot, עוזר הלמידה של צוות L&D...' },
  { icon: BookOpen, title: 'מקורות ידע', desc: 'רק חומרים שהצוות אישר', example: 'מסמך מוצר Pro, ספריית הקורסים ב-LMS' },
  { icon: Wrench, title: 'כלים', desc: 'מה הוא רשאי להפעיל, ובאיזו רמה', example: 'lms.read_courses, quiz.create_draft' },
  { icon: Hand, title: 'נקודות עצירה', desc: 'איפה הוא מחכה לאדם', example: 'לפני פרסום יחידה ולפני רישום לקורס' },
  { icon: Database, title: 'זיכרון', desc: 'מה לזכור מבקשה לבקשה', example: 'team, request_id, approved_units[]' },
  { icon: BarChart3, title: 'מדדי הצלחה', desc: 'איך נדע שזה עובד', example: 'זמן מבקשה לטיוטה, הערות מומחה ליחידה' },
];

export default function S35_DesignIngredients() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4cqw,4rem)' }}>
          <div>
            <SceneTitle size="md">מרכיבי העיצוב</SceneTitle>
            <SceneSubtitle>שישה דברים להגדיר לפני שבונים. הדוגמה: LearnBot</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3" style={{ gap: 'clamp(1.25rem,2.5cqw,2.5rem)' }}>
            {INGREDIENTS.map((ing, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.2 + i * 0.06}s` }}>
                <div className="text-3xl mb-2" style={{ color: '#F2A93B' }}><ing.icon size="1em" /></div>
                <h3 className="text-white font-bold text-3xl mb-1">{ing.title}</h3>
                <p className="text-white/70 text-3xl mb-3 leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{ing.desc}</p>
                {/* Code chip: direction follows its content, so Latin code stays LTR
                    (no "[]approved_units") and Hebrew examples stay RTL in Heebo */}
                <div dir="auto" className="rounded-lg"
                  style={{ padding: '0.5rem 0.75rem', fontFamily: /[\u0590-\u05FF]/.test(ing.example) ? "'Heebo', sans-serif" : CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', lineHeight: 1.5, textAlign: 'start', background: 'rgba(243,238,228,0.08)', color: '#F3EEE4', border: '1px solid rgba(243,238,228,0.2)' }}>
                  {ing.example}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
