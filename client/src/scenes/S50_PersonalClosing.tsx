/**
 * S50: Personal Closing - cinematic finale.
 * The chaotic system constellation from slide 1 returns, calm and orbiting;
 * a giant thank-you beat, a signature-draw under the name, one glowing CTA,
 * and the audience's own slide-4 choices come full circle.
 */
import { useEffect, useState } from 'react';
import { Sparkles, MessageCircle, Mail, Calendar, Folder, Target, BarChart3, Building2, Linkedin } from 'lucide-react';
import { SceneBase, TakeawayBar } from '../components/presentation/SceneBase';
import { useDecorativeCanvas } from '../hooks/useDecorativeCanvas';

import { PHOTO_URL, QR_URL } from '../lib/mediaAssets';
import { usePresentationStore } from '../store/presentationStore';
import { SmoothImage } from '../components/SmoothImage';
import { AgentGlobe } from '../components/presentation/AgentGlobe';
const LINKEDIN_URL = 'https://www.linkedin.com/in/giladbronshtein/';

const setupClosingParticles = (canvas: HTMLCanvasElement) => {
  const particles = Array.from({ length: 85 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.2 + 0.6,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    alpha: Math.random() * 0.5 + 0.18,
  }));
  return (ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, { dt }: { dt: number }) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    const step = dt * 60;
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
    const t = seconds * 0.24;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const g1 = ctx.createRadialGradient(
      canvas.width * (0.2 + 0.07 * Math.sin(t * 0.8)), canvas.height * (0.5 + 0.06 * Math.cos(t * 0.6)), 0,
      canvas.width * (0.2 + 0.07 * Math.sin(t * 0.8)), canvas.height * (0.5 + 0.06 * Math.cos(t * 0.6)),
      canvas.width * 0.45
    );
    g1.addColorStop(0, `rgba(99,102,241,${0.14 + 0.04 * Math.sin(t)})`);
    g1.addColorStop(0.6, 'rgba(99,102,241,0.04)');
    g1.addColorStop(1, 'rgba(99,102,241,0)');
    ctx.fillStyle = g1; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const g2 = ctx.createRadialGradient(
      canvas.width * (0.78 + 0.06 * Math.cos(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.sin(t * 0.9)), 0,
      canvas.width * (0.78 + 0.06 * Math.cos(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.sin(t * 0.9)),
      canvas.width * 0.38
    );
    g2.addColorStop(0, `rgba(6,182,212,${0.09 + 0.03 * Math.cos(t * 1.1)})`);
    g2.addColorStop(0.6, 'rgba(6,182,212,0.02)');
    g2.addColorStop(1, 'rgba(6,182,212,0)');
    ctx.fillStyle = g2; ctx.fillRect(0, 0, canvas.width, canvas.height);
    const g3 = ctx.createRadialGradient(
      canvas.width * 0.5, canvas.height * (0.88 + 0.03 * Math.sin(t * 0.5)), 0,
      canvas.width * 0.5, canvas.height * (0.88 + 0.03 * Math.sin(t * 0.5)),
      canvas.width * 0.28
    );
    g3.addColorStop(0, `rgba(245,158,11,${0.07 + 0.02 * Math.sin(t * 0.7)})`);
    g3.addColorStop(1, 'rgba(245,158,11,0)');
    ctx.fillStyle = g3; ctx.fillRect(0, 0, canvas.width, canvas.height);
  };
};

function AuroraBlobs() {
  const canvasRef = useDecorativeCanvas(setupAuroraBlobs, 24);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }} />;
}

