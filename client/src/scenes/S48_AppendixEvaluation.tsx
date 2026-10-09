import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const CRITERIA = [
  { category: 'דיוק', items: ['האם המידע נכון?', 'האם המקורות מצוינים?', 'האם הגבולות נשמרו?'] },
  { category: 'יעילות', items: ['זמן לסיום', 'מספר פעולות', 'שגיאות'] },
  { category: 'חוויה', items: ['שביעות רצון הצוות', 'שביעות רצון HR', 'בהירות תקשורת'] },
  { category: 'בטיחות', items: ['חריגות מגבולות', 'פעולות ללא אישור', 'גישה לא מורשית'] },
];

export default function S48_AppendixEvaluation() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <SceneEyebrow>נספח ג׳</SceneEyebrow>
            <SceneTitle size="md">מסגרת הערכה</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {CRITERIA.map((cat, i) => {
              const colors = ['#6366F1', '#10B981', '#F59E0B', '#F43F5E'];
              return (
                <div key={i} className="p-6 rounded-xl mo-rise" style={{ background: colors[i] + '08', border: `1px solid ${colors[i]}20`, animationDelay: `${0.2 + i * 0.07}s` }}>
                  <p className="text-3xl font-bold mb-3" style={{ color: textTint(colors[i]) }}>{cat.category}</p>
                  <div className="space-y-1.5">
                    {cat.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors[i] }} />
                        <span className="text-white/75 text-3xl">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
