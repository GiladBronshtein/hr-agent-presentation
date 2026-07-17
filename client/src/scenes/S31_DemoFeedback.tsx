import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const QUESTIONS = [
  { q: 'האם תוכנית הקליטה מתאימה לתפקיד?', default: 4 },
  { q: 'האם המייל מתאים לתרבות הארגון?', default: 5 },
  { q: 'האם הגישות שהוזמנו נכונות?', default: 4 },
];

export default function S31_DemoFeedback() {
  const [ratings, setRatings] = useState(QUESTIONS.map(q => q.default));

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שלב 8</p>
            <SceneTitle size="md">משוב ולמידה</SceneTitle>
            <p className="text-white/40 text-3xl mt-1">כל משוב משפר את האייג׳נט לפעם הבאה</p>
          </div>
          <div className="space-y-8">
            {QUESTIONS.map((item, qi) => (
              <div key={qi} className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-white/70 text-3xl mb-3">{item.q}</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button key={r} onClick={() => setRatings(prev => { const n = [...prev]; n[qi] = r; return n; })}
                      className="w-8 h-8 rounded-lg text-3xl font-medium transition-all"
                      style={{
                        background: ratings[qi] >= r ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                        border: ratings[qi] >= r ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.08)',
                        color: ratings[qi] >= r ? '#6366F1' : 'rgba(255,255,255,0.3)',
                      }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-white/60 text-3xl">
              ממוצע: <strong style={{ color: '#6366F1' }}>{(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)}/5</strong>
              {' '} -  המשוב נשמר לשיפור הבא
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
