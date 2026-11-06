import { Radar } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function SkillsAgent() {
  return (
    <AgentScene
      seriesIndex={3}
      seriesTotal={5}
      seriesLabel="נספח"
      title="אייג׳נט למיפוי מיומנויות"
      icon={Radar}
      color="#F2A93B"
      before="גיליון מיומנויות שמתיישן תוך חודש"
      after="תמונת מיומנויות חיה, עם המלצות לצמיחה"
      value="דוגמה: צוות עובר לעבודה עם נתונים. האייג׳נט מראה איפה כבר יש ידע ואיפה חסר, ומציע שלושה מסלולים קצרים."
      warning="לא כלי דירוג. שקיפות ושליטה על הנתונים האישיים"
    />
  );
}
