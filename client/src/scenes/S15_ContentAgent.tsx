import { FilePenLine } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function ContentAgent() {
  return (
    <AgentScene
      seriesIndex={2}
      seriesTotal={4}
      title="אייג׳נט לפיתוח תוכן"
      icon={FilePenLine}
      color="#F2A93B"
      before="שבועות של ראיונות ובניית לומדה"
      after="טיוטה ראשונה לעריכה תוך יום"
      value="דוגמה: הקלטה של 30 דקות עם מומחית מוצר הופכת לשלוש יחידות מיקרו‑למידה, עשר שאלות בשלוש רמות (לזכור, להבין, ליישם) ותרחיש אחד מהשטח."
      warning="מומחי תוכן בודקים ומאשרים כל יחידה לפני פרסום"
    />
  );
}
