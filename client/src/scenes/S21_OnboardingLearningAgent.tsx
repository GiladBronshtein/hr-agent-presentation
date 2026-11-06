import { Sprout } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function OnboardingLearningAgent() {
  return (
    <AgentScene
      seriesIndex={3}
      seriesTotal={4}
      seriesLabel="נספח"
      title="אייג׳נט לקליטה לומדת"
      icon={Sprout}
      color={CYCLE_COLORS[3]}
      before="כל הידע נשפך בשבוע הראשון"
      after="30 יום ראשונים במנות קטנות"
      value="דוגמה: יום 1 היכרות וכלים. שבוע 1 המוצר. שבוע 2 תרגול בליווי. יום 30 בדיקת ידע ושיחה."
      sources={['nsw-cognitive-load-2017', 'carpenter-spacing-retrieval-2022']}
      warning="לא מחליף קשר אנושי וליווי"
    />
  );
}
