import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const BLUEPRINT = [
  { step: 1, node: 'Slack Trigger', desc: 'מאזין לאזכור \u2066@LearnBot\u2069 בערוץ \u2066#learning-requests\u2069', type: 'trigger' },
  { step: 2, node: 'Extract Request', desc: 'מחלץ צוות, נושא, תאריך יעד וגודל צוות', type: 'process' },
  { step: 3, node: 'LMS Lookup', desc: 'בודק קורסים קיימים והשלמות קודמות', type: 'tool' },
  { step: 4, node: 'AI Agent', desc: 'בונה מסלול: אבחון, יחידות, תרגול וחזרה', type: 'ai' },
  { step: 5, node: 'Approval Wait', desc: 'שולח לצוות L&D, ומחכה לאישור', type: 'approval' },
  { step: 6, node: 'Execute Actions', desc: 'רישום ב-LMS, הזמנות ביומן, תזכורות', type: 'tool' },
  { step: 7, node: 'Log & Follow-up', desc: 'מתעד, ושולח חידון חזרה אחרי שבועיים', type: 'process' },
];

const TYPE_COLORS: Record<string, string> = {
  trigger: '#F2A93B',
  process: '#F2A93B',
  tool: '#F2A93B',
  ai: '#F2A93B',
  approval: '#8A93A8',
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
        <div style={{ width: '100%', maxWidth: '72rem', display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3cqh, 2.25rem)' }}>

          {/* Header */}
          <div>
            <SceneEyebrow>נספח ב׳</SceneEyebrow>
            {/* Hebrew first, so the Latin runs never lead the RTL line */}
            <SceneTitle size="md">תרשים LearnBot ב-n8n</SceneTitle>
            <SceneSubtitle>שבעה צמתים, מהבקשה ב-Slack ועד חידון החזרה</SceneSubtitle>
          </div>

          {/* Flow nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {BLUEPRINT.map((node, i) => {
              const color = TYPE_COLORS[node.type];
              return (
                <div key={i} className="mo-in-start" style={{
                  animationDelay: `${0.2 + i * 0.05}s`,
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: 'clamp(0.6rem, 1.1cqh, 0.9rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  borderRadius: '14px',
                  background: color + '0A',
                  border: `1px solid ${color}22`,
                }}>
                  {/* Step number */}
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: color + '18', color: textTint(color), fontSize: 'clamp(1rem,1.15cqw,1.375rem)',
                    fontWeight: 800, flexShrink: 0, border: `1px solid ${color}40`, fontFamily: "'Heebo', sans-serif",
                  }}>
                    {node.step}
                  </div>

                  {/* Node name */}
                  <div style={{ flex: '0 0 auto', minWidth: 'clamp(11rem, 14cqw, 16rem)' }}>
                    <span style={{ color: 'rgba(243,238,228,0.92)', fontSize: 'clamp(1.15rem,1.46cqw,1.75rem)', fontWeight: 700, fontFamily: "'Space Grotesk', 'Heebo', sans-serif", whiteSpace: 'nowrap' }}>
                      {node.node}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'rgba(243,238,228,0.75)', fontSize: 'clamp(1.1rem,1.35cqw,1.6rem)' }}>
                      {node.desc}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div style={{
                    padding: '0.25rem 0.75rem', borderRadius: '8px',
                    background: color + '18', color: textTint(color), border: `1px solid ${color}40`,
                    fontSize: 'clamp(1rem,1.05cqw,1.25rem)', fontWeight: 600,
                    fontFamily: "'Space Grotesk', 'Heebo', sans-serif", flexShrink: 0,
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
            background: 'rgba(243,238,228,0.03)', border: '1px solid rgba(243,238,228,0.07)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(243,238,228,0.72)', fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)', margin: 0 }}>
              אותו היגיון מתאים גם ל-Make או ל-Power Automate. מחליפים כלי, לא תהליך.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
