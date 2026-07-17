import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const BLUEPRINT = [
  { step: 1, node: 'Slack Trigger', desc: 'מאזין לאזכור @OnboardBot', type: 'trigger' },
  { step: 2, node: 'Extract Data', desc: 'מחלץ שם עובד, תפקיד, תאריך', type: 'process' },
  { step: 3, node: 'HRIS Lookup', desc: 'שולף פרטי עובד', type: 'tool' },
  { step: 4, node: 'AI Agent', desc: 'בונה תוכנית קליטה', type: 'ai' },
  { step: 5, node: 'Approval Wait', desc: 'שולח לאישור HR', type: 'approval' },
  { step: 6, node: 'Execute Actions', desc: 'Calendar + IT + Gmail', type: 'tool' },
  { step: 7, node: 'Log & Notify', desc: 'מתעד ומעדכן', type: 'process' },
];

const TYPE_COLORS: Record<string, string> = {
  trigger: '#6366F1',
  process: '#10B981',
  tool: '#F59E0B',
  ai: '#A78BFA',
  approval: '#F43F5E',
};

const TYPE_LABELS: Record<string, string> = {
  trigger: 'Trigger',
  process: 'Process',
  tool: 'Tool',
  ai: 'AI',
  approval: 'Approval',
};

export default function S47_AppendixN8nBlueprint() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ width: '100%', maxWidth: '72rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Header */}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(1.1rem,1.5cqw,1.4rem)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
              נספח ב׳
            </p>
            <SceneTitle size="md">n8n Blueprint — אייג׳נט קליטה</SceneTitle>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(1rem,1.4cqw,1.3rem)', marginTop: '0.5rem' }}>
              7 צמתים שמרכיבים את הזרימה המלאה
            </p>
          </div>

          {/* Flow nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {BLUEPRINT.map((node, i) => {
              const color = TYPE_COLORS[node.type];
              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: '1rem 1.5rem',
                  borderRadius: '14px',
                  background: color + '0A',
                  border: `1px solid ${color}22`,
                }}>
                  {/* Step number */}
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: color + '18', color, fontSize: 'clamp(1rem,1.3cqw,1.2rem)',
                    fontWeight: 800, flexShrink: 0, border: `1px solid ${color}30`,
                  }}>
                    {node.step}
                  </div>

                  {/* Node name */}
                  <div style={{ flex: '0 0 auto', minWidth: '11rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(1.1rem,1.5cqw,1.4rem)', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {node.node}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(1rem,1.35cqw,1.25rem)' }}>
                      {node.desc}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div style={{
                    padding: '0.25rem 0.75rem', borderRadius: '8px',
                    background: color + '15', color, border: `1px solid ${color}25`,
                    fontSize: 'clamp(0.9rem,1.1cqw,1rem)', fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0,
                  }}>
                    {TYPE_LABELS[node.type]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <div style={{
            padding: '1rem 1.5rem', borderRadius: '12px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.95rem,1.2cqw,1.1rem)', margin: 0 }}>
              Blueprint מלא זמין ב-GitHub · ייצוא ל-n8n JSON בלחיצה אחת
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
