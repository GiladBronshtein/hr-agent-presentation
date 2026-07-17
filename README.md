<div dir="rtl">

# מאוטומציה לאייג׳נט — AI Agents for HR 2026

<p align="center">
  <img src="https://img.shields.io/badge/סליידים-51-6366F1?style=for-the-badge&labelColor=0A0A1A" alt="51 slides" />
  <img src="https://img.shields.io/badge/שפה-עברית_RTL-0891B2?style=for-the-badge&labelColor=0A0A1A" alt="Hebrew RTL" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=0A0A1A" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0A0A1A" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0A0A1A" alt="Tailwind 4" />
</p>

<p align="center">
  <strong>מצגת אינטראקטיבית קולנועית לכנסי מנהלי HR — בנויה לאולם גדול, מעוצבת לרושם בלתי נשכח</strong>
</p>

---

## מה זה?

מצגת ווב מלאה בעברית RTL, שנבנתה עבור **HR Leaders Summit 2026** ומציגה את המהפכה של AI Agents בעולם משאבי האנוש. המצגת מכסה את כל מה שמנהל HR צריך לדעת: מהי ההבדל בין אוטומציה לאייג׳נט, איפה הם יכולים לעזור, איך בונים אותם בצורה אחראית, ואיך מתחילים פיילוט בארגון.

המצגת מיועדת להיות מוצגת **על מסך גדול מול קהל** — כל פרט בעיצוב, בגודל הטקסט ובאנימציות תוכנן לחוויה קולנועית.

---

## תוכן עניינים

| פרק | נושא | סליידים |
|-----|------|---------|
| 🟣 להבין | מה הם AI Agents ואיך הם עובדים | 01–12 |
| 🔵 לראות | 9 שימושים מגיוס עד שימור + דמו חי | 13–32 |
| 🟢 לבנות | כלים, פלטפורמות, ארכיטקטורה ומשילות | 33–38 |
| 🟡 להטמיע | פיילוט 90 יום, מדידת ROI, ניהול שינוי | 39–45 |
| ⚫ נספח | חומרי עיון מעמיקים | 46–51 |

---

## תכונות עיקריות

### עיצוב קולנועי לאולם כנסים
המצגת בנויה עם מערכת עיצוב **AI-Native UI + Glassmorphism + OLED Dark Mode** — רקע שחור עמוק עם גרדיאנטים של אינדיגו, ציאן וזהב. כל סלייד מנצל את מלוא שטח המסך עם טיפוגרפיה בסקאלת אולם כנסים (כותרות עד 11rem).

### 51 סליידים מלאים
כל סלייד עוצב בנפרד עם אנימציות CSS ייחודיות, פריסות מגוונות, ויזואליזציות נתונים, ודיאגרמות אינטראקטיביות. אין שני סליידים שנראים אותו הדבר.

### דמו חי אינטראקטיבי (S23–S32)
10 סליידים של דמו מלא של אייג׳נט HR בפעולה — מהטריגר הראשוני דרך שלבי ה-retrieval, planning, וה-tool execution, ועד לממשק Human-in-the-Loop לאישור פעולות.

### בקרות מרצה מקצועיות
- **ניווט מקלדת:** ← → לניווט, Space להמשך, Esc למפת פרקים
- **הערות מרצה:** מקש P פותח פאנל הערות לכל סלייד
- **מפת פרקים:** מקש Esc מציג overview של כל 51 הסליידים
- **מסך מלא:** מקש F להצגה מלאה
- **עזרה:** מקש H לרשימת קיצורי מקלדת

### RTL מלא
כל הפריסות, הטקסטים, החיצים והאנימציות מותאמות לעברית RTL. גופנים: **Space Grotesk** לכותרות, **DM Sans** לגוף, **Heebo** לעברית.

---

## ארכיטקטורה טכנית

