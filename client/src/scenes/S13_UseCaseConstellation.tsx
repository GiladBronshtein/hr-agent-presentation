import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const USE_CASES = [
  { id: 'recruiting', icon: '📋', label: 'פתיחת משרה', trigger: 'בקשת מנהל', value: 'חבילה מלאה לאישור', color: '#6366F1' },
  { id: 'candidate', icon: '🎯', label: 'חוויית מועמד', trigger: 'עיכוב בתהליך', value: 'עדכון מותאם', color: '#10B981' },
  { id: 'onboarding', icon: '👋', label: 'קליטת עובד', trigger: 'הצעה אושרה', value: 'תוכנית מאושרת', color: '#F43F5E' },
  { id: 'manager', icon: '👔', label: 'הכנת מנהלים', trigger: 'לפני 1:1', value: 'סדר יום מוכן', color: '#F59E0B' },
  { id: 'learning', icon: '📚', label: 'למידה', trigger: 'צורך מוגדר', value: 'מסלול מותאם', color: '#A78BFA' },
  { id: 'service', icon: '💬', label: 'שירות עובדים', trigger: 'שאלת עובד', value: 'תשובה עם מקור', color: '#22D3EE' },
  { id: 'skills', icon: '⭐', label: 'מיומנויות', trigger: 'פרופיל עובד', value: 'הזדמנות מותאמת', color: '#10B981' },
  { id: 'insights', icon: '🔍', label: 'תובנות ארגוניות', trigger: 'סקר / שיחת סיום', value: 'דפוסים מצרפיים', color: '#6366F1' },
  { id: 'knowledge', icon: '🧠', label: 'שימור ידע', trigger: 'עובד עוזב', value: 'ידע מתועד', color: '#F59E0B' },
];

export default function S13_UseCaseConstellation() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = USE_CASES.find(u => u.id === selected);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-7xl space-y-8">
          <div className="text-center">
            <SceneTitle size="md">תשעה אייג׳נטים</SceneTitle>
            <p className="text-white/40 text-3xl mt-2">לחצו על אייג׳נט לפרטים</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-5">
            {USE_CASES.map((uc) => (
              <button key={uc.id} onClick={() => setSelected(selected === uc.id ? null : uc.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all duration-200"
                style={{
                  background: selected === uc.id ? uc.color + '15' : 'rgba(255,255,255,0.04)',
                  border: selected === uc.id ? `1px solid ${uc.color}40` : '1px solid rgba(255,255,255,0.08)',
                  transform: selected === uc.id ? 'scale(1.05)' : undefined,
                }}>
                <span className="text-4xl">{uc.icon}</span>
                <span className="text-3xl font-medium" style={{ color: selected === uc.id ? uc.color : 'rgba(255,255,255,0.6)' }}>{uc.label}</span>
              </button>
            ))}
          </div>
          {sel && (
            <div className="p-7 rounded-xl animate-fade-in grid grid-cols-3 gap-6"
              style={{ background: sel.color + '10', border: `1px solid ${sel.color}25` }}>
              <div>
                <p className="text-white/40 text-3xl mb-1">טריגר</p>
                <p className="text-white/80 text-3xl font-medium">{sel.trigger}</p>
              </div>
              <div>
                <p className="text-white/40 text-3xl mb-1">אייג׳נט</p>
                <p className="text-white/80 text-3xl font-medium">{sel.label}</p>
              </div>
              <div>
                <p className="text-white/40 text-3xl mb-1">ערך</p>
                <p className="text-white/80 text-3xl font-medium">{sel.value}</p>
              </div>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
