import { useEffect, useState } from 'react';
import { BookOpen, Building2, Calendar, ClipboardList, FileText, Key } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const RETRIEVALS = [
  { icon: FileText, source: 'HRIS', data: 'יעל כהן: PM Senior, מחלקת Product, מנהל: דוד לוי', status: 'success' },
  { icon: ClipboardList, source: 'Onboarding Playbook', data: 'תוכנית קליטה לתפקידי Product: 30 יום', status: 'success' },
  { icon: Calendar, source: 'Google Calendar', data: 'זמינות דוד לוי: ב׳ 09:00-10:00, ד׳ 14:00-15:00', status: 'success' },
  { icon: Key, source: 'IT Permissions', data: 'רשימת גישות לתפקיד PM: Jira, Figma, Slack, Notion', status: 'success' },
  { icon: BookOpen, source: 'Learning Platform', data: '3 קורסי חובה לתפקיד PM', status: 'success' },
  { icon: Building2, source: 'Office System', data: 'תג כניסה, חניה, מקום ישיבה, קומה 4', status: 'success' },
];

export default function S25_DemoRetrieval() {
  const { setDemoStep } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    RETRIEVALS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 400 + i * 500));
    });
    timers.push(setTimeout(() => setDemoStep(2), 400 + RETRIEVALS.length * 500 + 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">שלב 2</p>
            <SceneTitle size="md">איסוף מידע</SceneTitle>
          </div>
          <div className="space-y-2">
            {RETRIEVALS.map((r, i) => (
              <div key={i} className="flex items-center gap-5 p-3 rounded-lg transition-all duration-500"
                style={{
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateX(20px)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                <span className="text-3xl"><r.icon size="1em" /></span>
                <div className="flex-1">
                  <span className="text-white/60 text-3xl">{r.source}</span>
                  <p className="text-white/70 text-3xl">{r.data}</p>
                </div>
                {i < visible && <span style={{ color: '#10B981' }} className="text-3xl">✓</span>}
              </div>
            ))}
          </div>
          {visible >= RETRIEVALS.length && (
            <div className="p-3 rounded-xl animate-fade-in text-center" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <p className="text-3xl" style={{ color: '#10B981' }}>✓ כל המידע נאסף, מתחיל תכנון</p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