```
hr-agent-presentation/
├── client/
│   ├── src/
│   │   ├── scenes/          # 51 קבצי סצנה (S00–S50)
│   │   ├── components/
│   │   │   └── presentation/
│   │   │       ├── PresentationShell.tsx   # מעטפת ראשית
│   │   │       ├── SceneRenderer.tsx       # ניתוב סצנות
│   │   │       ├── SceneBase.tsx           # רכיבי בסיס משותפים
│   │   │       ├── PresenterControls.tsx   # בקרות מרצה
│   │   │       ├── ChapterMap.tsx          # מפת פרקים
│   │   │       ├── SpeakerNotes.tsx        # הערות מרצה
│   │   │       └── KeyboardHelp.tsx        # עזרת מקלדת
│   │   ├── store/
│   │   │   └── presentationStore.ts        # Zustand state management
│   │   ├── data/
│   │   │   ├── scenes.ts                   # מטאדאטה של 51 סצנות
│   │   │   ├── speakerNotes.ts             # הערות מרצה לכל סלייד
│   │   │   └── demoData.ts                 # נתוני HR לדמו האינטראקטיבי
│   │   ├── hooks/
│   │   │   └── useKeyboardControls.ts      # ניווט מקלדת
│   │   └── index.css                       # מערכת עיצוב גלובלית
│   └── index.html
├── SOURCES.md                              # ציטוטי מחקר מאומתים
└── .github/
    └── workflows/
        └── deploy.yml                      # GitHub Pages CI/CD
```

### Stack טכנולוגי

| שכבה | טכנולוגיה | תפקיד |
|------|-----------|-------|
| Framework | React 19 + TypeScript | רנדור קומפוננטים |
| Build | Vite 7 | bundling מהיר |
| Styling | Tailwind CSS 4 | utility classes |
| State | Zustand | ניהול מצב גלובלי |
| Animation | CSS Animations + Framer Motion | אנימציות |
| Fonts | Google Fonts (Space Grotesk, DM Sans, Heebo) | טיפוגרפיה |
| Deploy | GitHub Pages + GitHub Actions | פרסום אוטומטי |

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

---

## קיצורי מקלדת

| מקש | פעולה |
|-----|-------|
| `←` / `→` | ניווט בין סליידים |
| `Space` | סלייד הבא |
| `Esc` | מפת פרקים |
| `P` | הערות מרצה |
| `H` | עזרת מקלדת |
| `F` | מסך מלא |

---

## מבנה הפרקים

### פרק 1: להבין (S01–S12)
מה ההבדל בין אוטומציה לאייג׳נט, אנטומיה של אייג׳נט, מדד בשלות, ולמה 2026 הוא נקודת המפנה.

### פרק 2: לראות (S13–S32)
9 שימושי HR קונקרטיים — גיוס, קליטה, למידה, שירות עובדים, ניוד כישורים ועוד — כולל דמו חי מלא של אייג׳נט קליטה.

### פרק 3: לבנות (S33–S38)
Stack נגיש לארגונים (n8n, LangChain, Vertex AI), עקרונות ארכיטקטורה, ממשל, הרשאות ואמון.

### פרק 4: להטמיע (S39–S45)
מחשבון ROI, בורר פיילוט אינטראקטיבי, מפת דרכים ל-90 יום, ניהול שינוי ותגובות להתנגדויות.

### נספח (S46–S51)
System instructions לדוגמה, blueprint של n8n, מסגרת הערכה, ומפת כלים.

---

## מחקר ומקורות

כל הנתונים הסטטיסטיים במצגת מגובים במחקרים מאומתים. ראו קובץ [`SOURCES.md`](./SOURCES.md) לרשימה המלאה עם קישורים.

מקורות עיקריים: McKinsey Global Institute, Deloitte, Gartner, SHRM, LinkedIn Learning.

---

## על המרצה

**גלעד ברונשטיין** — Professional Services and Ops Team Lead at Rise  
[linkedin.com/in/giladbronshtein](https://www.linkedin.com/in/giladbronshtein/)

---

<p align="center">
  <sub>בנוי עם React 19 · TypeScript · Tailwind CSS 4 · Vite · Zustand</sub><br/>
  <sub>עוצב לאולם כנסים · RTL מלא · 51 סליידים · אנימציות קולנועיות</sub>
</p>

</div>
