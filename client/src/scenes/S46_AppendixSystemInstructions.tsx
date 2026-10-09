import { SceneBase, ContentLayout, SceneTitle, SceneEyebrow } from '../components/presentation/SceneBase';
import { CODE_FONT } from '../lib/typeTokens';

const SYSTEM_PROMPT = `אתה אייג׳נט קליטה של [שם חברה].

## מטרה
לסייע ל-HR להכין תוכנית קליטה מלאה ומאושרת לפני יום העבודה הראשון.

## מה מותר לך
- קריאת מסמכי מדיניות ותהליכים
- יצירת טיוטות מיילים ותוכניות
- תיאום פגישות (עם אישור)
- בקשת גישות IT (עם אישור)

## מה אסור לך
- שליחת מיילים ללא אישור אנושי
- גישה לנתוני שכר
- שינוי נתוני HRIS
- מידע רפואי

## כשאתה לא בטוח
עצור ושאל. עדיף לשאול מאשר לטעות.

## סגנון תקשורת
מקצועי, ישיר, בעברית. תמיד ציין מקור.`;

export default function S46_AppendixSystemInstructions() {
  return (
    <SceneBase>
      <ContentLayout>
        <div style={{ paddingTop: 'clamp(1.5rem,3cqw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <SceneEyebrow>נספח א׳</SceneEyebrow>
            <SceneTitle size="md">System Prompt לדוגמה</SceneTitle>
          </div>
          <div className="terminal-window">
            {/* macOS title bar: red, amber, green from the left */}
            <div className="terminal-header" dir="ltr">
              <div className="terminal-dot" style={{ background: '#F43F5E' }} />
              <div className="terminal-dot" style={{ background: '#F59E0B' }} />
              <div className="terminal-dot" style={{ background: '#10B981' }} />
              <span className="ml-3" style={{ fontFamily: CODE_FONT, fontSize: 'clamp(1rem, 1.05cqw, 1.25rem)', color: 'rgba(255,255,255,0.68)' }}>system_prompt.txt</span>
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
