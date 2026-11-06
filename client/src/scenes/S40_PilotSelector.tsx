import { useState } from 'react';
import { ArrowLeft, Bell, ClipboardList, Crown, MessageSquareText, Search, UserPlus } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { getSceneById } from '../data/scenes';
import { usePresentationStore } from '../store/presentationStore';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('pilot-selector');

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
const GOOD = PALETTE.teal, MID = PALETTE.amber, BAD = textOn(PALETTE.coral);
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
                <span key={c} className="rounded-full fx-chip" style={{
                  padding: '0.2rem 0.9rem', fontSize: 'clamp(1.05rem, 1.25cqw, 1.45rem)', fontWeight: 600,
                  color: ACC_T,
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
                  background: isSel || isTop
                    ? `linear-gradient(270deg, ${alpha(ACC, isSel ? 0.22 : 0.14)}, ${alpha(ACC, 0.03)} 65%), rgba(12,17,50,0.7)`
                    : 'rgba(12,17,50,0.6)',
                  border: isSel ? `1px solid ${alpha(ACC, 0.75)}` : isTop ? `1px solid ${alpha(ACC, 0.45)}` : '1px solid rgba(246,242,234,0.1)',
                  boxShadow: isSel ? `0 0 40px -12px ${ACC}` : isTop ? `0 0 36px -18px ${ACC}` : 'none',
                  animation: `mo-rise var(--mo-dur) var(--mo-ease-out) ${0.2 + i * 0.07}s both`,
                  position: 'relative',
                }}>
                <span className="inline-flex" style={{ fontSize: 'clamp(1.6rem, 2.3cqw, 2.4rem)', color: isTop || isSel ? ACC_T : 'rgba(246,242,234,0.78)', filter: isTop ? `drop-shadow(0 0 10px ${alpha(ACC, 0.8)})` : 'none' }}><pilot.icon size="1em" /></span>
                <span className="flex-1 text-white/90 font-medium" style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', fontSize: 'clamp(1.25rem, 1.75cqw, 1.9rem)' }}>
                  {pilot.name}
                  {isTop && (
                    <span className="mo-pop" style={{
                      animationDelay: '0.75s',
                      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                      padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: `linear-gradient(180deg, ${alpha(ACC, 0.3)}, ${alpha(ACC, 0.12)})`, border: `1px solid ${alpha(ACC, 0.6)}`,
                      boxShadow: `0 0 20px -6px ${ACC}`,
                      color: ACC_T, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 700, whiteSpace: 'nowrap',
                    }}>
                      <Crown size="1em" /> מומלץ להתחלה
                    </span>
                  )}
                </span>
                {/* Fixed-width metric columns so every row lines up */}
                <div className="flex items-center" style={{ gap: 'clamp(0.75rem,1.4cqw,1.25rem)' }}>
                  {([['סיכון', pilot.risk, COST_COLORS], ['מאמץ', pilot.effort, COST_COLORS], ['ערך', pilot.value, VALUE_COLORS]] as const).map(([label, v, colors]) => (
                    <div key={label} className="text-center" style={{ width: 'clamp(4.5rem, 5.6cqw, 6.75rem)' }}>
                      <p className="text-white/75 mb-0.5" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)' }}>{label}</p>
                      <span className="font-semibold" style={{ color: colors[v as keyof typeof colors], fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>{LABELS[v as keyof typeof LABELS]}</span>
                    </div>
                  ))}
                  {/* Score as a light meter: the ring fills to score/10 */}
                  <div className="rounded-full flex items-center justify-center"
                    style={{
                      width: 'clamp(44px, 4cqw, 56px)', height: 'clamp(44px, 4cqw, 56px)', padding: '3px',
                      background: `conic-gradient(${ACC} ${pilot.score * 10}%, rgba(246,242,234,0.12) 0)`,
                      boxShadow: isTop ? `0 0 22px -2px ${alpha(ACC, 0.8)}` : 'none',
                    }}>
                    <span className="rounded-full flex items-center justify-center font-black" style={{
                      width: '100%', height: '100%', background: '#0B1030',
                      fontSize: 'clamp(1.4rem, 2cqw, 1.9rem)',
                      color: isTop ? '#F6F2EA' : ACC_T,
                      fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
                    }}>
                      {pilot.score}
                    </span>
                  </div>
                </div>
              </button>
              );
            })}
          </div>
          {sel && (
            <div key={sel.id} className="rounded-xl mo-rise-sm flex items-center justify-center flex-wrap" style={{ gap: '0.75rem 1.25rem', padding: 'clamp(0.8rem,1.3cqw,1.25rem)', background: `linear-gradient(270deg, ${alpha(ACC, 0.14)}, rgba(12,17,50,0.7))`, border: `1px solid ${alpha(ACC, 0.45)}`, boxShadow: `0 0 40px -18px ${ACC}` }}>
              <p className="text-white/85" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)', margin: 0 }}>
                <strong style={{ color: ACC_T }}>{sel.name}:</strong> {sel.why}
              </p>
              {selScene && (
                <button onClick={() => goToScene(selScene.index)} className="interactive-card inline-flex items-center rounded-full"
                  style={{ gap: '0.4rem', padding: '0.25rem 0.9rem', fontSize: 'clamp(1.05rem, 1.2cqw, 1.4rem)', fontWeight: 600, background: alpha(ACC, 0.2), color: '#F6F2EA', border: `1px solid ${alpha(ACC, 0.6)}` }}>
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
