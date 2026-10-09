import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const STACK = [
  { layer: 'ממשק', tools: ['Slack', 'Teams', 'Web App'], color: '#6366F1' },
  { layer: 'אורקסטרציה', tools: ['n8n', 'Make', 'LangChain'], color: '#10B981' },
  { layer: 'מודל', tools: ['Claude', 'GPT', 'Gemini'], color: '#A78BFA' },
  { layer: 'כלים', tools: ['Calendar API', 'HRIS API', 'Gmail API'], color: '#F59E0B' },
  { layer: 'זיכרון', tools: ['Notion', 'Pinecone', 'Supabase'], color: '#22D3EE' },
];

export default function S33_AccessibleStack() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl" style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4cqw,4rem)' }}>
          <div>
            <SceneEyebrow color="#6EE7B7">פרק שלישי: לבנות</SceneEyebrow>
            <SceneTitle size="md">הסטאק הנגיש</SceneTitle>
            <SceneSubtitle>אין צורך בצוות פיתוח גדול, כלים נגישים קיימים</SceneSubtitle>
          </div>
          <div className="space-y-3">
            {STACK.map((layer, i) => (
              // Stack builds from the foundation up: bottom layer lands first
              <div key={i} className="flex items-center gap-6 p-6 rounded-xl mo-rise"
                style={{ background: layer.color + '08', border: `1px solid ${layer.color}20`, animationDelay: `${0.2 + (STACK.length - 1 - i) * 0.08}s` }}>
                <div className="shrink-0" style={{ minWidth: 'clamp(9rem, 13cqw, 13rem)' }}>
                  <span className="text-3xl font-bold" style={{ color: textTint(layer.color) }}>{layer.layer}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {layer.tools.map((tool) => (
                    <span key={tool} className="text-3xl px-2 py-1 rounded-lg"
                      style={{ background: layer.color + '18', color: textTint(layer.color), border: `1px solid ${layer.color}35` }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', animationDelay: '0.75s' }}>
            <p className="text-white/65 text-3xl">
              ניתן להתחיל עם <strong className="text-white">n8n + Claude + Google Workspace</strong>, ללא קוד
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
