import { Gauge } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function ImpactAgent() {
  return (
    <AgentScene
      seriesIndex={5}
      seriesTotal={5}
      seriesLabel="הערכה"
      title="אייג׳נט למדידת אימפקט"
      icon={Gauge}
      color={CYCLE_COLORS[4]}
      before="סקר שביעות רצון בסוף הקורס, וזהו"
      after="תגובה, למידה, התנהגות ותוצאות"
      value="דוגמה: חודש אחרי הקורס, האייג׳נט מצליב תוצאות חידון, תצפיות של ראשי צוותים ונתוני CRM, ומראה שמי שתרגל לפחות שלוש פעמים סגר יותר עסקאות. הדוח מוכן להנהלה."
      sources={['kirkpatrick-model', 'atd-evaluation-2019']}
      warning="קשר בין נתונים הוא לא הוכחה. נתונים ברמת קבוצה בלבד"
    />
  );
}
