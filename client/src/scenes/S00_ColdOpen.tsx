/**
 * S00: Cold Open: The Invisible Work
 * CONFERENCE HALL EDITION: Massive typography, particle system, cinematic reveal
 * FIXED: Grid proportions adjusted so all content fits within viewport
 */
import { useEffect, useState, useRef } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';

const TOOLS = [
  { id: 'slack',    label: 'Slack',    icon: '💬', color: '#E01E5A', x: 18, y: 22 },
  { id: 'gmail',    label: 'Gmail',    icon: '📧', color: '#EA4335', x: 78, y: 14 },
  { id: 'jira',     label: 'Jira',     icon: '🎯', color: '#0052CC', x: 88, y: 58 },
  { id: 'excel',    label: 'Excel',    icon: '📊', color: '#217346', x: 72, y: 86 },
  { id: 'hris',     label: 'HRIS',     icon: '🏢', color: '#F59E0B', x: 28, y: 86 },
  { id: 'calendar', label: 'Calendar', icon: '📅', color: '#4285F4', x: 12, y: 58 },
  { id: 'drive',    label: 'Drive',    icon: '📁', color: '#34A853', x: 50, y: 8 },
];

const ACTIVITIES = [
  { time: '08:00', text: 'הודעת ברוכים הבאים נשלחה ל-Slack', color: '#E01E5A', icon: '💬' },
  { time: '08:07', text: 'משתמש חדש נוצר ב-HRIS', color: '#F59E0B', icon: '🏢' },
  { time: '08:13', text: 'הזמנה נשלחה ל-Google Calendar', color: '#4285F4', icon: '📅' },
  { time: '08:19', text: 'חוזה הועלה ל-Drive', color: '#34A853', icon: '📁' },
  { time: '08:26', text: 'Ticket נפתח ב-Jira', color: '#0052CC', icon: '🎯' },
  { time: '08:33', text: 'תיק עובד עודכן ב-Excel', color: '#217346', icon: '📊' },
  { time: '08:40', text: 'פרטי גישה נשלחו ב-Gmail', color: '#EA4335', icon: '📧' },
  { time: '08:47', text: 'קליטה הושלמה בהצלחה ✓', color: '#10B981', icon: '🎉' },
];

const STATS = [
  { value: '47', unit: 'דק׳', label: 'זמן ממוצע לקליטה', color: '#F43F5E' },
  { value: '12', unit: 'מערכות', label: 'נגיעות ידניות', color: '#F59E0B' },
  { value: '3', unit: 'ימים', label: 'עד גישה מלאה', color: '#6366F1' },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const setSize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    setSize();
    const colors = ['#6366F1', '#06B6D4', '#F59E0B', '#10B981'];
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.5 - 0.15,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.45 + 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', setSize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setSize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} />;
}

