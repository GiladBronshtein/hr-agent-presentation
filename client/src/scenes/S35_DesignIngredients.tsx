import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const INGREDIENTS = [
  { icon: '📋', title: 'System Prompt', desc: 'זהות, מטרה, גבולות, סגנון תקשורת', example: 'אתה אייג׳נט קליטה של [חברה]. תפקידך...' },
  { icon: '📚', title: 'Knowledge Base', desc: 'מסמכים מאושרים, מדיניות, תהליכים', example: 'Employee Handbook v3.2, Onboarding Playbook' },
  { icon: '🔧', title: 'Tool Definitions', desc: 'כלים מורשים עם הרשאות מוגדרות', example: 'calendar.create (read+write), hris (read-only)' },
  { icon: '✋', title: 'Approval Gates', desc: 'מתי לעצור ולבקש אישור אנושי', example: 'לפני שליחת מייל, לפני שינוי HRIS' },
  { icon: '💾', title: 'Memory Schema', desc: 'מה לזכור בין שיחות', example: 'employee_id, stage, completed_steps[]' },
  { icon: '📊', title: 'Evaluation Criteria', desc: 'איך מודדים הצלחה', example: 'דיוק, זמן, שביעות רצון, אי-חריגה' },
];

export default function S35_DesignIngredients() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">מרכיבי העיצוב</SceneTitle>
            <p className="text-white/50 mt-2 text-3xl">שישה מרכיבים שכל אייג׳נט HR צריך</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {INGREDIENTS.map((ing, i) => (
              <GlassCard key={i}>
                <div className="text-3xl mb-2">{ing.icon}</div>
                <h3 className="text-white font-bold text-3xl mb-1">{ing.title}</h3>
                <p className="text-white/50 text-3xl mb-2 leading-relaxed">{ing.desc}</p>
                <div className="p-2 rounded-lg text-3xl font-mono"
                  style={{ background: 'rgba(99,102,241,0.06)', color: 'rgba(99,102,241,0.7)', border: '1px solid rgba(99,102,241,0.12)' }}>
                  {ing.example}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
