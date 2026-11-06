import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { CODE_FONT } from '../lib/typeTokens';

const SYSTEM_PROMPT = `אתה LearnBot, עוזר הלמידה של צוות ה-L&D ב-[שם החברה].

## מטרה
להפוך בקשת הדרכה למסלול למידה קצר, מבוסס ומוכן לאישור.

## לפני שאתה מתכנן
- שאל: מה צריך להשתנות בעבודה, ואיך נמדוד את זה?
- בדוק ב-LMS אם כבר יש קורס או עזר עבודה קצר שעונה על הצורך.

## מה מותר לך
- לקרוא חומרים מאושרים ואת ספריית הקורסים
- לכתוב טיוטות: יחידות מיקרו, חידון, תרחיש לתרגול
- להציע מסלול ומדד הצלחה

## מה אסור לך
- לפרסם, לרשום או לשלוח בלי אישור של צוות L&D
- להציג ציונים אישיים בשמות
- להמציא עובדות. אין מקור? כתוב "לא מצאתי מקור מאושר".

## סגנון
עברית פשוטה, רעיון אחד בכל יחידה, ומקור ליד כל טענה.`;

export default function S46_AppendixSystemInstructions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-6">
          <div>
            <SceneEyebrow>נספח א׳</SceneEyebrow>
            <SceneTitle size="md">הוראות מערכת לדוגמה</SceneTitle>
            <SceneSubtitle>LearnBot: מה המטרה, מה מותר, מה אסור ואיך כותבים</SceneSubtitle>
          </div>
          <div className="terminal-window">
            {/* macOS title bar: red, amber, green from the left */}
            <div className="terminal-header" dir="ltr">
              <div className="terminal-dot" style={{ background: '#8A93A8' }} />
              <div className="terminal-dot" style={{ background: '#F2A93B' }} />
              <div className="terminal-dot" style={{ background: '#F2A93B' }} />
              <span className="ml-3" style={{ fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: 'rgba(243,238,228,0.68)' }}>learnbot_instructions.txt</span>
            </div>
            <div className="terminal-body">
              {/* The prompt prints top to bottom, like a file opening */}
              <pre className="text-white/80 whitespace-pre-wrap mo-wipe-down" style={{ animationDelay: '0.3s' }}>{SYSTEM_PROMPT}</pre>
            </div>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
