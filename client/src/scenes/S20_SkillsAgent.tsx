import { Radar } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function SkillsAgent() {
  return (
    <AgentScene
      seriesIndex={2}
      seriesTotal={4}
      seriesLabel="נספח"
      title="אייג׳נט למיפוי מיומנויות"
      icon={Radar}
      color={CYCLE_COLORS[0]}
      before="גיליון מיומנויות שמתיישן תוך חודש"
      after="תמונת מיומנויות חיה, עם המלצות לצמיחה"
      value="דוגמה: צוות עובר לעבודה עם נתונים. האייג׳נט מראה איפה כבר יש ידע ואיפה חסר, ומציע שלושה מסלולים קצרים."
      sources={['eu-ai-act-annex3-2024']}
      warning="לא כלי דירוג. שקיפות ושליטה על הנתונים האישיים"
    />
  );
}
