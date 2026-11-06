/**
 * S05: Automation vs Agent
 * A reminder rule vs an agent that sees why learning stalled. Two lights:
 * the automation side sits in a cold, flat wash; the agent side is lit in
 * the chapter color, with gradient type and a pulse on the divider.
 */
import { useEffect, useState } from 'react';
import { Brain, CheckCircle2, ClipboardList, Hammer, Lock, MessageCircle, RefreshCw, Wrench, XCircle, Zap } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { SourceChip } from '../components/presentation/SourceChip';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('automation-vs-agent');

const AUTOMATION_TRAITS = [
  { icon: ClipboardList, text: 'אותו רצף צעדים, בכל פעם' },
  { icon: Lock, text: 'לא יודע למה הלמידה נתקעה' },
  { icon: Zap, text: 'אותה תזכורת לכולם' },
  { icon: Wrench, text: 'כל שינוי דורש לבנות מחדש' },
  { icon: XCircle, text: 'נשבר כשמשהו לא צפוי' },
];

const AGENT_TRAITS = [
  { icon: Brain, text: 'מבין איפה הלמידה נתקעה' },
  { icon: RefreshCw, text: 'מתאים את הדרך לכל אחד' },
  { icon: Hammer, text: 'בוחר בעצמו באיזה כלי להשתמש' },
  { icon: MessageCircle, text: 'עוצר לאישור כשצריך' },
  { icon: CheckCircle2, text: 'זוכר מה כבר נוסה ומה עבד' },
];

