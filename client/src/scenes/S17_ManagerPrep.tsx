import { Briefcase } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function ManagerPrep() {
  return (
    <AgentScene
      index={4}
      title="אייג׳נט להכנת שיחות ניהול"
      icon={Briefcase}
      color="#F59E0B"
      before="שיחת 1:1 בלי הכנה"
      after="סדר יום, פעולות פתוחות, שאלות coaching"
      value="האייג׳נט מכין. מי שמנהל מחליט, מדבר ומוביל."
      warning="אבחון אישיות, כוונת עזיבה: נשארים אנושיים"
    />
  );
}
