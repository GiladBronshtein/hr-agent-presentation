import { Briefcase } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function ManagerPrep() {
  return (
    <AgentScene
      index={4}
      title="אייג׳נט להכנת מנהלים"
      icon={Briefcase}
      color="#F59E0B"
      before="מנהל מגיע ל-1:1 לא מוכן"
      after="סדר יום, פעולות פתוחות, שאלות coaching"
      value="האייג׳נט מכין. המנהל מחליט, מדבר ומוביל."
      warning="אבחון אישיות, כוונת עזיבה, נשאר אנושי"
    />
  );
}
