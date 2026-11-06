import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

/** Three levels, top to bottom; the ladder builds from the first level up */
const LEVELS = [
  {
    level: 3, name: 'אייג׳נט', color: '#F2A93B',
    example: 'LearnBot מקבל בקשה, בונה מסלול ומחכה לאישור',
    tools: ['עוזר AI', 'LMS', 'Slack', 'n8n'],
  },
  {
    level: 2, name: 'תהליך אוטומטי עם AI', color: '#F2A93B',
    example: 'טופס בקשת הדרכה מסוכם ונשלח לצוות L&D',
    tools: ['עוזר AI', 'Teams', 'Power Automate'],
  },
  {
    level: 1, name: 'עוזר אישי', color: '#F2A93B',
    example: 'טיוטת חידון מתוך מסמך מוצר, תוך עשר דקות',
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
  },
];

export default function S33_AccessibleStack() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full" style={{ maxWidth: '86rem', paddingTop: 'clamp(1rem,2cqw,2rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem,3cqw,3rem)' }}>
          <div>
            <SceneEyebrow color="#F2A93B">פרק שלישי: לבנות</SceneEyebrow>
            <SceneTitle size="md">כלים להתחלה</SceneTitle>
            <SceneSubtitle>מתחילים במה שכבר יש בארגון, ועולים רמה כשמוכנים</SceneSubtitle>
          </div>
          <div className="space-y-3">
            {LEVELS.map((lv, i) => (
              // The ladder builds from the foundation up: level 1 lands first
              <div key={lv.level} className="flex items-center rounded-xl mo-rise"
                style={{
                  gap: 'clamp(1rem,2cqw,2rem)', padding: 'clamp(1rem,1.6cqw,1.6rem) clamp(1.1rem,1.8cqw,1.8rem)',
                  background: lv.color + '08', border: `1px solid ${lv.color}20`,
                  animationDelay: `${0.2 + (LEVELS.length - 1 - i) * 0.1}s`,
                }}>
                <div className="shrink-0 flex items-center" style={{ gap: '0.9rem', width: 'clamp(12rem, 17cqw, 20rem)' }}>
                  <span className="rounded-full flex items-center justify-center font-black shrink-0"
                    style={{
                      width: 'clamp(40px, 3.4cqw, 54px)', height: 'clamp(40px, 3.4cqw, 54px)',
                      fontSize: 'clamp(1.25rem, 1.7cqw, 1.75rem)', fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
                      background: lv.color + '22', color: textTint(lv.color), border: `1px solid ${lv.color}50`,
                    }}>
                    {lv.level}
                  </span>
                  <span className="font-bold" style={{ color: textTint(lv.color), fontSize: 'clamp(1.4rem, 2cqw, 2.1rem)', lineHeight: 1.2 }}>{lv.name}</span>
                </div>
                <p className="flex-1 text-white/80" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)', lineHeight: 1.4, margin: 0, textWrap: 'pretty' } as React.CSSProperties}>
                  {lv.example}
                </p>
                <div className="flex flex-wrap justify-end shrink-0" style={{ gap: '0.5rem', maxWidth: 'clamp(14rem, 26cqw, 30rem)' }}>
                  {lv.tools.map((tool) => (
                    <bdi key={tool} className="rounded-lg"
                      style={{
                        padding: '0.2rem 0.65rem', fontSize: 'clamp(1.05rem, 1.25cqw, 1.45rem)', whiteSpace: 'nowrap',
                        background: lv.color + '18', color: textTint(lv.color), border: `1px solid ${lv.color}35`,
                      }}>
                      {tool}
                    </bdi>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl text-center mo-rise" style={{ padding: 'clamp(1rem,1.6cqw,1.5rem)', background: 'rgba(243,238,228,0.04)', border: '1px solid rgba(243,238,228,0.08)', animationDelay: '0.75s' }}>
            <p className="text-white/70" style={{ fontSize: 'clamp(1.2rem, 1.7cqw, 1.85rem)', margin: 0, textWrap: 'balance' } as React.CSSProperties}>
              עוזר AI, ה-LMS, <bdi>Slack</bdi> או <bdi>Teams</bdi>: כנראה שכבר יש. <strong className="text-white">רמה 1 אפשר להתחיל השבוע, בלי צוות פיתוח.</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
