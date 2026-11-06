/**
 * S05: Automation vs Agent
 * Conference Hall Edition: a reminder rule vs an agent that sees why learning stalled.
 */
import { useEffect, useState } from 'react';
import { Brain, CheckCircle2, ClipboardList, Hammer, Lock, MessageCircle, RefreshCw, Wrench, XCircle, Zap } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';

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
    <SceneBase noBg>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#070B17' }} />
      <div className="noise-overlay" />

      {/* Center divider */}
      <div style={{
        position: 'absolute', top: '6%', bottom: '6%', left: '50%', width: '1px', zIndex: 5,
        background: 'rgba(243,238,228,0.14)',
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
          borderRadius: '50%', background: '#070B17',
          border: '1px solid rgba(243,238,228,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
          fontSize: 'clamp(1rem, 1.1cqw, 1rem)',
          fontWeight: 800, color: 'rgba(243,238,228,0.55)',
          letterSpacing: '0.05em',
        }}>VS</div>
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
            background: 'rgba(138,147,168,0.1)', border: '1px solid rgba(138,147,168,0.2)',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: '#CBD5E1' }}>
              AUTOMATION, אוטומציה
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 8.5cqh, 5.75rem)',
            fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.015em',
            color: '#8A93A8', margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            IF<br />THEN
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(243,238,228,0.58)', margin: '0 0 clamp(0.75rem, 2.2cqh, 1.75rem)', lineHeight: 1.5,
          }}>
            כשקורה X, עושים Y.<br />תמיד אותו דבר, בלי לשאול למה.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem, 0.9cqh, 0.75rem)' }}>
            {AUTOMATION_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.4rem, 1.1cqh, 0.9rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: 'rgba(138,147,168,0.05)',
                border: '1px solid rgba(138,147,168,0.09)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0 }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(243,238,228,0.62)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.6rem, 1.6cqh, 1.25rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: 'rgba(138,147,168,0.04)', border: '1px solid rgba(138,147,168,0.1)',
            fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1cqw, 1.2rem)',
            color: 'rgba(243,238,228,0.6)', lineHeight: 1.6,
          }}>
            <span style={{ color: '#8A93A8' }}>IF</span> הקורס לא הושלם תוך 7 ימים<br />
            <span style={{ color: '#8A93A8' }}>THEN</span> נשלחת תזכורת<br />
            <span style={{ color: 'rgba(243,238,228,0.45)' }}>// ושוב בעוד 7 ימים</span>
          </div>
        </div>

        {/* RIGHT: Agent */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem) clamp(2rem, 5cqw, 6rem)',
        }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '100px', width: 'fit-content',
            background: 'rgba(243,238,228,0.12)', border: '1px solid rgba(243,238,228,0.25)',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F2A93B', display: 'inline-block' }} />
            <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: '#F2A93B' }}>
              AI AGENT, אייג׳נט
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(3rem, 8.5cqh, 5.75rem)',
            fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.015em',
            margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
            color: '#F2A93B',
          }}>
            THINK<br />ACT
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(243,238,228,0.7)', margin: '0 0 clamp(0.75rem, 2.2cqh, 1.75rem)', lineHeight: 1.5,
          }}>
            מקבל מטרה ומחפש את הדרך אליה.<br />מבין, מתאים, פועל.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem, 0.9cqh, 0.75rem)' }}>
            {AGENT_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.4rem, 1.1cqh, 0.9rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: 'rgba(243,238,228,0.07)',
                border: '1px solid rgba(243,238,228,0.14)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0 }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(243,238,228,0.8)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.6rem, 1.6cqh, 1.25rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: 'rgba(243,238,228,0.07)', border: '1px solid rgba(243,238,228,0.18)',
            fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1cqw, 1.2rem)',
            color: 'rgba(243,238,228,0.75)', lineHeight: 1.6,
          }}>
            <span style={{ color: '#F2A93B' }}><bdi>GOAL:</bdi></span> כל הצוות מוכן לשיחת מכירה<br />
            <span style={{ color: '#F3EEE4' }}><bdi>NOTICE:</bdi></span> מאיה טעתה פעמיים באותה שאלה<br />
            <span style={{ color: '#F2A93B' }}><bdi>ADAPT:</bdi></span> הסבר של 2 דקות ותרגול חדש
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
        <div style={{
          padding: 'clamp(0.5rem, 0.8cqw, 1rem) clamp(1.25rem, 2cqw, 2rem)',
          borderRadius: '100px',
          background: 'rgba(13,19,38,0.85)',
          border: '1px solid rgba(243,238,228,0.18)',
        }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)',
            color: 'rgba(243,238,228,0.72)',
          }}>
            אוטומציה מבצעת מסלול.{' '}
            <span style={{ color: '#F2A93B', fontWeight: 700 }}>אייג׳נט מנהל מטרה.</span>
          </span>
        </div>
      </div>
    </SceneBase>
  );
}
