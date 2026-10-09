import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';

const TOOLS = [
  { category: 'אורקסטרציה', items: [
    { name: 'n8n', desc: 'Workflow builder, open source', cost: 'חינם / $20 לחודש', level: 'beginner' },
    { name: 'Make', desc: 'Visual automation', cost: '$9 לחודש', level: 'beginner' },
    { name: 'LangChain', desc: 'Framework לאייג׳נטים', cost: 'חינם', level: 'advanced' },
  ]},
  { category: 'מודלים', items: [
    { name: 'Claude', desc: 'Anthropic, מצוין לעברית', cost: 'Pay-per-use', level: 'beginner' },
    { name: 'GPT', desc: 'OpenAI, רב-תכליתי', cost: 'Pay-per-use', level: 'beginner' },
    { name: 'Gemini', desc: 'Google, מחובר ל-Workspace', cost: 'Pay-per-use', level: 'beginner' },
  ]},
];

const LEVEL_COLORS = { beginner: '#10B981', advanced: '#F59E0B' };
const LEVEL_TEXT = { beginner: '#6EE7B7', advanced: '#FCD34D' };

export default function S49_AppendixToolMap() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneEyebrow>נספח ד׳</SceneEyebrow>
            <SceneTitle size="md">מפת כלים</SceneTitle>
          </div>
          {TOOLS.map((cat, ci) => (
            <div key={ci}>
              <SceneEyebrow>{cat.category}</SceneEyebrow>
              <div className="space-y-2">
                {cat.items.map((tool, i) => (
                  <div key={i} className="flex items-center gap-6 p-3 rounded-xl mo-rise-sm"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', animationDelay: `${0.2 + (ci * 3 + i) * 0.05 + ci * 0.1}s` }}>
                    {/* Name and description are isolated runs, so the name always
                        reads first whatever mix of Hebrew and Latin follows */}
                    <div className="flex-1 text-3xl">
                      <bdi className="text-white/90 font-semibold">{tool.name}</bdi>
                      <span className="text-white/45 mx-2">·</span>
                      <bdi dir="rtl" className="text-white/70">{tool.desc}</bdi>
                    </div>
                    <span className="text-white/75 text-3xl" style={{ whiteSpace: 'nowrap' }}>{tool.cost}</span>
                    <span className="px-3 py-0.5 rounded"
                      style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, background: LEVEL_COLORS[tool.level as keyof typeof LEVEL_COLORS] + '1A', color: LEVEL_TEXT[tool.level as keyof typeof LEVEL_TEXT] }}>
                      {tool.level === 'beginner' ? 'בסיסי' : 'מתקדם'}
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
