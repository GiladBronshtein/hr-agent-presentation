import { useState } from 'react';
import { ArrowLeft, Drama, FilePenLine, Gauge, Library, MessageCircleQuestion, Radar, Route, ScanSearch, ShieldCheck, Sprout } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

interface Agent {
  id: string; n: number; icon: LucideIcon; label: string; color: string; main?: boolean;
  before: string; after: string; limit: string;
}

const AGENTS: Record<string, Agent> = {
  needs: { id: 'needs', n: 1, icon: ScanSearch, label: 'אבחון צרכים', color: '#F2A93B', main: true,
    before: 'בקשה להדרכה הופכת מיד לקורס', after: 'קודם מבינים את הבעיה, ואז מחליטים', limit: 'האייג׳נט ממליץ, אנשי ה-L&D מחליטים' },
  content: { id: 'content', n: 2, icon: FilePenLine, label: 'פיתוח תוכן', color: '#F2A93B', main: true,
    before: 'שבועות של ראיונות ובניית לומדה', after: 'טיוטה ראשונה לעריכה תוך יום', limit: 'מומחי תוכן מאשרים כל יחידה' },
  path: { id: 'path', n: 3, icon: Route, label: 'מסלול אישי', color: '#F2A93B', main: true,
    before: 'אותו קורס לכולם, באותו קצב', after: 'מסלול לפי הידע הקיים, עם חזרה בזמן', limit: 'ליבה משותפת לכולם' },
  impact: { id: 'impact', n: 4, icon: Gauge, label: 'מדידת אימפקט', color: '#F2A93B', main: true,
    before: 'סקר שביעות רצון, וזהו', after: 'תגובה, למידה, התנהגות ותוצאות', limit: 'קשר בין נתונים הוא לא הוכחה' },
  sim: { id: 'sim', n: 5, icon: Drama, label: 'תרגול בסימולציה', color: '#8A93A8',
    before: 'שיחה קשה מתרגלים רק בסדנה', after: 'תרגול מתי שרוצים, עם משוב מיידי', limit: 'תרגול, לא הערכה' },
  flow: { id: 'flow', n: 6, icon: MessageCircleQuestion, label: 'למידה בתוך העבודה', color: '#8A93A8',
    before: 'מחפשים בקורס שנגמר מזמן', after: 'תשובה קצרה בתוך Slack או Teams', limit: 'רק ממקורות מאושרים' },
  skills: { id: 'skills', n: 7, icon: Radar, label: 'מיפוי מיומנויות', color: '#8A93A8',
    before: 'גיליון שמתיישן תוך חודש', after: 'תמונת מיומנויות חיה', limit: 'לא כלי דירוג' },
  onboarding: { id: 'onboarding', n: 8, icon: Sprout, label: 'קליטה לומדת', color: '#8A93A8',
    before: 'כל הידע נשפך בשבוע הראשון', after: '30 יום ראשונים במנות קטנות', limit: 'לא מחליף ליווי אנושי' },
  knowledge: { id: 'knowledge', n: 9, icon: Library, label: 'שימור ידע', color: '#8A93A8',
    before: 'ידע של שנים יוצא עם מי שעוזב', after: 'ראיונות קצרים הופכים לידע שנשאר', limit: 'מי שמסר את הידע מאשר' },
};

// The learning cycle, read right to left: diagnose, plan, develop, deliver, evaluate
const STAGES: { n: string; label: string; agents: string[] }[] = [
  { n: '01', label: 'אבחון', agents: ['needs', 'skills'] },
  { n: '02', label: 'תכנון', agents: ['path'] },
  { n: '03', label: 'פיתוח', agents: ['content', 'knowledge'] },
  { n: '04', label: 'הפעלה', agents: ['sim', 'flow', 'onboarding'] },
  { n: '05', label: 'הערכה', agents: ['impact'] },
];

const TXT = "'Heebo', sans-serif";

