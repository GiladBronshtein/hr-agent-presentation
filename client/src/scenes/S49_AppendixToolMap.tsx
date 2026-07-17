import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const TOOLS = [
  { category: 'אורקסטרציה', items: [
    { name: 'n8n', desc: 'Workflow builder, open source', cost: 'חינם / $20/m', level: 'beginner' },
    { name: 'Make', desc: 'Visual automation', cost: '$9/m', level: 'beginner' },
    { name: 'LangChain', desc: 'Framework לאייג׳נטים', cost: 'חינם', level: 'advanced' },
  ]},
  { category: 'מודלים', items: [
    { name: 'Claude 3.5', desc: 'Anthropic — מצוין לעברית', cost: 'Pay-per-use', level: 'beginner' },
    { name: 'GPT-4o', desc: 'OpenAI — רב-תכליתי', cost: 'Pay-per-use', level: 'beginner' },
    { name: 'Gemini Pro', desc: 'Google — מחובר ל-Workspace', cost: 'Pay-per-use', level: 'beginner' },
  ]},
];

const LEVEL_COLORS = { beginner: '#70D6A7', advanced: '#FFD166' };

export default function S49_AppendixToolMap() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">נספח ד׳</p>
            <SceneTitle size="md">מפת כלים</SceneTitle>
          </div>
          {TOOLS.map((cat, ci) => (
            <div key={ci}>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{cat.category}</p>
              <div className="space-y-2">
                {cat.items.map((tool, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex-1">
                      <span className="text-white/80 font-medium text-sm">{tool.name}</span>
                      <span className="text-white/40 text-xs mr-2">— {tool.desc}</span>
                    </div>
                    <span className="text-white/30 text-xs">{tool.cost}</span>
                    <span className="text-xs px-2 py-0.5 rounded"
                      style={{ background: LEVEL_COLORS[tool.level as keyof typeof LEVEL_COLORS] + '15', color: LEVEL_COLORS[tool.level as keyof typeof LEVEL_COLORS] }}>
                      {tool.level === 'beginner' ? 'מתחיל' : 'מתקדם'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
