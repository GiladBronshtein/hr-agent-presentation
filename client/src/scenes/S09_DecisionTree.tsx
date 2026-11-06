import { useState } from 'react';
import { Bot, Settings, User, UserCheck } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { SourceChip } from '../components/presentation/SourceChip';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('decision-tree');

type Answer = 'yes' | 'no' | null;

/**
 * Stem that draws down from the previous step into the newly revealed one.
 * Sits in the 2rem gap above its card (space-y-8), so it never shifts layout.
 */
function Stem({ color = 'rgba(246,242,234,0.28)' }: { color?: string }) {
  return (
    <span aria-hidden className="mo-grow-y" style={{
      position: 'absolute', top: '-2rem', height: '2rem',
      left: 'calc(50% - 1px)', width: '2px', borderRadius: '2px',
      background: color,
      pointerEvents: 'none',
    }} />
  );
}

export default function S09_DecisionTree() {
  const [q1, setQ1] = useState<Answer>(null);
  const [q2, setQ2] = useState<Answer>(null);
  const [q3, setQ3] = useState<Answer>(null);

  const getRecommendation = () => {
    if (q1 === 'yes') return { label: 'אוטומציה', color: PALETTE.muted, icon: Settings, desc: 'הצעדים קבועים, כמו תזכורת יום לפני מפגש. אוטומציה פשוטה מספיקה ועדיפה.' };
    if (q1 === 'no' && q2 === 'no') return { label: 'אדם, עם עזרה של AI', color: PALETTE.amber, icon: User, desc: 'הידע נמצא אצל אנשים, כמו בשיחת משוב אישית. אדם מוביל, ה-AI עוזר בהכנה.' };
    if (q1 === 'no' && q2 === 'yes' && q3 === 'yes') return { label: 'אייג׳נט עם אישור', color: PALETTE.teal, icon: UserCheck, desc: 'אייג׳נט מכין, ואדם מאשר לפני כל פעולה. למשל, פרסום יחידת למידה לכל הצוות.' };
    if (q1 === 'no' && q2 === 'yes' && q3 === 'no') return { label: 'אייג׳נט', color: textOn(PALETTE.violet), icon: Bot, desc: 'אייג׳נט פועל לבד בתוך גבולות ברורים. למשל, הצעת תרגול נוסף למי שנתקע.' };
    return null;
  };

  const rec = getRecommendation();

  const Btn = ({ val, current, set, yes, no }: { val: Answer, current: Answer, set: (v: Answer) => void, yes: string, no: string }) => (
    <div className="flex gap-2">
      {(['yes', 'no'] as const).map((v) => (
        <button key={v} onClick={() => set(current === v ? null : v)}
          className="flex-1 py-2 rounded-lg text-3xl font-medium transition-all"
          style={{
            background: current === v ? (v === 'yes' ? `linear-gradient(160deg, ${alpha(ACC, 0.3)}, ${alpha(ACC, 0.12)})` : 'rgba(163,171,207,0.16)') : 'rgba(12,17,50,0.6)',
            border: current === v ? `1px solid ${v === 'yes' ? alpha(ACC, 0.65) : 'rgba(163,171,207,0.5)'}` : '1px solid rgba(246,242,234,0.12)',
            boxShadow: current === v && v === 'yes' ? `0 0 28px -8px ${alpha(ACC, 0.8)}` : 'none',
            color: current === v ? (v === 'yes' ? ACC_T : '#D5DAEE') : 'rgba(246,242,234,0.78)',
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
            <SceneTitle size="md">מתי כן ומתי לא?</SceneTitle>
            <SceneSubtitle>שלוש שאלות: אוטומציה, אייג׳נט או אדם. בוחרים בפתרון הפשוט ביותר שמספיק <SourceChip id="anthropic-effective-agents" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} /></SceneSubtitle>
          </div>
          <div className="space-y-8">
            <div className="p-6 rounded-xl mo-rise fx-glass" style={{ animationDelay: '0.2s' }}>
              <p className="text-white/80 text-3xl font-medium mb-3">1. האם הצעדים זהים בכל פעם?</p>
              <Btn val={q1} current={q1} set={setQ1} yes="כן, תמיד אותו דבר" no="לא, תלוי במצב" />
            </div>
            {q1 === 'no' && (
              <div className="relative">
                <Stem />
                <div className="p-6 rounded-xl mo-rise fx-glass" style={{ animationDelay: '0.22s' }}>
                  <p className="text-white/80 text-3xl font-medium mb-3">2. האם המידע שצריך כדי להחליט נמצא במערכות?</p>
                  <Btn val={q2} current={q2} set={setQ2} yes="כן, יש מקורות" no="לא, הוא אצל אנשים" />
                </div>
              </div>
            )}
            {q1 === 'no' && q2 === 'yes' && (
              <div className="relative">
                <Stem />
                <div className="p-6 rounded-xl mo-rise fx-glass" style={{ animationDelay: '0.22s' }}>
                  <p className="text-white/80 text-3xl font-medium mb-3">3. האם הפעולה רגישה? (פרסום לכולם, נתונים אישיים)</p>
                  <Btn val={q3} current={q3} set={setQ3} yes="כן, רגישה" no="לא, סיכון נמוך" />
                </div>
              </div>
            )}
          </div>
          {rec && (
            <div key={rec.label} className="relative">
              <Stem color={alpha(rec.color, 0.75)} />
              <div className="p-7 rounded-xl mo-rise text-center fx-accent fx-sheen" style={{ '--fx-c': rec.color, '--fx-sheen-delay': '0.6s', animationDelay: '0.22s' } as React.CSSProperties}>
                <div className="text-5xl mb-2 mo-pop" style={{ animationDelay: '0.42s', color: rec.color, display: 'flex', justifyContent: 'center', filter: `drop-shadow(0 0 14px ${alpha(rec.color, 0.8)})` }}><rec.icon size="1em" /></div>
                <h3 className="text-3xl font-bold mb-1 fx-glow-soft" style={{ color: rec.color, '--fx-c': rec.color } as React.CSSProperties}>{rec.label}</h3>
                <p className="text-3xl" style={{ color: 'rgba(246,242,234,0.84)' }}>{rec.desc}</p>
              </div>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
