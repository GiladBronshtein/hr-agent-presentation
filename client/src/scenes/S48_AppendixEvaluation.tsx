import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const CRITERIA = [
  { category: 'דיוק', items: ['האם המידע נכון?', 'האם המקורות מצוינים?', 'האם הגבולות נשמרו?'] },
  { category: 'יעילות', items: ['זמן לסיום', 'מספר פעולות', 'שגיאות'] },
  { category: 'חוויה', items: ['שביעות רצון עובד', 'שביעות רצון HR', 'בהירות תקשורת'] },
  { category: 'בטיחות', items: ['חריגות מגבולות', 'פעולות ללא אישור', 'גישה לא מורשית'] },
];

export default function S48_AppendixEvaluation() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">נספח ג׳</p>
            <SceneTitle size="md">מסגרת הערכה</SceneTitle>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {CRITERIA.map((cat, i) => {
              const colors = ['#6366F1', '#10B981', '#F59E0B', '#F43F5E'];
              return (
                <div key={i} className="p-6 rounded-xl" style={{ background: colors[i] + '08', border: `1px solid ${colors[i]}20` }}>
                  <p className="text-3xl font-bold mb-3" style={{ color: colors[i] }}>{cat.category}</p>
                  <div className="space-y-1.5">
                    {cat.items.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors[i] }} />
                        <span className="text-white/60 text-3xl">{item}</span>
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
