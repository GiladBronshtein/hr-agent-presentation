import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const PILOTS = [
  { id: 'onboarding', name: 'קליטת עובד', score: 9, risk: 'low', effort: 'medium', roi: 'high', icon: '👋' },
  { id: 'service', name: 'שירות עובדים', score: 8, risk: 'low', effort: 'low', roi: 'medium', icon: '💬' },
  { id: 'manager-prep', name: 'הכנת מנהלים', score: 7, risk: 'low', effort: 'low', roi: 'medium', icon: '👔' },
  { id: 'recruiting', name: 'פתיחת משרה', score: 7, risk: 'medium', effort: 'medium', roi: 'high', icon: '📋' },
  { id: 'learning', name: 'מסלול למידה', score: 6, risk: 'low', effort: 'high', roi: 'medium', icon: '📚' },
];

const LABELS = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };
const COLORS = { low: '#10B981', medium: '#F59E0B', high: '#F43F5E' };

export default function S40_PilotSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">פרק רביעי: להטמיע</p>
            <SceneTitle size="md">בחרו פיילוט</SceneTitle>
            <p className="text-white/40 text-sm mt-1">מה הפיילוט הנכון לארגון שלכם?</p>
          </div>
          <div className="space-y-2">
            {PILOTS.map((pilot) => (
              <button key={pilot.id} onClick={() => setSelected(selected === pilot.id ? null : pilot.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl text-right transition-all duration-200"
                style={{
                  background: selected === pilot.id ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                  border: selected === pilot.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                <span className="text-2xl">{pilot.icon}</span>
                <span className="flex-1 text-white/80 font-medium text-sm">{pilot.name}</span>
                <div className="flex gap-3 text-xs">
                  <div className="text-center">
                    <p className="text-white/30 mb-0.5">סיכון</p>
                    <span style={{ color: COLORS[pilot.risk as keyof typeof COLORS] }}>{LABELS[pilot.risk as keyof typeof LABELS]}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white/30 mb-0.5">מאמץ</p>
                    <span style={{ color: COLORS[pilot.effort as keyof typeof COLORS] }}>{LABELS[pilot.effort as keyof typeof LABELS]}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white/30 mb-0.5">ROI</p>
                    <span style={{ color: COLORS[pilot.roi as keyof typeof COLORS] }}>{LABELS[pilot.roi as keyof typeof LABELS]}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}>
                    {pilot.score}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {selected && (
            <div className="p-4 rounded-xl animate-fade-in text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-white/70 text-sm">
                ✓ בחרתם: <strong style={{ color: '#6366F1' }}>{PILOTS.find(p => p.id === selected)?.name}</strong>
                {' '}— מתאים לפיילוט ראשון
              </p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
