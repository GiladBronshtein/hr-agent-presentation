import { Drama } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function SimulationAgent() {
  return (
    <AgentScene
      seriesIndex={4}
      seriesTotal={5}
      seriesLabel="הפעלה"
      title="אייג׳נט לתרגול בסימולציה"
      icon={Drama}
      color={CYCLE_COLORS[3]}
      before="שיחה קשה מתרגלים רק בסדנה"
      after="תרגול מתי שרוצים, עם משוב מיידי"
      value="דוגמה: שיחת משוב על איחורים חוזרים. האייג׳נט מגלם את הצד השני, מגיב לכל ניסוח, ובסוף נותן משוב לפי מודל מוסכם."
      sources={['feedback-meta-2020']}
      warning="זה תרגול, לא הערכה. אין שמירת הקלטות בלי הסכמה"
    />
  );
}
