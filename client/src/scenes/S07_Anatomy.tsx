import { useState } from 'react';
import { SceneBase, ContentLayout, SceneTitle, GlassCard } from '../components/presentation/SceneBase';

const COMPONENTS = [
  { id: 'goal', icon: '🎯', label: 'מטרה', color: '#4F7CFF', detail: 'הגדרה ברורה של מה צריך להשיג. "עזור ל-HR" לא מספיק. "הכן תוכנית קליטה מאושרת לפני יום ראשון" — זו מטרה.' },
  { id: 'context', icon: '📚', label: 'הקשר', color: '#70D6A7', detail: 'מה האייג׳נט יודע: פרופיל תפקיד, מדריך צוות, זמינות מנהל, מדיניות ארגונית. הקשר טוב = תוצאה טובה.' },
  { id: 'model', icon: '🧠', label: 'מודל', color: '#A78BFA', detail: 'מנוע ההבנה והבחירה. Claude, GPT-4, Gemini — כל אחד עם חוזקות שונות. הבחירה תלויה במשימה.' },
  { id: 'tools', icon: '🔧', label: 'כלים', color: '#FFD166', detail: 'מה מותר לגעת בו: Google Docs, Calendar, Jira, Gmail. כל כלי מוגדר עם הרשאות ספציפיות.' },
  { id: 'memory', icon: '💾', label: 'זיכרון', color: '#22D3EE', detail: 'מה נשמר בין פעולות: מה כבר נעשה, מה עוד חסר, מה הוחלט. בלי זיכרון — האייג׳נט מתחיל מחדש בכל פעם.' },
  { id: 'limits', icon: '🚧', label: 'גבולות', color: '#FF6B6B', detail: 'מה אסור: גישה לשכר, מידע רפואי, שליחה ללא אישור, שינוי נתוני HRIS. גבולות ברורים = מערכת אמינה.' },
  { id: 'approval', icon: '✋', label: 'אישור', color: '#70D6A7', detail: 'מתי עוצרים לאדם: לפני שליחת מייל, יצירת אירוע, מתן הרשאה. Human-in-the-loop הוא עיצוב, לא פשרה.' },
];

export default function S07_Anatomy() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedComp = COMPONENTS.find(c => c.id === selected);

  return (
    <SceneBase>
      <ContentLayout>
        <div className="w-full max-w-4xl space-y-6">
          <div className="text-center">
            <SceneTitle size="md">אנטומיה של אייג׳נט</SceneTitle>
            <p className="text-white/40 text-sm mt-2">לחצו על רכיב לפרטים</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
            {COMPONENTS.map((comp) => (
              <button key={comp.id} onClick={() => setSelected(selected === comp.id ? null : comp.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl text-center transition-all duration-200"
                style={{
                  background: selected === comp.id ? comp.color + '15' : 'rgba(255,255,255,0.04)',
                  border: selected === comp.id ? `1px solid ${comp.color}40` : '1px solid rgba(255,255,255,0.08)',
                  transform: selected === comp.id ? 'scale(1.05)' : undefined,
                }}>
                <span className="text-2xl">{comp.icon}</span>
                <span className="text-xs font-bold" style={{ color: selected === comp.id ? comp.color : 'rgba(255,255,255,0.7)' }}>{comp.label}</span>
              </button>
            ))}
          </div>
          {selectedComp && (
            <div className="p-5 rounded-xl animate-fade-in" style={{ background: selectedComp.color + '10', border: `1px solid ${selectedComp.color}25` }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{selectedComp.icon}</span>
                <h3 className="font-bold text-base" style={{ color: selectedComp.color }}>{selectedComp.label}</h3>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{selectedComp.detail}</p>
            </div>
          )}
          {!selectedComp && (
            <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.15)' }}>
              <p className="text-white/50 text-sm">⚠️ חסר רכיב אחד — המערכת לא שלמה. גבולות ואישור הם הכי חשובים.</p>
            </div>
          )}
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
