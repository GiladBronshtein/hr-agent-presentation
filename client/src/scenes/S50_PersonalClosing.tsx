/**
 * S50: Personal Closing - cinematic finale.
 * The chaotic system constellation from slide 1 returns, calm and orbiting;
 * a giant thank-you beat, a signature-draw under the name, one clear CTA,
 * and the audience's own slide-4 choices come full circle.
 */
import { useEffect, useState } from 'react';
import { MessageCircle, Mail, Calendar, Folder, Target, BarChart3, Building2, Linkedin } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';

import { PHOTO_URL, QR_URL } from '../lib/mediaAssets';
import { usePresentationStore } from '../store/presentationStore';
import { SmoothImage } from '../components/SmoothImage';
import { PortraitFinale, stopFinaleSound } from '../components/presentation/PortraitFinale';
import { getSceneById } from '../data/scenes';
import { LITE } from '../lib/device';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('personal-closing');
const LINKEDIN_URL = 'https://www.linkedin.com/in/giladbronshtein/';

/** The slide-1 systems, back one last time - calm, faint, orbiting the story's end. */
const CONSTELLATION = [
  { icon: MessageCircle, color: PALETTE.magenta, x: 6,  y: 14, dur: 7 },
  { icon: Mail,          color: PALETTE.coral, x: 40, y: 8,  dur: 9 },
  { icon: Calendar,      color: PALETTE.blue, x: 3,  y: 52, dur: 8 },
  { icon: Folder,        color: PALETTE.teal, x: 48, y: 30, dur: 10 },
  { icon: Target,        color: PALETTE.violet, x: 10, y: 84, dur: 9 },
  { icon: BarChart3,     color: PALETTE.teal, x: 44, y: 78, dur: 7.5 },
  { icon: Building2,     color: ACC_T, x: 26, y: 94, dur: 8.5 },
];

const AUDIENCE_LABELS: Record<string, string> = {
  searching: 'אבחון צרכים',
  writing: 'פיתוח תוכן',
  scheduling: 'תיאום עם מומחים',
  'data-entry': 'ניהול LMS',
  coordination: 'תזכורות ומעקב',
  approvals: 'שאלות חוזרות',
  reporting: 'דוחות ומדידה',
  onboarding: 'הדרכה מול קהל',
};

