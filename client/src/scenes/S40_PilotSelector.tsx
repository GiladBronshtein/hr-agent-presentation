import { useState } from 'react';
import { BookOpen, Briefcase, ClipboardList, Crown, MessageCircle, UserPlus } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';

const PILOTS = [
  { id: 'onboarding', name: 'קליטה', score: 9, risk: 'low', effort: 'medium', roi: 'high', icon: UserPlus },
  { id: 'service', name: 'שירות HR', score: 8, risk: 'low', effort: 'low', roi: 'medium', icon: MessageCircle },
  { id: 'manager-prep', name: 'הכנת שיחות ניהול', score: 7, risk: 'low', effort: 'low', roi: 'medium', icon: Briefcase },
  { id: 'recruiting', name: 'פתיחת משרה', score: 7, risk: 'medium', effort: 'medium', roi: 'high', icon: ClipboardList },
  { id: 'learning', name: 'מסלול למידה', score: 6, risk: 'low', effort: 'high', roi: 'medium', icon: BookOpen },
];

const LABELS = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };
const COLORS = { low: '#6EE7B7', medium: '#FCD34D', high: '#FDA4AF' };

export default function S40_PilotSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">בחירת פיילוט</SceneTitle>
            <SceneSubtitle>מה הפיילוט הנכון לארגון?</SceneSubtitle>
          </div>
          <div className="space-y-2">
            {PILOTS.map((pilot, i) => {
              const isTop = pilot.score === Math.max(...PILOTS.map(p => p.score));
              const isSel = selected === pilot.id;
              return (
              <button key={pilot.id} onClick={() => setSelected(isSel ? null : pilot.id)}
                className="interactive-card mo-rise w-full flex items-center gap-6 p-6 rounded-xl text-right"
                style={{
                  background: isSel ? 'rgba(99,102,241,0.12)' : isTop ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.03)',
                  border: isSel ? '1px solid rgba(99,102,241,0.45)' : isTop ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.06)',
                  animation: `mo-rise var(--mo-dur) var(--mo-ease-out) ${0.2 + i * 0.07}s both`,
                  boxShadow: isTop ? '0 0 28px rgba(99,102,241,0.22)' : undefined,
                  position: 'relative',
                }}>
                <span className="text-4xl inline-flex" style={{ color: isTop ? '#818CF8' : 'rgba(255,255,255,0.7)' }}><pilot.icon size="1em" /></span>
                <span className="flex-1 text-white/80 font-medium text-3xl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  {pilot.name}
                  {isTop && (
                    <span className="mo-pop" style={{
                      animationDelay: '0.75s',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.35)',
                      color: '#FCD34D', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 700, whiteSpace: 'nowrap',
                    }}>
                      <Crown size="1em" /> מומלץ להתחלה
                    </span>
                  )}
                </span>
                {/* Fixed-width metric columns so every row lines up */}
                <div className="flex items-center gap-5">
                  {([['סיכון', pilot.risk], ['מאמץ', pilot.effort], ['ROI', pilot.roi]] as const).map(([label, v]) => (
                    <div key={label} className="text-center" style={{ width: 'clamp(4.5rem, 5.6cqw, 6.75rem)' }}>
                      <p className="text-white/65 mb-0.5" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)' }}>{label}</p>
                      <span className="font-semibold" style={{ color: COLORS[v as keyof typeof COLORS], fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>{LABELS[v as keyof typeof LABELS]}</span>
                    </div>
                  ))}
                  <div className="rounded-full flex items-center justify-center font-black"
                    style={{
                      width: 'clamp(44px, 4cqw, 56px)', height: 'clamp(44px, 4cqw, 56px)',
                      fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)',
                      background: isTop ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)',
                      color: isTop ? '#C7D2FE' : '#A5B4FC',
                      boxShadow: isTop ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                      fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
                    }}>
                    {pilot.score}
                  </div>
                </div>
              </button>
              );
            })}
          </div>
          {selected && (
            <div key={selected} className="p-6 rounded-xl mo-rise-sm text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-white/70 text-3xl">
                הבחירה: <strong style={{ color: '#A5B4FC' }}>{PILOTS.find(p => p.id === selected)?.name}</strong>
                {' '}· מתאים לפיילוט ראשון
              </p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
