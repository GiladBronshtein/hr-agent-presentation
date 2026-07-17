import { SceneBase, ContentLayout, SceneTitle } from '../components/presentation/SceneBase';

const SYSTEM_PROMPT = `אתה אייג׳נט קליטת עובדים של [שם חברה].

## מטרה
לסייע ב-HR להכין תוכנית קליטה מלאה ומאושרת לפני יום ראשון של עובד חדש.

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
        <div style={{ paddingTop: 'clamp(1.5rem,3vw,3rem)' }} className="w-full max-w-6xl space-y-8">
          <div>
            <p className="text-white/40 text-3xl uppercase tracking-widest mb-2">נספח א׳</p>
            <SceneTitle size="md">System Prompt לדוגמה</SceneTitle>
          </div>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#F43F5E' }} />
              <div className="terminal-dot" style={{ background: '#F59E0B' }} />
              <div className="terminal-dot" style={{ background: '#10B981' }} />
              <span className="text-white/30 text-3xl mr-2">system_prompt.txt</span>
            </div>
            <div className="terminal-body">
              <pre className="text-white/70 text-3xl leading-relaxed whitespace-pre-wrap">{SYSTEM_PROMPT}</pre>
            </div>
          </div>
        </div>
      </ContentLayout>
    </SceneBase>
  );
}
