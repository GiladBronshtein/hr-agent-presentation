import { useState } from 'react';
import { SceneBase } from '../components/presentation/SceneBase';
import { DemoStepLayout } from '../components/presentation/DemoStepLayout';

const QUESTIONS = [
  { q: 'האם תוכנית הקליטה מתאימה לתפקיד?', default: 4 },
  { q: 'האם המייל מתאים לתרבות הארגון?', default: 5 },
  { q: 'האם הגישות שהוזמנו נכונות?', default: 4 },
];

export default function S31_DemoFeedback() {
  const [ratings, setRatings] = useState(QUESTIONS.map(q => q.default));

  return (
    <SceneBase>
      <DemoStepLayout step={8} title="משוב ולמידה" subtitle="כל משוב משפר את האייג׳נט לפעם הבאה">
          <div className="space-y-4">
            {QUESTIONS.map((item, qi) => (
              <div key={qi} className="rounded-xl mo-rise flex items-center justify-between gap-6" style={{ padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.1rem, 1.6cqw, 1.6rem)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', animationDelay: `${0.2 + qi * 0.07}s` }}>
                <p className="text-white/85 text-3xl" style={{ margin: 0 }}>{item.q}</p>
                <div className="flex gap-2 shrink-0">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} onClick={() => setRatings(prev => { const n = [...prev]; n[qi] = r; return n; })}
                      className="rounded-lg font-semibold transition-all"
                      style={{
                        width: 'clamp(2.5rem, 2.8cqw, 3.25rem)', height: 'clamp(2.5rem, 2.8cqw, 3.25rem)',
                        fontSize: 'clamp(1.1rem, 1.25cqw, 1.5rem)',
                        background: ratings[qi] >= r ? 'rgba(99,102,241,0.22)' : 'rgba(255,255,255,0.05)',
                        border: ratings[qi] >= r ? '1px solid rgba(129,140,248,0.55)' : '1px solid rgba(255,255,255,0.1)',
                        color: ratings[qi] >= r ? '#C7D2FE' : 'rgba(255,255,255,0.5)',
                      }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl mo-rise" style={{ padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.1rem, 1.6cqw, 1.6rem)', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', animationDelay: '0.45s' }}>
            <p className="text-white/75 text-3xl" style={{ margin: 0 }}>
              ממוצע: <strong style={{ color: '#A5B4FC' }}>{(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)}/5</strong>
              {' '}· המשוב נשמר לשיפור הבא
            </p>
          </div>
      </DemoStepLayout>
    </SceneBase>
  );
}
