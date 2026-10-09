import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

/** Brand terms never break across lines */
const KEEP_TOGETHER = /(System Prompt|Approval Gates|\(Calendar, Gmail\))/;
const Task = ({ text }: { text: string }) => (
  <>{text.split(KEEP_TOGETHER).map((part, i) => (KEEP_TOGETHER.test(part) ? <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span> : part))}</>
);

const PHASES = [
  {
    phase: 'שבועות 1-2',
    title: 'הגדרה',
    color: '#6366F1',
    tasks: ['בחירת תהליך אחד', 'מיפוי השלבים', 'הגדרת הצלחה', 'בניית System Prompt ראשון'],
  },
  {
    phase: 'שבועות 3-4',
    title: 'בנייה',
    color: '#10B981',
    tasks: ['חיבור כלים (Calendar, Gmail)', 'הגדרת Approval Gates', 'בדיקה עם 5 מקרים', 'תיקון ושיפור'],
  },
  {
    phase: 'שבועות 5-8',
    title: 'פיילוט',
    color: '#F59E0B',
    tasks: ['הרצה עם קבוצה קטנה', 'מדידה לפני ואחרי', 'איסוף משוב', 'תיעוד לקחים'],
  },
  {
    phase: 'שבועות 9-12',
    title: 'הרחבה',
    color: '#A78BFA',
    tasks: ['הרחבה לכל הארגון', 'הוספת אייג׳נט שני', 'בניית תהליך ממשל', 'תכנון Q2'],
  },
];

export default function S41_Roadmap90() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full space-y-8" style={{ maxWidth: '94rem', paddingTop: 'clamp(1.5rem,3cqw,3rem)' }}>
          <div>
            <SceneTitle size="md">מפת דרכים 90 יום</SceneTitle>
            <SceneSubtitle>מהרעיון לאייג׳נט פעיל, בשלושה חודשים</SceneSubtitle>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {PHASES.map((phase, i) => (
              <div key={i} className="relative overflow-hidden p-6 rounded-xl mo-rise"
                style={{
                  background: phase.color + '08',
                  border: `1px solid ${phase.color}20`,
                  animationDelay: `${0.15 + i * 0.07}s`,
                }}>
                {/* Progress line: one continuous fill that runs phase to phase in RTL order */}
                <span aria-hidden className="mo-grow-x" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: phase.color + 'CC', boxShadow: `0 0 12px ${phase.color}70`,
                  pointerEvents: 'none',
                  animationDelay: `${0.45 + i * 0.22}s`,
                  animationDuration: '0.22s',
                  animationTimingFunction: i === 0 ? 'ease-in' : i === PHASES.length - 1 ? 'ease-out' : 'linear',
                }} />
                <p className="text-white/65 mb-1" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600 }}>{phase.phase}</p>
                <h3 className="font-bold text-3xl mb-3" style={{ color: textTint(phase.color) }}>{phase.title}</h3>
                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <span className="leading-snug" style={{ color: phase.color, fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)' }}>•</span>
                      <span className="text-white/75 leading-snug" style={{ fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)' }}><Task text={task} /></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/75 text-3xl mo-rise" style={{ animationDelay: '1.05s' }}>
            90 יום: מספיק לראות ערך, מהיר מספיק לשמור על מומנטום
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
