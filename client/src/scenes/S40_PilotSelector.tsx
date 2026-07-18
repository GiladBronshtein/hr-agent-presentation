import { useState } from 'react';
import { BookOpen, Briefcase, ClipboardList, Crown, MessageCircle, UserPlus } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, GhostWord } from '../components/presentation/SceneBase';

const PILOTS = [
  { id: 'onboarding', name: 'קליטת עובד', score: 9, risk: 'low', effort: 'medium', roi: 'high', icon: UserPlus },
  { id: 'service', name: 'שירות עובדים', score: 8, risk: 'low', effort: 'low', roi: 'medium', icon: MessageCircle },
  { id: 'manager-prep', name: 'הכנת מנהלים', score: 7, risk: 'low', effort: 'low', roi: 'medium', icon: Briefcase },
  { id: 'recruiting', name: 'פתיחת משרה', score: 7, risk: 'medium', effort: 'medium', roi: 'high', icon: ClipboardList },
  { id: 'learning', name: 'מסלול למידה', score: 6, risk: 'low', effort: 'high', roi: 'medium', icon: BookOpen },
];

const LABELS = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };
const COLORS = { low: '#10B981', medium: '#F59E0B', high: '#F43F5E' };

export default function S40_PilotSelector() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SceneBase>
      <GhostWord color="#F59E0B0A">04</GhostWord>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/60 text-3xl uppercase tracking-widest mb-2">פרק רביעי: להטמיע</p>
            <SceneTitle size="md">בחרו פיילוט</SceneTitle>
            <p className="text-white/60 text-3xl mt-1">מה הפיילוט הנכון לארגון שלכם?</p>
          </div>
          <div className="space-y-2">
            {PILOTS.map((pilot) => {
              const isTop = pilot.score === Math.max(...PILOTS.map(p => p.score));
              const isSel = selected === pilot.id;
              return (
              <button key={pilot.id} onClick={() => setSelected(isSel ? null : pilot.id)}
                className="interactive-card w-full flex items-center gap-6 p-6 rounded-xl text-right"
                style={{
                  background: isSel ? 'rgba(99,102,241,0.12)' : isTop ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.03)',
                  border: isSel ? '1px solid rgba(99,102,241,0.45)' : isTop ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(255,255,255,0.06)',
                  animation: isTop ? 'winnerGlow 2.6s ease-in-out infinite' : 'none',
                  position: 'relative',
                }}>
                <span className="text-4xl inline-flex" style={{ color: isTop ? '#818CF8' : 'rgba(255,255,255,0.7)' }}><pilot.icon size="1em" /></span>
                <span className="flex-1 text-white/80 font-medium text-3xl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  {pilot.name}
                  {isTop && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: 'rgba(245,158,11,0.14)', border: '1px solid rgba(245,158,11,0.35)',
                      color: '#FCD34D', fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)', fontWeight: 700,
                    }}>
                      <Crown size="1em" /> מומלץ להתחלה
                    </span>
                  )}
                </span>
                <div className="flex gap-5 text-3xl">
                  <div className="text-center">
                    <p className="text-white/65 mb-0.5">סיכון</p>
                    <span style={{ color: COLORS[pilot.risk as keyof typeof COLORS] }}>{LABELS[pilot.risk as keyof typeof LABELS]}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white/65 mb-0.5">מאמץ</p>
                    <span style={{ color: COLORS[pilot.effort as keyof typeof COLORS] }}>{LABELS[pilot.effort as keyof typeof LABELS]}</span>
                  </div>
                  <div className="text-center">
                    <p className="text-white/65 mb-0.5">ROI</p>
                    <span style={{ color: COLORS[pilot.roi as keyof typeof COLORS] }}>{LABELS[pilot.roi as keyof typeof LABELS]}</span>
                  </div>
                  <div className="rounded-full flex items-center justify-center font-black"
                    style={{
                      width: 'clamp(44px, 4cqw, 56px)', height: 'clamp(44px, 4cqw, 56px)',
                      fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)',
                      background: isTop ? 'rgba(99,102,241,0.25)' : 'rgba(99,102,241,0.12)',
                      color: isTop ? '#A5B4FC' : '#6366F1',
                      boxShadow: isTop ? '0 0 20px rgba(99,102,241,0.4)' : 'none',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                    {pilot.score}
                  </div>
                </div>
              </button>
              );
            })}
          </div>
          {selected && (
            <div className="p-6 rounded-xl animate-fade-in text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <p className="text-white/70 text-3xl">
                בחרתם: <strong style={{ color: '#6366F1' }}>{PILOTS.find(p => p.id === selected)?.name}</strong>
                {' '} -  מתאים לפיילוט ראשון
              </p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
