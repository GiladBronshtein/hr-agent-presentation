import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const WORDS = ['מבינים', 'רואים', 'בונים', 'מטמיעים'];

export default function S44_ClosingReflection() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx(prev => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="text-center space-y-8 max-w-2xl">
          <SceneTitle size="xl">
            אנחנו<br />
            <span style={{ color: '#6366F1', transition: 'all 0.5s ease' }}>
              {WORDS[wordIdx]}
            </span>
          </SceneTitle>
          <p className="text-white/60 text-lg leading-relaxed">
            AI Agents אינם פרויקט IT — הם שינוי בדרך שעבודה מתבצעת.<br />
            HR הוא לא רק לקוח — הוא אחד המעצבים.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { q: 'מה תהליך אחד שתרצו לבדוק?', icon: '🎯' },
              { q: 'מי השותף הנכון ב-IT?', icon: '🤝' },
              { q: 'מה מדד ההצלחה שלכם?', icon: '📊' },
              { q: 'מה הצעד הראשון השבוע?', icon: '🚀' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl text-right"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-xl block mb-2">{item.icon}</span>
                <p className="text-white/60 text-sm">{item.q}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
