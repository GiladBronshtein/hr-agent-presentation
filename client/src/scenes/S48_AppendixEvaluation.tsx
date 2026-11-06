import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const CRITERIA = [
  { category: 'דיוק התוכן', items: ['כל עובדה תואמת למקור', 'אין המצאות בשאלות החידון', 'מומחה תוכן בדק 10 יחידות לדוגמה'] },
  { category: 'איכות הלמידה', items: ['מטרות למידה ברורות ומדידות', 'שאלות ברמות: לזכור, להבין, ליישם', 'רעיון אחד בכל יחידה'] },
  { category: 'הוגנות ונגישות', items: ['דוגמאות מגוונות, בלי סטריאוטיפים', 'שפה פשוטה וברורה לכולם', 'כתוביות ותמיכה בקורא מסך'] },
  { category: 'גבולות', items: ['לא מפרסם ולא שולח בלי אישור', 'לא חושף ציונים אישיים', 'יודע לומר "אין לי מקור"'] },
];
const COLORS = ['#F2A93B', '#F2A93B', '#F2A93B', '#8A93A8'];

export default function S48_AppendixEvaluation() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.4cqw,2.25rem)' }}>
          <div>
            <SceneEyebrow>נספח ג׳</SceneEyebrow>
            <SceneTitle size="md">בדיקה לפני השקה</SceneTitle>
            <SceneSubtitle>מריצים 20 בקשות אמיתיות מהעבר, ובודקים כל תוצר מול ארבעה מבחנים</SceneSubtitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {CRITERIA.map((cat, i) => (
              <div key={i} className="p-6 rounded-xl mo-rise" style={{ background: COLORS[i] + '08', border: `1px solid ${COLORS[i]}20`, animationDelay: `${0.2 + i * 0.07}s` }}>
                <p className="text-3xl font-bold mb-3" style={{ color: textTint(COLORS[i]) }}>{cat.category}</p>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                      <span className="text-white/75" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/75 mo-rise" style={{ fontSize: 'clamp(1.2rem, 1.7cqw, 1.85rem)', margin: 0, animationDelay: '0.6s' }}>
            עובר? יוצאים לפיילוט. לא עובר? מתקנים הוראות ומקורות, ומריצים שוב.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
