/**
 * S06 (appendix): a crisp one-paragraph definition plus one tiny L&D example.
 * Deliberately does not list the seven parts (that is `anatomy`) or compare
 * with automation (that is `automation-vs-agent`).
 */
import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, Takeaway } from '../components/presentation/SceneBase';
import { ClipboardCheck, Hand, ListChecks, MessageSquareText } from 'lucide-react';

const STEPS = [
  { icon: ListChecks, text: 'בודק ב-LMS מי כבר עבר את התוכן' },
  { icon: ClipboardCheck, text: 'מכין שלוש שאלות בדיקה קצרות' },
  { icon: MessageSquareText, text: 'מנסח הודעה לצוות עם קישור' },
  { icon: Hand, text: 'עוצר לאישור לפני שליחה' },
];

const bodyFont = "'Heebo', sans-serif";

export default function S06_Definition() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(1.25rem, 3cqh, 2.25rem)' }}>
          <div className="text-center">
            <SceneEyebrow>הגדרה</SceneEyebrow>
            <SceneTitle size="md">מהו אייג׳נט?</SceneTitle>
          </div>

          <div className="mo-rise" style={{ animationDelay: '0.15s', width: '100%', padding: 'clamp(1.25rem, 2.4cqw, 2.25rem)', borderRadius: '20px', textAlign: 'center', background: 'rgba(243,238,228,0.08)', border: '1px solid rgba(243,238,228,0.2)' }}>
            <p style={{ fontFamily: bodyFont, color: '#F3EEE4', fontWeight: 500, fontSize: 'clamp(1.5rem, 2.3cqw, 2.6rem)', lineHeight: 1.5, margin: 0, textWrap: 'balance' } as React.CSSProperties}>
              תוכנה שמקבלת <span style={{ color: '#F2A93B' }}>מטרה</span>,{' '}
              מבינה את <span style={{ color: '#F2A93B' }}>המצב</span>,{' '}
              בוחרת <span style={{ color: '#F2A93B' }}>צעדים</span>{' '}
              ומפעילה <span style={{ color: '#8A93A8' }}>כלים</span> כדי להגיע אליה, ועוצרת לאישור של אדם כשצריך.
            </p>
          </div>

          {/* One tiny L&D example */}
          <div className="mo-rise" style={{ animationDelay: '0.35s', width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.6cqh, 1.1rem)' }}>
            <p style={{ fontFamily: bodyFont, fontSize: 'clamp(1.15rem, 1.5cqw, 1.75rem)', color: 'rgba(243,238,228,0.75)', margin: 0, textAlign: 'center' }}>
              <strong style={{ color: '#F3EEE4' }}>דוגמה:</strong> "צוות השירות מכיר את מדיניות ההחזרות החדשה עד יום חמישי"
            </p>
            <div className="grid grid-cols-4" style={{ gap: 'clamp(0.6rem, 1.1cqw, 1rem)' }}>
              {STEPS.map((step, i) => (
                <div key={step.text} className="mo-rise-sm" style={{
                  animationDelay: `${0.5 + i * 0.1}s`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center',
                  padding: 'clamp(0.875rem, 1.6cqh, 1.25rem) clamp(0.75rem, 1.1cqw, 1rem)',
                  borderRadius: '14px',
                  background: i === STEPS.length - 1 ? 'rgba(242,169,59,0.08)' : 'rgba(243,238,228,0.04)',
                  border: i === STEPS.length - 1 ? '1px solid rgba(242,169,59,0.3)' : '1px solid rgba(243,238,228,0.08)',
                }}>
                  <span style={{ display: 'inline-flex', fontSize: 'clamp(1.4rem, 2cqw, 2rem)', color: i === STEPS.length - 1 ? '#F2A93B' : 'rgba(243,238,228,0.7)' }}><step.icon size="1em" /></span>
                  <span style={{ fontFamily: bodyFont, fontSize: 'clamp(1.05rem, 1.3cqw, 1.5rem)', color: 'rgba(243,238,228,0.82)', lineHeight: 1.35, textWrap: 'balance' } as React.CSSProperties}>{step.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mo-rise" style={{ animationDelay: '0.95s' }}>
            <Takeaway>צ׳אט עונה על שאלה. אייג׳נט מקדם מטרה.</Takeaway>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