export default function S05_AutomationVsAgent() {
  const [mounted, setMounted] = useState(false);
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 80);
    const t2 = setTimeout(() => setShowDivider(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SceneBase variant="deep-dark" grid>
      {/* Two lights: cold and flat on the automation half (right), the chapter
          color on the agent half (left) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(55% 70% at 78% 50%, ${alpha(PALETTE.muted, 0.08)}, transparent 70%), radial-gradient(60% 75% at 24% 48%, ${alpha(ACC, 0.24)}, transparent 70%)` }} />

      {/* Center divider */}
      <div style={{
        position: 'absolute', top: '6%', bottom: '6%', left: '50%', width: '1px', zIndex: 5,
        background: `linear-gradient(180deg, transparent, ${alpha(ACC, 0.6)} 30%, ${alpha(PALETTE.muted, 0.35)} 70%, transparent)`,
        transform: showDivider ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'top',
        transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      }} />

      {/* VS badge */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        opacity: showDivider ? 1 : 0,
        transition: 'opacity 0.3s ease 0.3s',
      }}>
        {/* Pop lives on the inner circle so the centering transform above stays untouched */}
        <div className="mo-pop" style={{
          animationDelay: '0.95s',
          width: 'clamp(44px, 5cqw, 58px)', height: 'clamp(44px, 5cqw, 58px)',
          borderRadius: '50%', background: 'radial-gradient(circle at 50% 35%, #1A2258, #0B1030 70%)',
          border: `1px solid ${alpha(ACC, 0.5)}`,
          boxShadow: `0 0 24px ${alpha(ACC, 0.45)}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
          fontSize: 'clamp(1rem, 1.1cqw, 1rem)',
          fontWeight: 800, color: 'rgba(246,242,234,0.85)',
          letterSpacing: '0.05em', position: 'relative',
        }}><span aria-hidden className="fx-ring" style={{ color: ACC }} />VS</div>
      </div>

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        paddingBottom: 'clamp(4.5rem, 10cqh, 7rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>

        {/* LEFT: Automation */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 3cqw, 4rem) clamp(2rem, 5cqw, 6rem) clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem)',
        }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '100px', width: 'fit-content',
            background: 'rgba(163,171,207,0.1)', border: '1px solid rgba(163,171,207,0.28)',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: '#D5DAEE' }}>
              AUTOMATION, אוטומציה
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 8.5cqh, 5.75rem)',
            fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.015em',
            color: '#A3ABCF', margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            IF<br />THEN
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(246,242,234,0.7)', margin: '0 0 clamp(0.75rem, 2.2cqh, 1.75rem)', lineHeight: 1.5,
          }}>
            כשקורה X, עושים Y.<br />תמיד אותו דבר, בלי לשאול למה.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem, 0.9cqh, 0.75rem)' }}>
            {AUTOMATION_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.4rem, 1.1cqh, 0.9rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: 'rgba(11,16,48,0.55)',
                border: '1px solid rgba(163,171,207,0.14)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0, display: 'inline-flex', color: PALETTE.muted }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(246,242,234,0.72)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.6rem, 1.6cqh, 1.25rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: 'rgba(11,16,48,0.6)', border: '1px solid rgba(163,171,207,0.16)',
            fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1cqw, 1.2rem)',
            color: 'rgba(246,242,234,0.72)', lineHeight: 1.6,
          }}>
            <span style={{ color: '#A3ABCF' }}>IF</span> הקורס לא הושלם תוך 7 ימים<br />
            <span style={{ color: '#A3ABCF' }}>THEN</span> נשלחת תזכורת<br />
            <span style={{ color: PALETTE.dim }}>// ושוב בעוד 7 ימים</span>
          </div>
        </div>

        {/* RIGHT: Agent */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem) clamp(2rem, 5cqw, 6rem)',
        }}>
          <div className="animate-fade-in-up stagger-1 fx-chip" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.4rem 1rem', borderRadius: '100px', width: 'fit-content',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span className="fx-beacon" style={{ width: '7px', height: '7px', color: ACC }} />
            <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: ACC_T }}>
              AI AGENT, אייג׳נט
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 8.5cqh, 5.75rem)',
            fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.015em',
            margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
            color: ACC_T,
          }}>
            <span className="fx-spectrum-text fx-shine-once">THINK</span><br /><span className="fx-spectrum-text fx-shine-once">ACT</span>
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(246,242,234,0.84)', margin: '0 0 clamp(0.75rem, 2.2cqh, 1.75rem)', lineHeight: 1.5,
          }}>
            מקבל מטרה ומחפש את הדרך אליה.<br />מבין, מתאים, פועל.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem, 0.9cqh, 0.75rem)' }}>
            {AGENT_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.4rem, 1.1cqh, 0.9rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: `linear-gradient(90deg, ${alpha(ACC, 0.05)}, ${alpha(ACC, 0.16)}), rgba(12,17,50,0.6)`,
                border: `1px solid ${alpha(ACC, 0.32)}`,
                boxShadow: `0 0 26px -14px ${alpha(ACC, 0.9)}`,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0, display: 'inline-flex', color: ACC_T, filter: `drop-shadow(0 0 8px ${alpha(ACC, 0.7)})` }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(246,242,234,0.9)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.6rem, 1.6cqh, 1.25rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: `linear-gradient(160deg, ${alpha(ACC, 0.14)}, ${alpha(ACC, 0.04)}), rgba(12,17,50,0.7)`, border: `1px solid ${alpha(ACC, 0.4)}`,
            boxShadow: `0 0 40px -18px ${alpha(ACC, 0.9)}`,
            fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1cqw, 1.2rem)',
            color: 'rgba(246,242,234,0.86)', lineHeight: 1.6,
          }}>
            <span style={{ color: ACC_T }}><bdi>GOAL</bdi>:</span> כל הצוות מוכן לשיחת מכירה<br />
            <span style={{ color: '#F6F2EA' }}><bdi>NOTICE</bdi>:</span> מאיה טעתה פעמיים באותה שאלה<br />
            <span style={{ color: ACC_T }}><bdi>ADAPT</bdi>:</span> הסבר של 2 דקות ותרגול חדש
          </div>
        </div>
      </div>

      {/* Bottom takeaway - hugs the slide's bottom edge, clear of the content above */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.25rem, 2.5cqh, 2rem)',
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 4,
        pointerEvents: 'none',
            animationDelay: '0.9s',
      }} className="mo-fade">
        <div className="fx-takeaway" style={{
          padding: 'clamp(0.5rem, 0.8cqw, 1rem) clamp(1.25rem, 2cqw, 2rem)',
          borderRadius: '100px',
        }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)',
            color: 'rgba(246,242,234,0.84)',
          }}>
            אוטומציה מבצעת מסלול.{' '}
            <span style={{ color: ACC_T, fontWeight: 700 }}>אייג׳נט מנהל מטרה.</span>
          </span>
          <SourceChip id="anthropic-effective-agents" style={{ marginInlineStart: '0.75em', verticalAlign: 'middle', pointerEvents: 'auto' }} />
        </div>
      </div>
    </SceneBase>
  );
}
