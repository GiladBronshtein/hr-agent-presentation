import { MessageCircle } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function EmployeeService() {
  return (
    <AgentScene
      index={6}
      title="אייג׳נט לשירות עובדים"
      icon={MessageCircle}
      color="#22D3EE"
      before="שאלות חוזרות ל-HR"
      after="תשובה עם מקור ותאריך עדכון"
      value="כשמידע חסר, עוצר ושואל, לא מנחש"
      warning="מקורות סותרים? הסלמה ל-HR"
    />
  );
}
