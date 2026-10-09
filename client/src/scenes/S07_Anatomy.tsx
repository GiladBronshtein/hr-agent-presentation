/**
 * S07: Anatomy of an Agent - radial diagram.
 * Seven components orbit a central Agent core (visually bookending the
 * cold-open system map). Clicking a component lights its spoke and opens
 * the detail card below.
 */
import { useLayoutEffect, useRef, useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { Target, BookOpen, Brain, Wrench, Database, ShieldAlert, UserCheck, Bot } from 'lucide-react';

const COMPONENTS = [
  { id: 'goal', Icon: Target, label: 'מטרה', color: '#6366F1', detail: 'הגדרה ברורה של מה צריך להשיג. "עזור ל-HR" לא מספיק. "הכן תוכנית קליטה מאושרת לפני יום ראשון", זו מטרה.', required: true },
  { id: 'context', Icon: BookOpen, label: 'הקשר', color: '#10B981', detail: 'מה האייג׳נט יודע: פרופיל תפקיד, מדריך צוות, זמינות ביומן, מדיניות ארגונית. הקשר טוב = תוצאה טובה.', required: true },
  { id: 'model', Icon: Brain, label: 'מודל', color: '#A78BFA', detail: 'מנוע ההבנה והבחירה. Claude, GPT, Gemini, כל אחד עם חוזקות שונות. הבחירה תלויה במשימה.', required: true },
  { id: 'tools', Icon: Wrench, label: 'כלים', color: '#F59E0B', detail: 'מה מותר לגעת בו: Google Docs, Calendar, Jira, Gmail. כל כלי מוגדר עם הרשאות ספציפיות.', required: true },
  { id: 'memory', Icon: Database, label: 'זיכרון', color: '#22D3EE', detail: 'מה נשמר בין פעולות: מה כבר נעשה, מה עוד חסר, מה הוחלט. בלי זיכרון, האייג׳נט מתחיל מחדש בכל פעם.', required: false },
  { id: 'limits', Icon: ShieldAlert, label: 'גבולות', color: '#F43F5E', detail: 'מה אסור: גישה לשכר, מידע רפואי, שליחה ללא אישור, שינוי נתוני HRIS. גבולות ברורים = מערכת אמינה.', required: true },
  { id: 'approval', Icon: UserCheck, label: 'אישור', color: '#34D399', detail: 'מתי לעצור לאדם: לפני שליחת מייל, יצירת אירוע, מתן הרשאה. Human-in-the-loop הוא עיצוב, לא פשרה.', required: true },
];

// Position each node on an ellipse around the center, starting at the top
const NODE_POS = COMPONENTS.map((_, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / COMPONENTS.length;
  return { x: 50 + 40 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) };
});

const SPOKE_GAP = 12;

