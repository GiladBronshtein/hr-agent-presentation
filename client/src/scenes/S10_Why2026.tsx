import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle, GlassCard, AnimatedNumber } from '../components/presentation/SceneBase';
import { ArrowLeft, Bot, Handshake, Users } from 'lucide-react';
import { SourceChip } from '../components/presentation/SourceChip';
import { accentFor } from '../components/presentation/SceneBase';
import { PALETTE, alpha, textOn } from '../lib/palette';

/** This slide's chapter accent (fills) and its text-safe tint */
const { c: ACC, t: ACC_T } = accentFor('why-2026');

// Every number carries a SourceChip; the sources live in data/sources/main.ts.
const STATS = [
  { value: 39, suffix: '%', label: 'מהמיומנויות המרכזיות של העובדים צפויות להשתנות עד 2030', color: PALETTE.amber, sourceId: 'wef-foj-2025' },
  { value: 81, suffix: '%', label: 'מהמנהלים מצפים שאייג׳נטים ישתלבו באסטרטגיית ה‑AI תוך 12 עד 18 חודשים', color: textOn(PALETTE.magenta), sourceId: 'microsoft-wti-2025' },
  { value: 80, suffix: '%', label: 'מהאנשים רוצים ללמוד איך להשתמש ב‑AI במקצוע שלהם', color: PALETTE.teal, sourceId: 'linkedin-wlr-2024' },
];

const SHIFTS = [
  { from: 'צ׳אט שעונה על שאלות', to: 'אייג׳נט שמבצע משימה', icon: Bot },
  { from: 'כל אחד מנסה לבד', to: 'תהליך מוסכם בצוות', icon: Users },
  { from: 'פרויקט של IT', to: 'שותפות של L&D ו-IT', icon: Handshake },
];

export default function S10_Why2026() {
  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">למה דווקא עכשיו?</SceneTitle>
            <SceneSubtitle>האתגר הוא לא "להשתמש ב-AI", אלא לשנות את הדרך שבה למידה נבנית ומופעלת</SceneSubtitle>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {STATS.map((stat, i) => (
              <GlassCard key={i} className="text-center mo-rise" style={{ '--fx-c': stat.color, '--fx-sheen-delay': `${1.2 + i * 0.15}s`, animationDelay: `${0.15 + i * 0.08}s`, display: 'flex', flexDirection: 'column', alignItems: 'center', background: `radial-gradient(90% 70% at 50% 0%, ${alpha(stat.color, 0.16)}, transparent 70%), rgba(12,17,50,0.62)` } as React.CSSProperties}>
                <div className="font-black mb-2 fx-glow-text" style={{ '--fx-c': stat.color, color: stat.color, fontSize: 'clamp(4rem, 7cqw, 7rem)', lineHeight: 1, fontFamily: "'Space Grotesk', 'Heebo', sans-serif" } as React.CSSProperties}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} color={stat.color} />
                </div>
                <p className="text-white/80 text-3xl leading-relaxed mb-3" style={{ textWrap: 'balance' } as React.CSSProperties}>{stat.label}</p>
                <SourceChip id={stat.sourceId} style={{ marginTop: 'auto' }} />
              </GlassCard>
            ))}
          </div>
          <div className="space-y-3">
            <SceneEyebrow>השינוי הנדרש</SceneEyebrow>
            {SHIFTS.map((shift, i) => (
              <div key={i} className="flex items-center gap-6 p-3 rounded-xl fx-glass mo-rise"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <span className="text-3xl" style={{ display: 'inline-flex', color: ACC_T, filter: `drop-shadow(0 0 8px ${alpha(ACC, 0.7)})` }}><shift.icon size="1em" /></span>
                <span className="text-white/70 text-3xl mo-strike" style={{ '--mo-strike-delay': `${0.7 + i * 0.12}s` } as React.CSSProperties}>{shift.from}</span>
                <ArrowLeft aria-hidden size={32} strokeWidth={2.25} className="shrink-0" style={{ color: ACC_T }} />
                <span className="text-3xl font-semibold mo-rise-sm" style={{ animationDelay: `${0.9 + i * 0.12}s`, color: '#F6F2EA' }}>{shift.to}</span>
              </div>
            ))}
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
