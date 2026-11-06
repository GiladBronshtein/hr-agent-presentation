import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

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
  low: { color: '#F2A93B', label: 'נמוך' },
  medium: { color: '#F2A93B', label: 'בינוני' },
  high: { color: '#8A93A8', label: 'גבוה' },
  // Blocked rows are the point of the slide: a strong red chip, not a faded one
  blocked: { color: '#8A93A8', label: 'חסום' },
};

export default function S37_Permissions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">מטריצת הרשאות</SceneTitle>
            <SceneSubtitle>מה LearnBot עושה לבד, מה מחכה לאישור, ומה אסור</SceneSubtitle>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(243,238,228,0.08)' }}>
            <div className="grid p-3 font-semibold text-white/65"
              style={{ gridTemplateColumns: COLS, fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', background: 'rgba(243,238,228,0.04)', borderBottom: '1px solid rgba(243,238,228,0.06)' }}>
              <span>פעולה</span>
              <span>סיכון</span>
              <span>לבד</span>
              <span>הערה</span>
            </div>
            {MATRIX.map((row, i) => {
              const cfg = RISK_CONFIG[row.risk as keyof typeof RISK_CONFIG];
              return (
                <div key={i} className="grid p-3 text-3xl items-center mo-rise-sm"
                  style={{ gridTemplateColumns: COLS, animationDelay: `${0.25 + i * 0.05}s`, borderBottom: i < MATRIX.length - 1 ? '1px solid rgba(243,238,228,0.04)' : 'none', background: row.risk === 'blocked' ? 'rgba(243,238,228,0.02)' : undefined }}>
                  <span className="text-white/70">{row.action}</span>
                  <span className="text-3xl px-3 py-0.5 rounded-full w-fit" style={{ background: cfg.color + '22', color: row.risk === 'blocked' ? '#8A93A8' : textTint(cfg.color), border: `1px solid ${cfg.color}${row.risk === 'blocked' ? '70' : '35'}` }}>{cfg.label}</span>
                  <span style={{ color: row.auto ? '#F2A93B' : 'rgba(243,238,228,0.5)' }}>{row.auto ? '✓' : '-'}</span>
                  <span className="text-white/70 text-3xl" style={row.risk === 'blocked' ? { color: '#8A93A8', fontWeight: 600 } : undefined}>{row.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
