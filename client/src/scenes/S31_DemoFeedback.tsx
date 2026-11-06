import { useEffect, useState } from 'react';
import { CheckCircle2, Lightbulb } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { DEMO_FEEDBACK, DEMO_SCENARIO } from '../data/demoData';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';
import { sound } from '../lib/sound';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('demo-feedback');

const STAT_COLORS = [PALETTE.teal, textOn(PALETTE.violet), PALETTE.amber];

export default function S31_DemoFeedback() {
  const [ratings, setRatings] = useState(DEMO_FEEDBACK.ratings.map((q) => q.default));
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    const stops = DEMO_FEEDBACK.stats.map((_, i) => sound.demo.land(i * 2, 0.25 + i * 0.2));
    return () => stops.forEach((f) => f());
  }, []);

  return (
    <SceneBase>
      <DemoStepLayout eyebrow="דמו מורחב" title="משוב ושיפור" subtitle="שבועיים אחרי: מה עבד, ומי צריך עוד עזרה" gap="clamp(0.6rem, 1.3cqh, 1.1rem)">
        {/* Two weeks in: the numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'clamp(0.6rem, 1cqw, 1rem)' }}>
          {DEMO_FEEDBACK.stats.map((s, i) => (
            <div key={s.label} className="rounded-xl mo-rise text-center fx-glass" style={{
              '--fx-c': STAT_COLORS[i],
              padding: 'clamp(0.6rem, 1.2cqh, 1rem) clamp(0.75rem, 1cqw, 1rem)',
              animationDelay: `${0.15 + i * 0.2}s`,
            } as React.CSSProperties}>
              <div style={{ color: STAT_COLORS[i], textShadow: `0 0 18px ${alpha(STAT_COLORS[i], 0.5)}`, fontWeight: 800, fontSize: 'clamp(1.75rem, 2.4cqw, 2.75rem)', lineHeight: 1.1, fontVariantNumeric: 'tabular-nums' }}>
                <bdi>{s.value}</bdi>
              </div>
              <div style={{ color: 'rgba(246,242,234,0.75)', fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* What the team said (1 to 5) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.8cqh, 0.6rem)' }}>
          {DEMO_FEEDBACK.ratings.map((item, qi) => (
            <div key={item.q} className="rounded-xl mo-rise flex items-center justify-between gap-6" style={{ padding: 'clamp(0.5rem, 1cqh, 0.85rem) clamp(1.1rem, 1.6cqw, 1.6rem)', background: 'rgba(12,17,50,0.62)', border: '1px solid rgba(246,242,234,0.1)', animationDelay: `${0.35 + qi * 0.07}s` }}>
              <p style={{ margin: 0, color: 'rgba(246,242,234,0.85)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)' }}>{item.q}</p>
              <div className="flex gap-2 shrink-0" role="group" aria-label={item.q}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button key={r} onClick={() => { sound.demo.land(r - 1); setRatings((prev) => { const n = [...prev]; n[qi] = r; return n; }); }}
                    aria-pressed={ratings[qi] === r}
                    className="rounded-lg font-semibold transition-all"
                    style={{
                      width: 'clamp(2.3rem, 2.6cqw, 3rem)', height: 'clamp(2.3rem, 2.6cqw, 3rem)',
                      fontSize: 'clamp(1.1rem, 1.25cqw, 1.5rem)',
                      background: ratings[qi] >= r ? `linear-gradient(160deg, ${alpha(ACC, 0.45)}, ${alpha(ACC, 0.2)})` : 'rgba(246,242,234,0.05)',
                      border: ratings[qi] >= r ? `1px solid ${alpha(ACC_T, 0.75)}` : '1px solid rgba(246,242,234,0.14)',
                      boxShadow: ratings[qi] === r ? `0 0 18px -2px ${alpha(ACC, 0.8)}` : 'none',
                      color: ratings[qi] >= r ? '#F6F2EA' : 'rgba(246,242,234,0.7)',
                    }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* The agent proposes, a person approves */}
        <div className="rounded-xl mo-rise" style={{
          display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)',
          padding: 'clamp(0.7rem, 1.4cqh, 1.15rem) clamp(1.1rem, 1.6cqw, 1.6rem)',
          background: approved ? `linear-gradient(270deg, ${alpha(PALETTE.teal, 0.16)}, rgba(12,17,50,0.7))` : `linear-gradient(270deg, ${alpha(PALETTE.amber, 0.14)}, rgba(12,17,50,0.7))`,
          border: approved ? `1px solid ${alpha(PALETTE.teal, 0.45)}` : `1px solid ${alpha(PALETTE.amber, 0.4)}`,
          boxShadow: `0 0 40px -18px ${approved ? PALETTE.teal : PALETTE.amber}`,
          animationDelay: '0.55s', transition: 'background 0.3s ease, border-color 0.3s ease',
        }}>
          <span style={{ display: 'inline-flex', color: approved ? PALETTE.teal : PALETTE.amber, fontSize: 'clamp(1.5rem, 1.9cqw, 2.1rem)', flexShrink: 0 }}>
            {approved ? <CheckCircle2 size="1em" /> : <Lightbulb size="1em" />}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: approved ? PALETTE.teal : PALETTE.amber, fontWeight: 700, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)' }}>
              {approved ? 'אושר. נשלח רק לשניים שצריכים' : <>ההצעה של <bdi>{DEMO_SCENARIO.agent}</bdi></>}
            </div>
            <p style={{ margin: 0, color: 'rgba(246,242,234,0.88)', fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)', lineHeight: 1.35 }}>
              {DEMO_FEEDBACK.suggestion}
            </p>
          </div>
          {!approved && (
            <button
              type="button"
              onClick={() => { setApproved(true); sound.demo.approve(); }}
              style={{
                flexShrink: 0, whiteSpace: 'nowrap',
                padding: '0.5rem 1.1rem', borderRadius: '10px',
                background: `linear-gradient(180deg, #FFD37A, ${PALETTE.amber})`, border: 'none', color: '#060918',
                boxShadow: `0 0 26px -4px ${alpha(PALETTE.amber, 0.7)}, inset 0 1px 0 rgba(255,255,255,0.5)`,
                fontWeight: 700, fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', cursor: 'pointer',
              }}
            >
              אישור ההצעה
            </button>
          )}
        </div>
      </DemoStepLayout>
    </SceneBase>
  );
}
