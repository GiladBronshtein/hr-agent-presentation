import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

type Level = 'beginner' | 'advanced';
const TOOLS: { category: string; color: string; items: { name: string; desc: string; level: Level }[] }[] = [
  { category: 'עוזרי AI', color: '#F2A93B', items: [
    { name: 'ChatGPT', desc: 'טיוטות, שאלות ותרחישים', level: 'beginner' },
    { name: 'Claude', desc: 'מסמכים ארוכים וכתיבה מדויקת', level: 'beginner' },
    { name: 'Gemini', desc: 'מחובר ל-Google Workspace', level: 'beginner' },
    { name: 'Copilot', desc: 'מחובר ל-Teams ול-Office', level: 'beginner' },
  ]},
  { category: 'פיתוח תוכן ולומדות', color: '#F2A93B', items: [
    { name: 'Articulate 360', desc: 'לומדות, עם עוזר AI מובנה', level: 'beginner' },
    { name: 'Synthesia', desc: 'סרטוני הדרכה עם מגיש וירטואלי', level: 'beginner' },
    { name: 'Canva', desc: 'עזרי עבודה וחומרים חזותיים', level: 'beginner' },
  ]},
  { category: 'LMS ו-LXP', color: '#F2A93B', items: [
    { name: 'Moodle', desc: 'LMS בקוד פתוח', level: 'advanced' },
    { name: 'Docebo', desc: 'LMS עם המלצות למידה', level: 'beginner' },
    { name: 'Degreed', desc: 'LXP: למידה מכל מקור, במקום אחד', level: 'beginner' },
  ]},
  { category: 'כלי תהליכים', color: '#F2A93B', items: [
    { name: 'n8n', desc: 'זרימות ואייג׳נטים, גם בהתקנה עצמית', level: 'advanced' },
    { name: 'Make', desc: 'זרימות ויזואליות, נוח להתחלה', level: 'beginner' },
    { name: 'Power Automate', desc: 'מתאים לסביבת Microsoft', level: 'beginner' },
  ]},
];

const LEVEL_COLORS = { beginner: '#F2A93B', advanced: '#F2A93B' };
const LEVEL_TEXT = { beginner: '#F2A93B', advanced: '#F2A93B' };

export default function S49_AppendixToolMap() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2cqw,2rem)' }}>
          <div>
            <SceneEyebrow>נספח ד׳</SceneEyebrow>
            <SceneTitle size="md">מפת כלים</SceneTitle>
            <SceneSubtitle>כלים נפוצים בעולם הלמידה. כדאי להתחיל ממה שכבר ברישיון</SceneSubtitle>
          </div>
          <div className="grid grid-cols-2" style={{ gap: 'clamp(0.75rem,1.4cqw,1.4rem)' }}>
            {TOOLS.map((cat, ci) => (
              <div key={cat.category} className="rounded-xl mo-rise" style={{
                padding: 'clamp(0.8rem,1.3cqw,1.3rem) clamp(1rem,1.6cqw,1.6rem)',
                background: cat.color + '08', border: `1px solid ${cat.color}22`, animationDelay: `${0.2 + ci * 0.08}s`,
              }}>
                <p className="font-bold" style={{ color: textTint(cat.color), fontSize: 'clamp(1.25rem, 1.75cqw, 1.9rem)', margin: '0 0 0.4rem' }}>{cat.category}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {cat.items.map((tool) => (
                    <div key={tool.name} className="flex items-center" style={{ gap: '0.75rem' }}>
                      {/* Name and description are isolated runs, so the name always
                          reads first whatever mix of Hebrew and Latin follows */}
                      <div className="flex-1" style={{ fontSize: 'clamp(1.05rem, 1.35cqw, 1.5rem)', lineHeight: 1.35 }}>
                        <bdi className="text-white/90 font-semibold">{tool.name}</bdi>
                        <span className="text-white/45 mx-2">·</span>
                        <bdi dir="rtl" className="text-white/70">{tool.desc}</bdi>
                      </div>
                      <span className="rounded shrink-0"
                        style={{ padding: '0.1rem 0.6rem', fontSize: 'clamp(0.95rem, 1.05cqw, 1.2rem)', fontWeight: 600, background: LEVEL_COLORS[tool.level] + '1A', color: LEVEL_TEXT[tool.level] }}>
                        {tool.level === 'beginner' ? 'בסיסי' : 'מתקדם'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/65 mo-rise" style={{ fontSize: 'clamp(1.05rem, 1.35cqw, 1.5rem)', margin: 0, animationDelay: '0.6s' }}>
            מחירים ויכולות משתנים מהר. בודקים מול אבטחת מידע ומול הרישיונות הקיימים.
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
