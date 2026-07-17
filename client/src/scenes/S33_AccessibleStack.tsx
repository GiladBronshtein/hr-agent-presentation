import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const STACK = [
  { layer: 'ממשק', tools: ['Slack', 'Teams', 'Web App'], color: '#6366F1' },
  { layer: 'אורקסטרציה', tools: ['n8n', 'Make', 'LangChain'], color: '#10B981' },
  { layer: 'מודל', tools: ['Claude', 'GPT-4', 'Gemini'], color: '#A78BFA' },
  { layer: 'כלים', tools: ['Calendar API', 'HRIS API', 'Gmail API'], color: '#F59E0B' },
  { layer: 'זיכרון', tools: ['Notion', 'Pinecone', 'Supabase'], color: '#22D3EE' },
];

export default function S33_AccessibleStack() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl" style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,4rem)' }}>
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">פרק שלישי: לבנות</p>
            <SceneTitle size="md">הסטאק הנגיש</SceneTitle>
            <p className="text-white/50 mt-2 text-3xl">אין צורך בצוות פיתוח גדול, כלים נגישים קיימים</p>
          </div>
          <div className="space-y-3">
            {STACK.map((layer, i) => (
              <div key={i} className="flex items-center gap-6 p-6 rounded-xl"
                style={{ background: layer.color + '08', border: `1px solid ${layer.color}20` }}>
                <div className="w-24 shrink-0">
                  <span className="text-3xl font-bold" style={{ color: layer.color }}>{layer.layer}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {layer.tools.map((tool) => (
                    <span key={tool} className="text-3xl px-2 py-1 rounded-lg"
                      style={{ background: layer.color + '15', color: layer.color + 'cc', border: `1px solid ${layer.color}25` }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-white/50 text-3xl">
              ניתן להתחיל עם <strong className="text-white">n8n + Claude + Google Workspace</strong>, ללא קוד
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
