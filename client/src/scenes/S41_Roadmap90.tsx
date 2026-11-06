import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { PALETTE, alpha } from '../lib/palette';


/** Latin terms glued to a Hebrew prefix (ה-LMS) never break across lines */
const KEEP_TOGETHER = /([֐-׿]*-?(?:LMS|AI|L&D))/;
const Task = ({ text }: { text: string }) => (
  <>{text.split(KEEP_TOGETHER).map((part, i) => (KEEP_TOGETHER.test(part) ? <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span> : part))}</>
);

const PHASES = [
  {
    phase: 'שבועות 1-2',
    title: 'הגדרה',
    color: PALETTE.blue,
    tasks: ['לבחור תהליך אחד, למשל טיוטות חידון', 'למדוד את המצב היום: זמן ואיכות', 'להגדיר מדד הצלחה', 'לבחור מקורות מאושרים'],
  },
  {
    phase: 'שבועות 3-4',
    title: 'בנייה',
    color: PALETTE.violet,
    tasks: ['לכתוב הוראות לאייג׳נט', 'לחבר עוזר AI וה-LMS', 'להגדיר מי מאשר מה', 'לנסות על חמישה קורסים קיימים'],
  },
  {
    phase: 'שבועות 5-8',
    title: 'פיילוט',
    color: PALETTE.coral,
    tasks: ['צוות אחד ומומחה תוכן אחד', 'למדוד לפני ואחרי', 'משוב ממומחים וממי שלומד', 'לתעד מה עבד ומה לא'],
  },
  {
    phase: 'שבועות 9-12',
    title: 'הרחבה',
    color: PALETTE.amber,
    tasks: ['להחליט: להרחיב, לשנות או לעצור', 'תהליך שני, למשל תזכורות', 'לכתוב נוהל עבודה קצר', 'דוח קצר להנהלה'],
  },
];

export default function S41_Roadmap90() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full space-y-8" style={{ maxWidth: '94rem', paddingTop: 'clamp(1.5rem,3cqw,3rem)' }}>
          <div>
            <SceneTitle size="md">מפת דרכים ל-90 יום</SceneTitle>
            <SceneSubtitle>מרעיון לפיילוט שעובד, בשלושה חודשים</SceneSubtitle>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {PHASES.map((phase, i) => (
              <div key={i} className="relative overflow-hidden p-6 rounded-xl mo-rise"
                style={{
                  background: `radial-gradient(110% 60% at 100% 0%, ${alpha(phase.color, 0.18)}, transparent 70%), rgba(12,17,50,0.64)`,
                  border: `1px solid ${alpha(phase.color, 0.34)}`,
                  boxShadow: `0 0 50px -28px ${phase.color}, inset 0 1px 0 ${alpha(phase.color, 0.2)}`,
                  animationDelay: `${0.15 + i * 0.07}s`,
                }}>
                {/* Progress line: one continuous fill that runs phase to phase in RTL order */}
                <span aria-hidden className="mo-grow-x" style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: `linear-gradient(270deg, ${i === 0 ? phase.color : PHASES[i - 1].color}, ${phase.color})`,
                  boxShadow: `0 0 14px ${phase.color}`,
                  pointerEvents: 'none',
                  animationDelay: `${0.45 + i * 0.22}s`,
                  animationDuration: '0.22s',
                  animationTimingFunction: i === 0 ? 'ease-in' : i === PHASES.length - 1 ? 'ease-out' : 'linear',
                }} />
                <p className="text-white/75 mb-1" style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600 }}>{phase.phase}</p>
                <h3 className="font-bold text-3xl mb-3" style={{ color: textTint(phase.color) }}>{phase.title}</h3>
                <div className="space-y-2.5">
                  {phase.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <span className="leading-snug" style={{ color: phase.color, textShadow: `0 0 8px ${phase.color}`, fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)' }}>•</span>
                      <span className="text-white/85 leading-snug" style={{ fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)' }}><Task text={task} /></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/75 text-3xl mo-rise" style={{ animationDelay: '1.05s' }}>
            90 יום: מספיק כדי לראות ערך, קצר מספיק כדי לשמור על תנופה
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
