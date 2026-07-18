import { BookOpen } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function LearningAgent() {
  return (
    <AgentScene
      index={5}
      title="אייג׳נט ללמידה"
      icon={BookOpen}
      color="#A78BFA"
      before="קטלוג קורסים ארוך"
      after="מסלול מותאם לצורך אמיתי"
      value="פחות קטלוג. יותר למידה שמתחילה מצורך."
      warning="תוכן מאושר בלבד, לא יוצר מחדש"
    />
  );
}