export default function S07_Anatomy() {
  const [selected, setSelected] = useState<string | null>('goal');
  const selectedComp = COMPONENTS.find(c => c.id === selected);
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

  return (
    <SceneBase>
      <div dir="rtl" style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(1.5rem, 3cqh, 2.5rem) clamp(3rem, 6cqw, 6rem) clamp(4rem, 7cqh, 5.5rem)',
        gap: 'clamp(0.75rem, 1.6cqh, 1.25rem)',
      }}>
        {/* Header */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center', flexShrink: 0 }}>
          <p style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: 'rgba(255,255,255,0.62)', fontFamily: "'Heebo', sans-serif", marginBottom: '0.6rem' }}>
            7 רכיבים · לחיצה לפרטים
          </p>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(2.25rem, 3.1cqw, 3.75rem)',
            fontWeight: 800, letterSpacing: '-0.03em', color: 'white', margin: 0, lineHeight: 1.15,
          }}>
            אנטומיה של אייג׳נט
          </h1>
        </div>

        {/* Radial diagram */}
        <div className="animate-scale-in stagger-2" style={{ position: 'relative', flexShrink: 0, width: '100%', maxWidth: '900px', height: 'clamp(300px, 52cqh, 580px)' }}>
          <svg ref={svgRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {geo && COMPONENTS.map((comp, i) => {
              const n = geo.nodes[i];
              if (!n) return null;
              const dx = n.x - geo.hub.x, dy = n.y - geo.hub.y;
              const len = Math.hypot(dx, dy);
              if (len < 1) return null;
              const ux = dx / len, uy = dy / len;
              const startTrim = geo.hub.r + SPOKE_GAP;
              const edge = Math.min(n.hw / Math.max(Math.abs(ux), 1e-6), n.hh / Math.max(Math.abs(uy), 1e-6));
              const endTrim = edge + SPOKE_GAP;
              if (len <= startTrim + endTrim) return null;
              const on = selected === comp.id;
              const x1 = geo.hub.x + ux * startTrim, y1 = geo.hub.y + uy * startTrim;
              const x2 = n.x - ux * endTrim, y2 = n.y - uy * endTrim;
              const maskId = `s07-spoke-draw-${comp.id}`;
              return (
                <g key={comp.id}>
                  {/* Draw-in: a solid mask line sweeps hub -> node once the nodes have landed,
                      revealing the (dashed or solid) spoke underneath */}
                  <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                    <line
                      x1={x1 - ux * 3} y1={y1 - uy * 3}
                      x2={x2 + ux * 3} y2={y2 + uy * 3}
                      stroke="#fff" strokeWidth={8} strokeLinecap="butt"
                      pathLength={1}
                      className="mo-draw"
                      style={{ animationDelay: `${0.5 + i * 0.06}s` }}
                    />
                  </mask>
                  <line
                    x1={x1} y1={y1}
                    x2={x2} y2={y2}
                    stroke={on ? comp.color : 'rgba(255,255,255,0.1)'}
                    strokeWidth={on ? 2.5 : 1}
                    strokeDasharray={on ? '0' : '4 6'}
                    strokeLinecap="round"
                    mask={`url(#${maskId})`}
                    style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Center core */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
            <div data-map-hub style={{
              width: 'clamp(84px, 8cqw, 120px)', height: 'clamp(84px, 8cqw, 120px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.1) 100%)',
              border: '2px solid rgba(99,102,241,0.55)',
              boxShadow: '0 0 48px rgba(99,102,241,0.45)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
            }}>
              <span style={{ display: 'inline-flex', color: '#A5B4FC', fontSize: 'clamp(1.6rem, 2.4cqw, 2.2rem)' }}><Bot size="1em" /></span>
              <span style={{ fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: '#C7D2FE', fontFamily: "'Heebo', sans-serif", fontWeight: 700 }}>אייג׳נט</span>
            </div>
          </div>

          {/* Orbiting components */}
          {COMPONENTS.map((comp, i) => {
            const isSelected = selected === comp.id;
            return (
              <button
                key={comp.id}
                data-map-node
                onClick={() => setSelected(isSelected ? null : comp.id)}
                className="interactive-card"
                style={{
                  position: 'absolute',
                  left: `${NODE_POS[i].x}%`, top: `${NODE_POS[i].y}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'transparent', border: 'none', padding: 0,
                  zIndex: 6,
                }}
              >
                {/* Entrance animation lives on an inner wrapper so it can never
                    override the button's centering transform */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                  padding: 'clamp(0.625rem, 1.1cqh, 0.9rem) clamp(0.875rem, 1.4cqw, 1.25rem)',
                  borderRadius: '16px',
                  background: isSelected ? comp.color + '1F' : 'rgba(255,255,255,0.04)',
                  border: isSelected ? `1px solid ${comp.color}70` : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isSelected ? `0 0 32px ${comp.color}45` : 'none',
                  animation: `fadeInUp 0.45s ease ${0.15 + i * 0.06}s both`,
                }}>
                  <span style={{ display: 'inline-flex', color: isSelected ? comp.color : 'rgba(255,255,255,0.7)', fontSize: 'clamp(1.3rem, 1.9cqw, 1.8rem)', transition: 'color 0.25s ease' }}>
                    <comp.Icon size="1em" />
                  </span>
                  <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem, 1.35cqw, 1.6rem)', color: isSelected ? 'white' : 'rgba(255,255,255,0.8)' }}>
                    {comp.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <div className="animate-fade-in" key={selected || 'none'} style={{
          flexShrink: 0, width: '100%', maxWidth: '980px',
          height: 'clamp(96px, 15cqh, 136px)',
          overflow: 'hidden',
          padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.25rem, 2.2cqw, 2rem)',
          borderRadius: '18px',
          background: selectedComp ? selectedComp.color + '10' : 'rgba(255,255,255,0.03)',
          border: selectedComp ? `1px solid ${selectedComp.color}40` : '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: '1rem',
          animation: 'fadeIn 0.3s ease both',
        }}>
          {selectedComp ? (
            <>
              <span style={{ display: 'inline-flex', color: selectedComp.color, fontSize: 'clamp(1.8rem, 2.6cqw, 2.4rem)', flexShrink: 0 }}>
                <selectedComp.Icon size="1em" />
              </span>
              <div>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem, 1.7cqw, 1.6rem)', color: selectedComp.color, marginLeft: '0.6rem' }}>
                  {selectedComp.label}:
                </span>
                <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.1rem, 1.55cqw, 1.45rem)', color: 'rgba(255,255,255,0.82)', lineHeight: 1.55 }}>
                  {selectedComp.detail}
                </span>
              </div>
            </>
          ) : (
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(255,255,255,0.5)', margin: '0 auto' }}>
              חסר רכיב אחד? המערכת לא שלמה. גבולות ואישור הם הכי חשובים.
            </span>
          )}
        </div>
      </div>
    </SceneBase>
  );
}
