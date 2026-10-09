import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const MATRIX = [
  { action: 'קריאת מדיניות', risk: 'low', auto: true, note: 'מותר תמיד' },
  { action: 'יצירת טיוטת מייל', risk: 'low', auto: true, note: 'ממתין לאישור' },
  { action: 'תיאום פגישה', risk: 'medium', auto: false, note: 'אישור נדרש' },
  { action: 'שליחת מייל', risk: 'medium', auto: false, note: 'אישור נדרש' },
  { action: 'עדכון HRIS', risk: 'high', auto: false, note: 'HR בלבד' },
  { action: 'גישה לנתוני שכר', risk: 'blocked', auto: false, note: 'אסור' },
  { action: 'מידע רפואי', risk: 'blocked', auto: false, note: 'אסור' },
  { action: 'החלטת פיטורים', risk: 'blocked', auto: false, note: 'אסור' },
];

const RISK_CONFIG = {
  low: { color: '#10B981', label: 'נמוך' },
  medium: { color: '#F59E0B', label: 'בינוני' },
  high: { color: '#F43F5E', label: 'גבוה' },
  // Blocked rows are the point of the slide: a strong red chip, not a faded one
  blocked: { color: '#E11D48', label: 'חסום' },
};

export default function S37_Permissions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">מטריצת הרשאות</SceneTitle>
            <SceneSubtitle>מה האייג׳נט יכול לעשות, ומה אסור</SceneSubtitle>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-4 p-3 font-semibold text-white/65"
              style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span>פעולה</span>
              <span>סיכון</span>
              <span>אוטומטי</span>
              <span>הערה</span>
            </div>
            {MATRIX.map((row, i) => {
              const cfg = RISK_CONFIG[row.risk as keyof typeof RISK_CONFIG];
              return (
                <div key={i} className="grid grid-cols-4 p-3 text-3xl items-center mo-rise-sm"
                  style={{ animationDelay: `${0.25 + i * 0.05}s`, borderBottom: i < MATRIX.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: row.risk === 'blocked' ? 'rgba(255,255,255,0.02)' : undefined }}>
                  <span className="text-white/70">{row.action}</span>
                  <span className="text-3xl px-3 py-0.5 rounded-full w-fit" style={{ background: cfg.color + '22', color: row.risk === 'blocked' ? '#FECDD3' : textTint(cfg.color), border: `1px solid ${cfg.color}${row.risk === 'blocked' ? '70' : '35'}` }}>{cfg.label}</span>
                  <span style={{ color: row.auto ? '#6EE7B7' : 'rgba(255,255,255,0.5)' }}>{row.auto ? '✓' : '-'}</span>
                  <span className="text-white/70 text-3xl" style={row.risk === 'blocked' ? { color: '#FDA4AF', fontWeight: 600 } : undefined}>{row.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
