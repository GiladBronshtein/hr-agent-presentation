import { Route } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function LearningPathAgent() {
  return (
    <AgentScene
      seriesIndex={2}
      seriesTotal={5}
      seriesLabel="תכנון"
      title="אייג׳נט למסלול למידה אישי"
      icon={Route}
      color={CYCLE_COLORS[1]}
      before="אותו קורס לכולם, באותו קצב"
      after="מסלול לפי מה שכבר יודעים, עם חזרה בזמן"
      value="דוגמה: מבחן כניסה קצר מראה שנועה כבר שולטת בבסיס. היא מדלגת ישר ליחידה על שאלות מחיר, ומקבלת שאלת חזרה אחרי שלושה ימים ואחרי שבוע, נגד עקומת השכחה."
      sources={['murre-dros-2015', 'dunlosky-2013']}
      warning="ליבה משותפת לכולם, והסבר למה הוצע כל צעד"
    />
  );
}
