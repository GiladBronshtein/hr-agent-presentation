import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const LEVELS = [
  { num: 1, label: 'צ׳אט', desc: 'שאלות וטיוטות ידניות', examples: ['ChatGPT', 'Claude.ai'], color: 'rgba(255,255,255,0.3)' },
  { num: 2, label: 'עוזר מוטמע', desc: 'AI בתוך כלי קיים', examples: ['Copilot ב-Teams', 'Gemini ב-Docs'], color: '#FFD166' },
  { num: 3, label: 'אוטומציה חכמה', desc: 'תהליך עם AI בצומת אחד', examples: ['n8n + AI', 'Zapier + GPT'], color: '#70D6A7' },
  { num: 4, label: 'אייג׳נט', desc: 'מטרה, כלים, גבולות, אישור', examples: ['אייג׳נט קליטה', 'אייג׳נט גיוס'], color: '#4F7CFF' },
  { num: 5, label: 'רשת אייג׳נטים', desc: 'מספר אייג׳נטים שמשתפים פעולה', examples: ['Gig+Onboard+Learn', 'ארכיטקטורת HR'], color: '#A78BFA' },
];

export default function S08_MaturityLadder() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div className="text-center">
            <SceneTitle size="md">סולם הבגרות</SceneTitle>
            <p className="text-white/40 text-sm mt-2">לא כל שימוש ב-AI הוא אייג׳נט</p>
          </div>
          <div className="space-y-3">
            {LEVELS.map((level, i) => (
              <div key={i}
                className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200"
                style={{
                  background: hovered === i ? level.color + '12' : 'rgba(255,255,255,0.03)',
                  border: hovered === i ? `1px solid ${level.color}30` : '1px solid rgba(255,255,255,0.06)',
                  transform: hovered === i ? 'translateX(-4px)' : undefined,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shrink-0"
                  style={{ background: level.color + '20', color: level.color, border: `1px solid ${level.color}30` }}>
                  {level.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white">{level.label}</span>
                    <span className="text-white/40 text-sm">{level.desc}</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {level.examples.map((ex) => (
                      <span key={ex} className="text-xs px-2 py-0.5 rounded"
                        style={{ background: level.color + '10', color: level.color + 'cc', border: `1px solid ${level.color}20` }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
                {level.num === 4 && (
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: 'rgba(79,124,255,0.15)', color: '#4F7CFF', border: '1px solid rgba(79,124,255,0.3)' }}>
                    ← אנחנו כאן
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-sm text-center">
            הפיילוט הראשון צריך להיות שלב 4 — פשוט, מדיד, בסיכון נמוך
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
