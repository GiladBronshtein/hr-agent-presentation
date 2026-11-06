import { ScanSearch } from 'lucide-react';
import { AgentScene } from '../components/presentation/AgentSceneTemplate';
import { CYCLE_COLORS } from '../lib/palette';

export default function NeedsAnalysisAgent() {
  return (
    <AgentScene
      seriesIndex={1}
      seriesTotal={5}
      seriesLabel="אבחון"
      title="אייג׳נט לאבחון צרכים"
      icon={ScanSearch}
      color={CYCLE_COLORS[0]}
      before="בקשה להדרכה הופכת מיד לקורס"
      after="קודם מבינים את הבעיה, ואז מחליטים"
      value="דוגמה: אחוז הסגירה במכירות ירד. האייג׳נט מצליב נתוני CRM, סקר קצר ושיחות עם ראשי צוותים, ומגלה שהבעיה היא מסך חדש במערכת ולא חוסר ידע. ההמלצה: דף עזר קצר בתוך המערכת, לא יום הדרכה."
      warning="האייג׳נט ממליץ, אנשי ה-L&D מחליטים"
    />
  );
}
