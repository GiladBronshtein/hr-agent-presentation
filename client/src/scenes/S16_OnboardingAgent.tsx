import { UserPlus } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';

export default function OnboardingAgent() {
  return (
    <AgentScene
      index={3}
      title="אייג׳נט לקליטת עובד"
      icon={UserPlus}
      color="#F43F5E"
      before="4-6 שעות עבודה ידנית"
      after="30 דקות בדיקה ואישור"
      value="מסלול כניסה מותאם, מלא ומאושר"
      warning="HR מאשר לפני שליחה וביצוע"
    />
  );
}