export default function AgentMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = selected ? AGENTS[selected] : null;

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full" style={{ maxWidth: '1640px', display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem, 3cqh, 2.25rem)' }}>
          <div className="text-center">
            <SceneTitle size="md">תשעה אייג׳נטים ללמידה</SceneTitle>
            <SceneSubtitle>לפי שלבי מחזור הלמידה. לחיצה על אייג׳נט לפרטים</SceneSubtitle>
          </div>

          {/* Five stage columns, right to left */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 'clamp(0.75rem, 1.2cqw, 1.25rem)' }}>
            {STAGES.map((stage, si) => (
              <div key={stage.n} className="mo-rise" style={{ animationDelay: `${0.15 + si * 0.07}s`, display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1cqh, 0.75rem)' }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: '0.6rem',
                  paddingBottom: 'clamp(0.4rem, 0.8cqh, 0.6rem)', borderBottom: '1px solid rgba(243,238,228,0.14)',
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 1.15cqw, 1.375rem)', fontWeight: 700, color: 'rgba(243,238,228,0.45)' }}>{stage.n}</span>
                  <span style={{ fontFamily: TXT, fontSize: 'clamp(1.35rem, 1.7cqw, 2rem)', fontWeight: 800, color: '#F3EEE4' }}>{stage.label}</span>
                </div>
                {stage.agents.map((id) => {
                  const a = AGENTS[id];
                  const on = selected === id;
                  return (
                    <button key={id} onClick={() => setSelected(on ? null : id)} aria-pressed={on}
                      className="transition-all duration-200"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'right',
                        padding: 'clamp(0.75rem, 1.5cqh, 1.1rem) clamp(0.7rem, 0.9cqw, 1rem)',
                        minHeight: 'clamp(4.25rem, 9cqh, 6rem)', borderRadius: '14px', cursor: 'pointer',
                        background: on ? a.color + '22' : a.main ? a.color + '12' : 'rgba(243,238,228,0.035)',
                        border: on ? `1px solid ${a.color}` : a.main ? `1px solid ${a.color}45` : '1px solid rgba(243,238,228,0.09)',
                      }}>
                      <span style={{ display: 'inline-flex', flexShrink: 0, color: a.color, fontSize: 'clamp(1.5rem, 1.9cqw, 2.25rem)' }}><a.icon size="1em" /></span>
                      <span style={{ fontFamily: TXT, fontSize: 'clamp(1.05rem, 1.22cqw, 1.5rem)', fontWeight: 600, lineHeight: 1.2, color: on || a.main ? '#F3EEE4' : 'rgba(243,238,228,0.8)', textWrap: 'balance' } as React.CSSProperties}>{a.label}</span>
                      <span style={{ marginInlineStart: 'auto', flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.95rem, 1.05cqw, 1.25rem)', fontWeight: 700, color: a.main ? textTint(a.color) : 'rgba(243,238,228,0.45)' }}>{a.n}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Detail panel: fixed height so the grid never jumps */}
          <div style={{ minHeight: 'clamp(7.5rem, 15cqh, 10rem)', display: 'flex' }}>
            {sel ? (
              <div key={sel.id} className="mo-rise-sm" style={{
                flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1.15fr) minmax(0, 1fr)', alignItems: 'center',
                gap: 'clamp(1rem, 1.8cqw, 2rem)', padding: 'clamp(1rem, 2cqh, 1.5rem) clamp(1.25rem, 2cqw, 2rem)',
                borderRadius: '18px', background: sel.color + '10', border: `1px solid ${sel.color}35`,
              }}>
                <div>
                  <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: 'rgba(243,238,228,0.6)' }}>לפני</p>
                  <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.55cqw, 1.85rem)', color: 'rgba(243,238,228,0.72)', lineHeight: 1.3 }}>{sel.before}</p>
                </div>
                <span style={{ display: 'inline-flex', color: sel.color }}><ArrowLeft size={32} strokeWidth={2.5} /></span>
                <div>
                  <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: textTint(sel.color) }}>אחרי</p>
                  <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.55cqw, 1.85rem)', fontWeight: 700, color: '#F3EEE4', lineHeight: 1.3 }}>{sel.after}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', paddingInlineStart: 'clamp(1rem, 1.6cqw, 1.75rem)', borderInlineStart: '1px solid rgba(243,238,228,0.12)' }}>
                  <span style={{ display: 'inline-flex', flexShrink: 0, color: '#8A93A8', fontSize: 'clamp(1.2rem, 1.5cqw, 1.6rem)', marginTop: '0.15rem' }}><ShieldCheck size="1em" /></span>
                  <div>
                    <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: 'rgba(243,238,228,0.6)' }}>גבול</p>
                    <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.45cqw, 1.7rem)', color: 'rgba(243,238,228,0.85)', lineHeight: 1.3 }}>{sel.limit}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mo-rise-sm" style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(1.5rem, 3cqw, 3rem)', flexWrap: 'wrap',
                borderRadius: '18px', border: '1px dashed rgba(243,238,228,0.14)', animationDelay: '0.55s',
                fontFamily: TXT, fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)', color: 'rgba(243,238,228,0.7)',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '1.1em', height: '1.1em', borderRadius: '5px', background: 'rgba(242,169,59,0.14)', border: '1px solid #F2A93B' }} />
                  1 עד 4: בהרצאה
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '1.1em', height: '1.1em', borderRadius: '5px', background: 'rgba(243,238,228,0.035)', border: '1px solid rgba(243,238,228,0.2)' }} />
                  5 עד 9: בנספח
                </span>
              </div>
            )}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
