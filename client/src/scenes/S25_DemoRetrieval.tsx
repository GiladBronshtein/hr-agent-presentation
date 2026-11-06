import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Calendar, FileText, MessageSquareQuote } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';
import { DEMO_RETRIEVAL_INSIGHT, DEMO_SOURCES } from '../data/demoData';
import { accentFor } from '../components/presentation/SceneBase';
import { alpha } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('demo-retrieval');

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
                  background: key ? `linear-gradient(270deg, ${alpha(ACC, 0.2)}, ${alpha(ACC, 0.05)}), rgba(12,17,50,0.7)` : 'rgba(12,17,50,0.6)',
                  border: key ? `1px solid ${alpha(ACC, 0.55)}` : '1px solid rgba(246,242,234,0.1)',
                  boxShadow: key ? `0 0 36px -14px ${ACC}` : 'none',
                }}>
                <span style={{ display: 'inline-flex', color: key ? ACC_T : 'rgba(246,242,234,0.85)', filter: key ? `drop-shadow(0 0 8px ${ACC})` : 'none', fontSize: 'clamp(1.5rem, 1.9cqw, 2.1rem)', flexShrink: 0 }}><Icon size="1em" /></span>
                <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
                  <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(246,242,234,0.76)', lineHeight: 1.2 }}><bdi>{r.source}</bdi></span>
                  <p style={{ fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', lineHeight: 1.3, margin: 0, color: key ? '#F6F2EA' : 'rgba(246,242,234,0.85)', fontWeight: key ? 600 : 400 }}>{r.finding}</p>
                </div>
                {i < visible && <span style={{ color: ACC_T, textShadow: `0 0 12px ${ACC}`, animationDelay: '0.18s', fontSize: 'clamp(1.5rem, 1.9cqw, 2.1rem)' }} className="mo-pop">✓</span>}
              </div>
            );
          })}
        </div>
        {visible >= DEMO_SOURCES.length && (
          <div className="rounded-xl mo-rise text-center fx-accent fx-sheen" style={{ padding: 'clamp(0.6rem, 1.2cqh, 1rem) 1.25rem' }}>
            <p style={{ margin: 0, color: ACC_T, fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', fontWeight: 600 }}>
              המסקנה: {DEMO_RETRIEVAL_INSIGHT}
            </p>
          </div>
        )}
      </DemoStepLayout>
    </SceneBase>
  );
}
