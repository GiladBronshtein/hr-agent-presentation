import { TrendingUp } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function SkillsMobility() {
  return (
    <AgentScene
      index={7}
      title="אייג׳נט למיומנויות ומוביליות"
      icon={TrendingUp}
      color="#34D399"
      before="הזדמנויות נסתרות"
      after="המלצה מותאמת לפרופיל"
      value="חיבור עובדים להזדמנויות, המלצה בלבד"
      warning="לא מחליט על קידום, שכר או סיום"
    />
  );
}
