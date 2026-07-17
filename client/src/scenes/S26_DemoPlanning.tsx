import { useEffect, useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';
import { usePresentationStore } from '../store/presentationStore';

const PLAN_STEPS = [
  { day: 'לפני יום ראשון', tasks: ['שלח מייל ברוך הבא', 'תאם פגישת 1:1 עם דוד', 'הזמן גישות IT'] },
  { day: 'יום ראשון', tasks: ['פגישת בוקר עם צוות', 'הדרכת כלים', 'ארוחת צהריים עם מנהל'] },
  { day: 'שבוע ראשון', tasks: ['פגישות היכרות עם stakeholders', 'קורסי חובה', 'בדיקת גישות'] },
  { day: '30 יום', tasks: ['check-in עם HR', 'סקר קליטה', 'הגדרת מטרות Q3'] },
];

export default function S26_DemoPlanning() {
  const { setDemoStep } = usePresentationStore();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    PLAN_STEPS.forEach((_, i) => {
      setTimeout(() => setVisible(i + 1), 300 + i * 600);
    });
    setTimeout(() => setDemoStep(3), 300 + PLAN_STEPS.length * 600 + 500);
  }, []);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">שלב 3</p>
            <SceneTitle size="md">תכנון</SceneTitle>
            <p className="text-white/40 text-3xl mt-1">האייג׳נט בונה תוכנית קליטה מותאמת</p>
          </div>
          <div className="space-y-3">
            {PLAN_STEPS.map((step, i) => (
              <div key={i} className="p-6 rounded-xl transition-all duration-500"
                style={{
                  opacity: i < visible ? 1 : 0,
                  transform: i < visible ? 'none' : 'translateY(10px)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}>
                <p className="text-white/60 text-3xl font-medium mb-2">{step.day}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tasks.map((task) => (
                    <span key={task} className="text-3xl px-2 py-1 rounded-lg"
                      style={{ background: 'rgba(99,102,241,0.1)', color: 'rgba(99,102,241,0.9)', border: '1px solid rgba(99,102,241,0.2)' }}>
                      {task}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
