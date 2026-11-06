/**
 * S00: Cold Open: one L&D week behind the scenes
 * Spectrum: every system in the week owns one spectrum color; the hub of
 * the network breathes in the chapter light, and each active link glows.
 */
import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { BarChart3, Calendar, CheckCircle2, ClipboardList, GraduationCap, Mail, MessageCircle, User, Video } from 'lucide-react';
import { SceneBase } from '../components/presentation/SceneBase';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('cold-open');

// One spectrum color per system (text-safe tints, AA on the stage)
const SLACK = textOn(PALETTE.magenta);
const MAIL = textOn(PALETTE.coral);
const LMS = textOn(PALETTE.violet);
const SHEETS = PALETTE.teal;
const FORMS = PALETTE.amber;
const CAL = textOn(PALETTE.blue);
const ZOOM = PALETTE.paper;

const TOOLS = [
  { id: 'slack',    label: 'Slack',    icon: MessageCircle, color: SLACK, x: 18, y: 22 },
  { id: 'gmail',    label: 'Gmail',    icon: Mail, color: MAIL, x: 78, y: 14 },
  { id: 'lms',      label: 'LMS',      icon: GraduationCap, color: LMS, x: 88, y: 58 },
  { id: 'excel',    label: 'Excel',    icon: BarChart3, color: SHEETS, x: 72, y: 86 },
  { id: 'forms',    label: 'Forms',    icon: ClipboardList, color: FORMS, x: 28, y: 86 },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: CAL, x: 12, y: 58 },
  { id: 'zoom',     label: 'Zoom',     icon: Video, color: ZOOM, x: 50, y: 8 },
];

const ACTIVITIES = [
  { time: 'א׳ 09:10', text: 'בקשת הדרכה הגיעה ב-Slack', color: SLACK, icon: MessageCircle },
  { time: 'א׳ 14:00', text: 'ראיון עם מומחית תוכן ב-Zoom', color: ZOOM, icon: Video },
  { time: 'ב׳ 10:30', text: 'הקורס הוקם ב-LMS, הצוות נרשם', color: LMS, icon: GraduationCap },
  { time: 'ב׳ 15:20', text: 'הזמנות למפגש נשלחו ב-Calendar', color: CAL, icon: Calendar },
  { time: 'ג׳ 08:45', text: 'תזכורת שנייה למי שלא התחיל', color: MAIL, icon: Mail },
  { time: 'ד׳ 11:00', text: 'רדיפה אחרי השלמות, שוב', color: SLACK, icon: MessageCircle },
  { time: 'ה׳ 13:30', text: 'טופס משוב נשלח לצוות', color: FORMS, icon: ClipboardList },
  { time: 'ה׳ 16:40', text: 'דוח השלמות נבנה ב-Excel', color: SHEETS, icon: CheckCircle2 },
];

