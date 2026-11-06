import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow, SceneSubtitle } from '../components/presentation/SceneBase';
import { CODE_FONT } from '../lib/typeTokens';
import { SourceChip } from '../components/presentation/SourceChip';
import { PALETTE } from '../lib/palette';


const SYSTEM_PROMPT = `LearnBot: עוזר הלמידה של צוות ה-L&D.

## מטרה
להפוך בקשת הדרכה למסלול למידה קצר, מבוסס ומוכן לאישור.

## לפני תכנון
- לשאול: מה צריך להשתנות בעבודה, ואיך נמדוד את זה?
- לבדוק ב-LMS אם כבר יש קורס או עזר עבודה קצר שעונה על הצורך.

## מה מותר
- לקרוא חומרים מאושרים ואת ספריית הקורסים
- לכתוב טיוטות: יחידות מיקרו, חידון, תרחיש לתרגול
- להציע מסלול ומדד הצלחה

## מה אסור
- לפרסם, לרשום או לשלוח בלי אישור של צוות L&D
- להציג ציונים אישיים בשמות
- להמציא עובדות. אין מקור? לכתוב "לא מצאתי מקור מאושר".

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
              <div className="terminal-dot" style={{ background: PALETTE.coral }} />
              <div className="terminal-dot" style={{ background: PALETTE.amber }} />
              <div className="terminal-dot" style={{ background: PALETTE.teal }} />
              <span className="ml-3" style={{ fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: 'rgba(246,242,234,0.78)' }}>learnbot_instructions.txt</span>
            </div>
            <div className="terminal-body">
              {/* The prompt prints top to bottom, like a file opening */}
              <pre className="text-white/85 whitespace-pre-wrap mo-wipe-down" style={{ animationDelay: '0.3s' }}>{SYSTEM_PROMPT}</pre>
            </div>
          </div>
          <p className="text-center text-white/80" style={{ margin: 0, fontSize: 'clamp(1.1rem, 1.35cqw, 1.6rem)' }}>
            רשות לומר "לא מצאתי מקור" מקטינה המצאות, אבל לא מבטלת אותן. מומחה תוכן עדיין בודק
            <SourceChip id="anthropic-hallucinations-2026" style={{ marginInlineStart: '0.5em', verticalAlign: 'middle' }} />
          </p>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
