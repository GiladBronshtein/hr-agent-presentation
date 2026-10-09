import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { CODE_FONT } from '../lib/typeTokens';
import { BarChart3, BookOpen, ClipboardList, Database, Hand, Wrench } from 'lucide-react';

const INGREDIENTS = [
  { icon: ClipboardList, title: 'System Prompt', desc: 'זהות, מטרה, גבולות, סגנון תקשורת', example: 'אתה אייג׳נט קליטה של [חברה]. תפקידך...' },
  { icon: BookOpen, title: 'Knowledge Base', desc: 'מסמכים מאושרים, מדיניות, תהליכים', example: 'Employee Handbook v3.2, Onboarding Playbook' },
  { icon: Wrench, title: 'Tool Definitions', desc: 'כלים מורשים עם הרשאות מוגדרות', example: 'calendar.create (read+write), hris (read‑only)' },
  { icon: Hand, title: 'Approval Gates', desc: 'מתי לעצור ולבקש אישור אנושי', example: 'לפני שליחת מייל, לפני שינוי HRIS' },
  { icon: Database, title: 'Memory Schema', desc: 'מה לזכור בין שיחות', example: 'employee_id, stage, completed_steps[]' },
  { icon: BarChart3, title: 'Evaluation Criteria', desc: 'איך למדוד הצלחה', example: 'דיוק, זמן, שביעות רצון, אי-חריגה' },
];

export default function S35_DesignIngredients() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4cqw,4rem)' }}>
          <div>
            <SceneTitle size="md">מרכיבי העיצוב</SceneTitle>
            <SceneSubtitle>שישה מרכיבים שכל אייג׳נט HR צריך</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3" style={{ gap: 'clamp(1.25rem,2.5cqw,2.5rem)' }}>
            {INGREDIENTS.map((ing, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.2 + i * 0.06}s` }}>
                <div className="text-3xl mb-2" style={{ color: '#A5B4FC' }}><ing.icon size="1em" /></div>
                <h3 className="text-white font-bold text-3xl mb-1">{ing.title}</h3>
                <p className="text-white/70 text-3xl mb-3 leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{ing.desc}</p>
                {/* Code chip: direction follows its content, so Latin code stays LTR
                    (no "[]completed_steps") and Hebrew examples stay RTL */}
                <div dir="auto" className="rounded-lg"
                  style={{ padding: '0.5rem 0.75rem', fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', lineHeight: 1.5, textAlign: 'start', background: 'rgba(99,102,241,0.08)', color: '#C7D2FE', border: '1px solid rgba(99,102,241,0.2)' }}>
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
