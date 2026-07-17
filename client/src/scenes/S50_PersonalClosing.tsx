/**
 * S50 — Personal Closing Slide
 * Gilad Bronshtein — LinkedIn QR Code — Conference Hall Edition
 * Cinematic, personal, unforgettable
 */
import { useEffect, useState, useRef } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const PHOTO_URL = '/manus-storage/gilad-bronshtein_b4b8755e.webp';
const QR_URL = '/manus-storage/linkedin-qr_a1716e8f.png';
const LINKEDIN_URL = 'https://www.linkedin.com/in/giladbronshtein/';

function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    setSize();
    let t = 0;
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.004;
      // Aurora wave 1
      const g1 = ctx.createRadialGradient(
        canvas.width * (0.3 + 0.15 * Math.sin(t * 0.7)), canvas.height * (0.4 + 0.1 * Math.cos(t * 0.5)),
        0,
        canvas.width * (0.3 + 0.15 * Math.sin(t * 0.7)), canvas.height * (0.4 + 0.1 * Math.cos(t * 0.5)),
        canvas.width * 0.55
      );
      g1.addColorStop(0, `rgba(99,102,241,${0.18 + 0.06 * Math.sin(t)})`);
      g1.addColorStop(0.5, `rgba(99,102,241,${0.07 + 0.03 * Math.sin(t)})`);
      g1.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Aurora wave 2
      const g2 = ctx.createRadialGradient(
        canvas.width * (0.7 + 0.1 * Math.cos(t * 0.6)), canvas.height * (0.6 + 0.12 * Math.sin(t * 0.8)),
        0,
        canvas.width * (0.7 + 0.1 * Math.cos(t * 0.6)), canvas.height * (0.6 + 0.12 * Math.sin(t * 0.8)),
        canvas.width * 0.45
      );
      g2.addColorStop(0, `rgba(6,182,212,${0.12 + 0.05 * Math.cos(t * 1.1)})`);
      g2.addColorStop(0.5, `rgba(6,182,212,${0.05 + 0.02 * Math.cos(t)})`);
      g2.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Gold accent
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * (0.85 + 0.05 * Math.sin(t * 0.4)),
        0,
        canvas.width * 0.5, canvas.height * (0.85 + 0.05 * Math.sin(t * 0.4)),
        canvas.width * 0.35
      );
      g3.addColorStop(0, `rgba(245,158,11,${0.07 + 0.03 * Math.sin(t * 0.9)})`);
      g3.addColorStop(1, 'rgba(245,158,11,0)');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    setSize();
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.2, opacity: Math.random() * 0.5 + 0.1,
      twinkle: Math.random() * 0.02 + 0.005, offset: Math.random() * Math.PI * 2,
    }));
    let t = 0; let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;
      stars.forEach((s) => {
        const op = s.opacity * (0.4 + 0.6 * Math.sin(t * s.twinkle * 60 + s.offset));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`; ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

export default function S50_PersonalClosing() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 120); return () => clearTimeout(t); }, []);

  return (
    <SceneBase>
      <StarField />
      <AuroraBackground />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#03030A' }} />
      <div className="noise-overlay" />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #6366F1 25%, #22D3EE 50%, #F59E0B 75%, transparent 100%)',
        opacity: 0.9,
      }} />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}>

        {/* LEFT: Personal info + QR */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'flex-start',
          padding: 'clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem) 6rem clamp(2.5rem, 5vw, 5rem)',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
        }}>

          {/* Thank you */}
          <div className="animate-fade-in-up stagger-1">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '100px',
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
              marginBottom: 'clamp(1rem, 2vw, 2rem)',
            }}>
              <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>✨</span>
              <span style={{ fontSize: 'clamp(0.7rem, 1vw, 0.9rem)', fontWeight: 700, color: '#FCD34D', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
                תודה שהייתם כאן
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
              color: 'white', margin: 0,
            }}>
              גלעד
            </h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
              margin: '0.05em 0 0',
              background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 40%, #22D3EE 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.5))',
            }}>
              ברונשטיין
            </h1>
          </div>

          {/* Role */}
          <div className="animate-fade-in-up stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
              color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5,
            }}>
              מומחה AI Agents ואוטומציה
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(0.875rem, 1.4vw, 1.2rem)',
              color: 'rgba(255,255,255,0.35)', margin: 0,
            }}>
              עוזר ארגונים לעבור מאוטומציה לאייג׳נטים
            </p>
          </div>

          {/* QR Code section */}
          <div className="animate-fade-in-up stagger-5" style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1.25rem, 2.5vw, 2.5rem)',
            padding: 'clamp(1.25rem, 2vw, 2rem)',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
          }}>
            {/* QR Code */}
            <div style={{
              width: 'clamp(100px, 14vw, 140px)', height: 'clamp(100px, 14vw, 140px)',
              borderRadius: '16px', overflow: 'hidden',
              background: 'white', padding: '8px',
              boxShadow: '0 0 30px rgba(99,102,241,0.25), 0 0 60px rgba(99,102,241,0.1)',
              flexShrink: 0,
            }}>
              <img
                src={QR_URL}
                alt="LinkedIn QR Code"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)', fontWeight: 700,
                color: 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.1em', marginBottom: '0.5rem',
              }}>סרקו להתחבר</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(0.875rem, 1.3vw, 1.1rem)',
                fontWeight: 700, color: '#818CF8',
              }}>LinkedIn</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
                color: 'rgba(255,255,255,0.4)', marginTop: '2px',
              }}>
                /in/giladbronshtein
              </div>
              <div style={{
                marginTop: 'clamp(0.5rem, 1vw, 0.875rem)',
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              }}>
                <span style={{ fontSize: 'clamp(0.65rem, 0.85vw, 0.78rem)', color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  שאלות? נשמח לדבר
                </span>
              </div>
            </div>
          </div>

          {/* Key takeaway */}
          <div className="animate-fade-in stagger-7" style={{
            padding: 'clamp(0.875rem, 1.5vw, 1.25rem) clamp(1.25rem, 2vw, 1.75rem)',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))',
            border: '1px solid rgba(99,102,241,0.18)',
          }}>
            <p style={{
              margin: 0, fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)',
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.55,
            }}>
              <span style={{ color: '#22D3EE', fontWeight: 700 }}>הצעד הראשון:</span>{' '}
              בחרו תהליך אחד שמתחיל ב"מישהו צריך לזכור" — ובנו שם את האייג׳נט הראשון שלכם.
            </p>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          {/* Photo */}
          <div className="animate-scale-in stagger-2" style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}>
            <img
              src={PHOTO_URL}
              alt="גלעד ברונשטיין"
              style={{
                height: '95%', width: 'auto', objectFit: 'cover',
                objectPosition: 'top center',
                filter: 'brightness(0.92) contrast(1.05)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 90%, transparent 100%)',
              }}
            />
          </div>

          {/* Subtle glow behind photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: '60%',
            background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.15) 0%, transparent 70%)',
            pointerEvents: 'none', zIndex: 2,
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
            background: 'linear-gradient(to top, #03030A 0%, transparent 100%)',
            zIndex: 3,
          }} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '5rem', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(to top, rgba(3,3,10,0.9) 0%, transparent 100%)',
        padding: '0 2rem',
      }}>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            color: 'rgba(255,255,255,0.3)',
            fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
            fontFamily: "'Space Grotesk', sans-serif",
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          linkedin.com/in/giladbronshtein
        </a>
      </div>
    </SceneBase>
  );
}
