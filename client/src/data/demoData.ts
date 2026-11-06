// ============================================================
// DEMO DATA: the live L&D demo. All fictional, for presentation only.
// One scenario everywhere: רוני אברהם asks LearnBot in #learning-requests
// to get 12 salespeople ready to sell the new Pro package by the 15th.
// ============================================================

export const DEMO_SCENARIO = {
  agent: 'LearnBot',
  agentInitials: 'LB',
  requester: 'רוני אברהם',
  requesterInitials: 'רא',
  requesterRole: 'ראש צוות מכירות',
  channel: 'learning-requests',
  teamChannel: 'sales-team',
  teamSize: 12,
  requestTime: '09:12',
  request: 'צוות המכירות צריך להכיר את חבילת Pro החדשה עד ה-15 בחודש. 12 אנשים בצוות.',
  goal: '12 אנשים מוכנים למכור את Pro עד ה-15',
  successMetric: 'אחוז הסגירה של Pro אחרי 30 יום',
};

/** Extended demo, step "איסוף מידע": what the agent reads before planning. */
export const DEMO_SOURCES = [
  { id: 'product-doc', source: 'מסמך המוצר', finding: 'חבילת Pro: ארבע יכולות חדשות, מחיר חדש ותנאי שדרוג' },
  { id: 'lms', source: 'LMS', finding: '9 מתוך 12 כבר השלימו את קורס המוצר הבסיסי' },
  { id: 'crm', source: 'CRM', finding: 'בעסקאות שדרוג, רוב ההפסדים נעצרים בשלב המחיר' },
  { id: 'survey', source: 'סקר הצוות האחרון', finding: '"את המוצר מכירים, הקושי הוא בשאלות על מחיר"' },
  { id: 'calendar', source: 'יומן הצוות', finding: 'ישיבת צוות קבועה בימי שני, 09:00' },
];

export const DEMO_RETRIEVAL_INSIGHT = 'לא מלמדים מאפס: מתמקדים במה שחדש ובשאלות על מחיר';

/** Main step 2, "התוכנית": the learning path. */
export const DEMO_PLAN = [
  { id: 'pre', title: 'אבחון מקדים', detail: '5 שאלות, 4 דקות. מה שכבר ידוע, לא נלמד שוב', when: 'ה-4 עד ה-5' },
  { id: 'units', title: '3 יחידות מיקרו-למידה', detail: '7 דקות כל אחת', when: 'ה-6 עד ה-11', chips: ['מה חדש ב-Pro', 'למי זה מתאים', 'איך עונים על שאלות מחיר'] },
  { id: 'sim', title: 'תרגול בסימולציה', detail: 'שיחת מכירה עם לקוח שמתלבט בגלל המחיר', when: 'ה-12 עד ה-14' },
  { id: 'review', title: 'חידון חזרה', detail: 'אחרי שבועיים, כדי שהידע לא יישכח', when: 'ה-29' },
  { id: 'metric', title: 'מדד הצלחה', detail: 'אחוז הסגירה של Pro אחרי 30 יום', when: 'בעוד 30 יום', isMetric: true },
];

/** Main step 3, "תצוגה מקדימה": what the team will receive. */
export const DEMO_WELCOME = {
  greeting: 'שלום צוות מכירות!',
  lines: [
    'חבילת Pro עולה ב-15, והכנו מסלול קצר לקראת השיחות הראשונות עם לקוחות.',
    'מתחילים בשאלון של 5 שאלות. מה שכבר ידוע, לא נלמד שוב.',
  ],
  total: 'בסך הכול כ-40 דקות, בזמן שנוח, עד ה-14.',
  outline: [
    { title: 'אבחון מקדים', minutes: '4 דק׳', when: 'עד ה-5' },
    { title: '3 יחידות מיקרו-למידה', minutes: '7 דק׳ כל אחת', when: 'עד ה-11' },
    { title: 'תרגול שיחת מכירה בסימולציה', minutes: '15 דק׳', when: 'עד ה-14' },
    { title: 'חידון חזרה קצר', minutes: '5 דק׳', when: 'ה-29' },
  ],
};

/** Extended demo, step "שימוש בכלים": readable tool calls (LTR code). */
export const DEMO_TOOL_CALLS = [
  { tool: 'lms.create_assessment', args: '{ "title": "אבחון מקדים", "questions": 5 }', result: 'assessment_id: as_5521', status: 'success' as const },
  { tool: 'content.draft_units', args: '{ "units": 3, "minutes": 7, "source": "product-doc" }', result: 'drafts: 3 (ממתין לבדיקת מומחית המוצר)', status: 'pending' as const },
  { tool: 'practice.create_simulation', args: '{ "scenario": "לקוח מתלבט בגלל המחיר" }', result: 'simulation_id: sim_208', status: 'success' as const },
  { tool: 'lms.enroll', args: '{ "group": "sales-team", "people": 12 }', result: 'draft (ממתין לאישור)', status: 'pending' as const },
  { tool: 'reminders.schedule', args: '{ "quiz": "חידון חזרה", "date": "+14d" }', result: 'draft (ממתין לאישור)', status: 'pending' as const },
];

