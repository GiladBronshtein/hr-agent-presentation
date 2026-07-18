/**
 * S34: n8n Workflow — full-canvas node graph of the agent flow,
 * with a success branch (top) and a human-notify branch (bottom).
 */
import { useState } from 'react';
import { Bell, Brain, Building2, Calendar, Mail, MessageCircle } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, TakeawayBar } from '../components/presentation/SceneBase';

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

const NODE_TRIM_X = 7; // percent clearance so edges stop at card edges

export default function S34_N8nWorkflow() {
  const [active, setActive] = useState<string | null>(null);

  const isEdgeActive = (e: { from: string; to: string }) => active === e.from || active === e.to;

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl flex flex-col" style={{ height: '100%', paddingTop: 'clamp(1rem, 2cqh, 2rem)', paddingBottom: 'clamp(3.5rem, 6cqh, 5rem)', gap: 'clamp(1rem, 2cqh, 1.75rem)' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <SceneTitle size="md">אייג׳נט פשוט ב-n8n</SceneTitle>
            <p className="text-white/60" style={{ fontSize: 'clamp(1.1rem, 1.5cqw, 1.4rem)', marginTop: '0.4rem' }}>
              זרימה אמיתית: טריגר, תכנון, ביצוע, ואישור אנושי בסוף
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden" style={{
            flexGrow: 1, minHeight: 'clamp(320px, 46cqh, 520px)',
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(99,102,241,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              {EDGES.map((edge, i) => {
                const from = NODES.find(n => n.id === edge.from)!;
                const to = NODES.find(n => n.id === edge.to)!;
                const on = isEdgeActive(edge);
                return (
                  <line key={i}
                    x1={`${from.x + NODE_TRIM_X}%`} y1={`${from.y}%`}
                    x2={`${to.x - NODE_TRIM_X}%`} y2={`${to.y}%`}
                    stroke={on ? NODES.find(n => n.id === edge.to)!.color : 'rgba(255,255,255,0.14)'}
                    strokeWidth={on ? 2.5 : 1.5}
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    style={{ animation: 'dashFlow 1.1s linear infinite', transition: 'stroke 0.3s ease' }}
                  />
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
                  <div className="interactive-card" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    animation: `fadeInUp 0.5s ease ${0.15 + i * 0.1}s both`,
                  }}>
                  <div style={{
                    width: 'clamp(64px, 6.5cqw, 92px)', height: 'clamp(64px, 6.5cqw, 92px)',
                    borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(1.6rem, 2.3cqw, 2.3rem)', color: node.color,
                    background: on ? node.color + '2E' : node.color + '14',
                    border: on ? `2px solid ${node.color}80` : `1px solid ${node.color}35`,
                    boxShadow: on ? `0 0 32px ${node.color}55` : `0 0 16px ${node.color}18`,
                    transition: 'all 0.25s ease',
                  }}>
                    <node.icon size="1em" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontWeight: 700, color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap' }}>{node.label}</div>
                    <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.85rem, 1.1cqw, 1.05rem)', color: node.color + 'BB', whiteSpace: 'nowrap' }}>{node.sub}</div>
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
