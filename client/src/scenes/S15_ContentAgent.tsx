import { FilePenLine } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function ContentAgent() {
  return (
    <AgentScene
      seriesIndex={3}
      seriesTotal={5}
      seriesLabel="פיתוח"
      title="אייג׳נט לפיתוח תוכן"
      icon={FilePenLine}
      color={CYCLE_COLORS[2]}
      before="שבועות של ראיונות ובניית לומדה"
      after="טיוטה ראשונה לעריכה תוך יום"
      value="דוגמה: הקלטה של 30 דקות עם מומחית מוצר הופכת לשלוש יחידות מיקרו‑למידה, עשר שאלות בשלוש רמות (לזכור, להבין, ליישם) ותרחיש אחד מהשטח."
      sources={['bloom-revised-2001', 'atd-dev-time-2021']}
      warning="מומחי תוכן בודקים ומאשרים כל יחידה לפני פרסום"
    />
  );
}
