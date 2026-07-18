/**
 * S50: Personal Closing Slide — WOW Edition
 * Gilad Bronshtein | HR Leaders Summit 2026
 * Full-bleed cinematic layout with generated portrait + LinkedIn QR
 */
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { useDecorativeCanvas } from '../hooks/useDecorativeCanvas';

import { PHOTO_URL, QR_URL } from '../lib/mediaAssets';
import { usePresentationStore } from '../store/presentationStore';
import { SmoothImage } from '../components/SmoothImage';
const LINKEDIN_URL = 'https://www.linkedin.com/in/giladbronshtein/';

const setupClosingParticles = (canvas: HTMLCanvasElement) => {
  const particles = Array.from({ length: 55 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.4,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    alpha: Math.random() * 0.35 + 0.08,
  }));
  return (ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, { dt }: { dt: number }) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    const step = dt * 60; // velocities tuned for 60fps
    for (const p of particles) {
      p.x += p.vx * step; p.y += p.vy * step;
      if (p.x < 0) p.x = cnv.width;
      if (p.x > cnv.width) p.x = 0;
      if (p.y < 0) p.y = cnv.height;
      if (p.y > cnv.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(130,140,255,${p.alpha})`;
      ctx.fill();
    }
  };
};

function ParticleField() {
  const canvasRef = useDecorativeCanvas(setupClosingParticles);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

const setupAuroraBlobs = (_canvas: HTMLCanvasElement) => {
  return (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, { t: seconds }: { t: number }) => {
    const t = seconds * 0.24; // original: 0.004/frame at 60fps
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Indigo blob left
      const g1 = ctx.createRadialGradient(
        canvas.width * (0.2 + 0.07 * Math.sin(t * 0.8)), canvas.height * (0.5 + 0.06 * Math.cos(t * 0.6)),
        0,
        canvas.width * (0.2 + 0.07 * Math.sin(t * 0.8)), canvas.height * (0.5 + 0.06 * Math.cos(t * 0.6)),
        canvas.width * 0.45
      );
      g1.addColorStop(0, `rgba(99,102,241,${0.14 + 0.04 * Math.sin(t)})`);
      g1.addColorStop(0.6, `rgba(99,102,241,${0.04})`);
      g1.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Cyan blob right
      const g2 = ctx.createRadialGradient(
        canvas.width * (0.78 + 0.06 * Math.cos(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.sin(t * 0.9)),
        0,
        canvas.width * (0.78 + 0.06 * Math.cos(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.sin(t * 0.9)),
        canvas.width * 0.38
      );
      g2.addColorStop(0, `rgba(6,182,212,${0.09 + 0.03 * Math.cos(t * 1.1)})`);
      g2.addColorStop(0.6, 'rgba(6,182,212,0.02)');
      g2.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Gold bottom
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * (0.88 + 0.03 * Math.sin(t * 0.5)),
        0,
        canvas.width * 0.5, canvas.height * (0.88 + 0.03 * Math.sin(t * 0.5)),
        canvas.width * 0.28
      );
      g3.addColorStop(0, `rgba(245,158,11,${0.07 + 0.02 * Math.sin(t * 0.7)})`);
      g3.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = g3; ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };
};

function AuroraBlobs() {
  const canvasRef = useDecorativeCanvas(setupAuroraBlobs, 24);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />;
}

const AUDIENCE_LABELS: Record<string, string> = {
  coordination: 'תיאומים ותזכורות',
  writing: 'כתיבה חוזרת',
  'data-entry': 'הזנת נתונים',
  searching: 'חיפוש מידע',
  approvals: 'מעקב אחר אישורים',
  onboarding: 'קליטת עובדים',
  reporting: 'הכנת דוחות',
  scheduling: 'תיאום פגישות',
};

export default function S50_PersonalClosing() {
  const [phase, setPhase] = useState(0);
  const { audienceSelections } = usePresentationStore();

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <SceneBase>
      {/* Deep space background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, #0A0A1A 0%, #03030A 60%)', zIndex: 0 }} />
      <AuroraBlobs />
      <ParticleField />

      {/* Top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', zIndex: 10,
        background: 'linear-gradient(90deg, transparent 0%, #6366F1 20%, #22D3EE 50%, #F59E0B 80%, transparent 100%)',
        boxShadow: '0 0 20px rgba(99,102,241,0.5)',
      }} />

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
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2.5rem,5cqw,5.5rem) clamp(1.5rem,3cqw,3rem) clamp(2.5rem,5cqw,5.5rem) clamp(3rem,6cqw,6.5rem)',
          gap: 'clamp(1.5rem,3cqw,3rem)',
        }}>

          {/* Thank-you pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.45rem 1.1rem', borderRadius: '100px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            width: 'fit-content',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s',
          }}>
            <span style={{ fontSize: 'clamp(1rem,1.3cqw,1.2rem)', display: 'inline-flex', color: '#FCD34D' }}><Sparkles size="1em" /></span>
            <span style={{ fontSize: 'clamp(0.95rem,1.25cqw,1.15rem)', fontWeight: 700, color: '#FCD34D', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}>
              תודה שהייתם כאן
            </span>
          </div>

          {/* Name block */}
          <div style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.2s',
          }}>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(4rem,10cqw,9.5rem)',
              fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em',
              color: 'white', margin: 0,
              textShadow: '0 0 60px rgba(99,102,241,0.25)',
            }}>
              גלעד
            </h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(4rem,10cqw,9.5rem)',
              fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.04em',
              margin: '0.04em 0 0',
              background: 'linear-gradient(130deg, #818CF8 0%, #6366F1 30%, #22D3EE 55%, #67E8F9 75%, #818CF8 100%)',
              backgroundSize: '220% 100%',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 35px rgba(99,102,241,0.5))',
              animation: 'gradientShift 7s ease-in-out infinite',
            }}>
              ברונשטיין
            </h1>
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
              color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.35, fontWeight: 500,
            }}>
              Professional Services and Ops Team Lead at Rise
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem,1.4cqw,1.25rem)',
              color: 'rgba(255,255,255,0.42)', margin: '0.4rem 0 0', lineHeight: 1.5,
            }}>
              מנהל טכנולוגי שמחבר בין אנשים, דאטה ו-AI<br />והופך מורכבות לתוצאות ברורות.
            </p>
          </div>

          {/* QR + LinkedIn */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1rem,2cqw,2rem)',
            padding: 'clamp(1rem,1.8cqw,1.75rem)',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.5s',
            width: 'fit-content',
          }}>
            {/* QR code */}
            <div style={{
              width: 'clamp(90px,12cqw,130px)', height: 'clamp(90px,12cqw,130px)',
              borderRadius: '14px', overflow: 'hidden', background: 'white',
              padding: '6px', flexShrink: 0, position: 'relative',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.35), 0 0 28px rgba(99,102,241,0.25)',
              animation: 'winnerGlow 3s ease-in-out infinite',
            }}>
              <SmoothImage src={QR_URL} alt="QR code to LinkedIn" shimmer style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 'clamp(0.85rem,1.1cqw,1rem)', fontWeight: 700, color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                סרקו להתחבר
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem,1.3cqw,1.2rem)', fontWeight: 700, color: '#818CF8' }}>
                LinkedIn
              </div>
              <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.95rem,1.2cqw,1.1rem)', color: 'rgba(255,255,255,0.55)', marginTop: '2px' }}>
                /in/giladbronshtein
              </div>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                marginTop: 'clamp(0.4rem,0.7cqw,0.65rem)',
                padding: '0.3rem 0.75rem', borderRadius: '8px',
                background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.25)',
                color: '#818CF8', fontSize: 'clamp(0.9rem,1.1cqw,1rem)',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, textDecoration: 'none',
              }}>
                שאלות? אשמח לדבר →
              </a>
            </div>
          </div>

          {/* Audience payoff: what they chose at the start comes back at the end */}
          {audienceSelections.length > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem',
              opacity: phase >= 3 ? 1 : 0,
              transition: 'opacity 0.5s ease 0.6s',
            }}>
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem,1.3cqw,1.2rem)', fontWeight: 700, color: 'rgba(255,255,255,0.72)' }}>
                התחומים שבחרתם בתחילת ההרצאה:
              </span>
              {audienceSelections.map((id) => AUDIENCE_LABELS[id] && (
                <span key={id} style={{
                  padding: '0.3rem 0.85rem', borderRadius: '100px',
                  background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.35)',
                  color: '#67E8F9', fontFamily: "'Heebo', sans-serif", fontWeight: 600,
                  fontSize: 'clamp(0.95rem,1.25cqw,1.15rem)',
                }}>
                  {AUDIENCE_LABELS[id]}
                </span>
              ))}
              <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem,1.3cqw,1.2rem)', color: 'rgba(255,255,255,0.6)' }}>
                לכל אחד מהם יש אייג׳נט שמחכה להיבנות.
              </span>
            </div>
          )}

          {/* Key takeaway */}
          <div style={{
            padding: 'clamp(0.875rem,1.4cqw,1.25rem) clamp(1.1rem,1.8cqw,1.6rem)',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.05))',
            border: '1px solid rgba(99,102,241,0.18)',
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.5s ease 0.7s',
          }}>
            <p style={{ margin: 0, fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem,1.3cqw,1.15rem)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              <span style={{ color: '#22D3EE', fontWeight: 700 }}>הצעד הראשון:</span>{' '}
              בחרו תהליך אחד שמתחיל ב"מישהו צריך לזכור" ובנו שם את האייג׳נט הראשון שלכם.
            </p>
          </div>
        </div>

        {/* ── RIGHT PANEL: Photo ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '6%', right: '6%', width: '48px', height: '48px', borderTop: '2px solid rgba(99,102,241,0.45)', borderRight: '2px solid rgba(99,102,241,0.45)', borderRadius: '0 6px 0 0', zIndex: 8 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '6%', width: '48px', height: '48px', borderBottom: '2px solid rgba(34,211,238,0.4)', borderLeft: '2px solid rgba(34,211,238,0.4)', borderRadius: '0 0 0 6px', zIndex: 8 }} />

          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '75%',
            background: 'radial-gradient(ellipse at bottom center, rgba(99,102,241,0.22) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
            pointerEvents: 'none', zIndex: 3,
          }} />

          {/* Photo */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.23,1,0.32,1) 0.4s',
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
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            />
          </div>

          {/* Blend edges */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40px', background: 'linear-gradient(to right, transparent, #03030A)', zIndex: 6 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #03030A 0%, transparent 100%)', zIndex: 6 }} />
        </div>
      </div>

      {/* Bottom URL bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3.5rem', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(to top, rgba(3,3,10,0.9) 0%, transparent 100%)',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 'clamp(0.85rem,0.9cqw,0.9rem)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.06em' }}>
          linkedin.com/in/giladbronshtein
        </span>
      </div>
    </SceneBase>
  );
}