export default function S00_ColdOpen() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(-1);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  useEffect(() => {
    if (!mounted) return;
    let step = 0;
    intervalRef.current = setInterval(() => {
      setCurrentStep(step);
      setActiveNodeIdx(step % TOOLS.length);
      step++;
    }, 900);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [mounted]);

  const visibleSet = new Set<number>();
  if (currentStep >= 0) {
    const windowStart = Math.max(0, currentStep - 7);
    for (let s = windowStart; s <= currentStep; s++) {
      visibleSet.add(s % ACTIVITIES.length);
    }
  }

  return (
    <SceneBase>
      <ParticleField />
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(99,102,241,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 15% 80%, rgba(6,182,212,0.08) 0%, transparent 55%), #06060F' }} />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
      <div className="accent-line-top" />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10, width: '100%', height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr 0.9fr',
        alignItems: 'stretch',
        gap: '1.25rem',
        padding: '1.5rem 1.75rem 5.5rem',
        overflow: 'hidden',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease',
      }}>

        {/* LEFT: Headline + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', minHeight: 0 }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 0.75rem', borderRadius: '100px',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            width: 'fit-content',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F59E0B', display: 'inline-block', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', fontWeight: 700, color: '#FCD34D', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
              יום ראשון, עובד חדש
            </span>
          </div>

          <div className="animate-fade-in-up stagger-2">
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)',
              fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.04em',
              color: 'white', margin: 0,
            }}>מה קורה</h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(3.5rem, 6.5vw, 6.5rem)',
              fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.04em',
              margin: '0.05em 0 0',
              background: 'linear-gradient(135deg, #818CF8, #6366F1, #22D3EE)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>מאחורי הקלעים?</h1>
          </div>

          <p className="animate-fade-in-up stagger-3" style={{
            color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1.2rem, 1.8vw, 1.75rem)',
            lineHeight: 1.55, fontFamily: "'Heebo', sans-serif", margin: 0,
          }}>
            כל קליטה מפעילה שרשרת פעולות ידניות, חוצת מערכות, אנשים ושעות עבודה.
          </p>

          {/* Stats - smaller numbers to fit */}
          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{
                padding: '0.875rem 1rem', borderRadius: '14px',
                background: stat.color + '0A', border: `1px solid ${stat.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(1rem, 1.4vw, 1.3rem)', fontFamily: "'Heebo', sans-serif" }}>
                  {stat.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 5.5vw, 5.5rem)', fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: '-0.04em' }}>{stat.value}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', fontWeight: 600, color: stat.color + 'BB' }}>{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            padding: '0.875rem 1rem', borderRadius: '12px',
            background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.2)',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.2rem, 1.7vw, 1.6rem)', fontFamily: "'Heebo', sans-serif", margin: 0, lineHeight: 1.5 }}>
              מה אם <span style={{ color: '#FB7185', fontWeight: 700 }}>כל זה קרה אוטומטית</span>, בלי מגע אנושי?
            </p>
          </div>
        </div>

        {/* CENTER: Network Visualization */}
        <div className="animate-scale-in stagger-2" style={{ minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            width: '100%', flexGrow: 1, minHeight: '300px', borderRadius: '24px',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {TOOLS.map((tool, i) => (
                <line key={tool.id} x1="50%" y1="50%" x2={`${tool.x}%`} y2={`${tool.y}%`}
                  stroke={activeNodeIdx === i ? tool.color : 'rgba(255,255,255,0.06)'}
                  strokeWidth={activeNodeIdx === i ? 2 : 1}
                  strokeDasharray={activeNodeIdx === i ? '0' : '4 6'}
                  style={{ transition: 'all 0.35s ease' }}
                />
              ))}
            </svg>

            {/* HR Hub */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) translateY(-4%)', zIndex: 10 }}>
              <div style={{
                width: 'clamp(65px, 8vw, 85px)', height: 'clamp(65px, 8vw, 85px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.12) 100%)',
                border: '2px solid rgba(99,102,241,0.55)',
                boxShadow: '0 0 40px rgba(99,102,241,0.45), 0 0 80px rgba(99,102,241,0.15)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                animation: 'breathe 3s ease-in-out infinite',
              }}>
                <span style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)' }}>👤</span>
                <span style={{ fontSize: 'clamp(1rem, 1.1vw, 1rem)', color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>HR</span>
              </div>
              {[0, 1].map((r) => (
                <div key={r} style={{
                  position: 'absolute', inset: `${-10 - r * 16}px`, borderRadius: '50%',
                  border: '1px solid rgba(99,102,241,0.15)',
                  animation: `ripple 2.5s ease-out ${r * 0.7}s infinite`,
                }} />
              ))}
            </div>

            {/* Tool nodes */}
            {TOOLS.map((tool, i) => {
              const isActive = activeNodeIdx === i;
              return (
                <div key={tool.id} style={{
                  position: 'absolute', left: `${tool.x}%`, top: `${tool.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.18 : 1})`,
                  transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)', zIndex: 5,
                }}>
                  <div style={{
                    width: 'clamp(48px, 6.5vw, 64px)', height: 'clamp(48px, 6.5vw, 64px)',
                    borderRadius: '14px',
                    background: isActive ? tool.color + '22' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? tool.color + '55' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isActive ? `0 0 24px ${tool.color}50` : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                    transition: 'all 0.3s ease', backdropFilter: 'blur(8px)',
                  }}>
                    <span style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', lineHeight: 1 }}>{tool.icon}</span>
                    <span style={{ fontSize: 'clamp(1rem, 1vw, 0.95rem)', color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{tool.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Activity Feed */}
        <div className="animate-fade-in stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: 0, height: '100%', overflow: 'hidden', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexShrink: 0 }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 'clamp(1rem, 1.1vw, 1rem)', fontWeight: 700, color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>LIVE ACTIVITY</span>
          </div>

          {ACTIVITIES.map((activity, i) => {
            const isVisible = visibleSet.has(i);
            return (
              <div key={i} style={{
                padding: '0.625rem 0.75rem', borderRadius: '10px',
                background: isVisible ? activity.color + '0D' : 'transparent',
                border: `1px solid ${isVisible ? activity.color + '28' : 'transparent'}`,
                opacity: isVisible ? 1 : 0.12,
                transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
                transition: 'all 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 'clamp(1rem, 1.1vw, 1rem)', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{activity.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 'clamp(1rem, 1.1vw, 1rem)', color: activity.color, fontWeight: 600, marginBottom: '2px' }}>{activity.time}</div>
                  <div style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', fontFamily: "'Heebo', sans-serif", lineHeight: 1.35 }}>{activity.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneBase>
  );
}
