<div dir="rtl" align="right">

# מאוטומציה לאייג׳נט: AI Agents for HR 2026

<p align="center">
  <img src="https://img.shields.io/badge/סליידים-51-6366F1?style=for-the-badge&labelColor=0A0A1A" alt="51 slides" />
  <img src="https://img.shields.io/badge/שפה-עברית_RTL-0891B2?style=for-the-badge&labelColor=0A0A1A" alt="Hebrew RTL" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0A0A1A" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0A0A1A" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0A0A1A" alt="Tailwind 4" />
</p>

<p align="center">
  <strong>מצגת אינטראקטיבית קולנועית לכנסי מנהלי HR. בנויה לאולם גדול, עובדת גם על הטלפון, מעוצבת לרושם בלתי נשכח.</strong>
</p>

---

## מה זה?

מצגת ווב מלאה בעברית RTL שנבנתה עבור **HR Leaders Summit 2026** ומציגה את המהפכה של AI Agents בעולם משאבי האנוש. המצגת מכסה את כל מה שמנהל HR צריך לדעת: מה ההבדל בין אוטומציה לאייג׳נט, איפה הם יכולים לעזור, איך בונים אותם בצורה אחראית, ואיך מתחילים פיילוט בארגון.

המצגת מיועדת להצגה **על מסך גדול מול קהל**, וכל פרט בעיצוב, בגודל הטקסט ובאנימציות תוכנן לחוויה קולנועית. בנוסף, היא נצפית היטב גם במובייל: כל סלייד נשמר בפריסה המקורית שלו ומוקטן בהתאמה למסך.

---

## תוכן עניינים

| פרק | נושא | סליידים |
|-----|------|---------|
| להבין | מה הם AI Agents ואיך הם עובדים | 01-12 |
| לראות | תשעה שימושים מגיוס עד שימור, כולל דמו חי | 13-33 |
| לבנות | כלים, פלטפורמות, ארכיטקטורה ומשילות | 34-39 |
| להטמיע | פיילוט 90 יום, מדידת ROI, ניהול שינוי | 40-46 |
| נספח | חומרי עיון מעמיקים | 47-51 |

---

## תכונות עיקריות

### עיצוב קולנועי לאולם כנסים
מערכת עיצוב **AI-Native UI + Glassmorphism + OLED Dark Mode**: רקע שחור עמוק עם גרדיאנטים של אינדיגו, ציאן וזהב. כל סלייד מנצל את מלוא שטח המסך עם טיפוגרפיה בסקאלת אולם כנסים.

### 51 סליידים מלאים
כל סלייד עוצב בנפרד עם אנימציות ייחודיות, פריסות מגוונות, ויזואליזציות נתונים ודיאגרמות אינטראקטיביות. כל האייקונים הם SVG וקטוריים (Lucide), חדים בכל רזולוציה.

### דמו חי אינטראקטיבי (S23-S32)
עשרה סליידים של דמו מלא של אייג׳נט HR בפעולה: מהטריגר הראשוני דרך שלבי ה-retrieval, planning ו-tool execution, ועד ממשק Human-in-the-Loop לאישור פעולות.

### סיום קולנועי בתלת-ממד
הסלייד האחרון כולל כדור רשת תלת-ממדי (three.js): מאות צמתים זוהרים מחוברים בקשתות, מסתובבים לאט מאחורי דיוקן המרצה. האנימציה נכבית אוטומטית במצב תנועה מופחתת או באיכות חסכונית.

### שפה עיצובית אחידה
תבנית משותפת לתשעת סליידי האייג׳נטים עם זהות צבע לכל אייג׳נט, מספרי ענק עם אנימציית ספירה, כרטיסי שאלות אינטראקטיביים, חלון Slack מציאותי בדמו, וקונפטי ברגע האישור. כל האנימציות מכבדות prefers-reduced-motion.

### חלון מציג מקצועי (Presenter View)
מקש N פותח חלון שני מסונכרן: סלייד נוכחי, סלייד הבא, הערות מרצה מלאות, טיימר הרצאה ושעון. הסנכרון דו-כיווני דרך BroadcastChannel ועובד גם בלי אינטרנט. שמים את המצגת על המקרן ואת חלון המציג על הלפטופ.

