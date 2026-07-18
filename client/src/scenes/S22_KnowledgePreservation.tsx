import { Database } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function KnowledgePreservation() {
  return (
    <AgentScene
      index={9}
      title="אייג׳נט לשימור ידע"
      icon={Database}
      color="#FCD34D"
      before="ידע עוזב עם העובד"
      after="ידע מתועד ומאושר"
      value="הידע לא צריך לעזוב יחד עם העובד"
      warning="הידע מאושר על ידי העובד לפני שמירה"
    />
  );
}