export default function S50_PersonalClosing() {
  const [phase, setPhase] = useState(0);
  const { audienceSelections } = usePresentationStore();

  // Arriving forward, the talk ends with the portrait finale: the particle
  // universe assembles into the photo, and the slide appears around it.
  const [finale, setFinale] = useState(() => {
    const { previousSceneIndex, isReducedMotion } = usePresentationStore.getState();
    // phones skip it: no WebGL there (see lib/device.ts)
    return !LITE && !isReducedMotion && previousSceneIndex < (getSceneById('personal-closing')?.index ?? 0);
  });
  const [revealed, setRevealed] = useState(!finale);
  // the closing music's outro stops when the slide is left
  useEffect(() => () => stopFinaleSound(), []);
  useEffect(() => {
    if (!revealed) return;
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [revealed]);

  return (
    <SceneBase>
      {/* Slide-1 constellation, at rest */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {CONSTELLATION.map((c, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
            color: c.color, opacity: 0.14,
            fontSize: 'clamp(1.4rem, 2.2cqw, 2.2rem)',
            display: 'inline-flex',
          }}>
            <c.icon size="1em" strokeWidth={1.5} />
          </span>
        ))}
      </div>

      {/* Main layout: left text | right photo */}
      <div dir="rtl" style={{
        position: 'relative', zIndex: 5,
        width: '100%', height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 0.85fr',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}>

        {/* ── LEFT PANEL ── */}
        <div style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2rem,4cqh,4rem) clamp(1.5rem,3cqw,3rem) clamp(4.5rem,8cqh,6rem) clamp(3rem,6cqw,6.5rem)',
          gap: 'clamp(1rem,2.2cqh,1.9rem)',
        }}>

          {/* Conference: a badge and a separate subtitle line, never joined */}
          <div style={{
            display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem 0.9rem',
            width: 'fit-content',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.05s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.05s',
          }}>
            <span dir="ltr" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              padding: '0.25rem 0.8rem', borderRadius: '100px',
              background: 'rgba(246,242,234,0.12)', border: '1px solid rgba(246,242,234,0.4)',
              fontSize: 'clamp(0.95rem,1.15cqw,1.1rem)', fontWeight: 700, color: 'rgba(246,242,234,0.85)',
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif", letterSpacing: '0.14em', whiteSpace: 'nowrap',
            }}>
              HR IMPACT 26
            </span>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem,1.3cqw,1.25rem)', fontWeight: 600, color: 'rgba(246,242,234,0.68)' }}>
              כנס למידה בעידן ה-AI
            </span>
          </div>

          {/* Giant thank-you beat */}
          <h2 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(2.2rem,4cqw,3.8rem)',
            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', margin: 0,
            color: ACC_T,
            textShadow: `0 0 26px ${alpha(ACC, 0.45)}`,
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease 0.15s',
          }}>
            תודה על ההקשבה.
          </h2>

          {/* Name block + signature draw */}
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.25s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.25s',
          }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.6rem,9cqw,8.5rem)',
              fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em',
              color: '#F6F2EA', margin: 0,
            }}>
              גלעד
            </h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.6rem,9cqw,8.5rem)',
              fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em',
              margin: '0.04em 0 0',
              color: '#F6F2EA',
            }}>
              ברונשטיין
            </h1>
            {/* Signature stroke drawing itself in */}
            <svg viewBox="0 0 420 26" style={{ width: 'clamp(220px, 30cqw, 420px)', height: 'auto', marginTop: '0.6rem', display: 'block' }} aria-hidden>
              <path
                d="M 415 14 C 340 4, 240 22, 160 13 S 40 8, 5 16"
                fill="none" stroke={ACC} strokeWidth="3.5" strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 6px ${alpha(ACC, 0.8)})`, animation: 'drawStroke 1.1s cubic-bezier(0.65, 0, 0.35, 1) 1.1s forwards' }}
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={100}
              />
            </svg>
          </div>

          {/* Role & bio */}
          <div style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.3s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.3s',
          }}>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1.1rem,1.7cqw,1.5rem)',
              color: 'rgba(246,242,234,0.8)', margin: 0, lineHeight: 1.35, fontWeight: 600,
            }}>
              Professional Services and Ops Team Lead at Rise
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem,1.4cqw,1.25rem)',
              color: 'rgba(246,242,234,0.65)', margin: '0.35rem 0 0', lineHeight: 1.5,
            }}>
              מחבר בין אנשים, דאטה ו-AI, והופך מורכבות לתוצאות ברורות.
            </p>
          </div>

          {/* Hero connect card - the one clear action */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1.1rem,2cqw,2rem)',
            padding: 'clamp(1rem,1.9cqh,1.6rem) clamp(1.2rem,2cqw,1.9rem)',
            borderRadius: '22px',
            background: '#0B1030',
            border: '1px solid rgba(246,242,234,0.22)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.5s',
            width: 'fit-content',
          }}>
            <div style={{
              width: 'clamp(104px,13cqw,148px)', height: 'clamp(104px,13cqw,148px)',
              borderRadius: '16px', overflow: 'hidden', background: '#F6F2EA',
              padding: '7px', flexShrink: 0, position: 'relative',
            }}>
              <SmoothImage src={QR_URL} alt="QR code to LinkedIn" shimmer style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)', fontWeight: 600, color: 'rgba(246,242,234,0.62)', fontFamily: "'Heebo', sans-serif", marginBottom: '0.4rem' }}>
                סריקה להתחברות
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', color: ACC_T, fontSize: 'clamp(1.2rem,1.6cqw,1.5rem)' }}><Linkedin size="1em" /></span>
                <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.1rem,1.5cqw,1.4rem)', fontWeight: 700, color: '#F6F2EA', direction: 'ltr' }}>
                  /in/giladbronshtein
                </span>
              </div>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="interactive-card" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: 'clamp(0.6rem,1.1cqh,0.9rem)',
                padding: 'clamp(0.5rem,0.9cqh,0.7rem) clamp(1rem,1.7cqw,1.5rem)',
                borderRadius: '12px',
                background: `linear-gradient(180deg, #FFD37A, ${ACC})`,
                boxShadow: `0 0 28px -4px ${alpha(ACC, 0.7)}, inset 0 1px 0 rgba(255,255,255,0.5)`,
                color: '#060918', fontSize: 'clamp(1rem,1.3cqw,1.2rem)',
                fontFamily: "'Heebo', sans-serif", fontWeight: 700, textDecoration: 'none',
              }}>
                שאלות? אשמח לדבר
                <span style={{ direction: 'ltr', display: 'inline-flex' }}>←</span>
              </a>
            </div>
          </div>

          {/* Payoff: the audience's own choices, or the journey in numbers */}
          {audienceSelections.length > 0 ? (
            <div style={{
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
              opacity: phase >= 3 ? 1 : 0,
              transition: 'opacity 0.5s ease 0.65s',
            }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)', fontWeight: 700, color: 'rgba(246,242,234,0.75)' }}>
                התחומים שנבחרו בתחילת ההרצאה:
              </span>
              {audienceSelections.map((id) => AUDIENCE_LABELS[id] && (
                <span key={id} style={{
                  padding: '0.3rem 0.85rem', borderRadius: '100px',
                  background: alpha(ACC, 0.14), border: `1px solid ${alpha(ACC, 0.5)}`, boxShadow: `0 0 18px -6px ${ACC}`,
                  color: '#F6F2EA', fontFamily: "'Heebo', sans-serif", fontWeight: 600,
                  fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)',
                }}>
                  {AUDIENCE_LABELS[id]}
                </span>
              ))}
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)', color: 'rgba(246,242,234,0.68)' }}>
                בכל אחד מהם, אייג׳נט יכול להחזיר לנו זמן.
              </span>
            </div>
          ) : null}
          {/* First-step pill: lives in the text column, clear of the photo */}
          <div className="mo-rise" style={{
            position: 'absolute', bottom: 'clamp(1.25rem, 2.5cqh, 2rem)', left: 'clamp(1.5rem,3cqw,3rem)', right: 'clamp(1.5rem,3cqw,3rem)',
            display: 'flex', justifyContent: 'center', pointerEvents: 'none',
            animationDelay: '1.2s',
          }}>
            <div style={{
              padding: 'clamp(0.5rem, 0.8cqw, 0.9rem) clamp(1.1rem, 1.8cqw, 1.75rem)',
              borderRadius: '100px',
              background: 'linear-gradient(180deg, rgba(246,242,234,0.07), rgba(246,242,234,0.02)), rgba(10,14,42,0.85)',
              border: `1px solid ${alpha(ACC, 0.45)}`,
              boxShadow: `0 0 40px -12px ${alpha(ACC, 0.6)}`,
              textAlign: 'center',
            }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', color: 'rgba(246,242,234,0.8)', textWrap: 'balance' } as React.CSSProperties}>
                <span style={{ color: ACC_T, fontWeight: 700 }}>הצעד הראשון:</span>{' '}
                לבחור תהליך למידה אחד שחוזר כל שבוע, ולתת ל-AI להכין בו את הטיוטה הראשונה.
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL: Photo ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '6%', right: '6%', width: '48px', height: '48px', borderTop: '2px solid rgba(246,242,234,0.45)', borderRight: '2px solid rgba(246,242,234,0.45)', borderRadius: '0 6px 0 0', zIndex: 8 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '6%', width: '48px', height: '48px', borderBottom: '2px solid rgba(246,242,234,0.4)', borderLeft: '2px solid rgba(246,242,234,0.4)', borderRadius: '0 0 0 6px', zIndex: 8 }} />

          {/* Photo with a slow cinematic push-in */}
          <div data-portrait style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            opacity: phase >= 2 ? 1 : 0,
            transition: 'opacity 0.8s ease 0.4s',
            zIndex: 4,
          }}>
            <SmoothImage
              src={PHOTO_URL}
              alt="גלעד ברונשטיין"
              duration={900}
              style={{
                height: '97%', width: 'auto', maxWidth: '100%',
                objectFit: 'cover', objectPosition: 'top center',
                filter: 'brightness(0.92) contrast(1.08) saturate(0.9)',
                // Soft edges on all four sides, so the photo's black backdrop
                // melts into the page instead of reading as a rectangle
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              } as React.CSSProperties}
            />
          </div>

          {/* Bottom blend only */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #060918 0%, transparent 100%)', zIndex: 6 }} />
        </div>
      </div>

      {finale && <PortraitFinale onReveal={() => setRevealed(true)} onDone={() => setFinale(false)} />}
    </SceneBase>
  );
}
