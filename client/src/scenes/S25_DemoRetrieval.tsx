import { useEffect, useState } from 'react';
import { BookOpen, Building2, Calendar, ClipboardList, FileText, Key } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';

const RETRIEVALS = [
  { icon: FileText, source: 'HRIS', data: 'יעל כהן: Senior PM, מחלקת Product, מנהל: דוד לוי', status: 'success' },
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
      <DemoStepLayout step={2} title="איסוף מידע">
          <div className="space-y-2">
            {RETRIEVALS.map((r, i) => (
              <div key={i} className="flex items-center gap-5 rounded-lg transition-all duration-500"
                style={{
                  padding: 'clamp(0.6rem, 1.1cqh, 0.9rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateX(20px)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                <span className="text-3xl" style={{ display: 'inline-flex', color: '#67E8F9' }}><r.icon size="1em" /></span>
                <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(255,255,255,0.62)', lineHeight: 1.2 }}>{r.source}</span>
                  <p className="text-white/85" style={{ fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', lineHeight: 1.3, margin: 0 }}>{r.data}</p>
                </div>
                {i < visible && <span style={{ color: '#10B981', animationDelay: '0.18s' }} className="text-3xl mo-pop">✓</span>}
              </div>
            ))}
          </div>
          {visible >= RETRIEVALS.length && (
            <div className="p-3 rounded-xl mo-rise text-center" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <p className="text-3xl" style={{ color: '#6EE7B7' }}>✓ כל המידע נאסף, מתחיל תכנון</p>
            </div>
          )}
      </DemoStepLayout>
    </SceneBase>
  );
}
