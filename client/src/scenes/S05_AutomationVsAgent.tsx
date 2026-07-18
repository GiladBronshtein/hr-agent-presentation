/**
 * S05: Automation vs Agent
 * Conference Hall Edition: The Great Divide
 * Two worlds. One choice. Maximum visual impact.
 */
import { useEffect, useState } from 'react';
import { Brain, CheckCircle2, ClipboardList, Hammer, Lock, MessageCircle, RefreshCw, Wrench, XCircle, Zap } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';

const AUTOMATION_TRAITS = [
  { icon: ClipboardList, text: 'מבצע רצף פעולות קבוע' },
  { icon: Lock, text: 'לא מסתגל לשינויים' },
  { icon: Zap, text: 'מהיר אבל שביר' },
  { icon: Wrench, text: 'דורש תחזוקה תמידית' },
  { icon: XCircle, text: 'נשבר כשמשהו משתנה' },
];

const AGENT_TRAITS = [
  { icon: Brain, text: 'חושב, מתכנן, מחליט' },
  { icon: RefreshCw, text: 'מסתגל לכל מצב חדש' },
  { icon: Hammer, text: 'בוחר כלים בעצמו' },
  { icon: MessageCircle, text: 'מבקש אישור כשצריך' },
  { icon: CheckCircle2, text: 'לומד מכל אינטראקציה' },
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#03030A' }} />
      {/* Left half tint */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 70% at 30% 50%, rgba(100,116,139,0.05) 0%, transparent 70%)',
      }} />
      {/* Right half tint */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 70% at 70% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)',
      }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />

      {/* Top accent line: split colors */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 5,
        background: 'linear-gradient(90deg, rgba(100,116,139,0.4) 0%, rgba(100,116,139,0.4) 50%, rgba(99,102,241,0.6) 50%, rgba(34,211,238,0.6) 100%)',
      }} />

      {/* Center divider */}
      <div style={{
        position: 'absolute', top: '6%', bottom: '6%', left: '50%', width: '1px', zIndex: 5,
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.07) 80%, transparent 100%)',
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
        transition: 'opacity 0.5s ease 0.7s',
      }}>
        <div style={{
          width: 'clamp(44px, 5cqw, 58px)', height: 'clamp(44px, 5cqw, 58px)',
          borderRadius: '50%', background: '#03030A',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(1rem, 1.1cqw, 1rem)',
          fontWeight: 800, color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.05em',
        }}>VS</div>
      </div>

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        paddingBottom: 'clamp(5rem, 9cqw, 8rem)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease',
      }}>

        {/* LEFT: Automation */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(1.5rem, 3cqw, 4rem) clamp(2rem, 5cqw, 6rem) clamp(1.5rem, 3cqw, 4rem) clamp(1.5rem, 3cqw, 4rem)',
        }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '100px', width: 'fit-content',
            background: 'rgba(100,116,139,0.1)', border: '1px solid rgba(100,116,139,0.2)',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 0.85cqw, 1rem)', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.1em' }}>
              AUTOMATION, אוטומציה
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 7cqw, 7rem)',
            fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
            color: '#475569', margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            IF<br />THEN
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(255,255,255,0.3)', margin: '0 0 clamp(1.25rem, 2.5cqw, 2.5rem)', lineHeight: 1.5,
          }}>
            כשמשהו קורה, עשה X.<br />תמיד אותו דבר. ללא חשיבה.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.7cqw, 1rem)' }}>
            {AUTOMATION_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.5rem, 0.9cqw, 1rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: 'rgba(100,116,139,0.05)',
                border: '1px solid rgba(100,116,139,0.09)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0 }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)', color: 'rgba(255,255,255,0.55)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: 'rgba(100,116,139,0.04)', border: '1px solid rgba(100,116,139,0.1)',
            fontFamily: 'monospace', fontSize: 'clamp(1rem, 1cqw, 1rem)',
            color: 'rgba(255,255,255,0.25)', lineHeight: 1.6,
          }}>
            <span style={{ color: '#64748B' }}>IF</span> עובד חדש נוסף<br />
            <span style={{ color: '#64748B' }}>THEN</span> שלח מייל ברוכים הבאים<br />
            <span style={{ color: '#334155' }}>// אחרת, שגיאה</span>
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
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
            marginBottom: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#818CF8', display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 0.85cqw, 1rem)', fontWeight: 700, color: '#818CF8', letterSpacing: '0.1em' }}>
              AI AGENT, אייג׳נט
            </span>
          </div>

          <h2 className="animate-fade-in-up stagger-2" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3rem, 7cqw, 7rem)',
            fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.06em',
            margin: '0 0 clamp(0.75rem, 1.5cqw, 1.5rem)',
            background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 40%, #22D3EE 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.4))',
          }}>
            THINK<br />ACT
          </h2>

          <p className="animate-fade-in-up stagger-3" style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.7cqw, 1.5rem)',
            color: 'rgba(255,255,255,0.55)', margin: '0 0 clamp(1.25rem, 2.5cqw, 2.5rem)', lineHeight: 1.5,
          }}>
            מקבל מטרה, מחליט איך להגיע.<br />חושב, מתאים, פועל.
          </p>

          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.7cqw, 1rem)' }}>
            {AGENT_TRAITS.map((t, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.625rem',
                padding: 'clamp(0.5rem, 0.9cqw, 1rem) clamp(0.75rem, 1.2cqw, 1.1rem)',
                borderRadius: '10px',
                background: 'rgba(99,102,241,0.07)',
                border: '1px solid rgba(99,102,241,0.14)',
                boxShadow: '0 0 10px rgba(99,102,241,0.04)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.3 + i * 0.07}s`,
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 2.1cqw, 2rem)', flexShrink: 0 }}><t.icon size="1em" /></span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)', color: 'rgba(255,255,255,0.7)' }}>{t.text}</span>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            marginTop: 'clamp(0.75rem, 1.5cqw, 1.5rem)',
            padding: 'clamp(0.625rem, 1cqw, 1rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
            borderRadius: '12px',
            background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.18)',
            fontFamily: 'monospace', fontSize: 'clamp(1rem, 1cqw, 1rem)',
            color: 'rgba(255,255,255,0.68)', lineHeight: 1.6,
          }}>
            <span style={{ color: '#818CF8' }}>GOAL:</span> הכן קליטה לעובד חדש<br />
            <span style={{ color: '#22D3EE' }}>PLAN:</span> בדוק → תכנן → בצע → אשר<br />
            <span style={{ color: '#34D399' }}>ADAPT:</span> מסתגל לכל שינוי בדרך
          </div>
        </div>
      </div>

      {/* Bottom takeaway - hugs the slide's bottom edge, clear of the content above */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(1.25rem, 2.5cqh, 2rem)',
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 4,
        opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.9s',
        pointerEvents: 'none',
      }}>
        <div style={{
          padding: 'clamp(0.5rem, 0.8cqw, 1rem) clamp(1.25rem, 2cqw, 2rem)',
          borderRadius: '100px',
          background: 'rgba(10,10,30,0.85)',
          border: '1px solid rgba(99,102,241,0.18)',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)',
            color: 'rgba(255,255,255,0.55)',
          }}>
            אוטומציה מבצעת פקודות.{' '}
            <span style={{ color: '#818CF8', fontWeight: 700 }}>אייג׳נט מבצע מטרות.</span>
          </span>
        </div>
      </div>
    </SceneBase>
  );
}
