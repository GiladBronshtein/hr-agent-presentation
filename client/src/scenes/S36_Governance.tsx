import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { BookOpen, Crown, Lock, PenTool, RefreshCw, Scale, Users } from 'lucide-react';
import { textTint } from '../lib/typeTokens';

const ROLES = [
  { icon: Crown, title: 'בעלים של האייג׳נט', desc: 'ראש צוות L&D. מחליט מה הוא עושה, ועוצר אותו כשצריך', color: '#F2A93B' },
  { icon: BookOpen, title: 'מומחי תוכן', desc: 'אחראים על נכונות התוכן בתחום שלהם', color: '#F2A93B' },
  { icon: PenTool, title: 'עיצוב למידה', desc: 'מטרות למידה, רמת קושי ועומס סביר', color: '#F2A93B' },
  { icon: Lock, title: 'IT ואבטחת מידע', desc: 'מאשרים חיבורים למערכות והרשאות', color: '#F2A93B' },
  { icon: Scale, title: 'פרטיות ומשפטית', desc: 'אילו נתוני למידה נשמרים, ולכמה זמן', color: '#8A93A8' },
  { icon: Users, title: 'מי שלומד', desc: 'יודע שמדובר ב-AI, ותמיד יכול לפנות לאדם', color: '#F3EEE4' },
];

export default function S36_Governance() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">ממשל ואחריות</SceneTitle>
            <SceneSubtitle>מי אחראי על מה, כשאייג׳נט פועל בצוות הלמידה</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {ROLES.map((p, i) => (
              <GlassCard key={i} className="mo-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                <div className="text-4xl mb-2" style={{ color: textTint(p.color) }}><p.icon size="1em" /></div>
                <h3 className="font-bold text-3xl mb-1" style={{ color: textTint(p.color) }}>{p.title}</h3>
                <p className="text-white/70 text-3xl leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{p.desc}</p>
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise" style={{ background: 'rgba(138,147,168,0.08)', border: '1px solid rgba(138,147,168,0.15)', animationDelay: '0.65s' }}>
            <p className="text-white/75 text-3xl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
              <RefreshCw aria-hidden size="1em" style={{ color: '#8A93A8', flexShrink: 0 }} />
              פעם ברבעון: מה עבד, מה השתנה, ומה צריך לעצור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
