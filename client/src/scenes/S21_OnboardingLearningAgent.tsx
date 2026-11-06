import { Sprout } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function OnboardingLearningAgent() {
  return (
    <AgentScene
      seriesIndex={4}
      seriesTotal={5}
      seriesLabel="נספח"
      title="אייג׳נט לקליטה לומדת"
      icon={Sprout}
      color="#F2A93B"
      before="כל הידע נשפך בשבוע הראשון"
      after="30 יום ראשונים במנות קטנות"
      value="דוגמה: יום 1 היכרות וכלים. שבוע 1 המוצר. שבוע 2 תרגול בליווי. יום 30 בדיקת ידע ושיחה."
      warning="לא מחליף קשר אנושי וליווי"
    />
  );
}
