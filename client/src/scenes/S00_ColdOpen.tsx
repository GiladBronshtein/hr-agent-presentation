/**
 * S00 — Cold Open: The Invisible Work
 * Design: AI-Native UI — animated workflow nodes, streaming activity feed, glassmorphic cards
 * Colors: Deep Space bg, Indigo primary, Cyan secondary, Gold accent
 * Typography: Space Grotesk headings, DM Sans body
 */
import { useEffect, useState, useRef } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { Users, CheckCircle, Zap } from 'lucide-react';

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
  { time: '08:14', text: 'הודעת ברוכים הבאים נשלחה ל-Slack', color: '#E01E5A', icon: '💬' },
  { time: '08:16', text: 'משתמש חדש נוצר ב-HRIS', color: '#F59E0B', icon: '🏢' },
  { time: '08:18', text: 'הזמנה נשלחה ל-Google Calendar', color: '#4285F4', icon: '📅' },
  { time: '08:21', text: 'חוזה הועלה ל-Drive', color: '#34A853', icon: '📁' },
  { time: '08:23', text: 'Ticket נפתח ב-Jira', color: '#0052CC', icon: '🎯' },
  { time: '08:25', text: 'תיק עובד עודכן ב-Excel', color: '#217346', icon: '📊' },
  { time: '08:27', text: 'פרטי גישה נשלחו ב-Gmail', color: '#EA4335', icon: '📧' },
  { time: '08:30', text: 'קליטה הושלמה בהצלחה ✓', color: '#10B981', icon: '🎉' },
];

const STATS = [
  { value: '47', unit: 'דק׳', label: 'זמן ממוצע לקליטה', color: '#F43F5E' },
  { value: '12', unit: 'מערכות', label: 'נגיעות ידניות', color: '#F59E0B' },
  { value: '3', unit: 'ימים', label: 'עד גישה מלאה', color: '#6366F1' },
];

