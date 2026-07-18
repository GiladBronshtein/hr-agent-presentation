import { BarChart3 } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function OrgInsights() {
  return (
    <AgentScene
      index={8}
      title="אייג׳נט לתובנות ארגוניות"
      icon={BarChart3}
      color="#818CF8"
      before="סקרים שלא מנותחים"
      after="דפוסים מצרפיים אנונימיים"
      value="הקשבה ארגונית אינה מעקב אחר אנשים"
      warning="ללא זיהוי עובדים, מידע מצרפי בלבד"
    />
  );
}
