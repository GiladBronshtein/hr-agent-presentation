import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const PHASES = [
  {
    phase: 'שבועות 1-2',
    title: 'הגדרה',
    color: '#6366F1',
    tasks: ['בחרו תהליך אחד', 'מפו את השלבים', 'הגדירו מה הצלחה', 'בנו System Prompt ראשון'],
  },
  {
    phase: 'שבועות 3-4',
    title: 'בנייה',
    color: '#10B981',
    tasks: ['חברו כלים (Calendar, Gmail)', 'הגדירו Approval Gates', 'בדקו עם 5 מקרים', 'תקנו ושפרו'],
  },
  {
    phase: 'שבועות 5-8',
    title: 'פיילוט',
    color: '#F59E0B',
    tasks: ['הרצו עם קבוצה קטנה', 'מדדו לפני ואחרי', 'אספו משוב', 'תעדו לקחים'],
  },
  {
    phase: 'שבועות 9-12',
    title: 'הרחבה',
    color: '#A78BFA',
    tasks: ['הרחיבו לכל הארגון', 'הוסיפו אייג׳נט שני', 'בנו תהליך ממשל', 'תכננו Q2'],
  },
];

export default function S41_Roadmap90() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">מפת דרכים 90 יום</SceneTitle>
            <p className="text-white/40 text-3xl mt-1">מהרעיון לאייג׳נט פעיל, בשלושה חודשים</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PHASES.map((phase, i) => (
              <div key={i} className="p-6 rounded-xl animate-fade-in-up"
                style={{
                  background: phase.color + '08',
                  border: `1px solid ${phase.color}20`,
                  animationDelay: `${i * 0.1}s`,
                  animationFillMode: 'both',
                  opacity: 0,
                }}>
                <p className="text-3xl text-white/40 mb-1">{phase.phase}</p>
                <h3 className="font-bold text-3xl mb-3" style={{ color: phase.color }}>{phase.title}</h3>
                <div className="space-y-1.5">
                  {phase.tasks.map((task) => (
                    <div key={task} className="flex items-start gap-2">
                      <span className="text-3xl mt-0.5" style={{ color: phase.color }}>•</span>
                      <span className="text-white/60 text-3xl leading-relaxed">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-white/30 text-3xl">
            90 יום, מספיק לראות ערך, מהיר מספיק לשמור על מומנטום
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
