import { useState } from 'react';
import { ArrowLeft, Bell, ClipboardList, Crown, MessageSquareText, Search, UserPlus } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { getSceneById } from '../data/scenes';
import { usePresentationStore } from '../store/presentationStore';

const CRITERIA = ['קטן', 'חוזר הרבה', 'כואב היום', 'סיכון נמוך', 'מדיד'];

/** `scene` is the agent slide each candidate grows into (must be a real scene id) */
const PILOTS = [
  { id: 'quiz-drafting', name: 'טיוטות חידון מתוך חומר קיים', why: 'כל קורס צריך חידון, ומומחה בודק לפני פרסום', scene: 'content-agent', score: 9, risk: 'low', effort: 'low', value: 'high', icon: ClipboardList },
  { id: 'feedback-analysis', name: 'ניתוח משוב מקורסים', why: 'מאות תגובות פתוחות שאף אחד לא מספיק לקרוא', scene: 'impact-agent', score: 8, risk: 'low', effort: 'low', value: 'medium', icon: MessageSquareText },
  { id: 'nudges', name: 'תזכורות ודחיפות קטנות', why: 'חזרה מרווחת במקום רדיפה אחרי השלמות', scene: 'learning-path-agent', score: 8, risk: 'medium', effort: 'low', value: 'medium', icon: Bell },
  { id: 'needs-summary', name: 'סיכום אבחון צרכים', why: 'שיחות וסקרים הופכים לתמונה אחת לפני שמחליטים', scene: 'needs-analysis-agent', score: 7, risk: 'low', effort: 'medium', value: 'high', icon: Search },
  { id: 'onboarding-path', name: 'מסלול קליטה לומדת', why: 'ערך גבוה, אבל יותר מערכות ויותר אנשים', scene: 'onboarding-learning-agent', score: 6, risk: 'medium', effort: 'high', value: 'high', icon: UserPlus },
];

const LABELS = { low: 'נמוך', medium: 'בינוני', high: 'גבוה' };
// Risk and effort: low is good. Value: high is good.
const GOOD = '#F2A93B', MID = '#F2A93B', BAD = '#8A93A8';
const COST_COLORS = { low: GOOD, medium: MID, high: BAD };
const VALUE_COLORS = { low: BAD, medium: MID, high: GOOD };

