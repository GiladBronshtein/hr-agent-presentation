import { SceneBase, ContentLayout, SceneTitle, GlassCard, Takeaway } from '../components/presentation/SceneBase';
import { BookOpen, Brain, Construction, Database, Hand, Target, Wrench } from 'lucide-react';

const COMPONENTS = [
  { icon: Target, label: 'מטרה', desc: 'מה צריך להשיג' },
  { icon: BookOpen, label: 'הקשר', desc: 'מה רלוונטי עכשיו' },
  { icon: Brain, label: 'מודל', desc: 'מנוע ההבנה והבחירה' },
  { icon: Wrench, label: 'כלים', desc: 'מה מותר לגעת בו' },
  { icon: Database, label: 'זיכרון', desc: 'מה נשמר בין פעולות' },
  { icon: Construction, label: 'גבולות', desc: 'מה אסור לעשות' },
  { icon: Hand, label: 'אישור', desc: 'מתי עוצרים לאדם' },
];

export default function S06_Definition() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <p className="text-white/60 text-4xl uppercase tracking-widest mb-2">הגדרה</p>
            <SceneTitle size="md">מהו אייג׳נט?</SceneTitle>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-white text-4xl font-medium leading-relaxed">
              מערכת שמקבלת <span style={{ color: '#6366F1' }}>מטרה</span>,
              מבינה <span style={{ color: '#10B981' }}>מצב</span>,
              בוחרת <span style={{ color: '#F59E0B' }}>פעולות</span>,
              ומשתמשת ב<span style={{ color: '#F43F5E' }}>כלים</span>, ויודעת מתי לעצור
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-5">
            {COMPONENTS.map((comp, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-4xl"><comp.icon size="1em" /></span>
                <span className="text-white/80 text-4xl font-bold">{comp.label}</span>
                <span className="text-white/60 text-4xl leading-tight">{comp.desc}</span>
              </div>
            ))}
          </div>
          <Takeaway>מודל AI לבדו עדיין אינו אייג׳נט, הוא צריך את כל שבעת הרכיבים</Takeaway>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
