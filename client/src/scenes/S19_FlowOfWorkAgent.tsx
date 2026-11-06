import { MessageCircleQuestion } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function FlowOfWorkAgent() {
  return (
    <AgentScene
      seriesIndex={2}
      seriesTotal={5}
      seriesLabel="נספח"
      title="אייג׳נט ללמידה בתוך העבודה"
      icon={MessageCircleQuestion}
      color="#F2A93B"
      before="מחפשים תשובה בקורס שנגמר לפני חודשים"
      after="תשובה קצרה בתוך Slack או Teams"
      value="דוגמה: ״איך מחשבים הנחה לחבילה הכפולה?״ תשובה בשלוש שורות, קישור למקור, ושאלת בדיקה קטנה שמוודאת שזה נקלט."
      warning="רק ממקורות מאושרים. אין תשובה בטוחה? מפנים לאדם"
    />
  );
}
