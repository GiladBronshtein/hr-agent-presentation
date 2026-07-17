import { useState } from 'react';
import { Bot, Settings, User, UserCheck } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

type Answer = 'yes' | 'no' | null;

export default function S09_DecisionTree() {
  const [q1, setQ1] = useState<Answer>(null);
  const [q2, setQ2] = useState<Answer>(null);
  const [q3, setQ3] = useState<Answer>(null);

  const getRecommendation = () => {
    if (q1 === 'yes') return { label: 'אוטומציה', color: '#F59E0B', icon: Settings, desc: 'השלבים תמיד זהים, אוטומציה פשוטה מספיקה ועדיפה.' };
    if (q1 === 'no' && q2 === 'no') return { label: 'אדם', color: '#F43F5E', icon: User, desc: 'ללא הקשר, אדם עם סיוע AI הוא הפתרון הנכון.' };
    if (q1 === 'no' && q2 === 'yes' && q3 === 'yes') return { label: 'אייג׳נט עם אישור', color: '#6366F1', icon: UserCheck, desc: 'מתאים לאייג׳נט, עם נקודת אישור אנושית חובה.' };
    if (q1 === 'no' && q2 === 'yes' && q3 === 'no') return { label: 'אייג׳נט', color: '#10B981', icon: Bot, desc: 'מתאים לאייג׳נט עם אישור בנקודות מוגדרות.' };
    return null;
  };

  const rec = getRecommendation();

  const Btn = ({ val, current, set, yes, no }: { val: Answer, current: Answer, set: (v: Answer) => void, yes: string, no: string }) => (
    <div className="flex gap-2">
      {(['yes', 'no'] as const).map((v) => (
        <button key={v} onClick={() => set(current === v ? null : v)}
          className="flex-1 py-2 rounded-lg text-3xl font-medium transition-all"
          style={{
            background: current === v ? (v === 'yes' ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)') : 'rgba(255,255,255,0.05)',
            border: current === v ? `1px solid ${v === 'yes' ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)'}` : '1px solid rgba(255,255,255,0.08)',
            color: current === v ? (v === 'yes' ? '#10B981' : '#F43F5E') : 'rgba(255,255,255,0.68)',
          }}>
          {v === 'yes' ? yes : no}
        </button>
      ))}
    </div>
  );

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">עץ ההחלטות</SceneTitle>
            <p className="text-white/60 text-3xl mt-2">ענו על שלוש שאלות</p>
          </div>
          <div className="space-y-8">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="text-white/80 text-3xl font-medium mb-3">1. האם השלבים תמיד זהים?</p>
              <Btn val={q1} current={q1} set={setQ1} yes="כן, תמיד" no="לא, משתנה" />
            </div>
            {q1 === 'no' && (
              <div className="p-6 rounded-xl animate-fade-in" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white/80 text-3xl font-medium mb-3">2. האם נדרש הקשר מורכב?</p>
                <Btn val={q2} current={q2} set={setQ2} yes="כן" no="לא" />
              </div>
            )}
            {q1 === 'no' && q2 === 'yes' && (
              <div className="p-6 rounded-xl animate-fade-in" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white/80 text-3xl font-medium mb-3">3. האם הפעולה רגישה?</p>
                <Btn val={q3} current={q3} set={setQ3} yes="כן, רגישה" no="לא, בסיכון נמוך" />
              </div>
            )}
          </div>
          {rec && (
            <div className="p-7 rounded-xl animate-fade-in text-center" style={{ background: rec.color + '12', border: `1px solid ${rec.color}30` }}>
              <div className="text-5xl mb-2"><rec.icon size="1em" /></div>
              <h3 className="text-3xl font-bold mb-1" style={{ color: rec.color }}>{rec.label}</h3>
              <p className="text-white/60 text-3xl">{rec.desc}</p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
