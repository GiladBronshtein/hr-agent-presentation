/**
 * S00: Cold Open: one L&D week behind the scenes
 * Editorial restyle: flat navy page, paper type, one amber accent
 * FIXED: Grid proportions adjusted so all content fits within viewport
 */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { BarChart3, Calendar, CheckCircle2, ClipboardList, GraduationCap, Mail, MessageCircle, User, Video } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';

const TOOLS = [
  { id: 'slack',    label: 'Slack',    icon: MessageCircle, color: '#E01E5A', x: 18, y: 22 },
  { id: 'gmail',    label: 'Gmail',    icon: Mail, color: '#EA4335', x: 78, y: 14 },
  { id: 'lms',      label: 'LMS',      icon: GraduationCap, color: '#F2A93B', x: 88, y: 58 },
  { id: 'excel',    label: 'Excel',    icon: BarChart3, color: '#217346', x: 72, y: 86 },
  { id: 'forms',    label: 'Forms',    icon: ClipboardList, color: '#F2A93B', x: 28, y: 86 },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: '#4285F4', x: 12, y: 58 },
  { id: 'zoom',     label: 'Zoom',     icon: Video, color: '#F3EEE4', x: 50, y: 8 },
];

const ACTIVITIES = [
  { time: 'א׳ 09:10', text: 'בקשת הדרכה הגיעה ב-Slack', color: '#E01E5A', icon: MessageCircle },
  { time: 'א׳ 14:00', text: 'ראיון עם מומחית תוכן ב-Zoom', color: '#F3EEE4', icon: Video },
  { time: 'ב׳ 10:30', text: 'הקורס הוקם ב-LMS, הצוות נרשם', color: '#F2A93B', icon: GraduationCap },
  { time: 'ב׳ 15:20', text: 'הזמנות למפגש נשלחו ב-Calendar', color: '#4285F4', icon: Calendar },
  { time: 'ג׳ 08:45', text: 'תזכורת שנייה למי שלא התחיל', color: '#EA4335', icon: Mail },
  { time: 'ד׳ 11:00', text: 'רדיפה אחרי השלמות, שוב', color: '#E01E5A', icon: MessageCircle },
  { time: 'ה׳ 13:30', text: 'טופס משוב נשלח לצוות', color: '#F2A93B', icon: ClipboardList },
  { time: 'ה׳ 16:40', text: 'דוח השלמות נבנה ב-Excel', color: '#F2A93B', icon: CheckCircle2 },
];

const STATS = [
  { value: '9', unit: 'שעות', label: 'תיאום, הקמה ומעקב', color: '#8A93A8' },
  { value: '7', unit: 'מערכות', label: 'שמחברים ידנית', color: '#F2A93B' },
  { value: '3', unit: 'תזכורות', label: 'עד שרוב הצוות מסיים', color: '#F2A93B' },
];

/** Connection lines measured against the real hub/node rectangles so they
 * stop at each card's edge with a uniform gap, whatever the card's size. */
