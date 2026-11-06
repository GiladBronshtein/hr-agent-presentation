/**
 * S29: Demo Approval: Human-in-the-Loop
 * The trust moment: nothing is published, enrolled or sent until a person
 * from L&D edits (optional) and approves. Approval is marked by one amber
 * stroke that draws a check mark, in the deck's path-line language.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { INK } from '../components/motion/path'; // also registers DrawSVGPlugin
import { useReducedMotion } from '../components/motion/useReducedMotion';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';
import { usePresentationStore } from '../store/presentationStore';
import { UserCheck, CheckCircle, XCircle, AlertTriangle, FileText, Pencil } from 'lucide-react';
import { DEMO_APPROVAL_EDIT, DEMO_APPROVAL_ITEMS, DEMO_SCENARIO } from '../data/demoData';
import { PALETTE, alpha } from '../lib/palette';

/** The human decision is amber throughout the deck (see the decision tree) */
const ACC: string = PALETTE.amber;
const ACC_T: string = PALETTE.amber;

/** A check mark drawn by a single amber stroke once the plan is approved. */
function DrawnCheck() {
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    if (reduced) {
      gsap.set(el, { drawSVG: '0% 100%' });
      return;
    }
    const tween = gsap.fromTo(el,
      { drawSVG: '0% 0%' },
      { drawSVG: '0% 100%', duration: 0.75, delay: 0.2, ease: 'power2.inOut' },
    );
    return () => { tween.kill(); };
  }, [reduced]);

  return (
    <svg viewBox="0 0 64 64" aria-hidden style={{ width: '60%', height: '60%', overflow: 'visible' }}>
      <path
        ref={pathRef}
        d="M 13 34 L 26 47 L 52 18"
        fill="none"
        stroke={ACC}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function S29_DemoApproval() {
  const { demoApprovalState, setDemoApprovalState, goNext } = usePresentationStore();
  const [comment, setComment] = useState('');
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); };
  }, []);

  const handleApprove = () => {
    setDemoApprovalState('approved');
    advanceTimer.current = setTimeout(() => goNext(), 1800);
  };

  const handleReject = () => {
    setDemoApprovalState('rejected');
  };

  return (
    <SceneBase>
      <DemoStepLayout step={4} title="אישור אנושי" gap="clamp(0.75rem, 1.6cqh, 1.25rem)">
        {/* Pending state */}
        {demoApprovalState === 'pending' && (
          <div
            className="animate-fade-in-up stagger-2 fx-glass fx-sheen"
            style={{
              width: '100%',
              maxWidth: '860px',
              alignSelf: 'center',
              padding: 'clamp(1.25rem, 2.2cqh, 1.75rem) clamp(1.25rem, 1.8cqw, 2rem)',
              borderRadius: '20px',
              '--fx-c': ACC,
            } as React.CSSProperties}
          >
            {/* Agent summary */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `linear-gradient(160deg, ${alpha(ACC, 0.3)}, ${alpha(ACC, 0.08)})`,
                  border: `1px solid ${alpha(ACC, 0.5)}`,
                  boxShadow: `0 0 22px -6px ${alpha(ACC, 0.8)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <FileText size={20} style={{ color: ACC_T }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem, 1.56cqw, 1.875rem)', color: '#F6F2EA', margin: '0 0 0.25rem' }}>
                  מסלול Pro לצוות המכירות
                </p>
                <p style={{ color: 'rgba(246,242,234,0.8)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontFamily: "'Heebo', sans-serif", margin: 0 }}>
                  {DEMO_SCENARIO.agent} מחכה לאישור. שום דבר לא מתפרסם, נרשם או נשלח לפני כן
                </p>
              </div>
            </div>

            {/* Plan items */}
            <div
              style={{
                padding: '0.875rem 1rem',
                borderRadius: '12px',
                background: 'rgba(6,9,24,0.5)',
                border: '1px solid rgba(246,242,234,0.1)',
                marginBottom: '1rem',
              }}
            >
              {DEMO_APPROVAL_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="mo-rise-sm"
                  style={{
                    animationDelay: `${0.3 + i * 0.05}s`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.35rem 0',
                    borderBottom: i < DEMO_APPROVAL_ITEMS.length - 1 ? '1px solid rgba(246,242,234,0.05)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: ACC_T, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontFamily: "'Heebo', sans-serif" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Comment field */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                <label htmlFor="demo-approval-edit" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(246,242,234,0.78)', fontFamily: "'Heebo', sans-serif" }}>
                  עריכה לפני אישור (לא חובה)
                </label>
                {!comment && (
                  <button
                    type="button"
                    onClick={() => setComment(DEMO_APPROVAL_EDIT)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.2rem 0.75rem', borderRadius: '100px',
                      background: alpha(ACC, 0.1), border: `1px solid ${alpha(ACC, 0.3)}`,
                      color: ACC_T, cursor: 'pointer',
                      fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', fontFamily: "'Heebo', sans-serif", fontWeight: 600,
                    }}
                  >
                    <Pencil size="0.9em" /> להוסיף דוגמה מהשטח
                  </button>
                )}
              </div>
              <textarea
                id="demo-approval-edit"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="למשל: להוסיף דוגמה מהשטח ליחידה 3"
                rows={1}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(246,242,234,0.04)',
                  border: '1px solid rgba(246,242,234,0.1)',
                  color: 'rgba(246,242,234,0.8)',
                  fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
                  fontFamily: "'Heebo', sans-serif",
                  resize: 'none',
                  outline: 'none',
                  boxSizing: 'border-box',
                  direction: 'rtl',
                  transition: 'border-color 200ms ease',
                }}
                onFocus={(e) => { e.target.style.borderColor = alpha(ACC, 0.35); }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(246,242,234,0.1)'; }}
              />
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleApprove}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: `linear-gradient(180deg, #FFD37A, ${ACC})`,
                  border: 'none',
                  boxShadow: `0 0 30px -4px ${alpha(ACC, 0.75)}, inset 0 1px 0 rgba(255,255,255,0.5)`,
                  color: '#060918',
                  fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)',
                  fontWeight: 700,
                  fontFamily: "'Heebo', sans-serif",
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                <CheckCircle size="1em" />
                אישור וביצוע
              </button>
              <button
                onClick={handleReject}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: 'rgba(163,171,207,0.08)',
                  border: '1px solid rgba(163,171,207,0.25)',
                  color: '#A3ABCF',
                  fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)',
                  fontWeight: 700,
                  fontFamily: "'Heebo', sans-serif",
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(163,171,207,0.14)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(163,171,207,0.08)'; }}
              >
                <XCircle size="1em" />
                החזרה לתיקון
              </button>
            </div>
          </div>
        )}

        {/* Approved state */}
        {demoApprovalState === 'approved' && (
          <div
            className="animate-scale-in"
            style={{
              textAlign: 'center',
              padding: '2.5rem',
              borderRadius: '20px',
              background: `radial-gradient(80% 70% at 50% 0%, ${alpha(ACC, 0.18)}, transparent 70%), #0B1030`,
              border: `1px solid ${alpha(ACC, 0.45)}`,
              boxShadow: `0 0 80px -24px ${ACC}`,
              maxWidth: '600px',
              width: '100%',
              alignSelf: 'center',
            }}
          >
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                border: '1px solid rgba(246,242,234,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
              }}
            >
              <DrawnCheck />
            </div>
            <h3 style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.5rem, 1.9cqw, 2.25rem)', fontWeight: 700, color: ACC_T, margin: '0 0 0.5rem' }}>
              אושר
            </h3>
            <p style={{ color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontFamily: "'Heebo', sans-serif", margin: 0 }}>
              {comment ? 'ההערה נוספה לתוכנית. ' : ''}{DEMO_SCENARIO.agent} מפרסם, רושם ושולח, וכל פעולה מתועדת
            </p>
          </div>
        )}

        {/* Rejected state */}
        {demoApprovalState === 'rejected' && (
          <div
            className="animate-scale-in"
            style={{
              textAlign: 'center',
              padding: '2rem',
              borderRadius: '20px',
              background: 'rgba(163,171,207,0.07)',
              border: '1px solid rgba(163,171,207,0.2)',
              maxWidth: '600px',
              width: '100%',
              alignSelf: 'center',
            }}
          >
            <AlertTriangle size={36} style={{ color: '#A3ABCF', margin: '0 auto 1rem', display: 'block' }} />
            <h3 style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.5rem, 1.9cqw, 2.25rem)', fontWeight: 700, color: '#A3ABCF', margin: '0 0 0.5rem', textWrap: 'balance' } as React.CSSProperties}>
              הוחזר לתיקון. {DEMO_SCENARIO.agent} יתקן ויחזור לאישור
            </h3>
            <p style={{ color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontFamily: "'Heebo', sans-serif", margin: '0 0 1.25rem' }}>
              זה בדיוק המנגנון: אדם מחליט, האייג׳נט מתאים
            </p>
            <button
              onClick={() => setDemoApprovalState('pending')}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                background: 'rgba(246,242,234,0.06)',
                border: '1px solid rgba(246,242,234,0.12)',
                color: 'rgba(246,242,234,0.78)',
                fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
                fontFamily: "'Heebo', sans-serif",
                cursor: 'pointer',
              }}
            >
              ניסיון נוסף
            </button>
          </div>
        )}

        {/* Insight */}
        <div
          className="animate-fade-in stagger-7"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.625rem 1rem',
            borderRadius: '10px',
            background: `linear-gradient(270deg, ${alpha(ACC, 0.1)}, rgba(12,17,50,0.6))`,
            border: `1px solid ${alpha(ACC, 0.3)}`,
            maxWidth: '860px',
            alignSelf: 'center',
          }}
        >
          <UserCheck size={22} style={{ color: ACC_T, flexShrink: 0 }} />
          <p style={{ color: 'rgba(246,242,234,0.86)', fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontFamily: "'Heebo', sans-serif", margin: 0, textWrap: 'balance' } as React.CSSProperties}>
            אישור אנושי (<bdi>Human-in-the-loop</bdi>) הוא <span style={{ color: ACC_T, fontWeight: 600 }}>חלק מהתכנון</span>, לא פשרה. <span style={{ whiteSpace: 'nowrap' }}>ככה בונים אמון.</span>
          </p>
        </div>
      </DemoStepLayout>
    </SceneBase>
  );
}
