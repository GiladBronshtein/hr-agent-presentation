import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Calendar, FileText, MessageSquareQuote } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';
import { DEMO_RETRIEVAL_INSIGHT, DEMO_SOURCES } from '../data/demoData';

const ICONS: Record<string, typeof FileText> = {
  'product-doc': FileText,
  lms: BookOpen,
  crm: BarChart3,
  survey: MessageSquareQuote,
  calendar: Calendar,
};

export default function S25_DemoRetrieval() {
  const { setDemoStep } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    DEMO_SOURCES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 300 + i * 420));
    });
    timers.push(setTimeout(() => setDemoStep(2), 300 + DEMO_SOURCES.length * 420 + 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout eyebrow="דמו מורחב" title="איסוף מידע" subtitle="לפני שמתכננים, בודקים מה הצוות כבר יודע ואיפה הקושי" gap="clamp(0.6rem, 1.2cqh, 1rem)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.8cqh, 0.6rem)' }}>
          {DEMO_SOURCES.map((r, i) => {
            const Icon = ICONS[r.id] ?? FileText;
            const key = r.id === 'survey';
            return (
              <div key={r.id} className="flex items-center rounded-lg transition-all duration-500"
                style={{
                  gap: 'clamp(0.85rem, 1.3cqw, 1.25rem)',
                  padding: 'clamp(0.55rem, 1cqh, 0.85rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateX(20px)',
                  background: key ? 'rgba(242,169,59,0.07)' : 'rgba(243,238,228,0.03)',
                  border: key ? '1px solid rgba(242,169,59,0.28)' : '1px solid rgba(243,238,228,0.06)',
                }}>
                <span style={{ display: 'inline-flex', color: key ? '#F2A93B' : '#F3EEE4', fontSize: 'clamp(1.5rem, 1.9cqw, 2.1rem)', flexShrink: 0 }}><Icon size="1em" /></span>
                <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
                  <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(243,238,228,0.62)', lineHeight: 1.2 }}><bdi>{r.source}</bdi></span>
                  <p style={{ fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', lineHeight: 1.3, margin: 0, color: key ? '#F3EEE4' : 'rgba(243,238,228,0.85)', fontWeight: key ? 600 : 400 }}>{r.finding}</p>
                </div>
                {i < visible && <span style={{ color: '#F2A93B', animationDelay: '0.18s', fontSize: 'clamp(1.5rem, 1.9cqw, 2.1rem)' }} className="mo-pop">✓</span>}
              </div>
            );
          })}
        </div>
        {visible >= DEMO_SOURCES.length && (
          <div className="rounded-xl mo-rise text-center" style={{ padding: 'clamp(0.6rem, 1.2cqh, 1rem) 1.25rem', background: 'rgba(242,169,59,0.08)', border: '1px solid rgba(242,169,59,0.25)' }}>
            <p style={{ margin: 0, color: '#F2A93B', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600 }}>
              המסקנה: {DEMO_RETRIEVAL_INSIGHT}
            </p>
          </div>
        )}
      </DemoStepLayout>
    </SceneBase>
  );
}
