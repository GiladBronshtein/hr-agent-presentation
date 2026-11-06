import { Route } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function LearningPathAgent() {
  return (
    <AgentScene
      seriesIndex={3}
      seriesTotal={4}
      title="אייג׳נט למסלול אישי ותרגול"
      icon={Route}
      color="#F2A93B"
      before="אותו קורס לכולם, באותו קצב"
      after="מסלול לפי מה שכבר יודעים, עם חזרה בזמן"
      value="דוגמה: מבחן כניסה קצר מראה שנועה כבר שולטת בבסיס. היא מדלגת ישר לתרגול שיחת מכירה, ומקבלת שאלת חזרה אחרי שלושה ימים ואחרי שבוע, נגד עקומת השכחה."
      warning="ליבה משותפת לכולם, והסבר למה הוצע כל צעד"
    />
  );
}
