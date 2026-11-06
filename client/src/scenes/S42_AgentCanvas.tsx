import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { usePresentationStore } from '../store/presentationStore';
import { PALETTE, alpha } from '../lib/palette';


/** `id` is the agentCanvas key in the store (prefilled with the LearnBot example) */
const FIELDS = [
  { id: 'goal', label: 'מטרה', placeholder: 'מה האייג׳נט צריך להשיג?', color: PALETTE.amber },
  { id: 'trigger', label: 'טריגר', placeholder: 'מה מפעיל אותו?', color: PALETTE.blue },
  { id: 'tools', label: 'כלים', placeholder: 'לאילו מערכות הוא ניגש?', color: PALETTE.coral },
  { id: 'forbidden', label: 'גבולות', placeholder: 'מה אסור לו לעשות?', color: PALETTE.magenta },
  { id: 'approvals', label: 'אישור', placeholder: 'מתי הוא עוצר לאדם?', color: PALETTE.violet },
  { id: 'metrics', label: 'הצלחה', placeholder: 'איך נדע שזה עבד?', color: PALETTE.teal },
];

export default function S42_AgentCanvas() {
  const { agentCanvas: values, setAgentCanvasField } = usePresentationStore();
  const filled = FIELDS.filter((f) => (values[f.id] || '').trim()).length;

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">קנבס האייג׳נט</SceneTitle>
            <SceneSubtitle>LearnBot, הכשרת מוצר לצוות המכירות. כל שדה פתוח לעריכה</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {FIELDS.map((field, i) => (
              <div key={field.id} className="p-6 rounded-xl mo-rise"
                style={{
                  background: `linear-gradient(165deg, ${alpha(field.color, 0.14)}, transparent 60%), rgba(12,17,50,0.64)`,
                  border: `1px solid ${alpha(field.color, (values[field.id] || '').trim() ? 0.5 : 0.24)}`,
                  boxShadow: (values[field.id] || '').trim() ? `0 0 40px -22px ${field.color}` : 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  animationDelay: `${0.2 + i * 0.06}s`,
                }}>
                <label className="text-3xl font-bold block mb-2" style={{ color: textTint(field.color), display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                  <span aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: field.color, boxShadow: `0 0 10px ${field.color}`, flexShrink: 0 }} />
                  {field.label}
                </label>
                <textarea
                  value={values[field.id] || ''}
                  onChange={e => setAgentCanvasField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full text-3xl resize-none rounded-lg p-2"
                  style={{
                    background: 'rgba(6,9,24,0.45)',
                    border: '1px solid rgba(246,242,234,0.1)',
                    color: 'rgba(246,242,234,0.86)',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl text-center fx-glass" style={{ position: 'relative', overflow: 'hidden' }}>
            <span aria-hidden style={{ position: 'absolute', bottom: 0, right: 0, height: 3, width: `${(filled / FIELDS.length) * 100}%`, background: 'linear-gradient(270deg, #4F7CFF, #9B6BFF, #F0469E, #FF7A59, #FFC24B)', boxShadow: '0 0 12px rgba(240,70,158,0.6)', transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }} />
            <p className="text-white/85 text-3xl">
              {filled}/{FIELDS.length} שדות מולאו
              {filled === FIELDS.length && '. הקנבס מוכן, ואפשר להתחיל לבנות'}
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
