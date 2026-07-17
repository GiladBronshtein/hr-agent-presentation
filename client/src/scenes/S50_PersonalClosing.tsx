/**
 * S50: Personal Closing Slide
 * Gilad Bronshtein: LinkedIn QR Code: Conference Hall Edition
 */
import { useEffect, useState, useRef } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const PHOTO_URL = '/manus-storage/New_GiladBronshtein_2026_a528545e.webp';
const QR_URL = '/manus-storage/linkedin-qr-v2_f6905911.png';
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
      t += 0.003;
      const g1 = ctx.createRadialGradient(
        canvas.width * (0.25 + 0.12 * Math.sin(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.cos(t * 0.5)),
        0,
        canvas.width * (0.25 + 0.12 * Math.sin(t * 0.7)), canvas.height * (0.45 + 0.08 * Math.cos(t * 0.5)),
        canvas.width * 0.5
      );
      g1.addColorStop(0, `rgba(99,102,241,${0.16 + 0.05 * Math.sin(t)})`);
      g1.addColorStop(0.5, `rgba(99,102,241,${0.06 + 0.02 * Math.sin(t)})`);
      g1.addColorStop(1, 'rgba(99,102,241,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const g2 = ctx.createRadialGradient(
        canvas.width * (0.75 + 0.08 * Math.cos(t * 0.6)), canvas.height * (0.55 + 0.1 * Math.sin(t * 0.8)),
        0,
        canvas.width * (0.75 + 0.08 * Math.cos(t * 0.6)), canvas.height * (0.55 + 0.1 * Math.sin(t * 0.8)),
        canvas.width * 0.4
      );
      g2.addColorStop(0, `rgba(6,182,212,${0.1 + 0.04 * Math.cos(t * 1.1)})`);
      g2.addColorStop(0.5, `rgba(6,182,212,${0.04 + 0.02 * Math.cos(t)})`);
      g2.addColorStop(1, 'rgba(6,182,212,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const g3 = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * (0.9 + 0.04 * Math.sin(t * 0.4)),
        0,
        canvas.width * 0.5, canvas.height * (0.9 + 0.04 * Math.sin(t * 0.4)),
        canvas.width * 0.3
      );
      g3.addColorStop(0, `rgba(245,158,11,${0.06 + 0.02 * Math.sin(t * 0.9)})`);
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

export default function S50_PersonalClosing() {
  const [mounted, setMounted] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 120);
    const t2 = setTimeout(() => setShowQR(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SceneBase>
      <AuroraBackground />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#03030A' }} />
      <div className="noise-overlay" />

      {/* Top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px', zIndex: 5,
        background: 'linear-gradient(90deg, transparent 0%, #6366F1 25%, #22D3EE 55%, #F59E0B 80%, transparent 100%)',
        boxShadow: '0 0 16px rgba(99,102,241,0.4)',
      }} />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10,
        width: '100%', height: '100%',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.7s ease',
      }}>

        {/* LEFT: Text content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 4.5rem) clamp(1.5rem, 3vw, 3.5rem) 6rem clamp(2.5rem, 5vw, 5rem)',
          gap: 'clamp(1.25rem, 2.5vw, 2.5rem)',
        }}>

          {/* Thank you badge */}
          <div className="animate-fade-in-up stagger-1">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 1rem', borderRadius: '100px',
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.22)',
              marginBottom: 'clamp(0.75rem, 1.5vw, 1.5rem)',
            }}>
              <span style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)' }}>✨</span>
              <span style={{ fontSize: 'clamp(1rem, 1.35vw, 1.25rem)', fontWeight: 700, color: '#FCD34D', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
                תודה שהייתם כאן
              </span>
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
              color: 'white', margin: 0,
            }}>
              גלעד
            </h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
              fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.05em',
              margin: '0.05em 0 0',
              background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 40%, #22D3EE 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.45))',
            }}>
              ברונשטיין
            </h1>
          </div>

          {/* Role */}
          <div className="animate-fade-in-up stagger-3">
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(1rem, 1.7vw, 1.4rem)',
              color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4,
            }}>
              Professional Services and Ops Team Lead at Rise
            </p>
            <p style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)',
              color: 'rgba(255,255,255,0.3)', margin: '0.35rem 0 0',
            }}>
              עוזר ארגונים לעבור מאוטומציה לאייג׳נטים
            </p>
          </div>

          {/* QR Code section */}
          <div className="animate-fade-in-up stagger-5" style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)',
            padding: 'clamp(1rem, 1.8vw, 1.75rem)',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
            opacity: showQR ? 1 : 0,
            transform: showQR ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.23,1,0.32,1)',
          }}>
            {/* QR Code with white background */}
            <div style={{
              width: 'clamp(90px, 12vw, 130px)',
              height: 'clamp(90px, 12vw, 130px)',
              borderRadius: '14px',
              overflow: 'hidden',
              background: 'white',
              padding: '6px',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.3), 0 0 24px rgba(99,102,241,0.2)',
              flexShrink: 0,
            }}>
              <img
                src={QR_URL}
                alt="QR code to LinkedIn profile"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                onError={(e) => {
                  // Fallback: show LinkedIn URL text if image fails
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div style={{
                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', fontWeight: 700,
                color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: '0.1em', marginBottom: '0.4rem', textTransform: 'uppercase',
              }}>סרקו להתחבר</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
                fontWeight: 700, color: '#818CF8',
              }}>LinkedIn</div>
              <div style={{
                fontFamily: "'Heebo', sans-serif",
                fontSize: 'clamp(1.05rem, 1.4vw, 1.3rem)',
                color: 'rgba(255,255,255,0.35)', marginTop: '2px',
              }}>
                /in/giladbronshtein
              </div>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  marginTop: 'clamp(0.5rem, 0.8vw, 0.75rem)',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '8px',
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.22)',
                  color: '#818CF8',
                  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background 180ms ease',
                }}
              >
                שאלות? נשמח לדבר
              </a>
            </div>
          </div>

          {/* Key takeaway */}
          <div className="animate-fade-in stagger-7" style={{
            padding: 'clamp(0.875rem, 1.4vw, 1.2rem) clamp(1.1rem, 1.8vw, 1.6rem)',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.07), rgba(6,182,212,0.05))',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            <p style={{
              margin: 0, fontFamily: "'Heebo', sans-serif",
              fontSize: 'clamp(0.875rem, 1.3vw, 1.15rem)',
              color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
            }}>
              <span style={{ color: '#22D3EE', fontWeight: 700 }}>הצעד הראשון:</span>{' '}
              בחרו תהליך אחד שמתחיל ב"מישהו צריך לזכור" ובנו שם את האייג׳נט הראשון שלכם.
            </p>
          </div>
        </div>

        {/* RIGHT: Photo with cinematic framing */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}>
          {/* Decorative frame lines */}
          <div style={{
            position: 'absolute', top: '8%', right: '8%',
            width: '40px', height: '40px',
            borderTop: '2px solid rgba(99,102,241,0.4)',
            borderRight: '2px solid rgba(99,102,241,0.4)',
            zIndex: 4, borderRadius: '0 4px 0 0',
          }} />
          <div style={{
            position: 'absolute', bottom: '12%', left: '8%',
            width: '40px', height: '40px',
            borderBottom: '2px solid rgba(34,211,238,0.35)',
            borderLeft: '2px solid rgba(34,211,238,0.35)',
            zIndex: 4, borderRadius: '0 0 0 4px',
          }} />

          {/* Glow behind photo */}
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '90%', height: '70%',
            background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.18) 0%, transparent 65%)',
            pointerEvents: 'none', zIndex: 2,
          }} />

          {/* Photo */}
          <div className="animate-fade-in-up stagger-2" style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}>
            <img
              src={PHOTO_URL}
              alt="גלעד ברונשטיין"
              style={{
                height: '96%', width: 'auto',
                objectFit: 'cover', objectPosition: 'top center',
                filter: 'brightness(0.9) contrast(1.06) saturate(0.95)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 88%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 88%, transparent 100%)',
              }}
            />
          </div>

          {/* Side gradient to blend into left panel */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '30px',
            background: 'linear-gradient(to right, transparent, #03030A)',
            zIndex: 3,
          }} />

          {/* Bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '100px',
            background: 'linear-gradient(to top, #03030A 0%, transparent 100%)',
            zIndex: 3,
          }} />
        </div>
      </div>

      {/* Bottom LinkedIn URL bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '4rem', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(to top, rgba(3,3,10,0.95) 0%, transparent 100%)',
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.18)',
          fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.05em',
        }}>
          linkedin.com/in/giladbronshtein
        </span>
      </div>
    </SceneBase>
  );
}
