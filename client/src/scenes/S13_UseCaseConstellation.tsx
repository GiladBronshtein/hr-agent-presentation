import { useState } from 'react';
import { BookOpen, Brain, Briefcase, ClipboardList, MessageCircle, Search, Star, Target, UserPlus } from 'lucide-react';
import { SceneBase, ContentLayout, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { textTint } from '../lib/typeTokens';

const USE_CASES = [
  { id: 'recruiting', icon: ClipboardList, label: 'פתיחת משרה', trigger: 'בקשת גיוס', value: 'חבילה מלאה לאישור', color: '#6366F1' },
  { id: 'candidate', icon: Target, label: 'חוויית מועמדות', trigger: 'עיכוב בתהליך', value: 'עדכון מותאם', color: '#10B981' },
  { id: 'onboarding', icon: UserPlus, label: 'קליטה', trigger: 'הצעה אושרה', value: 'תוכנית מאושרת', color: '#F43F5E' },
  { id: 'manager', icon: Briefcase, label: 'הכנת שיחות ניהול', trigger: 'לפני 1:1', value: 'סדר יום מוכן', color: '#F59E0B' },
  { id: 'learning', icon: BookOpen, label: 'למידה', trigger: 'צורך מוגדר', value: 'מסלול מותאם', color: '#A78BFA' },
  { id: 'service', icon: MessageCircle, label: 'שירות HR', trigger: 'שאלה מהצוות', value: 'תשובה עם מקור', color: '#22D3EE' },
  { id: 'skills', icon: Star, label: 'מיומנויות', trigger: 'פרופיל מיומנויות', value: 'הזדמנות מותאמת', color: '#10B981' },
  { id: 'insights', icon: Search, label: 'תובנות ארגוניות', trigger: 'סקר / שיחת סיום', value: 'דפוסים מצרפיים', color: '#6366F1' },
  { id: 'knowledge', icon: Brain, label: 'שימור ידע', trigger: 'עזיבה', value: 'ידע מתועד', color: '#F59E0B' },
];

export default function S13_UseCaseConstellation() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = USE_CASES.find(u => u.id === selected);

  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">תשעה אייג׳נטים</SceneTitle>
            <SceneSubtitle>לחיצה על אייג׳נט לפרטים</SceneSubtitle>
          </div>
          {/* 5 + 4 tiles: the second row is centered, not left hanging */}
          <div className="flex flex-wrap justify-center gap-5">
            {USE_CASES.map((uc, i) => (
              <button key={uc.id} onClick={() => setSelected(selected === uc.id ? null : uc.id)}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-xl text-center transition-all duration-200 mo-rise"
                style={{
                  width: 'calc((100% - 5rem) / 5)',
                  minHeight: 'clamp(120px, 16cqh, 172px)',
                  animationDelay: `${0.2 + i * 0.045}s`,
                  background: selected === uc.id ? uc.color + '15' : 'rgba(255,255,255,0.04)',
                  border: selected === uc.id ? `1px solid ${uc.color}40` : '1px solid rgba(255,255,255,0.08)',
                  transform: selected === uc.id ? 'scale(1.05)' : undefined,
                }}>
                <span style={{ fontSize: 'clamp(2rem, 2.6cqw, 3rem)', display: 'inline-flex', color: selected === uc.id ? uc.color : 'rgba(255,255,255,0.75)' }}><uc.icon size="1em" /></span>
                <span className="text-3xl font-medium" style={{ color: selected === uc.id ? textTint(uc.color) : 'rgba(255,255,255,0.78)', textWrap: 'balance' } as React.CSSProperties}>{uc.label}</span>
              </button>
            ))}
          </div>
          {sel && (
            <div key={sel.id} className="p-7 rounded-xl mo-rise-sm grid grid-cols-3 gap-6"
              style={{ background: sel.color + '10', border: `1px solid ${sel.color}25` }}>
              <div>
                <p className="text-white/60 text-3xl mb-1">טריגר</p>
                <p className="text-white/80 text-3xl font-medium">{sel.trigger}</p>
              </div>
              <div>
                <p className="text-white/60 text-3xl mb-1">אייג׳נט</p>
                <p className="text-white/80 text-3xl font-medium">{sel.label}</p>
              </div>
              <div>
                <p className="text-white/60 text-3xl mb-1">ערך</p>
                <p className="text-white/80 text-3xl font-medium">{sel.value}</p>
              </div>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
