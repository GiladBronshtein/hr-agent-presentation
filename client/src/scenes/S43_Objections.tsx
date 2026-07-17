import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const OBJECTIONS = [
  {
    q: '"אין לנו IT לזה"',
    a: 'n8n ו-Make מאפשרים בנייה ללא קוד. פיילוט ראשון, שבועיים עם שני אנשים.',
  },
  {
    q: '"עובדים יפחדו מ-AI"',
    a: 'שקיפות פותרת פחד. כשעובד יודע שהאייג׳נט עוזר לו, לא מחליף, הוא שותף.',
  },
  {
    q: '"מה עם פרטיות?"',
    a: 'הרשאות מינימליות + Audit Log + אישור אנושי. יותר בטוח מאשר מייל ידני.',
  },
  {
    q: '"זה יקר"',
    a: 'פיילוט ראשון: ~$50/חודש בכלים. ROI נמדד בשבועות.',
  },
  {
    q: '"מה אם האייג׳נט טועה?"',
    a: 'לכן יש Approval Gates. האייג׳נט מציע, האדם מחליט.',
  },
  {
    q: '"ה-CISO לא יאשר"',
    a: 'הציגו את ארכיטקטורת האמון: הרשאות מוגדרות, תיעוד מלא, ביקורת תקופתית.',
  },
];

export default function S43_Objections() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-6xl space-y-8">
          <div>
            <SceneTitle size="md">התנגדויות נפוצות</SceneTitle>
            <p className="text-white/40 text-3xl mt-1">לחצו לתשובות</p>
          </div>
          <div className="space-y-2">
            {OBJECTIONS.map((obj, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-200"
                style={{ border: open === i ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-right"
                  style={{ background: open === i ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.03)' }}>
                  <span className="text-white/80 text-3xl font-medium">{obj.q}</span>
                  <span className="text-white/30 text-3xl">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-4 animate-fade-in">
                    <p className="text-white/60 text-3xl leading-relaxed">{obj.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
