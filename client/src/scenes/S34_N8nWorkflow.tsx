/**
 * S34: n8n Workflow - full-canvas node graph of the agent flow,
 * with a success branch (top) and a human-notify branch (bottom).
 */
import { useLayoutEffect, useRef, useState } from 'react';
import { Bell, Brain, Building2, Calendar, Mail, MessageCircle } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, TakeawayBar } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const NODES = [
  { id: 'trigger',  label: 'Slack Trigger', sub: 'בקשה חדשה',      icon: MessageCircle, color: '#6366F1', x: 10, y: 50 },
  { id: 'ai',       label: 'AI Agent',      sub: 'תכנון והחלטה',   icon: Brain,         color: '#A78BFA', x: 32, y: 50 },
  { id: 'calendar', label: 'Calendar',      sub: 'קביעת פגישות',   icon: Calendar,      color: '#10B981', x: 55, y: 26 },
  { id: 'email',    label: 'Gmail',         sub: 'טיוטת מייל',     icon: Mail,          color: '#F59E0B', x: 55, y: 74 },
  { id: 'hris',     label: 'HRIS',          sub: 'עדכון רשומה',    icon: Building2,     color: '#22D3EE', x: 80, y: 26 },
  { id: 'notify',   label: 'Notify HR',     sub: 'אישור אנושי',    icon: Bell,          color: '#F43F5E', x: 80, y: 74 },
];

const EDGES = [
  { from: 'trigger', to: 'ai' },
  { from: 'ai', to: 'calendar' },
  { from: 'ai', to: 'email' },
  { from: 'calendar', to: 'hris' },
  { from: 'email', to: 'notify' },
];

const EDGE_GAP = 10; // px clearance between an edge's end and the node box

// Entrance timing (seconds): nodes land first, then each edge draws in flow order
const NODE_DELAY = (i: number) => 0.1 + i * 0.06;
const EDGE_DELAY: Record<string, number> = {
  'trigger-ai': 0.5,
  'ai-calendar': 0.68,
  'ai-email': 0.72,
  'calendar-hris': 0.86,
  'email-notify': 0.9,
};

export default function S34_N8nWorkflow() {
  const [active, setActive] = useState<string | null>(null);

  const isEdgeActive = (e: { from: string; to: string }) => active === e.from || active === e.to;

  // Edges are measured against the real node boxes, so every connector stops
  // the same small gap from the box edge whatever the box size.
  const canvasRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<Record<string, { x: number; y: number; hw: number; hh: number }> | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const box = canvasRef.current;
      if (!box) return;
      const r0 = box.getBoundingClientRect();
      if (!r0.width || !box.clientWidth) return;
      const k = box.clientWidth / r0.width;
      const out: Record<string, { x: number; y: number; hw: number; hh: number }> = {};
      box.querySelectorAll<HTMLElement>('[data-node-box]').forEach((el) => {
        const r = el.getBoundingClientRect();
        out[el.dataset.nodeBox!] = {
          x: (r.left - r0.left + r.width / 2) * k, y: (r.top - r0.top + r.height / 2) * k,
          hw: (r.width / 2) * k, hh: (r.height / 2) * k,
        };
      });
      setBoxes(out);
    };
    measure();
    // Nodes rise into place: measure again once the entrance has settled
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 1100);
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);

  const edgeEnds = (from: string, to: string) => {
    const a = boxes?.[from], b = boxes?.[to];
    if (!a || !b) return null;
    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    if (len < 1) return null;
    const ux = dx / len, uy = dy / len;
    const trim = (n: { hw: number; hh: number }) => Math.min(n.hw / Math.max(Math.abs(ux), 1e-6), n.hh / Math.max(Math.abs(uy), 1e-6)) + EDGE_GAP;
    const s0 = trim(a), s1 = trim(b);
    if (len <= s0 + s1) return null;
    return { x1: a.x + ux * s0, y1: a.y + uy * s0, x2: b.x - ux * s1, y2: b.y - uy * s1 };
  };

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl flex flex-col" style={{ height: '100%', paddingTop: 'clamp(1rem, 2cqh, 2rem)', paddingBottom: 'clamp(3.5rem, 6cqh, 5rem)', gap: 'clamp(1rem, 2cqh, 1.75rem)' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <SceneTitle size="md">אייג׳נט פשוט ב-n8n</SceneTitle>
            <SceneSubtitle>זרימה אמיתית: טריגר, תכנון, ביצוע ואישור אנושי בסוף</SceneSubtitle>
          </div>

          <div ref={canvasRef} className="relative rounded-3xl overflow-hidden" style={{
            flexGrow: 1, minHeight: 'clamp(320px, 46cqh, 520px)',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {EDGES.map((edge, i) => {
                const ends = edgeEnds(edge.from, edge.to);
                if (!ends) return null;
                const on = isEdgeActive(edge);
                const { x1, y1, x2, y2 } = ends;
                const maskId = `s34-edge-draw-${edge.from}-${edge.to}`;
                return (
                  <g key={i}>
                    {/* Draw-in: a solid mask line sweeps from source to target, revealing
                        the flowing dashed edge underneath */}
                    <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                      <line x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#fff" strokeWidth={8} strokeLinecap="butt"
                        pathLength={1}
                        className="mo-draw"
                        style={{ animationDelay: `${EDGE_DELAY[`${edge.from}-${edge.to}`] ?? 0.5}s` }}
                      />
                    </mask>
                    <line
                      x1={x1} y1={y1}
                      x2={x2} y2={y2}
                      stroke={on ? NODES.find(n => n.id === edge.to)!.color : 'rgba(255,255,255,0.14)'}
                      strokeWidth={on ? 2.5 : 1.5}
                      strokeDasharray="6 8"
                      strokeLinecap="round"
                      mask={`url(#${maskId})`}
                      style={{ animation: 'dashFlow 1.1s linear infinite', transition: 'stroke 0.3s ease' }}
                    />
                  </g>
                );
              })}
            </svg>

            {NODES.map((node, i) => {
              const on = active === node.id;
              return (
                <button key={node.id}
                  onClick={() => setActive(on ? null : node.id)}
                  className="absolute"
                  style={{
                    left: `${node.x}%`, top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)',
                    background: 'transparent', border: 'none', padding: 0,
                  }}>
                  <div className="interactive-card mo-rise" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    animationDelay: `${NODE_DELAY(i)}s`,
                  }}>
                  <div data-node-box={node.id} style={{
                    width: 'clamp(72px, 6.5cqw, 112px)', height: 'clamp(72px, 6.5cqw, 112px)',
                    borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(1.8rem, 2.4cqw, 2.8rem)', color: node.color,
                    background: on ? node.color + '2E' : node.color + '14',
                    border: on ? `2px solid ${node.color}80` : `1px solid ${node.color}35`,
                    boxShadow: on ? `0 0 32px ${node.color}55` : `0 0 16px ${node.color}18`,
                    transition: 'all 0.25s ease',
                  }}>
                    <node.icon size="1em" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(1.1rem, 1.3cqw, 1.6rem)', fontWeight: 700, color: 'rgba(255,255,255,0.92)', whiteSpace: 'nowrap' }}>{node.label}</div>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.1cqw, 1.35rem)', color: textTint(node.color), whiteSpace: 'nowrap' }}>{node.sub}</div>
                  </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ContentLayout>
      <TakeawayBar>
        n8n מאפשר בניית זרימות ויזואליות, <span style={{ color: '#10B981', fontWeight: 700 }}>ללא קוד</span>, עם כלים מוכנים לחיבור
      </TakeawayBar>
    </SceneBase>
  );
}
