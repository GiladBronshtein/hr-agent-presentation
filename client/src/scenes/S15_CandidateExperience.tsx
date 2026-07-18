import { HeartHandshake } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function CandidateExperience() {
  return (
    <AgentScene
      index={2}
      title="אייג׳נט לחוויית מועמד"
      icon={HeartHandshake}
      color="#10B981"
      before="עיכוב שבועות ללא עדכון"
      after="עדכון מותאם תוך שעות"
      value="אוטומציה שולחת הודעה. אייג׳נט מבין איזו מתאימה."
      warning="דחיות ללא אישור אנושי, אסור"
    />
  );
}
