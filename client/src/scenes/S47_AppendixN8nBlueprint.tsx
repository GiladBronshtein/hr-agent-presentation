import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { PALETTE, alpha } from '../lib/palette';


/** Real n8n node types, in run order. Step 4 is the branch the simple flow
 * used to show: if a fitting course exists, the requester gets a link and
 * nothing new is built. */
const BLUEPRINT = [
  { step: 1, node: 'Slack Trigger', desc: 'מופעל כשמזכירים את \u2066@LearnBot\u2069 בערוץ הבקשות', type: 'trigger', source: 'n8n-slack-trigger-2026' },
  { step: 2, node: 'Information Extractor', desc: 'מחלץ מהבקשה: צוות, נושא, מועד יעד וגודל', type: 'ai', source: 'n8n-info-extractor-2026' },
  { step: 3, node: 'HTTP Request', desc: 'בודק ב-LMS קורסים קיימים ומי כבר השלים מה', type: 'tool', source: 'n8n-http-request-2026' },
  { step: 4, node: 'If', desc: 'יש קורס מתאים? שולחים קישור למבקש, ועוצרים', type: 'process', source: 'n8n-if-2026' },
  { step: 5, node: 'AI Agent', desc: 'אין? בונה טיוטת מסלול: אבחון, יחידות, תרגול וחזרה', type: 'ai', source: 'n8n-ai-agent-2026' },
  { step: 6, node: 'Slack: Send and Wait', desc: 'שולח לצוות L&D, ומחכה לאישור בתוך Slack', type: 'approval', source: 'n8n-slack-approval-2026' },
  { step: 7, node: 'HTTP Request + Calendar', desc: 'רישום ב-LMS, זימונים ביומן ותזכורות', type: 'tool', source: 'n8n-google-calendar-2026' },
  { step: 8, node: 'Wait', desc: 'שבועיים אחר כך: חידון חזרה, ותיעוד של הכול', type: 'process', source: 'n8n-wait-2026' },
];

// n8n node families, one spectrum color each; approval is the human amber
const TYPE_COLORS: Record<string, string> = {
  trigger: PALETTE.teal,
  process: PALETTE.blue,
  tool: PALETTE.coral,
  ai: PALETTE.violet,
  approval: PALETTE.amber,
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
        <div style={{ width: '100%', maxWidth: '84rem', display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 2.6cqh, 2rem)' }}>

          {/* Header */}
          <div>
            <SceneEyebrow>נספח ב׳</SceneEyebrow>
            {/* Hebrew first, so the Latin runs never lead the RTL line */}
            <SceneTitle size="md">תרשים LearnBot ב-n8n</SceneTitle>
            <SceneSubtitle>שמונה צמתים, מהבקשה ב-Slack ועד חידון החזרה. קודם בודקים מה כבר קיים</SceneSubtitle>
          </div>

          {/* Flow nodes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem, 0.9cqh, 0.75rem)' }}>
            {BLUEPRINT.map((node, i) => {
              const color = TYPE_COLORS[node.type];
              return (
                <div key={i} className="mo-in-start" style={{
                  animationDelay: `${0.2 + i * 0.05}s`,
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: 'clamp(0.6rem, 1.1cqh, 0.9rem) clamp(1rem, 1.4cqw, 1.5rem)',
                  borderRadius: '14px',
                  background: `linear-gradient(270deg, ${alpha(color, 0.12)}, ${alpha(color, 0.02)} 50%), rgba(12,17,50,0.62)`,
                  border: `1px solid ${alpha(color, 0.3)}`,
                  boxShadow: node.type === 'approval' ? `0 0 34px -14px ${color}` : 'none',
                  position: 'relative',
                }}>
                  {/* connector to the next node: a short glowing stem in the flow color */}
                  {i < BLUEPRINT.length - 1 && (
                    <span aria-hidden style={{ position: 'absolute', right: 'calc(clamp(1rem, 1.4cqw, 1.5rem) + 1.25rem - 1px)', top: '100%', height: 'clamp(0.4rem, 0.9cqh, 0.75rem)', width: 2, background: `linear-gradient(180deg, ${color}, ${TYPE_COLORS[BLUEPRINT[i + 1].type]})`, boxShadow: `0 0 6px ${alpha(color, 0.8)}`, pointerEvents: 'none' }} />
                  )}
                  {/* Step number */}
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(160deg, ${alpha(color, 0.36)}, ${alpha(color, 0.1)})`, color: '#F6F2EA', fontSize: 'clamp(1rem,1.15cqw,1.375rem)',
                    boxShadow: `0 0 16px -4px ${alpha(color, 0.8)}`,
                    fontWeight: 800, flexShrink: 0, border: `1px solid ${alpha(color, 0.6)}`, fontFamily: "'Heebo', sans-serif",
                  }}>
                    {node.step}
                  </div>

                  {/* Node name */}
                  <div style={{ flex: '0 0 auto', minWidth: 'clamp(11rem, 14cqw, 16rem)' }}>
                    <span style={{ color: 'rgba(246,242,234,0.92)', fontSize: 'clamp(1.15rem,1.46cqw,1.75rem)', fontWeight: 700, fontFamily: "'Space Grotesk', 'Heebo', sans-serif", whiteSpace: 'nowrap' }}>
                      {node.node}
                    </span>
                  </div>

                  {/* Description */}
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'rgba(246,242,234,0.84)', fontSize: 'clamp(1.1rem,1.35cqw,1.6rem)' }}>
                      {node.desc}
                    </span>
                  </div>
                  <SourceChip id={node.source} style={{ flexShrink: 0 }} />

                  {/* Type badge */}
                  <div style={{
                    padding: '0.25rem 0.75rem', borderRadius: '8px',
                    background: alpha(color, 0.15), color: textTint(color), border: `1px solid ${alpha(color, 0.45)}`,
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
            background: 'rgba(12,17,50,0.55)', border: '1px solid rgba(246,242,234,0.1)',
            textAlign: 'center',
          }}>
            <p style={{ color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.05rem,1.15cqw,1.375rem)', margin: 0 }}>
              אותו היגיון מתאים גם ל-Make או ל-Power Automate. מחליפים כלי, לא תהליך.
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
