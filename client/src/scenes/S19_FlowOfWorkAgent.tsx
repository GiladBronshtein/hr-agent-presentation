import { MessageCircleQuestion } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function FlowOfWorkAgent() {
  return (
    <AgentScene
      seriesIndex={1}
      seriesTotal={4}
      seriesLabel="נספח"
      title="אייג׳נט ללמידה בתוך העבודה"
      icon={MessageCircleQuestion}
      color={CYCLE_COLORS[3]}
      before="מחפשים תשובה בקורס שנגמר לפני חודשים"
      after="תשובה קצרה בתוך Slack או Teams"
      value="דוגמה: ״איך מחשבים הנחה לחבילה הכפולה?״ תשובה בשלוש שורות, קישור למקור, ושאלת בדיקה קטנה שמוודאת שזה נקלט."
      sources={['bersin-flow-of-work-2018']}
      warning="רק ממקורות מאושרים. אין תשובה בטוחה? מפנים לאדם"
    />
  );
}
