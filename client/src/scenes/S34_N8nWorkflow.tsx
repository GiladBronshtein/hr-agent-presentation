import { useState } from 'react';
import { Bell, Brain, Building2, Calendar, Mail, MessageCircle } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const NODES = [
  { id: 'trigger', label: 'Slack Trigger', icon: MessageCircle, color: '#6366F1', x: 5, y: 40 },
  { id: 'ai', label: 'AI Agent', icon: Brain, color: '#A78BFA', x: 30, y: 40 },
  { id: 'calendar', label: 'Calendar', icon: Calendar, color: '#10B981', x: 55, y: 20 },
  { id: 'email', label: 'Gmail', icon: Mail, color: '#F59E0B', x: 55, y: 60 },
  { id: 'hris', label: 'HRIS', icon: Building2, color: '#22D3EE', x: 80, y: 40 },
  { id: 'notify', label: 'Notify HR', icon: Bell, color: '#F43F5E', x: 80, y: 70 },
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
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">n8n Workflow</SceneTitle>
            <p className="text-white/60 text-3xl mt-1">ויזואליזציה של זרימת האייג׳נט</p>
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-3xl transition-all"
                  style={{
                    background: active === node.id ? node.color + '30' : node.color + '15',
                    border: active === node.id ? `2px solid ${node.color}60` : `1px solid ${node.color}30`,
                    boxShadow: active === node.id ? `0 0 12px ${node.color}40` : 'none',
                  }}>
                  <node.icon size="1em" />
                </div>
                <span className="text-3xl text-white/65 whitespace-nowrap">{node.label}</span>
              </button>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/65 text-3xl text-center">
              n8n מאפשר בניית זרימות ויזואליות, ללא קוד, עם כלים מוכנים לחיבור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
