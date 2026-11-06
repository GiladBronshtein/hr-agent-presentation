import { Drama } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function SimulationAgent() {
  return (
    <AgentScene
      seriesIndex={1}
      seriesTotal={5}
      seriesLabel="נספח"
      title="אייג׳נט לתרגול בסימולציה"
      icon={Drama}
      color="#F2A93B"
      before="שיחה קשה מתרגלים רק בסדנה"
      after="תרגול מתי שרוצים, עם משוב מיידי"
      value="דוגמה: שיחת משוב על איחורים חוזרים. האייג׳נט מגלם את הצד השני, מגיב לכל ניסוח, ובסוף נותן משוב לפי מודל מוסכם."
      warning="זה תרגול, לא הערכה. אין שמירת הקלטות בלי הסכמה"
    />
  );
}
