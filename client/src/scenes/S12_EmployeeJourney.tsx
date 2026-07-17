import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

type RiskLevel = 'low' | 'medium' | 'high';
const STAGES: { id: string; label: string; icon: string; risk: RiskLevel; agents: string[] }[] = [
  { id: 'attract', label: 'גיוס', icon: '🎯', risk: 'low', agents: ['פתיחת משרה', 'חוויית מועמד'] },
  { id: 'onboard', label: 'קליטה', icon: '👋', risk: 'medium', agents: ['תוכנית קליטה', 'הכנת מנהל'] },
  { id: 'develop', label: 'פיתוח', icon: '📈', risk: 'medium', agents: ['למידה', 'מוביליות'] },
  { id: 'engage', label: 'מעורבות', icon: '💬', risk: 'low', agents: ['שירות עובדים', 'תובנות'] },
  { id: 'exit', label: 'עזיבה', icon: '🚪', risk: 'high', agents: ['שימור ידע'] },
];

const RISK_COLORS = { low: '#70D6A7', medium: '#FFD166', high: '#FF6B6B' };
const RISK_LABELS = { low: 'סיכון נמוך', medium: 'דורש אישור', high: 'החלטה אנושית' };

export default function S12_EmployeeJourney() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = STAGES.find(s => s.id === selected);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">פרק שני: לראות</p>
            <SceneTitle size="md">מסע העובד</SceneTitle>
            <p className="text-white/40 text-sm mt-2">לחצו על שלב לפרטים</p>
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-2">
                <button onClick={() => setSelected(selected === stage.id ? null : stage.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 min-w-[80px]"
                  style={{
                    background: selected === stage.id ? RISK_COLORS[stage.risk] + '15' : 'rgba(255,255,255,0.04)',
                    border: selected === stage.id ? `2px solid ${RISK_COLORS[stage.risk]}50` : '1px solid rgba(255,255,255,0.08)',
                    transform: selected === stage.id ? 'scale(1.05)' : undefined,
                  }}>
                  <span className="text-2xl">{stage.icon}</span>
                  <span className="text-xs font-medium text-white/70">{stage.label}</span>
                  <div className="w-2 h-2 rounded-full" style={{ background: RISK_COLORS[stage.risk] }} />
                </button>
                {i < STAGES.length - 1 && <span className="text-white/20 text-lg">→</span>}
              </div>
            ))}
          </div>
          {sel && (
            <div className="p-5 rounded-xl animate-fade-in" style={{ background: RISK_COLORS[sel.risk] + '10', border: `1px solid ${RISK_COLORS[sel.risk]}25` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{sel.icon}</span>
                <h3 className="font-bold text-white">{sel.label}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: RISK_COLORS[sel.risk] + '20', color: RISK_COLORS[sel.risk] }}>
                  {RISK_LABELS[sel.risk]}
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sel.agents.map(a => (
                  <span key={a} className="text-sm px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    🤖 {a}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-4 justify-center text-xs">
            {Object.entries(RISK_COLORS).map(([k, c]) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                <span className="text-white/40">{RISK_LABELS[k as keyof typeof RISK_LABELS]}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
