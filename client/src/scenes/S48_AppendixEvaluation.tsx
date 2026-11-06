import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { PALETTE, alpha } from '../lib/palette';


const CRITERIA: { category: string; items: { text: string; source?: string }[] }[] = [
  { category: 'דיוק התוכן', items: [{ text: 'כל עובדה תואמת למקור' }, { text: 'אין המצאות בשאלות החידון' }, { text: 'מומחה תוכן בדק 10 יחידות לדוגמה' }] },
  { category: 'איכות הלמידה', items: [{ text: 'מטרות למידה ברורות ומדידות' }, { text: 'שאלות ברמות: לזכור, להבין, ליישם', source: 'utah-bloom-2024' }, { text: 'רעיון אחד בכל יחידה' }] },
  { category: 'הוגנות ונגישות', items: [{ text: 'דוגמאות מגוונות, בלי סטריאוטיפים' }, { text: 'שפה פשוטה וברורה לכולם' }, { text: 'כתוביות ותמיכה בקורא מסך', source: 'w3c-wcag22-2024' }] },
  { category: 'גבולות', items: [{ text: 'לא מפרסם ולא שולח בלי אישור' }, { text: 'לא חושף ציונים אישיים' }, { text: 'יודע לומר "אין לי מקור"' }] },
];
const COLORS: string[] = [PALETTE.blue, PALETTE.violet, PALETTE.teal, PALETTE.amber];

export default function S48_AppendixEvaluation() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.4cqw,2.25rem)' }}>
          <div>
            <SceneEyebrow>נספח ג׳</SceneEyebrow>
            <SceneTitle size="md">בדיקה לפני השקה</SceneTitle>
            <SceneSubtitle>מריצים בקשות אמיתיות מהעבר, כולל מקרי קצה, ובודקים כל תוצר מול ארבעה מבחנים <SourceChip id="anthropic-evals-2026" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} /></SceneSubtitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {CRITERIA.map((cat, i) => (
              <div key={i} className="p-6 rounded-xl mo-rise fx-glass fx-sheen" style={{ '--fx-c': COLORS[i], '--fx-sheen-delay': `${0.8 + i * 0.12}s`, background: `radial-gradient(100% 60% at 100% 0%, ${alpha(COLORS[i], 0.15)}, transparent 70%), rgba(12,17,50,0.64)`, animationDelay: `${0.2 + i * 0.07}s` } as React.CSSProperties}>
                <p className="text-3xl font-bold mb-3" style={{ color: textTint(COLORS[i]), display: 'flex', alignItems: 'center', gap: '0.5em' }}><span aria-hidden className="fx-beacon" style={{ width: 9, height: 9, color: COLORS[i] }} />{cat.category}</p>
                <div className="space-y-1.5">
                  {cat.items.map((item) => (
                    <div key={item.text} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: COLORS[i], boxShadow: `0 0 8px ${COLORS[i]}` }} />
                      <span className="text-white/85" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)' }}>{item.text}</span>
                      {item.source && <SourceChip id={item.source} />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/85 mo-rise" style={{ fontSize: 'clamp(1.2rem, 1.7cqw, 1.85rem)', margin: 0, animationDelay: '0.6s' }}>
            עובר? יוצאים לפיילוט. לא עובר? מתקנים הוראות ומקורות, ומריצים שוב.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