### עובד בלי אינטרנט
כל הגופנים (Space Grotesk, DM Sans, Heebo) מוטמעים בפרויקט ואינם נטענים מ-CDN. אין תלות ברשת של אולם הכנסים.

### קישורים עמוקים ושחזור מיקום
לכל סלייד יש כתובת משלו בפורמט `#/scene/<id>`. רענון דף מחזיר בדיוק לאותו סלייד, וקישור לסלייד ספציפי ניתן לשיתוף.

### תמיכה מלאה במובייל
במסכים קטנים כל סלייד מוצג על קנבס וירטואלי בפריסה המקורית ומוקטן בהתאמה למסך (letterbox). שום פריסה לא נשברת, כל האינטראקציות עובדות, וניווט בהחלקת אצבע נתמך. במצב פורטרט מוצגת הצעה לסובב את המכשיר.

### ביצועים ונגישות
אנימציות הרקע מוגבלות ל-30 פריימים בשנייה, נעצרות כשהחלון מוסתר, ומכבדות prefers-reduced-motion. ניגודיות הטקסט כוונה לקריאות מהשורה האחרונה באולם. תמונות נטענות עם אפקט shimmer ומעבר חלק.

### בקרות מרצה
- **ניווט מקלדת:** חצים לניווט, Space להמשך, Esc למפת פרקים
- **חלון מציג:** מקש N פותח מסך שני מסונכרן
- **מסך שחור:** מקש B להפסקה מקצועית באמצע הרצאה
- **הערות מרצה:** מקש P פותח פאנל הערות לכל סלייד
- **מפת פרקים:** מקש Esc מציג overview של כל 51 הסליידים
- **מסך מלא:** מקש F
- **עזרה:** מקש H לרשימת קיצורי המקלדת

### RTL מלא
כל הפריסות, הטקסטים, החיצים והאנימציות מותאמים לעברית RTL. גופנים: **Space Grotesk** לכותרות, **DM Sans** לגוף באנגלית, **Heebo** לעברית.

---

## ארכיטקטורה טכנית

```
hr-agent-presentation/
├── client/
│   ├── src/
│   │   ├── scenes/          # 51 קבצי סצנה (S00-S50)
│   │   ├── components/
│   │   │   ├── SmoothImage.tsx             # טעינת תמונות עם shimmer
│   │   │   └── presentation/
│   │   │       ├── PresentationShell.tsx   # מעטפת ראשית
│   │   │       ├── AgentGlobe.tsx          # כדור רשת תלת-ממדי (three.js)
│   │   │       ├── AgentSceneTemplate.tsx  # תבנית 9 סליידי האייג׳נטים
│   │   │       ├── SlackChat.tsx           # חלון Slack לדמו
│   │   │       ├── SceneStage.tsx          # קנבס מותאם מובייל
│   │   │       ├── SceneRenderer.tsx       # ניתוב סצנות
│   │   │       ├── SceneBase.tsx           # רכיבי בסיס משותפים
│   │   │       ├── PresenterView.tsx       # חלון מציג (מסך שני)
│   │   │       ├── PresenterControls.tsx   # בקרות מרצה
│   │   │       ├── ChapterMap.tsx          # מפת פרקים
│   │   │       ├── SpeakerNotes.tsx        # הערות מרצה
│   │   │       ├── RotateHint.tsx          # רמז סיבוב במובייל
│   │   │       └── KeyboardHelp.tsx        # עזרת מקלדת
│   │   ├── store/
│   │   │   └── presentationStore.ts        # Zustand state management
│   │   ├── data/
│   │   │   ├── scenes.ts                   # מטאדאטה של 51 סצנות
│   │   │   ├── speakerNotes.ts             # הערות מרצה לכל סלייד
│   │   │   └── demoData.ts                 # נתוני HR לדמו האינטראקטיבי
│   │   ├── hooks/
│   │   │   ├── useKeyboardControls.ts      # ניווט מקלדת
│   │   │   ├── useHashSync.ts              # קישורים עמוקים ושחזור מיקום
│   │   │   ├── usePresenterBridge.ts       # סנכרון חלון המציג
│   │   │   └── useDecorativeCanvas.ts      # אנימציות רקע יעילות
│   │   ├── lib/
│   │   │   ├── presenterChannel.ts         # פרוטוקול BroadcastChannel
│   │   │   └── mediaAssets.ts              # טעינה מוקדמת של תמונות
│   │   ├── fonts/                          # גופנים מוטמעים (woff2)
│   │   └── index.css                       # מערכת עיצוב גלובלית
│   └── index.html
├── docs/                                   # Build מפורסם (GitHub Pages)
└── SOURCES.md                              # ציטוטי מחקר מאומתים
```

