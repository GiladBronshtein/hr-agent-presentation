import { Gauge } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function ImpactAgent() {
  return (
    <AgentScene
      seriesIndex={4}
      seriesTotal={4}
      title="אייג׳נט למדידת אימפקט"
      icon={Gauge}
      color="#F2A93B"
      before="סקר שביעות רצון בסוף הקורס, וזהו"
      after="תגובה, למידה, התנהגות ותוצאות"
      value="דוגמה: חודש אחרי הקורס, האייג׳נט מצליב תוצאות חידון, תצפיות של ראשי צוותים ונתוני CRM, ומראה שמי שתרגל לפחות שלוש פעמים סגר יותר עסקאות. הדוח מוכן להנהלה."
      warning="קשר בין נתונים הוא לא הוכחה. נתונים ברמת קבוצה בלבד"
    />
  );
}