export default function S40_PilotSelector() {
  const [selected, setSelected] = useState<string | null>(null);
  const { goToScene } = usePresentationStore();
  const top = Math.max(...PILOTS.map((p) => p.score));
  const sel = PILOTS.find((p) => p.id === selected);
  const selScene = sel ? getSceneById(sel.scene) : undefined;

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2cqw,2rem)' }}>
          <div>
            <SceneTitle size="md">בחירת פיילוט</SceneTitle>
            <SceneSubtitle>תהליך ראשון טוב עומד בחמישה תנאים</SceneSubtitle>
            <div className="flex flex-wrap mo-fade" style={{ gap: '0.5rem', marginTop: 'clamp(0.6rem,1cqw,1rem)', animationDelay: '0.15s' }}>
              {CRITERIA.map((c) => (
                <span key={c} className="rounded-full" style={{
                  padding: '0.2rem 0.9rem', fontSize: 'clamp(1.05rem, 1.25cqw, 1.45rem)', fontWeight: 600,
                  background: 'rgba(242,169,59,0.12)', color: '#F2A93B', border: '1px solid rgba(242,169,59,0.3)',
                }}>{c}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem,0.7cqw,0.6rem)' }}>
            {PILOTS.map((pilot, i) => {
              const isTop = pilot.score === top;
              const isSel = selected === pilot.id;
              return (
              <button key={pilot.id} onClick={() => setSelected(isSel ? null : pilot.id)}
                className="interactive-card mo-rise w-full flex items-center rounded-xl text-right"
                style={{
                  gap: 'clamp(1rem,1.8cqw,1.6rem)', padding: 'clamp(0.7rem,1.2cqw,1.2rem) clamp(1rem,1.8cqw,1.6rem)',
                  background: isSel ? 'rgba(243,238,228,0.12)' : isTop ? 'rgba(243,238,228,0.06)' : 'rgba(243,238,228,0.03)',
                  border: isSel ? '1px solid rgba(243,238,228,0.45)' : isTop ? '1px solid rgba(243,238,228,0.25)' : '1px solid rgba(243,238,228,0.06)',
                  animation: `mo-rise var(--mo-dur) var(--mo-ease-out) ${0.2 + i * 0.07}s both`,
                  position: 'relative',
                }}>
                <span className="inline-flex" style={{ fontSize: 'clamp(1.6rem, 2.3cqw, 2.4rem)', color: isTop ? '#F2A93B' : 'rgba(243,238,228,0.7)' }}><pilot.icon size="1em" /></span>
                <span className="flex-1 text-white/85 font-medium" style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', fontSize: 'clamp(1.25rem, 1.75cqw, 1.9rem)' }}>
                  {pilot.name}
                  {isTop && (
                    <span className="mo-pop" style={{
                      animationDelay: '0.75s',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: 'rgba(242,169,59,0.14)', border: '1px solid rgba(242,169,59,0.35)',
                      color: '#F2A93B', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 700, whiteSpace: 'nowrap',
                    }}>
                      <Crown size="1em" /> מומלץ להתחלה
                    </span>
                  )}
                </span>
                {/* Fixed-width metric columns so every row lines up */}
                <div className="flex items-center" style={{ gap: 'clamp(0.75rem,1.4cqw,1.25rem)' }}>
                  {([['סיכון', pilot.risk, COST_COLORS], ['מאמץ', pilot.effort, COST_COLORS], ['ערך', pilot.value, VALUE_COLORS]] as const).map(([label, v, colors]) => (
                    <div key={label} className="text-center" style={{ width: 'clamp(4.5rem, 5.6cqw, 6.75rem)' }}>
                      <p className="text-white/65 mb-0.5" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)' }}>{label}</p>
                      <span className="font-semibold" style={{ color: colors[v as keyof typeof colors], fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>{LABELS[v as keyof typeof LABELS]}</span>
                    </div>
                  ))}
                  <div className="rounded-full flex items-center justify-center font-black"
                    style={{
                      width: 'clamp(44px, 4cqw, 56px)', height: 'clamp(44px, 4cqw, 56px)',
                      fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)',
                      background: isTop ? 'rgba(243,238,228,0.25)' : 'rgba(243,238,228,0.12)',
                      color: isTop ? '#F3EEE4' : '#F2A93B',
                      fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
                    }}>
                    {pilot.score}
                  </div>
                </div>
              </button>
              );
            })}
          </div>
          {sel && (
            <div key={sel.id} className="rounded-xl mo-rise-sm flex items-center justify-center flex-wrap" style={{ gap: '0.75rem 1.25rem', padding: 'clamp(0.8rem,1.3cqw,1.25rem)', background: 'rgba(243,238,228,0.08)', border: '1px solid rgba(243,238,228,0.2)' }}>
              <p className="text-white/75" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)', margin: 0 }}>
                <strong style={{ color: '#F2A93B' }}>{sel.name}:</strong> {sel.why}
              </p>
              {selScene && (
                <button onClick={() => goToScene(selScene.index)} className="interactive-card inline-flex items-center rounded-full"
                  style={{ gap: '0.4rem', padding: '0.25rem 0.9rem', fontSize: 'clamp(1.05rem, 1.2cqw, 1.4rem)', fontWeight: 600, background: 'rgba(243,238,228,0.16)', color: '#F3EEE4', border: '1px solid rgba(243,238,228,0.4)' }}>
                  {selScene.hebrewTitle} <ArrowLeft size="1em" />
                </button>
              )}
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
