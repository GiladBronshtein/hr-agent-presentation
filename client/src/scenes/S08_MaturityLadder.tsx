import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const LEVELS = [
  { num: 1, label: 'צ׳אט', desc: 'שאלות וטיוטות ידניות', examples: ['ChatGPT', 'Claude.ai'], color: 'rgba(255,255,255,0.3)' },
  { num: 2, label: 'עוזר מוטמע', desc: 'AI בתוך כלי קיים', examples: ['Copilot ב-Teams', 'Gemini ב-Docs'], color: '#F59E0B' },
  { num: 3, label: 'אוטומציה חכמה', desc: 'תהליך עם AI בצומת אחד', examples: ['n8n + AI', 'Zapier + GPT'], color: '#10B981' },
  { num: 4, label: 'אייג׳נט', desc: 'מטרה, כלים, גבולות, אישור', examples: ['אייג׳נט קליטה', 'אייג׳נט גיוס'], color: '#6366F1' },
  { num: 5, label: 'רשת אייג׳נטים', desc: 'מספר אייג׳נטים שמשתפים פעולה', examples: ['Gig+Onboard+Learn', 'ארכיטקטורת HR'], color: '#A78BFA' },
];

export default function S08_MaturityLadder() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">סולם הבגרות</SceneTitle>
            <p className="text-white/60 text-3xl mt-2">לא כל שימוש ב-AI הוא אייג׳נט</p>
          </div>
          <div className="space-y-3">
            {LEVELS.map((level, i) => (
              <div key={i}
                className="interactive-card flex items-center gap-6 p-6 rounded-xl"
                style={{
                  background: level.num === 4 ? level.color + '10' : hovered === i ? level.color + '12' : 'rgba(255,255,255,0.03)',
                  border: level.num === 4 ? `1px solid ${level.color}45` : hovered === i ? `1px solid ${level.color}30` : '1px solid rgba(255,255,255,0.06)',
                  marginRight: `calc(${i} * clamp(1rem, 3.2cqw, 3.4rem))`,
                  boxShadow: level.num === 4 ? '0 0 32px rgba(99,102,241,0.2)' : 'none',
                  animation: `slideInRight 0.5s ease ${0.12 + i * 0.12}s both`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="rounded-full flex items-center justify-center font-black shrink-0"
                  style={{
                    width: 'clamp(44px, 4cqw, 56px)', height: 'clamp(44px, 4cqw, 56px)',
                    fontSize: 'clamp(1.3rem, 1.9cqw, 1.8rem)',
                    background: level.color + '20', color: level.color, border: `1px solid ${level.color}30`,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}>
                  {level.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-5">
                    <span className="font-bold text-white">{level.label}</span>
                    <span className="text-white/60 text-3xl">{level.desc}</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {level.examples.map((ex) => (
                      <span key={ex} className="text-3xl px-2 py-0.5 rounded"
                        style={{ background: level.color + '10', color: level.color + 'cc', border: `1px solid ${level.color}20` }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                {level.num === 4 && (
                  <span className="px-4 py-1.5 rounded-full font-bold"
                    style={{
                      background: 'rgba(99,102,241,0.2)', color: '#A5B4FC', border: '1px solid rgba(99,102,241,0.5)',
                      fontSize: 'clamp(1.05rem, 1.4cqw, 1.35rem)',
                      animation: 'winnerGlow 2.4s ease-in-out infinite',
                      whiteSpace: 'nowrap',
                    }}>
                    ← אנחנו כאן
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/65 text-3xl text-center">
            הפיילוט הראשון צריך להיות שלב 4, פשוט, מדיד, בסיכון נמוך
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