function ConnectionLines({ activeNodeIdx }: { activeNodeIdx: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geo, setGeo] = useState<{
    hub: { x: number; y: number; r: number };
    nodes: { x: number; y: number; hw: number; hh: number }[];
  } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const box = svgRef.current?.parentElement;
      if (!box) return;
      const boxRect = box.getBoundingClientRect();
      if (boxRect.width === 0 || box.clientWidth === 0) return;
      const k = box.clientWidth / boxRect.width; // visual px -> layout px
      const hubEl = box.querySelector('[data-map-hub]');
      const nodeEls = box.querySelectorAll('[data-map-node]');
      if (!hubEl || nodeEls.length === 0) return;
      const rel = (r: DOMRect) => ({
        x: (r.left - boxRect.left + r.width / 2) * k,
        y: (r.top - boxRect.top + r.height / 2) * k,
        hw: (r.width / 2) * k,
        hh: (r.height / 2) * k,
      });
      const h = rel(hubEl.getBoundingClientRect());
      setGeo({
        hub: { x: h.x, y: h.y, r: Math.max(h.hw, h.hh) },
        nodes: Array.from(nodeEls).map((el) => rel(el.getBoundingClientRect())),
      });
    };
    measure();
    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', measure); };
  }, []);

  const GAP = 12;

  return (
    <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {geo && TOOLS.map((tool, i) => {
        const n = geo.nodes[i];
        if (!n) return null;
        const dx = n.x - geo.hub.x, dy = n.y - geo.hub.y;
        const len = Math.hypot(dx, dy);
        if (len < 1) return null;
        const ux = dx / len, uy = dy / len;
        const startTrim = geo.hub.r + GAP;
        const edge = Math.min(n.hw / Math.max(Math.abs(ux), 1e-6), n.hh / Math.max(Math.abs(uy), 1e-6));
        const endTrim = edge + GAP;
        if (len <= startTrim + endTrim) return null;
        return (
          <line key={tool.id}
            x1={geo.hub.x + ux * startTrim} y1={geo.hub.y + uy * startTrim}
            x2={n.x - ux * endTrim} y2={n.y - uy * endTrim}
            stroke={activeNodeIdx === i ? tool.color : 'rgba(243,238,228,0.06)'}
            strokeWidth={activeNodeIdx === i ? 2 : 1}
            strokeDasharray={activeNodeIdx === i ? '0' : '4 6'}
            strokeLinecap="round"
            style={{ transition: 'stroke 0.35s ease, stroke-width 0.35s ease' }}
          />
        );
      })}
    </svg>
  );
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#070B17' }} />
      <div className="noise-overlay" />

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10, width: '100%', height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr 0.9fr',
        alignItems: 'stretch',
        gap: '1.25rem',
        padding: '1.25rem 1.75rem 4.75rem',
        overflow: 'hidden',
      }}>

        {/* LEFT: Headline + Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(0.625rem, 1.2cqh, 1rem)', minHeight: 0 }}>
          <div className="animate-fade-in-up stagger-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 0.75rem', borderRadius: '100px',
            background: 'rgba(242,169,59,0.1)', border: '1px solid rgba(242,169,59,0.25)',
            width: 'fit-content',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F2A93B', display: 'inline-block' }} />
            <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: '#F2A93B', fontFamily: "'Heebo', sans-serif" }}>
              שבוע אחד, בקשת הדרכה אחת
            </span>
          </div>

          <div className="animate-fade-in-up stagger-2">
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(2.75rem, 5cqw, 5rem)',
              fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em',
              color: '#F3EEE4', margin: 0,
            }}>מה קורה</h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(2.75rem, 5cqw, 5rem)',
              fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em',
              margin: '0.05em 0 0',
              color: '#F2A93B',
            }}>מאחורי הקלעים?</h1>
          </div>

          <p className="animate-fade-in-up stagger-3" style={{
            color: 'rgba(243,238,228,0.68)', fontSize: 'clamp(1.05rem, 1.5cqw, 1.5rem)',
            lineHeight: 1.5, fontFamily: "'Heebo', sans-serif", margin: 0,
          }}>
            כל בקשת הדרכה מפעילה שרשרת של עבודה ידנית: מומחים, מערכות, תזכורות ודוחות.
          </p>

          {/* Stats - smaller numbers to fit */}
          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {STATS.map((stat, i) => (
              <div key={i} style={{
                padding: '0.625rem 1rem', borderRadius: '14px',
                background: stat.color + '0A', border: `1px solid ${stat.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ color: 'rgba(243,238,228,0.68)', fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)', fontFamily: "'Heebo', sans-serif" }}>
                  {stat.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', direction: 'ltr', justifyContent: 'flex-end', minWidth: '9.5rem', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)', fontWeight: 600, color: stat.color + 'BB' }}>{stat.unit}</span>
                  <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(2rem, 3.2cqw, 3.25rem)', fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: '-0.04em', minWidth: '2ch', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7" style={{
            padding: '0.625rem 1rem', borderRadius: '12px',
            background: 'rgba(138,147,168,0.07)', border: '1px solid rgba(138,147,168,0.2)',
          }}>
            <p style={{ color: 'rgba(243,238,228,0.7)', fontSize: 'clamp(1.05rem, 1.5cqw, 1.45rem)', fontFamily: "'Heebo', sans-serif", margin: 0, lineHeight: 1.5 }}>
              מה אם <span style={{ color: '#8A93A8', fontWeight: 700 }}>כל זה היה קורה אוטומטית</span>, בלי מגע אנושי?
            </p>
          </div>
        </div>

        {/* CENTER: Network Visualization */}
        <div className="animate-scale-in stagger-2" style={{ minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            width: '100%', flexGrow: 1, minHeight: '300px', borderRadius: '24px',
            background: 'rgba(243,238,228,0.02)', border: '1px solid rgba(243,238,228,0.06)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(243,238,228,0.07) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
            <ConnectionLines activeNodeIdx={activeNodeIdx} />

            {/* L&D Hub */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <div data-map-hub style={{
                width: 'clamp(65px, 8cqw, 85px)', height: 'clamp(65px, 8cqw, 85px)',
                borderRadius: '50%',
                background: '#0D1326',
                border: '2px solid #F2A93B',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
              }}>
                <span style={{ fontSize: 'clamp(1.3rem, 2.2cqw, 1.8rem)', display: 'inline-flex', color: '#F2A93B' }}><User size="1em" /></span>
                <span style={{ fontSize: 'clamp(1rem, 1.1cqw, 1rem)', color: '#F2A93B', fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontWeight: 700 }}>{'L&D'}</span>
              </div>
            </div>

            {/* Tool nodes */}
            {TOOLS.map((tool, i) => {
              const isActive = activeNodeIdx === i;
              return (
                <div key={tool.id} data-map-node style={{
                  position: 'absolute', left: `${tool.x}%`, top: `${tool.y}%`,
                  transform: `translate(-50%, -50%) scale(${isActive ? 1.18 : 1})`,
                  transition: 'transform 300ms cubic-bezier(0.23, 1, 0.32, 1)', zIndex: 5,
                }}>
                  <div style={{
                    minWidth: 'clamp(52px, 6.5cqw, 68px)', width: 'auto',
                    padding: 'clamp(0.4rem, 0.8cqh, 0.6rem) clamp(0.6rem, 1cqw, 0.9rem)',
                    borderRadius: '14px',
                    background: isActive ? tool.color + '22' : 'rgba(243,238,228,0.04)',
                    border: `1px solid ${isActive ? tool.color + '55' : 'rgba(243,238,228,0.08)'}`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                    transition: 'all 0.3s ease', 
                  }}>
                    <span style={{ fontSize: 'clamp(1.1rem, 1.8cqw, 1.5rem)', lineHeight: 1, display: 'inline-flex', color: isActive ? tool.color : 'rgba(243,238,228,0.7)', transition: 'color 0.3s ease' }}><tool.icon size="1em" /></span>
                    <span style={{ fontSize: 'clamp(1rem, 1cqw, 0.95rem)', color: isActive ? 'rgba(243,238,228,0.9)' : 'rgba(243,238,228,0.55)', fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontWeight: 600 }}>{tool.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Activity Feed */}
        <div className="animate-fade-in stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: 0, height: '100%', overflow: 'hidden', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexShrink: 0 }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#F2A93B' }} />
            <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(243,238,228,0.62)', fontFamily: "'Heebo', sans-serif" }}>השבוע שלנו, צעד אחר צעד</span>
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
                <span style={{ fontSize: 'clamp(1rem, 1.1cqw, 1rem)', lineHeight: 1, flexShrink: 0, marginTop: '2px', display: 'inline-flex', color: activity.color }}><activity.icon size="1em" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1.1cqw, 1rem)', color: activity.color, fontWeight: 600, marginBottom: '2px' }}>{activity.time}</div>
                  <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)', color: 'rgba(243,238,228,0.7)', fontFamily: "'Heebo', sans-serif", lineHeight: 1.35 }}>{activity.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneBase>
  );
}
