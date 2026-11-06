import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { usePresentationStore } from '../store/presentationStore';

/** `id` is the agentCanvas key in the store (prefilled with the LearnBot example) */
const FIELDS = [
  { id: 'goal', label: 'מטרה', placeholder: 'מה האייג׳נט צריך להשיג?', color: '#F2A93B' },
  { id: 'trigger', label: 'טריגר', placeholder: 'מה מפעיל אותו?', color: '#F2A93B' },
  { id: 'tools', label: 'כלים', placeholder: 'לאילו מערכות הוא ניגש?', color: '#F2A93B' },
  { id: 'forbidden', label: 'גבולות', placeholder: 'מה אסור לו לעשות?', color: '#8A93A8' },
  { id: 'approvals', label: 'אישור', placeholder: 'מתי הוא עוצר לאדם?', color: '#F2A93B' },
  { id: 'metrics', label: 'הצלחה', placeholder: 'איך נדע שזה עבד?', color: '#F3EEE4' },
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
                style={{ background: field.color + '08', border: `1px solid ${field.color}20`, animationDelay: `${0.2 + i * 0.06}s` }}>
                <label className="text-3xl font-bold block mb-2" style={{ color: textTint(field.color) }}>
                  {field.label}
                </label>
                <textarea
                  value={values[field.id] || ''}
                  onChange={e => setAgentCanvasField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full text-3xl resize-none rounded-lg p-2"
                  style={{
                    background: 'rgba(243,238,228,0.04)',
                    border: '1px solid rgba(243,238,228,0.08)',
                    color: 'rgba(243,238,228,0.7)',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(243,238,228,0.04)', border: '1px solid rgba(243,238,228,0.08)' }}>
            <p className="text-white/70 text-3xl">
              {filled}/{FIELDS.length} שדות מולאו
              {filled === FIELDS.length && '. הקנבס מוכן, ואפשר להתחיל לבנות'}
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
