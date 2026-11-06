import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC } = accentFor('permissions');

const MATRIX = [
  { action: 'קריאת חומרי מוצר מאושרים', risk: 'low', auto: true, note: 'מותר תמיד' },
  { action: 'כתיבת טיוטת יחידה וחידון', risk: 'low', auto: true, note: 'נשמר כטיוטה בלבד' },
  { action: 'קריאת ציונים מצטברים', risk: 'medium', auto: true, note: 'בלי שמות' },
  { action: 'שליחת תזכורת לצוות', risk: 'medium', auto: false, note: 'אישור נדרש' },
  { action: 'רישום לקורס ב-LMS', risk: 'medium', auto: false, note: 'אישור נדרש' },
  { action: 'פרסום יחידה ב-LMS', risk: 'high', auto: false, note: 'מומחה תוכן מאשר' },
  { action: 'ציונים אישיים לראש הצוות', risk: 'blocked', auto: false, note: 'אסור' },
  { action: 'החלטה על הסמכה לפי ציון', risk: 'blocked', auto: false, note: 'אסור, החלטה אנושית' },
];

const COLS = '2.2fr 1fr 0.6fr 1.6fr';

const RISK_CONFIG = {
  // a traffic light of risk: teal, amber, coral; blocked is the strongest chip
  low: { color: PALETTE.teal, label: 'נמוך' },
  medium: { color: PALETTE.amber, label: 'בינוני' },
  high: { color: PALETTE.coral, label: 'גבוה' },
  blocked: { color: PALETTE.magenta, label: 'חסום' },
};

export default function S37_Permissions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">מטריצת הרשאות</SceneTitle>
            <SceneSubtitle>מה LearnBot עושה לבד, מה מחכה לאישור, ומה אסור. רק ההרשאות שהמשימה צריכה <SourceChip id="owasp-excessive-agency-2025" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} /></SceneSubtitle>
          </div>
          <div className="rounded-xl overflow-hidden fx-glass" style={{ borderRadius: '16px' }}>
            <div className="grid p-3 font-semibold text-white/80"
              style={{ gridTemplateColumns: COLS, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', background: `linear-gradient(270deg, ${alpha(ACC, 0.16)}, rgba(246,242,234,0.03))`, borderBottom: `1px solid ${alpha(ACC, 0.3)}` }}>
              <span>פעולה</span>
              <span>סיכון</span>
              <span>לבד</span>
              <span>הערה</span>
            </div>
            {MATRIX.map((row, i) => {
              const cfg = RISK_CONFIG[row.risk as keyof typeof RISK_CONFIG];
              return (
                <div key={i} className="grid p-3 text-3xl items-center mo-rise-sm"
                  style={{ gridTemplateColumns: COLS, animationDelay: `${0.25 + i * 0.05}s`, borderBottom: i < MATRIX.length - 1 ? '1px solid rgba(246,242,234,0.06)' : 'none', background: row.risk === 'blocked' ? `linear-gradient(270deg, ${alpha(PALETTE.magenta, 0.1)}, transparent 70%)` : undefined }}>
                  <span className="text-white/85">{row.action}</span>
                  <span className="text-3xl px-3 py-0.5 rounded-full w-fit" style={{ background: alpha(cfg.color, row.risk === 'blocked' ? 0.24 : 0.15), color: textTint(cfg.color), border: `1px solid ${alpha(cfg.color, row.risk === 'blocked' ? 0.7 : 0.4)}`, boxShadow: row.risk === 'blocked' ? `0 0 18px -4px ${alpha(cfg.color, 0.8)}` : 'none' }}>{cfg.label}</span>
                  <span style={{ color: row.auto ? PALETTE.teal : 'rgba(246,242,234,0.6)', textShadow: row.auto ? `0 0 10px ${alpha(PALETTE.teal, 0.7)}` : 'none' }}>{row.auto ? '✓' : '-'}</span>
                  <span className="text-white/80 text-3xl" style={row.risk === 'blocked' ? { color: textTint(PALETTE.magenta), fontWeight: 600 } : undefined}>{row.note}</span>
                </div>
              );
            })}
          </div>
          <p className="text-center mo-rise" style={{ margin: 0, color: 'rgba(246,242,234,0.82)', fontSize: 'clamp(1.1rem, 1.35cqw, 1.6rem)', animationDelay: '0.7s' }}>
            למה הסמכה היא החלטה אנושית? ב-EU AI Act, AI שמעריך ביצועים של עובדים מוגדר בסיכון גבוה
            <SourceChip id="eu-ai-act-annex3-2024" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} />
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