/** Main step 4, "אישור אנושי": what happens only after approval. */
export const DEMO_APPROVAL_ITEMS = [
  'פרסום 3 יחידות מיקרו-למידה ב-LMS',
  'רישום 12 אנשים למסלול',
  'הודעת פתיחה בערוץ sales-team',
  'תזכורות, וחידון חזרה ב-29 לחודש',
  'דוח אחוז סגירה לרוני בעוד 30 יום',
];

export const DEMO_APPROVAL_EDIT = 'להוסיף ליחידה 3 דוגמה מהשטח: שיחה אמיתית על מחיר';

/** Extended demo, step "ביצוע": what runs after approval. */
export const DEMO_EXECUTION_STEPS = [
  { label: 'פרסום 3 יחידות ב-LMS', time: '0.4s' },
  { label: 'רישום 12 אנשים למסלול', time: '0.7s' },
  { label: 'הודעת פתיחה נשלחה בערוץ sales-team', time: '0.9s' },
  { label: 'זימון ליומן: תרגול בסימולציה, ה-12 עד ה-14', time: '1.2s' },
  { label: 'תזכורות ב-8 וב-11, רק למי שעוד לא התחיל', time: '1.4s' },
  { label: 'חידון חזרה ב-29, דוח לרוני בעוד 30 יום', time: '1.6s' },
];

/** Extended demo, step "משוב ושיפור": two weeks later. */
export const DEMO_FEEDBACK = {
  stats: [
    { value: '82%', label: 'ציון ממוצע בחידון החזרה' },
    { value: '11/12', label: 'השלימו את המסלול' },
    { value: '2', label: 'צריכים עוד עזרה בשאלות מחיר' },
  ],
  ratings: [
    { q: 'היחידות עזרו בשיחות עם לקוחות', default: 4 },
    { q: 'התרגול בסימולציה הרגיש כמו שיחה אמיתית', default: 5 },
  ],
  suggestion: 'יחידה קצרה נוספת על שאלות מחיר, 5 דקות, ועוד תרגול אחד. רק לשני האנשים שצריכים.',
};

// ─── TOOL MAP DATA ────────────────────────────────────────────

export interface ToolInfo {
  name: string;
  category: string;
  role: string;
  storesOfficialData: boolean;
  executesActions: boolean;
  requiresEnterpriseApproval: boolean;
}

export const TOOL_MAP: ToolInfo[] = [
  { name: 'Gemini', category: 'מודלי AI', role: 'הבנה, יצירה, ניתוח ובחירה', storesOfficialData: false, executesActions: false, requiresEnterpriseApproval: true },
  { name: 'Claude', category: 'מודלי AI', role: 'הבנה, יצירה, ניתוח ובחירה', storesOfficialData: false, executesActions: false, requiresEnterpriseApproval: true },
  { name: 'ChatGPT', category: 'מודלי AI', role: 'הבנה, יצירה, ניתוח ובחירה', storesOfficialData: false, executesActions: false, requiresEnterpriseApproval: true },
  { name: 'Microsoft Copilot', category: 'מודלי AI', role: 'סיוע ב-Microsoft 365', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'n8n', category: 'תזמור תהליכים', role: 'חיבור בין מערכות וניהול תהליך', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: false },
  { name: 'Zapier', category: 'תזמור תהליכים', role: 'אוטומציה פשוטה בין כלים', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: false },
  { name: 'Make', category: 'תזמור תהליכים', role: 'אוטומציה ויזואלית מתקדמת', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: false },
  { name: 'Slack', category: 'תקשורת', role: 'תקשורת צוות ואישורים', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Microsoft Teams', category: 'תקשורת', role: 'תקשורת ארגונית ואישורים', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Gmail', category: 'תקשורת', role: 'שליחת הודעות ועדכונים', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Outlook', category: 'תקשורת', role: 'שליחת הודעות ועדכונים', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Google Drive', category: 'ידע', role: 'אחסון ושיתוף מסמכים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'SharePoint', category: 'ידע', role: 'ניהול ידע ארגוני', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Confluence', category: 'ידע', role: 'תיעוד ידע צוותי', storesOfficialData: true, executesActions: false, requiresEnterpriseApproval: true },
  { name: 'Notion', category: 'ידע', role: 'ניהול ידע גמיש', storesOfficialData: true, executesActions: false, requiresEnterpriseApproval: false },
  { name: 'Jira', category: 'ניהול משימות', role: 'מעקב משימות ופרויקטים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'Asana', category: 'ניהול משימות', role: 'ניהול פרויקטים ומשימות', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: false },
  { name: 'Google Calendar', category: 'מערכות רשמיות', role: 'ניהול לוחות זמנים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'HeyGen', category: 'יצירת תוכן', role: 'יצירת סרטוני וידאו עם AI', storesOfficialData: false, executesActions: true, requiresEnterpriseApproval: false },
  { name: 'Workday', category: 'מערכות HR', role: 'HRIS: מידע רשמי על כוח האדם', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'HiBob', category: 'מערכות HR', role: 'HRIS: מידע רשמי על כוח האדם', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'BambooHR', category: 'מערכות HR', role: 'HRIS: מידע רשמי על כוח האדם', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
];
