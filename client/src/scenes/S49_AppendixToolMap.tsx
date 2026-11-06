import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { PALETTE, alpha } from '../lib/palette';


type Level = 'beginner' | 'advanced';
const TOOLS: { category: string; color: string; items: { name: string; desc: string; level: Level; source: string }[] }[] = [
  { category: 'עוזרי AI', color: PALETTE.violet, items: [
    { name: 'ChatGPT', desc: 'טיוטות וסיכומים', level: 'beginner', source: 'wikipedia-chatgpt-2026' },
    { name: 'Claude', desc: 'מסמכים ארוכים', level: 'beginner', source: 'anthropic-context-windows-2026' },
    { name: 'Gemini', desc: 'בתוך Google Workspace', level: 'beginner', source: 'google-workspace-gemini-2026' },
    { name: 'Copilot', desc: 'בתוך Word ו-Teams', level: 'beginner', source: 'microsoft-copilot-overview-2026' },
  ]},
  { category: 'פיתוח תוכן ולומדות', color: PALETTE.magenta, items: [
    { name: 'Articulate 360', desc: 'לומדות, עם עוזר AI', level: 'beginner', source: 'articulate-ai-assistant-2026' },
    { name: 'Synthesia', desc: 'סרטונים עם אווטאר AI', level: 'beginner', source: 'synthesia-home-2026' },
    { name: 'Canva', desc: 'עיצוב חומרים חזותיים', level: 'beginner', source: 'wikipedia-canva-2026' },
  ]},
  { category: 'LMS ו-LXP', color: PALETTE.blue, items: [
    { name: 'Moodle', desc: 'LMS בקוד פתוח', level: 'advanced', source: 'moodle-about-2026' },
    { name: 'Docebo', desc: 'LMS עם מיפוי מיומנויות', level: 'beginner', source: 'docebo-home-2026' },
    { name: 'Degreed', desc: 'LXP עם מסלולי למידה', level: 'beginner', source: 'degreed-home-2026' },
  ]},
  { category: 'כלי תהליכים', color: PALETTE.coral, items: [
    { name: 'n8n', desc: 'זרימות, גם בשרת הארגון', level: 'advanced', source: 'n8n-self-hosting-2026' },
    { name: 'Make', desc: 'זרימות ואייג׳נטים, ויזואלי', level: 'beginner', source: 'make-home-2026' },
    { name: 'Power Automate', desc: 'זרימות ואישורים', level: 'beginner', source: 'microsoft-power-automate-2026' },
  ]},
];

const LEVEL_COLORS = { beginner: PALETTE.teal, advanced: PALETTE.amber };
const LEVEL_TEXT = { beginner: PALETTE.teal, advanced: PALETTE.amber };

export default function S49_AppendixToolMap() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full" style={{ maxWidth: '98rem', display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2cqw,2rem)' }}>
          <div>
            <SceneEyebrow>נספח ד׳</SceneEyebrow>
            <SceneTitle size="md">מפת כלים</SceneTitle>
            <SceneSubtitle>כלים נפוצים בעולם הלמידה. כדאי להתחיל ממה שכבר ברישיון</SceneSubtitle>
          </div>
          <div className="grid grid-cols-2" style={{ gap: 'clamp(0.75rem,1.4cqw,1.4rem)' }}>
            {TOOLS.map((cat, ci) => (
              <div key={cat.category} className="rounded-xl mo-rise" style={{
                padding: 'clamp(0.8rem,1.3cqw,1.3rem) clamp(1rem,1.6cqw,1.6rem)',
                background: `radial-gradient(100% 60% at 100% 0%, ${alpha(cat.color, 0.15)}, transparent 70%), rgba(12,17,50,0.64)`,
                border: `1px solid ${alpha(cat.color, 0.32)}`, boxShadow: `0 0 44px -26px ${cat.color}`, animationDelay: `${0.2 + ci * 0.08}s`,
              }}>
                <p className="font-bold" style={{ color: textTint(cat.color), textShadow: `0 0 18px ${alpha(cat.color, 0.4)}`, fontSize: 'clamp(1.25rem, 1.75cqw, 1.9rem)', margin: '0 0 0.4rem' }}>{cat.category}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {cat.items.map((tool) => (
                    <div key={tool.name} className="flex items-center" style={{ gap: '0.75rem' }}>
                      {/* Name and description are isolated runs, so the name always
                          reads first whatever mix of Hebrew and Latin follows */}
                      <div className="flex-1" style={{ fontSize: 'clamp(1.05rem, 1.35cqw, 1.5rem)', lineHeight: 1.35 }}>
                        <bdi className="text-white/90 font-semibold" style={{ whiteSpace: 'nowrap' }}>{tool.name}</bdi>
                        <span className="mx-2" style={{ color: textTint(cat.color) }}>·</span>
                        <bdi dir="rtl" className="text-white/80">{tool.desc}</bdi>
                      </div>
                      <SourceChip id={tool.source} style={{ flexShrink: 0 }} />
                      <span className="rounded shrink-0"
                        style={{ padding: '0.1rem 0.6rem', fontSize: 'clamp(0.95rem, 1.05cqw, 1.2rem)', fontWeight: 600, background: alpha(LEVEL_COLORS[tool.level], 0.14), color: LEVEL_TEXT[tool.level], border: `1px solid ${alpha(LEVEL_COLORS[tool.level], 0.4)}` }}>
                        {tool.level === 'beginner' ? 'בסיסי' : 'מתקדם'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/80 mo-rise" style={{ fontSize: 'clamp(1.05rem, 1.35cqw, 1.5rem)', margin: 0, animationDelay: '0.6s' }}>
            מחירים ויכולות משתנים מהר. בודקים מול אבטחת מידע ומול הרישיונות הקיימים.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