const STATS = [
  { value: '9', unit: 'שעות', label: 'תיאום, הקמה ומעקב', color: PALETTE.amber },
  { value: '7', unit: 'מערכות', label: 'שמחברים ידנית', color: textOn(PALETTE.coral) },
  { value: '3', unit: 'תזכורות', label: 'עד שרוב הצוות מסיים', color: textOn(PALETTE.magenta) },
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
            stroke={activeNodeIdx === i ? tool.color : 'rgba(246,242,234,0.1)'}
            strokeWidth={activeNodeIdx === i ? 2.5 : 1}
            strokeDasharray={activeNodeIdx === i ? '8 6' : '4 6'}
            strokeLinecap="round"
            className={activeNodeIdx === i ? 'fx-flow' : undefined}
            style={{
              transition: 'stroke 0.35s ease, stroke-width 0.35s ease',
              filter: activeNodeIdx === i ? `drop-shadow(0 0 6px ${tool.color})` : undefined,
            }}
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
          <div className="animate-fade-in-up stagger-1 fx-chip" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.3rem 0.85rem', borderRadius: '100px',
            width: 'fit-content',
          }}>
            <span className="fx-beacon" style={{ width: '7px', height: '7px', color: ACC }} />
            <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: ACC_T, fontFamily: "'Heebo', sans-serif" }}>
              שבוע אחד, בקשת הדרכה אחת
            </span>
          </div>

          <div className="animate-fade-in-up stagger-2">
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(2.75rem, 5cqw, 5rem)',
              fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em',
              color: '#F6F2EA', margin: 0,
            }}>מה קורה</h1>
            <h1 style={{
              fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
              fontSize: 'clamp(2.75rem, 5cqw, 5rem)',
              fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.04em',
              margin: '0.05em 0 0',
              color: ACC_T,
            }}><span className="fx-spectrum-text fx-shine-once">מאחורי הקלעים?</span></h1>
          </div>

          <p className="animate-fade-in-up stagger-3" style={{
            color: 'rgba(246,242,234,0.68)', fontSize: 'clamp(1.05rem, 1.5cqw, 1.5rem)',
            lineHeight: 1.5, fontFamily: "'Heebo', sans-serif", margin: 0,
          }}>
            כל בקשת הדרכה מפעילה שרשרת של עבודה ידנית: מומחים, מערכות, תזכורות ודוחות.
          </p>

          {/* Stats - smaller numbers to fit */}
          <div className="animate-fade-in-up stagger-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {STATS.map((stat, i) => (
              <div key={i} className="fx-glass" style={{
                '--fx-c': stat.color,
                padding: '0.625rem 1rem', borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              } as React.CSSProperties}>
                <span style={{ color: 'rgba(246,242,234,0.68)', fontSize: 'clamp(1rem, 1.4cqw, 1.3rem)', fontFamily: "'Heebo', sans-serif" }}>
                  {stat.label}
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', direction: 'ltr', justifyContent: 'flex-end', minWidth: '9.5rem', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.2cqw, 1.1rem)', fontWeight: 600, color: stat.color }}>{stat.unit}</span>
                  <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(2rem, 3.2cqw, 3.25rem)', fontWeight: 800, color: stat.color, lineHeight: 1, letterSpacing: '-0.04em', minWidth: '2ch', textAlign: 'right', fontVariantNumeric: 'tabular-nums', textShadow: `0 0 18px ${alpha(stat.color, 0.45)}` }}>{stat.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="animate-fade-in stagger-7 fx-accent" style={{
            padding: '0.625rem 1rem', borderRadius: '12px',
          }}>
            <p style={{ color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.05rem, 1.5cqw, 1.45rem)', fontFamily: "'Heebo', sans-serif", margin: 0, lineHeight: 1.5 }}>
              מה אם <span style={{ color: ACC_T, fontWeight: 700 }}>כל זה היה קורה אוטומטית</span>, בלי מגע אנושי?
            </p>
          </div>
        </div>

        {/* CENTER: Network Visualization */}
        <div className="animate-scale-in stagger-2" style={{ minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div className="fx-glass" style={{
            width: '100%', flexGrow: 1, minHeight: '300px', borderRadius: '24px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(246,242,234,0.09) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
            <div aria-hidden style={{ position: 'absolute', left: '50%', top: '50%', width: '70%', height: '70%', transform: 'translate(-50%, -50%)', borderRadius: '50%', background: `radial-gradient(closest-side, ${alpha(ACC, 0.22)}, transparent)`, pointerEvents: 'none' }} />
            <ConnectionLines activeNodeIdx={activeNodeIdx} />

            {/* L&D Hub */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <div data-map-hub style={{
                width: 'clamp(65px, 8cqw, 85px)', height: 'clamp(65px, 8cqw, 85px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 50% 35%, #1A2258, #0B1030 70%)',
                border: `2px solid ${ACC}`,
                boxShadow: `0 0 28px ${alpha(ACC, 0.55)}, inset 0 0 18px ${alpha(ACC, 0.25)}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                position: 'relative', color: ACC,
              }}>
                <span aria-hidden className="fx-ring" />
                <span aria-hidden className="fx-ring fx-ring-2" />
                <span style={{ fontSize: 'clamp(1.3rem, 2.2cqw, 1.8rem)', display: 'inline-flex', color: ACC_T }}><User size="1em" /></span>
                <span style={{ fontSize: 'clamp(1rem, 1.1cqw, 1rem)', color: ACC_T, fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontWeight: 700 }}>{'L&D'}</span>
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
                    background: isActive ? `linear-gradient(160deg, ${alpha(tool.color, 0.24)}, ${alpha(tool.color, 0.08)}), #0B1030` : 'rgba(11,16,48,0.7)',
                    border: `1px solid ${isActive ? alpha(tool.color, 0.6) : 'rgba(246,242,234,0.1)'}`,
                    boxShadow: isActive ? `0 0 26px -4px ${alpha(tool.color, 0.7)}` : 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3px',
                    transition: 'all 0.3s ease', 
                  }}>
                    <span style={{ fontSize: 'clamp(1.1rem, 1.8cqw, 1.5rem)', lineHeight: 1, display: 'inline-flex', color: isActive ? tool.color : 'rgba(246,242,234,0.7)', transition: 'color 0.3s ease' }}><tool.icon size="1em" /></span>
                    <span style={{ fontSize: 'clamp(1rem, 1cqw, 0.95rem)', color: isActive ? 'rgba(246,242,234,0.9)' : 'rgba(246,242,234,0.55)', fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontWeight: 600 }}>{tool.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Activity Feed */}
        <div className="animate-fade-in stagger-3" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: 0, height: '100%', overflow: 'hidden', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem', flexShrink: 0 }}>
            <span className="fx-beacon" style={{ width: '7px', height: '7px', color: ACC }} />
            <span style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(246,242,234,0.78)', fontFamily: "'Heebo', sans-serif" }}>השבוע שלנו, צעד אחר צעד</span>
          </div>

          {ACTIVITIES.map((activity, i) => {
            const isVisible = visibleSet.has(i);
            return (
              <div key={i} style={{
                padding: '0.625rem 0.75rem', borderRadius: '10px',
                background: isVisible ? `linear-gradient(270deg, ${alpha(activity.color, 0.12)}, ${alpha(activity.color, 0.03)})` : 'transparent',
                border: `1px solid ${isVisible ? alpha(activity.color, 0.3) : 'transparent'}`,
                opacity: isVisible ? 1 : 0.12,
                transform: isVisible ? 'translateX(0)' : 'translateX(-16px)',
                transition: 'all 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
                display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 'clamp(1rem, 1.1cqw, 1rem)', lineHeight: 1, flexShrink: 0, marginTop: '2px', display: 'inline-flex', color: activity.color }}><activity.icon size="1em" /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", fontSize: 'clamp(1rem, 1.1cqw, 1rem)', color: activity.color, fontWeight: 600, marginBottom: '2px' }}>{activity.time}</div>
                  <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)', color: 'rgba(246,242,234,0.82)', fontFamily: "'Heebo', sans-serif", lineHeight: 1.35 }}>{activity.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneBase>
  );
}
