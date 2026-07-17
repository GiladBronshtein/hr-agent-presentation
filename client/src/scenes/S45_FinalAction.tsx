import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const ACTIONS = [
  { icon: '📋', title: 'בחרו תהליך', desc: 'תהליך אחד שרוצים לשפר', cta: 'השבוע' },
  { icon: '🤝', title: 'מצאו שותף', desc: 'IT או מפתח שיעזור לכם', cta: 'השבוע' },
  { icon: '🧪', title: 'בנו פיילוט', desc: 'n8n + Claude + כלי אחד', cta: 'תוך חודש' },
  { icon: '📊', title: 'מדדו', desc: 'לפני ואחרי: ROI ברור', cta: 'תוך 90 יום' },
];

export default function S45_FinalAction() {
  return (
    <SceneBase variant="chapter-break">
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8 text-center">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-3">הצעד הבא</p>
            <SceneTitle size="lg">
              מה תעשו<br />
              <span style={{ color: '#10B981' }}>מחר בבוקר?</span>
            </SceneTitle>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACTIONS.map((action, i) => (
              <div key={i} className="p-7 rounded-xl text-center animate-fade-in-up"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both',
                  opacity: 0,
                }}>
                <span className="text-5xl block mb-3">{action.icon}</span>
                <h3 className="text-white font-bold text-3xl mb-1">{action.title}</h3>
                <p className="text-white/40 text-3xl mb-3">{action.desc}</p>
                <span className="text-3xl px-2 py-1 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}>
                  {action.cta}
                </span>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-3xl">
            שאלות? המשאבים בנספחים: System Prompt, Blueprint, Evaluation Framework
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
