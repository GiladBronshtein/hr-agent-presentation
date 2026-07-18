import { ClipboardList } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function RecruitingAgent() {
  return (
    <AgentScene
      index={1}
      title="אייג׳נט לפתיחת משרה"
      icon={ClipboardList}
      color="#6366F1"
      before="3-5 ימים ממנהל ל-HR"
      after="2-4 שעות"
      value="הופך בקשה עמומה לבקשה שאפשר לבחון"
      warning="האייג׳נט אינו מחליט אם צריך לגייס"
    />
  );
}
