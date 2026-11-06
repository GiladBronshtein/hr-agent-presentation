import { Library } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function KnowledgeAgent() {
  return (
    <AgentScene
      seriesIndex={5}
      seriesTotal={5}
      seriesLabel="נספח"
      title="אייג׳נט לשימור ידע"
      icon={Library}
      color="#F2A93B"
      before="ידע של שנים יוצא עם מי שעוזב"
      after="ראיונות קצרים הופכים לידע שנשאר"
      value="דוגמה: לפני פרישה של מהנדסת ותיקה, חמישה ראיונות קצרים הופכים למסמך הדרכה, לשאלות נפוצות ולשישה סרטוני מיקרו."
      warning="מי שמסר את הידע מאשר את מה שנכתב בשמו"
    />
  );
}
