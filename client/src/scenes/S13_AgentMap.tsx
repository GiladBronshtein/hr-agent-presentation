import { useState } from 'react';
import { ArrowLeft, Drama, FilePenLine, Gauge, Library, MessageCircleQuestion, Radar, Route, ScanSearch, ShieldCheck, Sprout } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { CYCLE_COLORS, PALETTE, alpha, textOn } from '../lib/palette';

const textTint = textOn;

interface Agent {
  id: string; n: number; icon: LucideIcon; label: string; color: string; main?: boolean;
  before: string; after: string; limit: string;
}

const AGENTS: Record<string, Agent> = {
  // 1 to 5: the main track, in learning-cycle order
  needs: { id: 'needs', n: 1, icon: ScanSearch, label: 'אבחון צרכים', color: CYCLE_COLORS[0], main: true,
    before: 'בקשה להדרכה הופכת מיד לקורס', after: 'קודם מבינים את הבעיה, ואז מחליטים', limit: 'האייג׳נט ממליץ, אנשי ה-L&D מחליטים' },
  path: { id: 'path', n: 2, icon: Route, label: 'מסלול אישי', color: CYCLE_COLORS[1], main: true,
    before: 'אותו קורס לכולם, באותו קצב', after: 'מסלול לפי מה שכבר יודעים, עם חזרה בזמן', limit: 'ליבה משותפת לכולם' },
  content: { id: 'content', n: 3, icon: FilePenLine, label: 'פיתוח תוכן', color: CYCLE_COLORS[2], main: true,
    before: 'שבועות של ראיונות ובניית לומדה', after: 'טיוטה ראשונה לעריכה תוך יום', limit: 'מומחי תוכן מאשרים כל יחידה' },
  sim: { id: 'sim', n: 4, icon: Drama, label: 'תרגול בסימולציה', color: CYCLE_COLORS[3], main: true,
    before: 'שיחה קשה מתרגלים רק בסדנה', after: 'תרגול מתי שרוצים, עם משוב מיידי', limit: 'תרגול, לא הערכה' },
  impact: { id: 'impact', n: 5, icon: Gauge, label: 'מדידת אימפקט', color: CYCLE_COLORS[4], main: true,
    before: 'סקר שביעות רצון, וזהו', after: 'תגובה, למידה, התנהגות ותוצאות', limit: 'קשר בין נתונים הוא לא הוכחה' },
  // 6 to 9: the appendix
  flow: { id: 'flow', n: 6, icon: MessageCircleQuestion, label: 'למידה בתוך העבודה', color: CYCLE_COLORS[3],
    before: 'מחפשים בקורס שנגמר מזמן', after: 'תשובה קצרה בתוך Slack או Teams', limit: 'רק ממקורות מאושרים' },
  skills: { id: 'skills', n: 7, icon: Radar, label: 'מיפוי מיומנויות', color: CYCLE_COLORS[0],
    before: 'גיליון שמתיישן תוך חודש', after: 'תמונת מיומנויות חיה', limit: 'לא כלי דירוג' },
  onboarding: { id: 'onboarding', n: 8, icon: Sprout, label: 'קליטה לומדת', color: CYCLE_COLORS[3],
    before: 'כל הידע נשפך בשבוע הראשון', after: '30 יום ראשונים במנות קטנות', limit: 'לא מחליף ליווי אנושי' },
  knowledge: { id: 'knowledge', n: 9, icon: Library, label: 'שימור ידע', color: CYCLE_COLORS[2],
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
                  display: 'flex', alignItems: 'baseline', gap: '0.6rem', position: 'relative',
                  paddingBottom: 'clamp(0.4rem, 0.8cqh, 0.6rem)', borderBottom: '1px solid rgba(246,242,234,0.1)',
                }}>
                  <span aria-hidden className="mo-grow-x-l" style={{ position: 'absolute', bottom: -1, right: 0, left: 0, height: 2, borderRadius: 2, background: `linear-gradient(270deg, ${CYCLE_COLORS[si]}, ${alpha(CYCLE_COLORS[si], 0)})`, boxShadow: `0 0 10px ${alpha(CYCLE_COLORS[si], 0.7)}`, animationDelay: `${0.35 + si * 0.07}s` }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(1rem, 1.15cqw, 1.375rem)', fontWeight: 700, color: textOn(CYCLE_COLORS[si]) }}>{stage.n}</span>
                  <span style={{ fontFamily: TXT, fontSize: 'clamp(1.35rem, 1.7cqw, 2rem)', fontWeight: 800, color: '#F6F2EA' }}>{stage.label}</span>
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
                        background: on
                          ? `linear-gradient(160deg, ${alpha(a.color, 0.34)}, ${alpha(a.color, 0.12)}), #0B1030`
                          : a.main ? `linear-gradient(160deg, ${alpha(a.color, 0.2)}, ${alpha(a.color, 0.06)}), rgba(12,17,50,0.7)` : 'rgba(12,17,50,0.55)',
                        border: on ? `1px solid ${a.color}` : a.main ? `1px solid ${alpha(a.color, 0.5)}` : `1px dashed ${alpha(a.color, 0.4)}`,
                        boxShadow: on ? `0 0 34px -6px ${alpha(a.color, 0.85)}` : a.main ? `0 0 26px -14px ${alpha(a.color, 0.9)}` : 'none',
                        transform: on ? 'translateY(-2px)' : 'none',
                      }}>
                      <span style={{ display: 'inline-flex', flexShrink: 0, color: textOn(a.color), fontSize: 'clamp(1.5rem, 1.9cqw, 2.25rem)', filter: on ? `drop-shadow(0 0 10px ${a.color})` : 'none' }}><a.icon size="1em" /></span>
                      <span style={{ fontFamily: TXT, fontSize: 'clamp(1.05rem, 1.22cqw, 1.5rem)', fontWeight: 600, lineHeight: 1.2, color: on || a.main ? '#F6F2EA' : 'rgba(246,242,234,0.84)', textWrap: 'balance' } as React.CSSProperties}>{a.label}</span>
                      <span style={{ marginInlineStart: 'auto', flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.95rem, 1.05cqw, 1.25rem)', fontWeight: 700, color: a.main ? textTint(a.color) : PALETTE.muted }}>{a.n}</span>
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
                borderRadius: '18px',
                background: `linear-gradient(160deg, ${alpha(sel.color, 0.15)}, ${alpha(sel.color, 0.03)} 60%), rgba(12,17,50,0.7)`,
                border: `1px solid ${alpha(sel.color, 0.45)}`,
                boxShadow: `0 0 60px -26px ${sel.color}`,
              }}>
                <div>
                  <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: PALETTE.muted }}>לפני</p>
                  <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.55cqw, 1.85rem)', color: 'rgba(246,242,234,0.78)', lineHeight: 1.3 }}>{sel.before}</p>
                </div>
                <span style={{ display: 'inline-flex', color: textOn(sel.color), filter: `drop-shadow(0 0 8px ${sel.color})` }}><ArrowLeft size={32} strokeWidth={2.5} /></span>
                <div>
                  <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: textTint(sel.color) }}>אחרי</p>
                  <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.55cqw, 1.85rem)', fontWeight: 700, color: '#F6F2EA', lineHeight: 1.3 }}>{sel.after}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', paddingInlineStart: 'clamp(1rem, 1.6cqw, 1.75rem)', borderInlineStart: '1px solid rgba(246,242,234,0.12)' }}>
                  <span style={{ display: 'inline-flex', flexShrink: 0, color: PALETTE.amber, fontSize: 'clamp(1.2rem, 1.5cqw, 1.6rem)', marginTop: '0.15rem' }}><ShieldCheck size="1em" /></span>
                  <div>
                    <p style={{ margin: 0, fontFamily: TXT, fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 600, color: PALETTE.muted }}>גבול</p>
                    <p style={{ margin: '0.25rem 0 0', fontFamily: TXT, fontSize: 'clamp(1.2rem, 1.45cqw, 1.7rem)', color: 'rgba(246,242,234,0.85)', lineHeight: 1.3 }}>{sel.limit}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mo-rise-sm" style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(1.5rem, 3cqw, 3rem)', flexWrap: 'wrap',
                borderRadius: '18px', border: '1px dashed rgba(246,242,234,0.16)', animationDelay: '0.55s',
                background: 'rgba(12,17,50,0.4)',
                fontFamily: TXT, fontSize: 'clamp(1.1rem, 1.3cqw, 1.55rem)', color: 'rgba(246,242,234,0.8)',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '1.1em', height: '1.1em', borderRadius: '5px', background: `linear-gradient(135deg, ${alpha(CYCLE_COLORS[0], 0.4)}, ${alpha(CYCLE_COLORS[4], 0.4)})`, border: '1px solid rgba(246,242,234,0.5)' }} />
                  1 עד 5: בהרצאה
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '1.1em', height: '1.1em', borderRadius: '5px', background: 'rgba(12,17,50,0.55)', border: '1px dashed rgba(246,242,234,0.45)' }} />
                  6 עד 9: בנספח
                </span>
              </div>
            )}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
