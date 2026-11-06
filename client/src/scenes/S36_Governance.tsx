import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle, GlassCard } from '../components/presentation/SceneBase';
import { BookOpen, Crown, Lock, PenTool, RefreshCw, Scale, Users } from 'lucide-react';
import { textTint } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { t: ACC_T } = accentFor('governance');

const ROLES: { icon: typeof Crown; title: string; desc: string; color: string; source?: string }[] = [
  { icon: Crown, title: 'בעלים של האייג׳נט', desc: 'ראש צוות L&D. מחליט מה הוא עושה, ועוצר אותו כשצריך', color: PALETTE.amber },
  { icon: BookOpen, title: 'מומחי תוכן', desc: 'אחראים על נכונות התוכן בתחום שלהם', color: PALETTE.blue },
  { icon: PenTool, title: 'עיצוב למידה', desc: 'מטרות למידה, רמת קושי ועומס סביר', color: PALETTE.violet },
  { icon: Lock, title: 'IT ואבטחת מידע', desc: 'מאשרים חיבורים למערכות והרשאות', color: PALETTE.magenta },
  { icon: Scale, title: 'פרטיות ומשפטית', desc: 'אילו נתוני למידה נשמרים, ולכמה זמן', color: PALETTE.coral },
  { icon: Users, title: 'מי שלומד', desc: 'יודע שמדובר ב-AI, ותמיד יכול לפנות לאדם', color: PALETTE.teal, source: 'eu-ai-act-art50-2024' },
];

export default function S36_Governance() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div>
            <SceneTitle size="md">ממשל ואחריות</SceneTitle>
            <SceneSubtitle>מי אחראי על מה, כשאייג׳נט פועל בצוות הלמידה. כל תפקיד כתוב, וכולם יודעים אותו <SourceChip id="nist-ai-rmf-govern-2023" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} /></SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {ROLES.map((p, i) => (
              <GlassCard key={i} className="mo-rise" style={{ '--fx-c': p.color, '--fx-sheen-delay': `${0.8 + i * 0.08}s`, animationDelay: `${0.15 + i * 0.07}s` } as React.CSSProperties}>
                <div className="text-4xl mb-3" style={{ color: textTint(p.color), display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '1.7em', height: '1.7em', borderRadius: '0.45em', background: `linear-gradient(160deg, ${alpha(p.color, 0.32)}, ${alpha(p.color, 0.08)})`, border: `1px solid ${alpha(p.color, 0.5)}`, boxShadow: `0 0 22px -6px ${alpha(p.color, 0.75)}` }}><p.icon size="0.8em" /></div>
                <h3 className="font-bold text-3xl mb-1" style={{ color: textTint(p.color) }}>{p.title}</h3>
                <p className="text-white/80 text-3xl leading-relaxed" style={{ textWrap: 'pretty' } as React.CSSProperties}>{p.desc}</p>
                {p.source && <div style={{ marginTop: '0.5rem' }}><SourceChip id={p.source} /></div>}
              </GlassCard>
            ))}
          </div>
          <div className="p-6 rounded-xl text-center mo-rise fx-accent" style={{ animationDelay: '0.65s' }}>
            <p className="text-white/85 text-3xl" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
              <RefreshCw aria-hidden className="fx-orbit" size="1em" style={{ color: ACC_T, flexShrink: 0, animationDuration: '10s' }} />
              פעם ברבעון: מה עבד, מה השתנה, ומה צריך לעצור
            </p>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
