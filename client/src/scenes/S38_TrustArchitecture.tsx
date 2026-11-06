import { BookCheck, KeyRound, ScrollText, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

/** Six layers, top to bottom; the foundation (approved sources) lands first */
const LAYERS = [
  { icon: ScrollText, layer: 'תיעוד', rule: 'כל פעולה נרשמת, ואפשר לחזור אחורה', example: 'מי אישר, מתי ומאיזה מקור', color: '#F3EEE4' },
  { icon: Scale, layer: 'דיוק והטיה', rule: 'בודקים עובדות ומגוון בדוגמאות', example: 'לא כל תרחיש עם אותה דמות', color: '#F2A93B' },
  { icon: ShieldCheck, layer: 'פרטיות של מי שלומד', rule: 'נתונים מצטברים, בלי מעקב אישי', example: 'ציוני חידון לא עוברים בשמות', color: '#8A93A8' },
  { icon: UserCheck, layer: 'אישור אנושי', rule: 'לפני פרסום, רישום לקורס או שליחה', example: 'מומחה תוכן מאשר כל יחידה', color: '#F2A93B' },
  { icon: KeyRound, layer: 'הרשאות', rule: 'רק מה שהמשימה צריכה', example: 'קורא ציונים, לא משנה אותם', color: '#F2A93B' },
  { icon: BookCheck, layer: 'מקורות מאושרים', rule: 'רק חומרים שהצוות אישר', example: 'החידון נבנה ממסמך המוצר הרשמי', color: '#F2A93B' },
];

export default function S38_TrustArchitecture() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full" style={{ maxWidth: '86rem', display: 'flex', flexDirection: 'column', gap: 'clamp(1.25rem,2.4cqw,2.5rem)' }}>
          <div>
            <SceneTitle size="md">אמון וגבולות</SceneTitle>
            <SceneSubtitle>אמון בתוכן למידה נבנה בשכבות, לא בהצהרות</SceneSubtitle>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.45rem,0.8cqw,0.75rem)' }}>
            {LAYERS.map((l, i) => (
              <div key={l.layer} className="flex items-center rounded-xl mo-rise"
                style={{
                  gap: 'clamp(0.9rem,1.6cqw,1.6rem)', padding: 'clamp(0.6rem,1cqw,1rem) clamp(1rem,1.6cqw,1.6rem)',
                  background: l.color + '08', border: `1px solid ${l.color}22`,
                  animationDelay: `${0.2 + (LAYERS.length - 1 - i) * 0.08}s`,
                }}>
                <span className="shrink-0 inline-flex" style={{ color: textTint(l.color), fontSize: 'clamp(1.4rem, 2cqw, 2.1rem)' }}><l.icon size="1em" /></span>
                <span className="font-bold shrink-0" style={{ color: textTint(l.color), fontSize: 'clamp(1.25rem, 1.75cqw, 1.9rem)', width: 'clamp(11rem, 18cqw, 20rem)', whiteSpace: 'nowrap' }}>{l.layer}</span>
                <span className="flex-1 text-white/85" style={{ fontSize: 'clamp(1.15rem, 1.55cqw, 1.7rem)', lineHeight: 1.35 }}>{l.rule}</span>
                <span className="shrink-0 rounded-lg" style={{
                  padding: '0.2rem 0.75rem', fontSize: 'clamp(1.05rem, 1.25cqw, 1.45rem)', lineHeight: 1.4,
                  background: l.color + '14', color: textTint(l.color), border: `1px solid ${l.color}30`,
                  width: 'clamp(12rem, 21cqw, 24rem)', textAlign: 'center',
                }}>
                  {l.example}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-xl text-center mo-rise" style={{ padding: 'clamp(0.9rem,1.4cqw,1.4rem)', background: 'rgba(243,238,228,0.04)', border: '1px solid rgba(243,238,228,0.08)', animationDelay: '0.8s' }}>
            <p className="text-white/70" style={{ fontSize: 'clamp(1.2rem, 1.7cqw, 1.85rem)', margin: 0 }}>
              האייג׳נט מציע. <strong className="text-white">אנשי ה-L&D מחליטים, והכול מתועד.</strong>
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