### Stack טכנולוגי

| שכבה | טכנולוגיה | תפקיד |
|------|-----------|-------|
| Framework | React 19 + TypeScript | רנדור קומפוננטים |
| Build | Vite 7 | bundling מהיר |
| Styling | Tailwind CSS 4 | utility classes |
| State | Zustand | ניהול מצב גלובלי |
| Icons | Lucide | אייקוני SVG וקטוריים |
| Animation | CSS Animations + Canvas | אנימציות |
| 3D | three.js + react-three-fiber | סיום תלת-ממדי |
| Fonts | Self-hosted woff2 | טיפוגרפיה בלי תלות ברשת |
| Deploy | GitHub Pages (תיקיית docs) | פרסום |

---

## הפעלה מקומית

```bash
# שכפול הרפוזיטורי
git clone https://github.com/GiladBronshtein/hr-agent-presentation.git
cd hr-agent-presentation

# התקנת תלויות
pnpm install

# הפעלת שרת פיתוח
pnpm dev

# בנייה לפרודקשן
pnpm build
```

שרת הפיתוח יעלה על `http://localhost:3000`

### פרסום ל-GitHub Pages

האתר מוגש מתיקיית `docs/` בענף main. לעדכון הגרסה החיה:

```bash
VITE_BASE_PATH=/hr-agent-presentation/ pnpm build
rm -rf docs && cp -R dist/public docs && touch docs/.nojekyll
git add docs && git commit -m "deploy" && git push
```

---

## קיצורי מקלדת

| מקש | פעולה |
|-----|-------|
| `←` / `→` | ניווט בין סליידים |
| `Space` | סלייד הבא |
| `Esc` | מפת פרקים |
| `N` | חלון מציג (מסך שני) |
| `B` | מסך שחור (הפסקה) |
| `P` | הערות מרצה |
| `H` | עזרת מקלדת |
| `F` | מסך מלא |

---

## מבנה הפרקים

### פרק 1: להבין (S01-S12)
מה ההבדל בין אוטומציה לאייג׳נט, אנטומיה של אייג׳נט, מדד בשלות, ולמה 2026 הוא נקודת המפנה.

### פרק 2: לראות (S13-S33)
תשעה שימושי HR קונקרטיים: גיוס, קליטה, למידה, שירות עובדים, ניוד כישורים ועוד, כולל דמו חי מלא של אייג׳נט קליטה.

### פרק 3: לבנות (S34-S39)
Stack נגיש לארגונים (n8n, LangChain, Vertex AI), עקרונות ארכיטקטורה, ממשל, הרשאות ואמון.

### פרק 4: להטמיע (S40-S46)
מחשבון ROI, בורר פיילוט אינטראקטיבי, מפת דרכים ל-90 יום, ניהול שינוי ותגובות להתנגדויות.

### נספח (S47-S51)
System instructions לדוגמה, blueprint של n8n, מסגרת הערכה, ומפת כלים.

---

## מחקר ומקורות

כל הנתונים הסטטיסטיים במצגת מגובים במחקרים מאומתים. ראו קובץ [`SOURCES.md`](./SOURCES.md) לרשימה המלאה עם קישורים.

מקורות עיקריים: McKinsey Global Institute, Deloitte, Gartner, SHRM, LinkedIn Learning.

---

## על המרצה

**גלעד ברונשטיין**, Professional Services and Ops Team Lead at Rise
[linkedin.com/in/giladbronshtein](https://www.linkedin.com/in/giladbronshtein/)

---

<p align="center">
  <sub>בנוי עם React 19, TypeScript, Tailwind CSS 4, Vite, Zustand</sub><br/>
  <sub>עוצב לאולם כנסים, עובד גם במובייל, RTL מלא, 51 סליידים, אנימציות קולנועיות</sub>
</p>

</div>
