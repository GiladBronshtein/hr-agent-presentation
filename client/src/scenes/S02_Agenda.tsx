import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const QUESTIONS = [
  { num: '01', q: 'מה ההבדל בין אוטומציה לאייג׳נט?', chapter: 'להבין', color: '#4F7CFF' },
  { num: '02', q: 'איפה אייג׳נטים יכולים לעזור ב-HR?', chapter: 'לראות', color: '#70D6A7' },
  { num: '03', q: 'איך בונים אייג׳נט אחראי?', chapter: 'לבנות', color: '#FF6B6B' },
  { num: '04', q: 'איך מתחילים בארגון שלנו?', chapter: 'להטמיע', color: '#FFD166' },
];

export default function S02_Agenda() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-3xl space-y-6">
          <div className="mb-8">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">ארבע שאלות שנענה עליהן</p>
            <SceneTitle size="md">מה נלמד היום</SceneTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUESTIONS.map((item, i) => (
              <GlassCard key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both', opacity: 0 }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black font-mono" style={{ color: item.color + '40' }}>{item.num}</span>
                  <div>
                    <p className="text-white/80 text-base leading-relaxed font-medium">{item.q}</p>
                    <span className="text-xs mt-2 inline-block px-2 py-0.5 rounded-full"
                      style={{ background: item.color + '15', color: item.color, border: `1px solid ${item.color}25` }}>
                      {item.chapter}
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <p className="text-white/30 text-sm text-center mt-6">
            המטרה: לצאת עם רעיון אחד שאפשר להתחיל לבדוק כבר השבוע
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
