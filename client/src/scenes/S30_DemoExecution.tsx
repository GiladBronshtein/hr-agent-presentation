import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const STEPS = [
  { label: 'שולח מייל ברוך הבא', status: 'done', time: '0.3s' },
  { label: 'מוסיף לקבוצת Slack #product', status: 'done', time: '0.5s' },
  { label: 'יוצר אירוע קליטה ב-Calendar', status: 'done', time: '0.8s' },
  { label: 'מעדכן HRIS — סטטוס: Active', status: 'done', time: '1.1s' },
  { label: 'שולח סיכום ל-HR ולמנהל', status: 'done', time: '1.4s' },
];

export default function S30_DemoExecution() {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    STEPS.forEach((_, i) => {
      setTimeout(() => setVisible(i + 1), 500 + i * 600);
    });
  }, []);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-2xl space-y-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">שלב 7</p>
            <SceneTitle size="md">ביצוע</SceneTitle>
          </div>
          <div className="space-y-2">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-500"
                style={{
                  opacity: i < visible ? 1 : 0.2,
                  background: i < visible ? 'rgba(112,214,167,0.06)' : 'rgba(255,255,255,0.03)',
                  border: i < visible ? '1px solid rgba(112,214,167,0.15)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ background: i < visible ? 'rgba(112,214,167,0.2)' : 'rgba(255,255,255,0.05)', color: i < visible ? '#70D6A7' : 'rgba(255,255,255,0.3)' }}>
                  {i < visible ? '✓' : (i + 1)}
                </div>
                <span className="flex-1 text-sm" style={{ color: i < visible ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
                  {step.label}
                </span>
                {i < visible && <span className="text-xs text-white/30">{step.time}</span>}
              </div>
            ))}
          </div>
          {visible >= STEPS.length && (
            <div className="p-4 rounded-xl text-center animate-fade-in" style={{ background: 'rgba(112,214,167,0.1)', border: '1px solid rgba(112,214,167,0.3)' }}>
              <p className="text-lg font-bold" style={{ color: '#70D6A7' }}>✅ הושלם</p>
              <p className="text-white/50 text-sm mt-1">כל הפעולות בוצעו ותועדו</p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