/** The slide-1 systems, back one last time - calm, faint, orbiting the story's end. */
const CONSTELLATION = [
  { icon: MessageCircle, color: '#E01E5A', x: 6,  y: 14, dur: 7 },
  { icon: Mail,          color: '#EA4335', x: 40, y: 8,  dur: 9 },
  { icon: Calendar,      color: '#4285F4', x: 3,  y: 52, dur: 8 },
  { icon: Folder,        color: '#34A853', x: 48, y: 30, dur: 10 },
  { icon: Target,        color: '#0052CC', x: 10, y: 84, dur: 9 },
  { icon: BarChart3,     color: '#217346', x: 44, y: 78, dur: 7.5 },
  { icon: Building2,     color: '#F59E0B', x: 26, y: 94, dur: 8.5 },
];

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

      {/* Slide-1 constellation, at rest */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {CONSTELLATION.map((c, i) => (
          <span key={i} style={{
            position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
            color: c.color, opacity: 0.14,
            fontSize: 'clamp(1.4rem, 2.2cqw, 2.2rem)',
            display: 'inline-flex',
            animation: `float ${c.dur}s ease-in-out ${i * 0.7}s infinite`,
          }}>
            <c.icon size="1em" strokeWidth={1.5} />
          </span>
        ))}
      </div>

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
          padding: 'clamp(2rem,4cqh,4rem) clamp(1.5rem,3cqw,3rem) clamp(4.5rem,8cqh,6rem) clamp(3rem,6cqw,6.5rem)',
          gap: 'clamp(1rem,2.2cqh,1.9rem)',
        }}>

          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            width: 'fit-content',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.05s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.05s',
          }}>
            <span style={{ fontSize: 'clamp(0.95rem,1.2cqw,1.1rem)', display: 'inline-flex', color: '#818CF8' }}><Sparkles size="1em" /></span>
            <span style={{ fontSize: 'clamp(0.9rem,1.15cqw,1.05rem)', fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.16em' }}>
              HR LEADERS SUMMIT 2026
            </span>
          </div>

          {/* Giant thank-you beat */}
          <h2 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(2.2rem,4cqw,3.8rem)',
            fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', margin: 0,
            background: 'linear-gradient(120deg, #FCD34D 0%, #F59E0B 60%, #FCD34D 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.35))',
            animation: 'gradientShift 6s ease-in-out infinite',
            opacity: phase >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease 0.15s',
          }}>
            תודה שהייתם כאן.
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
              color: 'white', margin: 0,
              textShadow: '0 0 60px rgba(99,102,241,0.25)',
            }}>
              גלעד
            </h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.6rem,9cqw,8.5rem)',
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
            {/* Signature stroke drawing itself in */}
            <svg viewBox="0 0 420 26" style={{ width: 'clamp(220px, 30cqw, 420px)', height: 'auto', marginTop: '0.6rem', display: 'block' }} aria-hidden>
              <defs>
                <linearGradient id="sigGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="60%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <path
                d="M 415 14 C 340 4, 240 22, 160 13 S 40 8, 5 16"
                fill="none" stroke="url(#sigGrad)" strokeWidth="3.5" strokeLinecap="round"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={100}
                style={{ animation: 'drawStroke 1.1s cubic-bezier(0.65, 0, 0.35, 1) 1.1s forwards' }}
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
              color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.35, fontWeight: 600,
            }}>
              Professional Services and Ops Team Lead at Rise
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem,1.4cqw,1.25rem)',
              color: 'rgba(255,255,255,0.5)', margin: '0.35rem 0 0', lineHeight: 1.5,
            }}>
              מנהל טכנולוגי שמחבר בין אנשים, דאטה ו-AI, והופך מורכבות לתוצאות ברורות.
            </p>
          </div>

          {/* Hero connect card - the one clear action */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1.1rem,2cqw,2rem)',
            padding: 'clamp(1rem,1.9cqh,1.6rem) clamp(1.2rem,2cqw,1.9rem)',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.06))',
            border: '1px solid rgba(99,102,241,0.35)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.23,1,0.32,1) 0.5s',
            width: 'fit-content',
          }}>
            <div style={{
              width: 'clamp(104px,13cqw,148px)', height: 'clamp(104px,13cqw,148px)',
              borderRadius: '16px', overflow: 'hidden', background: 'white',
              padding: '7px', flexShrink: 0, position: 'relative',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.35), 0 0 28px rgba(99,102,241,0.25)',
              animation: 'winnerGlow 3s ease-in-out infinite',
            }}>
              <SmoothImage src={QR_URL} alt="QR code to LinkedIn" shimmer style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            </div>
            <div>
              <div style={{ fontSize: 'clamp(0.85rem,1.1cqw,1rem)', fontWeight: 700, color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                סרקו להתחבר
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', color: '#818CF8', fontSize: 'clamp(1.2rem,1.6cqw,1.5rem)' }}><Linkedin size="1em" /></span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1.1rem,1.5cqw,1.4rem)', fontWeight: 700, color: 'white', direction: 'ltr' }}>
                  /in/giladbronshtein
                </span>
              </div>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="interactive-card" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                marginTop: 'clamp(0.6rem,1.1cqh,0.9rem)',
                padding: 'clamp(0.5rem,0.9cqh,0.7rem) clamp(1rem,1.7cqw,1.5rem)',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                border: '1px solid rgba(129,140,248,0.6)',
                boxShadow: '0 6px 24px rgba(99,102,241,0.4)',
                color: 'white', fontSize: 'clamp(1rem,1.3cqw,1.2rem)',
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
          ) : null}
        </div>

        {/* ── RIGHT PANEL: Photo ── */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: '6%', right: '6%', width: '48px', height: '48px', borderTop: '2px solid rgba(99,102,241,0.45)', borderRight: '2px solid rgba(99,102,241,0.45)', borderRadius: '0 6px 0 0', zIndex: 8 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '6%', width: '48px', height: '48px', borderBottom: '2px solid rgba(34,211,238,0.4)', borderLeft: '2px solid rgba(34,211,238,0.4)', borderRadius: '0 0 0 6px', zIndex: 8 }} />

          {/* 3D agent network behind the presenter: the human in front of the network */}
          <div style={{ position: 'absolute', inset: '-4% -12% 8% -12%', zIndex: 3, opacity: 0.85 }}>
            <AgentGlobe />
          </div>

          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '100%', height: '75%',
            background: 'radial-gradient(ellipse at bottom center, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)',
            pointerEvents: 'none', zIndex: 3,
          }} />

          {/* Photo with a slow cinematic push-in */}
          <div style={{
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
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)',
                transformOrigin: 'center bottom',
                animation: 'kenBurns 22s ease-in-out infinite alternate',
              }}
            />
          </div>

          {/* Bottom blend only */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top, #03030A 0%, transparent 100%)', zIndex: 6 }} />
        </div>
      </div>

      <TakeawayBar color="#F59E0B">
        <span style={{ color: '#FCD34D', fontWeight: 700 }}>הצעד הראשון:</span>{' '}
        בחרו תהליך אחד שמתחיל ב"מישהו צריך לזכור", ובנו שם את האייג׳נט הראשון שלכם.
      </TakeawayBar>
    </SceneBase>
  );
}
