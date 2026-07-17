import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

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
  blocked: { color: 'rgba(255,255,255,0.2)', label: 'חסום' },
};

export default function S37_Permissions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">מטריצת הרשאות</SceneTitle>
            <p className="text-white/60 text-3xl mt-1">מה האייג׳נט יכול לעשות, ומה אסור</p>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="grid grid-cols-4 p-3 text-3xl text-white/60 uppercase tracking-widest"
              style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span>פעולה</span>
              <span>סיכון</span>
              <span>אוטומטי</span>
              <span>הערה</span>
            </div>
            {MATRIX.map((row, i) => {
              const cfg = RISK_CONFIG[row.risk as keyof typeof RISK_CONFIG];
              return (
                <div key={i} className="grid grid-cols-4 p-3 text-3xl items-center"
                  style={{ borderBottom: i < MATRIX.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: row.risk === 'blocked' ? 'rgba(255,255,255,0.02)' : undefined }}>
                  <span className="text-white/70">{row.action}</span>
                  <span className="text-3xl px-2 py-0.5 rounded-full w-fit" style={{ background: cfg.color + '15', color: cfg.color }}>{cfg.label}</span>
                  <span style={{ color: row.auto ? '#10B981' : 'rgba(255,255,255,0.3)' }}>{row.auto ? '✓' : ' - '}</span>
                  <span className="text-white/60 text-3xl">{row.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
