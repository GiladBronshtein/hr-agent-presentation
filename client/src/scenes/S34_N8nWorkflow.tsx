import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const NODES = [
  { id: 'trigger', label: 'Slack Trigger', icon: '💬', color: '#6366F1', x: 5, y: 40 },
  { id: 'ai', label: 'AI Agent', icon: '🧠', color: '#A78BFA', x: 30, y: 40 },
  { id: 'calendar', label: 'Calendar', icon: '📅', color: '#10B981', x: 55, y: 20 },
  { id: 'email', label: 'Gmail', icon: '📧', color: '#F59E0B', x: 55, y: 60 },
  { id: 'hris', label: 'HRIS', icon: '🏢', color: '#22D3EE', x: 80, y: 40 },
  { id: 'notify', label: 'Notify HR', icon: '🔔', color: '#F43F5E', x: 80, y: 70 },
];

const EDGES = [
  { from: 'trigger', to: 'ai' },
  { from: 'ai', to: 'calendar' },
  { from: 'ai', to: 'email' },
  { from: 'calendar', to: 'hris' },
  { from: 'email', to: 'notify' },
];

export default function S34_N8nWorkflow() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <SceneTitle size="md">n8n Workflow</SceneTitle>
            <p className="text-white/40 text-sm mt-1">ויזואליזציה של זרימת האייג׳נט</p>
          </div>
          <div className="relative h-48 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg className="absolute inset-0 w-full h-full">
              {EDGES.map((edge, i) => {
                const from = NODES.find(n => n.id === edge.from)!;
                const to = NODES.find(n => n.id === edge.to)!;
                return (
                  <line key={i}
                    x1={`${from.x + 5}%`} y1={`${from.y}%`}
                    x2={`${to.x}%`} y2={`${to.y}%`}
                    stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 4"
                  />
                );
              })}
            </svg>
            {NODES.map((node) => (
              <button key={node.id}
                onClick={() => setActive(active === node.id ? null : node.id)}
                className="absolute flex flex-col items-center gap-1 transition-all duration-200"
                style={{
                  left: `${node.x}%`, top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all"
                  style={{
                    background: active === node.id ? node.color + '30' : node.color + '15',
                    border: active === node.id ? `2px solid ${node.color}60` : `1px solid ${node.color}30`,
                    boxShadow: active === node.id ? `0 0 12px ${node.color}40` : 'none',
                  }}>
                  {node.icon}
                </div>
                <span className="text-xs text-white/50 whitespace-nowrap">{node.label}</span>
              </button>
            ))}
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/50 text-sm text-center">
              n8n מאפשר בניית זרימות ויזואליות — ללא קוד, עם כלים מוכנים לחיבור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
