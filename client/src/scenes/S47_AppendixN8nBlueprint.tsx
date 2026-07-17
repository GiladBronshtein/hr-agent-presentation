import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const BLUEPRINT = [
  { step: 1, node: 'Slack Trigger', desc: 'מאזין לאזכור @OnboardBot', type: 'trigger' },
  { step: 2, node: 'Extract Data', desc: 'מחלץ שם עובד, תפקיד, תאריך', type: 'process' },
  { step: 3, node: 'HRIS Lookup', desc: 'שולף פרטי עובד', type: 'tool' },
  { step: 4, node: 'AI Agent', desc: 'בונה תוכנית קליטה', type: 'ai' },
  { step: 5, node: 'Approval Wait', desc: 'שולח לאישור HR', type: 'approval' },
  { step: 6, node: 'Execute Actions', desc: 'Calendar + IT + Gmail', type: 'tool' },
  { step: 7, node: 'Log & Notify', desc: 'מתעד ומעדכן', type: 'process' },
];

const TYPE_COLORS = { trigger: '#6366F1', process: '#10B981', tool: '#F59E0B', ai: '#A78BFA', approval: '#F43F5E' };

export default function S47_AppendixN8nBlueprint() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">נספח ב׳</p>
            <SceneTitle size="md">n8n Blueprint</SceneTitle>
          </div>
          <div className="space-y-2">
            {BLUEPRINT.map((node, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: TYPE_COLORS[node.type as keyof typeof TYPE_COLORS] + '20', color: TYPE_COLORS[node.type as keyof typeof TYPE_COLORS] }}>
                  {node.step}
                </div>
                <div className="flex-1">
                  <span className="text-white/80 text-sm font-medium">{node.node}</span>
                  <span className="text-white/40 text-xs mr-2">— {node.desc}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded"
                  style={{ background: TYPE_COLORS[node.type as keyof typeof TYPE_COLORS] + '15', color: TYPE_COLORS[node.type as keyof typeof TYPE_COLORS] }}>
                  {node.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
