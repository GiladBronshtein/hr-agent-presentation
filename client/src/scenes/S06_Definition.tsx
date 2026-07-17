import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';

const COMPONENTS = [
  { icon: '🎯', label: 'מטרה', desc: 'מה צריך להשיג' },
  { icon: '📚', label: 'הקשר', desc: 'מה רלוונטי עכשיו' },
  { icon: '🧠', label: 'מודל', desc: 'מנוע ההבנה והבחירה' },
  { icon: '🔧', label: 'כלים', desc: 'מה מותר לגעת בו' },
  { icon: '💾', label: 'זיכרון', desc: 'מה נשמר בין פעולות' },
  { icon: '🚧', label: 'גבולות', desc: 'מה אסור לעשות' },
  { icon: '✋', label: 'אישור', desc: 'מתי עוצרים לאדם' },
];

export default function S06_Definition() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">הגדרה</p>
            <SceneTitle size="md">מהו אייג׳נט?</SceneTitle>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(79,124,255,0.08)', border: '1px solid rgba(79,124,255,0.2)' }}>
            <p className="text-white text-xl font-medium leading-relaxed">
              מערכת שמקבלת <span style={{ color: '#4F7CFF' }}>מטרה</span>,
              מבינה <span style={{ color: '#70D6A7' }}>מצב</span>,
              בוחרת <span style={{ color: '#FFD166' }}>פעולות</span>,
              ומשתמשת ב<span style={{ color: '#FF6B6B' }}>כלים</span> — ויודעת מתי לעצור
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
            {COMPONENTS.map((comp, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-2xl">{comp.icon}</span>
                <span className="text-white/80 text-xs font-bold">{comp.label}</span>
                <span className="text-white/40 text-xs leading-tight">{comp.desc}</span>
              </div>
            ))}
          </div>
          <Takeaway>מודל AI לבדו עדיין אינו אייג׳נט — הוא צריך את כל שבעת הרכיבים</Takeaway>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
