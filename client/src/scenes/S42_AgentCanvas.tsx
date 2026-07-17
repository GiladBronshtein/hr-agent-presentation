import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const FIELDS = [
  { id: 'goal', label: 'מטרה', placeholder: 'מה האייג׳נט צריך להשיג?', color: '#6366F1' },
  { id: 'trigger', label: 'טריגר', placeholder: 'מה מפעיל אותו?', color: '#10B981' },
  { id: 'tools', label: 'כלים', placeholder: 'אילו מערכות הוא ניגש אליהן?', color: '#F59E0B' },
  { id: 'limits', label: 'גבולות', placeholder: 'מה אסור לו לעשות?', color: '#F43F5E' },
  { id: 'approval', label: 'אישור', placeholder: 'מתי עוצר לאדם?', color: '#A78BFA' },
  { id: 'success', label: 'הצלחה', placeholder: 'איך נדע שהצליח?', color: '#22D3EE' },
];

export default function S42_AgentCanvas() {
  const [values, setValues] = useState<Record<string, string>>({});

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-6">
          <div>
            <SceneTitle size="md">Agent Canvas</SceneTitle>
            <p className="text-white/40 text-sm mt-1">מלאו את הקנבס לאייג׳נט שלכם</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FIELDS.map((field) => (
              <div key={field.id} className="p-4 rounded-xl"
                style={{ background: field.color + '08', border: `1px solid ${field.color}20` }}>
                <label className="text-xs font-bold block mb-2" style={{ color: field.color }}>
                  {field.label}
                </label>
                <textarea
                  value={values[field.id] || ''}
                  onChange={e => setValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full text-sm resize-none rounded-lg p-2"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.7)',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/40 text-xs">
              {Object.values(values).filter(v => v.trim()).length}/6 שדות מולאו
              {Object.values(values).filter(v => v.trim()).length === 6 && ', הקנבס מוכן! 🎉'}
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