export default function S00_ColdOpen() {
  const [visibleActivities, setVisibleActivities] = useState<number[]>([]);
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(-1);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      if (idx < ACTIVITIES.length) {
        setVisibleActivities((prev) => [...prev, idx]);
        setActiveNodeIdx(idx % TOOLS.length);
        idx++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setActiveNodeIdx(-1);
      }
    }, 650);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [mounted]);

  return (
    <SceneBase>
      {/* Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 25% 30%, rgba(99,102,241,0.1) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 75% 70%, rgba(8,145,178,0.08) 0%, transparent 60%), #0A0A1A',
        }}
      />
      <div className="grid-overlay" />
      <div className="noise-overlay" />
      <div className="accent-line-top" />

      <div
        dir="rtl"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: '2rem',
          padding: '3.5rem 2.5rem 5rem',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* ── Column 1: Headline + Stats ── */}
        <div style={{ flex: '0 0 300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          {/* Tag */}
          <div
            className="animate-fade-in-up stagger-1"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.3rem 0.75rem',
              borderRadius: '8px',
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              width: 'fit-content',
            }}
          >
            <Zap size={12} style={{ color: '#818CF8' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#818CF8', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.08em' }}>
              יום ראשון — עובד חדש
            </span>
          </div>

          {/* Headline */}
          <div className="animate-fade-in-up stagger-2">
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: 'white',
                margin: 0,
              }}
            >
              מה קורה
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                מאחורי הקלעים?
              </span>
            </h1>
          </div>

          <p
            className="animate-fade-in-up stagger-3"
            style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: 0 }}
          >
            כל קליטה מפעילה שרשרת פעולות ידניות — חוצת מערכות, אנשים ושעות עבודה.
          </p>

          {/* Stats */}
          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 0.875rem',
                  borderRadius: '10px',
                  background: stat.color + '0A',
                  border: `1px solid ${stat.color}1E`,
                }}
              >
                <div style={{ minWidth: '48px', textAlign: 'center' }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.375rem', fontWeight: 800, color: stat.color }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: stat.color + '99', marginRight: '2px' }}>
                    {stat.unit}
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA question */}
          <div
            className="animate-fade-in-up stagger-5"
            style={{
              padding: '0.875rem',
              borderRadius: '12px',
              background: 'rgba(99,102,241,0.07)',
              border: '1px solid rgba(99,102,241,0.18)',
            }}
          >
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: '#818CF8', fontWeight: 600 }}>מה אם</span> כל זה קרה אוטומטית — בלי מגע אנושי?
            </p>
          </div>
        </div>

        {/* ── Column 2: Network Visualization ── */}
        <div
          className="animate-scale-in stagger-2"
          style={{ flex: 1, position: 'relative', minWidth: 0 }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Dot grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(99,102,241,0.08) 1px, transparent 1px)',
                backgroundSize: '30px 30px',
                pointerEvents: 'none',
              }}
            />

            {/* SVG connection lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {TOOLS.map((tool, i) => (
                <line
                  key={tool.id}
                  x1="50%" y1="50%"
                  x2={`${tool.x}%`} y2={`${tool.y}%`}
                  stroke={activeNodeIdx === i ? tool.color : 'rgba(255,255,255,0.05)'}
                  strokeWidth={activeNodeIdx === i ? 1.5 : 1}
                  strokeDasharray={activeNodeIdx === i ? '5 3' : '3 5'}
                  style={{ transition: 'stroke 400ms ease, stroke-width 400ms ease' }}
                />
              ))}
            </svg>

            {/* Center HR node */}
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  width: '68px', height: '68px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                  border: '2px solid rgba(99,102,241,0.5)',
                  boxShadow: '0 0 28px rgba(99,102,241,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                <Users size={18} color="white" />
                <span style={{ fontSize: '0.5rem', color: 'rgba(255,255,255,0.85)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: '0.05em' }}>HR</span>
              </div>
              {/* Ripple rings */}
              {[0, 1].map((r) => (
                <div
                  key={r}
                  style={{
                    position: 'absolute',
                    inset: `${-8 - r * 14}px`,
                    borderRadius: '50%',
                    border: '1px solid rgba(99,102,241,0.15)',
                    animation: `ripple 2.5s ease-out ${r * 0.6}s infinite`,
                  }}
                />
              ))}
            </div>

            {/* Tool nodes */}
            {TOOLS.map((tool, i) => {
              const isActive = activeNodeIdx === i;
              return (
                <div
                  key={tool.id}
                  style={{
                    position: 'absolute',
                    left: `${tool.x}%`, top: `${tool.y}%`,
                    transform: `translate(-50%, -50%) scale(${isActive ? 1.12 : 1})`,
                    zIndex: 5,
                    transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <div
                    style={{
                      width: '54px', height: '54px',
                      borderRadius: '14px',
                      background: isActive ? tool.color + '20' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive ? tool.color + '55' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isActive ? `0 0 18px ${tool.color}40` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '3px',
                      transition: 'all 300ms ease',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{tool.icon}</span>
                    <span style={{ fontSize: '0.52rem', color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                      {tool.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Column 3: Activity Feed ── */}
        <div
          className="animate-fade-in stagger-3"
          style={{ flex: '0 0 240px', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.125rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'glowPulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.1em' }}>
              LIVE ACTIVITY
            </span>
          </div>

          {/* Activity items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1, overflow: 'hidden' }}>
            {ACTIVITIES.map((activity, i) => {
              const isVisible = visibleActivities.includes(i);
              return (
                <div
                  key={i}
                  style={{
                    padding: '0.5rem 0.625rem',
                    borderRadius: '9px',
                    background: isVisible ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                    border: `1px solid ${isVisible ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'}`,
                    opacity: isVisible ? 1 : 0.15,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-10px)',
                    transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.4rem',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>{activity.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.4, fontFamily: "'DM Sans', sans-serif" }}>
                      {activity.text}
                    </div>
                    <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.22)', marginTop: '2px', fontFamily: 'monospace' }}>
                      {activity.time}
                    </div>
                  </div>
                  {isVisible && (
                    <CheckCircle size={9} style={{ color: '#10B981', flexShrink: 0, marginTop: '3px' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SceneBase>
  );
}
