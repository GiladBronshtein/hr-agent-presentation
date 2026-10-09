import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, Takeaway } from '../components/presentation/SceneBase';
import { BookOpen, Brain, Construction, Database, Hand, Target, Wrench } from 'lucide-react';

const COMPONENTS = [
  { icon: Target, label: 'מטרה', desc: 'מה צריך להשיג' },
  { icon: BookOpen, label: 'הקשר', desc: 'מה רלוונטי עכשיו' },
  { icon: Brain, label: 'מודל', desc: 'מנוע ההבנה והבחירה' },
  { icon: Wrench, label: 'כלים', desc: 'מה מותר לגעת בו' },
  { icon: Database, label: 'זיכרון', desc: 'מה נשמר בין פעולות' },
  { icon: Construction, label: 'גבולות', desc: 'מה אסור לעשות' },
  { icon: Hand, label: 'אישור', desc: 'מתי לעצור לאדם' },
];

export default function S06_Definition() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneEyebrow>הגדרה</SceneEyebrow>
            <SceneTitle size="md">מהו אייג׳נט?</SceneTitle>
          </div>
          <div className="p-6 rounded-2xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <p className="text-white text-4xl font-medium leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
              מערכת שמקבלת <span style={{ color: '#A5B4FC' }}>מטרה</span>,{' '}
              מבינה <span style={{ color: '#6EE7B7' }}>מצב</span>,{' '}
              בוחרת <span style={{ color: '#FCD34D' }}>פעולות</span>{' '}
              ומשתמשת ב<span style={{ color: '#FDA4AF' }}>כלים</span>, ויודעת מתי לעצור
            </p>
          </div>
          <div className="grid grid-cols-7 gap-5">
            {COMPONENTS.map((comp, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl text-center mo-rise"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', animationDelay: `${0.3 + i * 0.05}s` }}>
                <span className="text-4xl"><comp.icon size="1em" /></span>
                <span className="text-white text-3xl font-bold">{comp.label}</span>
                <span className="text-white/70 leading-snug" style={{ fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', textWrap: 'balance' } as React.CSSProperties}>{comp.desc}</span>
              </div>
            ))}
          </div>
          <div className="mo-rise" style={{ animationDelay: '0.8s' }}>
            <Takeaway>מודל AI לבדו עדיין אינו אייג׳נט, הוא צריך את כל שבעת הרכיבים</Takeaway>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
