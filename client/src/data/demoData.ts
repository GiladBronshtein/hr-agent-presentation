// ============================================================
// DEMO DATA: All fictional, for presentation purposes only
// ============================================================

export const DEMO_EMPLOYEE = {
  name: 'נועה לוי',
  role: 'Customer Success Manager',
  manager: 'דנה כהן',
  startDate: '2026-08-02',
  startDateFormatted: 'ראשון, 2 באוגוסט 2026',
  location: 'תל אביב',
  workModel: 'היברידי',
  buddy: null as string | null,
  requiredSystems: ['Slack', 'Google Workspace', 'CRM', 'Jira'],
  email: 'noa.levi@company.co.il',
  managerEmail: 'dana.cohen@company.co.il',
};

export const DEMO_SOURCES = [
  {
    id: 'drive-role-profile',
    tool: 'Google Drive',
    description: 'פרופיל תפקיד',
    status: 'found' as const,
    icon: '📄',
    detail: 'Customer Success Manager, גרסה 3.2, עודכן מרץ 2026',
  },
  {
    id: 'confluence-team-guide',
    tool: 'Confluence',
    description: 'מדריך צוות',
    status: 'found' as const,
    icon: '📚',
    detail: 'מדריך קליטה לצוות Customer Success: 24 עמודים',
  },
  {
    id: 'calendar-manager',
    tool: 'Google Calendar',
    description: 'זמינות המנהלת',
    status: 'partial' as const,
    icon: '📅',
    detail: 'דנה כהן זמינה חלקית ביום ראשון: 09:00 תפוס, 10:30 פנוי',
  },
  {
    id: 'hr-trainings',
    tool: 'HR Data',
    description: 'רשימת הדרכות חובה',
    status: 'found' as const,
    icon: '🎓',
    detail: 'ארבע הדרכות חובה: אבטחת מידע, מוצר, תהליכי CS, כלי עבודה',
  },
  {
    id: 'jira-template',
    tool: 'Jira',
    description: 'תבנית משימות קליטה',
    status: 'found' as const,
    icon: '✅',
    detail: 'תבנית ONBOARD-TEMPLATE-v4: 12 משימות',
  },
];

export const DEMO_MISSING_INFO = [
  {
    id: 'buddy',
    question: 'מי ה-buddy של נועה?',
    options: ['יעל שמיר', 'רון גולדברג', 'מיכל אברהם'],
    defaultAnswer: 'יעל שמיר',
    field: 'buddy' as const,
  },
  {
    id: 'crm-approval',
    question: 'מי מאשר הרשאת CRM?',
    options: ['מנהל IT', 'CISO', 'מנהל Customer Success'],
    defaultAnswer: 'מנהל IT',
    field: 'crmApproval' as const,
  },
  {
    id: 'first-month-clients',
    question: 'האם נועה תעבוד עם לקוחות ספציפיים בחודש הראשון?',
    options: ['עדיין לא', 'כן, לקוחות Enterprise', 'כן, לקוחות SMB'],
    defaultAnswer: 'עדיין לא',
    field: 'firstMonthClients' as const,
  },
];

export const DEMO_PLAN_DECISIONS = [
  {
    id: 'manager-availability',
    situation: 'המנהלת אינה זמינה ב-09:00',
    decision: 'הוצעה שיחת פתיחה ב-10:30',
    type: 'adapted' as const,
  },
  {
    id: 'existing-training',
    situation: 'קיימת הדרכת מוצר מאושרת',
    decision: 'נעשה שימוש בתוכן הקיים',
    type: 'reused' as const,
  },
  {
    id: 'crm-permission',
    situation: 'חסרה הרשאת CRM',
    decision: 'נוצרה בקשת אישור למנהל IT',
    type: 'escalated' as const,
  },
  {
    id: 'no-clients',
    situation: 'אין עדיין לקוחות משויכים',
    decision: 'התוכנית אינה מניחה מידע שלא קיים',
    type: 'cautious' as const,
  },
];

export const DEMO_TOOL_CALLS = [
  {
    id: 'google-docs',
    tool: 'Google Docs',
    action: 'הכנת מסמך קליטה',
    status: 'draft' as const,
    icon: '📝',
    output: 'תוכנית הקליטה של נועה: 7 פרקים',
  },
  {
    id: 'google-calendar',
    tool: 'Google Calendar',
    action: 'הכנת טיוטות לפגישות',
    status: 'draft' as const,
    icon: '📅',
    output: '6 פגישות מתוזמנות',
  },
  {
    id: 'jira',
    tool: 'Jira',
    action: 'הכנת משימות',
    status: 'draft' as const,
    icon: '✅',
    output: '6 משימות נוצרו',
  },
  {
    id: 'gmail',
    tool: 'Gmail',
    action: 'הכנת מייל אישי',
    status: 'draft' as const,
    icon: '✉️',
    output: 'מייל ברכה לנועה',
  },
  {
    id: 'slack',
    tool: 'Slack',
    action: 'הכנת הודעת welcome',
    status: 'draft' as const,
    icon: '💬',
    output: 'הודעה לערוץ #team-cs',
  },
  {
    id: 'heygen',
    tool: 'HeyGen',
    action: 'הצעת סרטון קצר על הצוות',
    status: 'suggested' as const,
    icon: '🎬',
    output: 'הצעה לסרטון 2 דקות, ממתין לאישור',
  },
];

export const DEMO_ONBOARDING_DOC = {
  title: 'תוכנית הקליטה של נועה לוי',
  subtitle: 'Customer Success Manager | תחילת עבודה: 2 באוגוסט 2026',
  sections: [
    {
      title: 'לפני יום ראשון',
      items: [
        'קבלת גישה ל-Google Workspace ו-Slack',
        'שליחת מייל ברכה ממנהלת ומ-buddy',
        'שיתוף מדריך צוות ומסמכי מוצר',
        'בקשת הרשאת CRM ממנהל IT',
        'הכנת תחנת עבודה',
      ],
    },
    {
      title: 'יום ראשון',
      items: [
        '10:30, שיחת פתיחה עם דנה כהן (מנהלת)',
        '12:00, היכרות עם צוות Customer Success',
        '14:00, הדרכת כלי עבודה',
        '16:00, שיחה עם יעל שמיר (buddy)',
      ],
    },
    {
      title: 'השבוע הראשון',
      items: [
        'הדרכת מוצר: 3 שעות',
        'הדרכת תהליכי CS: 2 שעות',
        'פגישת HR: תנאים, מדיניות, שאלות',
        'הדרכת אבטחת מידע: 1 שעה',
        'סיכום שבוע ראשון עם דנה',
      ],
    },
    {
      title: '30 הימים הראשונים',
      items: [
        'לימוד 5 לקוחות מרכזיים',
        'השתתפות בשיחות CS עם buddy',
        'הכרת תהליך onboarding ללקוחות',
        'הגדרת יעדים ל-Q3 עם דנה',
        'שיחת 1:1 שבועית עם דנה',
      ],
    },
    {
      title: 'אנשים שכדאי להכיר',
      items: [
        'דנה כהן, מנהלת ישירה',
        'יעל שמיר: buddy',
        'צוות Customer Success (6 אנשים)',
        'צוות Product (ממשק יומי)',
        'צוות Sales (העברת לקוחות)',
      ],
    },
    {
      title: 'מערכות והרשאות',
      items: [
        '✅ Google Workspace, מאושר',
        '✅ Slack: מאושר',
        '✅ Jira: מאושר',
        '⏳ CRM, בקשת אישור נשלחה למנהל IT',
      ],
    },
    {
      title: 'מדדי הצלחה לחודש הראשון',
      items: [
        'הכרת 5 לקוחות מרכזיים',
        'השלמת כל הדרכות החובה',
        'השתתפות ב-10 שיחות CS',
        'הגדרת יעדים ל-Q3',
        'ציון שביעות רצון ≥ 4/5',
      ],
    },
  ],
};

export const DEMO_CALENDAR_EVENTS = [
  { title: 'שיחת פתיחה עם דנה', time: '10:30', date: 'ראשון 2.8', attendees: ['דנה כהן', 'נועה לוי'], type: 'manager' },
  { title: 'היכרות עם הצוות', time: '12:00', date: 'ראשון 2.8', attendees: ['צוות CS', 'נועה לוי'], type: 'team' },
  { title: 'הדרכת מוצר', time: '14:00', date: 'שני 3.8', attendees: ['מדריך מוצר', 'נועה לוי'], type: 'training' },
  { title: 'שיחה עם buddy', time: '16:00', date: 'ראשון 2.8', attendees: ['יעל שמיר', 'נועה לוי'], type: 'buddy' },
  { title: 'פגישת HR', time: '10:00', date: 'שלישי 4.8', attendees: ['HR', 'נועה לוי'], type: 'hr' },
  { title: 'סיכום שבוע ראשון', time: '16:00', date: 'חמישי 6.8', attendees: ['דנה כהן', 'נועה לוי'], type: 'review' },
];

export const DEMO_JIRA_TASKS = [
  { id: 'ONBOARD-001', title: 'הכנת מחשב ותחנת עבודה', assignee: 'IT', priority: 'high', status: 'open' },
  { id: 'ONBOARD-002', title: 'הרשאת CRM', assignee: 'מנהל IT', priority: 'high', status: 'pending-approval' },
  { id: 'ONBOARD-003', title: 'הרשאת Slack וקבוצות', assignee: 'IT', priority: 'medium', status: 'open' },
  { id: 'ONBOARD-004', title: 'הוספה לקבוצות Google', assignee: 'IT', priority: 'medium', status: 'open' },
  { id: 'ONBOARD-005', title: 'הכנת סביבת עבודה ב-Jira', assignee: 'מנהל CS', priority: 'medium', status: 'open' },
  { id: 'ONBOARD-006', title: 'אישור תוכנית קליטה', assignee: 'דנה כהן', priority: 'high', status: 'awaiting-approval' },
];

export const DEMO_EMAIL = {
  to: 'נועה לוי',
  from: 'דנה כהן',
  subject: 'ברוכה הבאה לצוות! 🎉',
  body: `שלום נועה,

אני שמחה מאוד שאת מצטרפת אלינו ביום ראשון!

הכנתי לך תוכנית קליטה מלאה שתעזור לך להתחיל בצורה הטובה ביותר. תמצאי בה את כל מה שצריך לדעת על הצוות, הכלים והתהליכים.

כמה דברים חשובים לדעת:
• נפגש ב-10:30 לשיחת פתיחה, אני מצפה לפגוש אותך!
• יעל שמיר תהיה ה-buddy שלך, היא תעזור לך בכל שאלה
• יש לי זמן פנוי בכל יום שלישי ב-15:00 לשאלות

מחכה לראותך ביום ראשון,
דנה`,
};

export const DEMO_SLACK_MESSAGE = {
  channel: '#team-cs',
  from: 'דנה כהן',
  message: `@channel 🎉 שמחה לבשר שנועה לוי מצטרפת אלינו ביום ראשון כ-Customer Success Manager!

נועה מגיעה עם ניסיון עשיר ב-SaaS ואנחנו בטוחים שתהיה תוספת מדהימה לצוות.

בואו כולם לברך אותה ביום ראשון בשיחת ה-12:00 👋

cc: @yael.shamir (buddy)`,
};

export const DEMO_APPROVAL_SUMMARY = {
  title: 'תוכנית הקליטה של נועה מוכנה',
  stats: [
    { label: 'פגישות', value: 8, icon: '📅' },
    { label: 'משימות', value: 6, icon: '✅' },
    { label: 'פריטי למידה', value: 4, icon: '🎓' },
    { label: 'פעולות דורשות אישור', value: 2, icon: '⚠️' },
    { label: 'פרט עדיין חסר', value: 1, icon: '❓' },
  ],
  pendingApprovals: [
    'הרשאת CRM, ממתין לאישור מנהל IT',
    'שיתוף מסמך קליטה עם נועה',
  ],
  missingInfo: 'אישור הרשאת CRM עדיין לא התקבל',
};

export const DEMO_AUDIT_LOG = [
  {
    action: 'קריאת פרופיל תפקיד',
    time: '14:23:01',
    approver: 'מערכת',
    tool: 'Google Drive',
    source: 'CSM-role-profile-v3.2.pdf',
    result: 'הצלחה',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'קריאת מדריך צוות',
    time: '14:23:04',
    approver: 'מערכת',
    tool: 'Confluence',
    source: 'CS-Team-Onboarding-Guide',
    result: 'הצלחה',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'בדיקת זמינות מנהלת',
    time: '14:23:07',
    approver: 'מערכת',
    tool: 'Google Calendar',
    source: 'dana.cohen@company.co.il',
    result: 'חלקי: 09:00 תפוס',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'שאלת הבהרה: buddy',
    time: '14:23:15',
    approver: 'מנהל HR',
    tool: 'ממשק משתמש',
    source: 'קלט ידני',
    result: 'יעל שמיר',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'יצירת תוכנית קליטה',
    time: '14:24:02',
    approver: 'מערכת',
    tool: 'Google Docs',
    source: 'תבנית + פרופיל תפקיד',
    result: 'טיוטה, ממתין לאישור',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'אישור תוכנית',
    time: '14:31:45',
    approver: 'דנה כהן',
    tool: 'ממשק אישור',
    source: 'בדיקה ידנית',
    result: 'אושר',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'יצירת אירועי Calendar',
    time: '14:31:52',
    approver: 'דנה כהן',
    tool: 'Google Calendar',
    source: 'תוכנית מאושרת',
    result: '6 אירועים נוצרו',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'יצירת משימות Jira',
    time: '14:31:58',
    approver: 'דנה כהן',
    tool: 'Jira',
    source: 'תבנית ONBOARD-TEMPLATE-v4',
    result: '6 משימות נוצרו',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'שליחת מייל ברכה',
    time: '14:32:05',
    approver: 'דנה כהן',
    tool: 'Gmail',
    source: 'טיוטה מאושרת',
    result: 'נשלח ל-noa.levi@company.co.il',
    agentVersion: 'v2.1.4',
  },
  {
    action: 'תזמון הודעת Slack',
    time: '14:32:08',
    approver: 'דנה כהן',
    tool: 'Slack',
    source: 'טיוטה מאושרת',
    source2: '#team-cs',
    result: 'מתוזמן ל-31.7 ב-09:00',
    agentVersion: 'v2.1.4',
  },
];

export const DEMO_EXECUTION_STATUS = {
  completionPercent: 92,
  completedItems: [
    'תוכנית קליטה נוצרה ושותפה',
    '6 פגישות נקבעו',
    '6 משימות נפתחו',
    'מייל ברכה נשלח',
    'הודעת Slack מתוזמנת',
    'buddy הוקצה, יעל שמיר',
    'המנהלת אישרה את תוכנית השבוע הראשון',
  ],
  pendingItems: [
    'הרשאת CRM, ממתין לאישור מנהל IT',
  ],
};

export const DEMO_FEEDBACK = {
  employee: {
    name: 'נועה לוי',
    questions: [
      { q: 'מה היה שימושי?', a: 'תוכנית ברורה ומפורטת, ידעתי בדיוק מה מצפה לי' },
      { q: 'מה היה חסר?', a: 'לא ידעתי מראש עם אילו לקוחות אעבוד' },
      { q: 'איפה הייתה אי-בהירות?', a: 'תהליך בקשת הרשאת CRM לא היה ברור' },
    ],
  },
  manager: {
    name: 'דנה כהן',
    questions: [
      { q: 'מה חסך זמן?', a: 'לא הייתי צריכה לכתוב תוכנית קליטה מאפס' },
      { q: 'מה דרש תיקון?', a: 'הוספתי שתי פגישות שלא היו בתוכנית' },
      { q: 'מה כדאי לשנות?', a: 'להוסיף שאלה על לקוחות ספציפיים בטופס הקליטה' },
    ],
  },
  agentSuggestions: [
    'הוסף שדה "לקוחות בחודש הראשון" לטופס הקליטה',
    'הוסף הסבר על תהליך בקשת הרשאות לתוכנית',
    'הוסף פגישת "היכרות עם מוצר" לתוכנית ברירת המחדל',
  ],
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
  { name: 'Workday', category: 'מערכות HR', role: 'HRIS: מידע רשמי על עובדים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'HiBob', category: 'מערכות HR', role: 'HRIS: מידע רשמי על עובדים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
  { name: 'BambooHR', category: 'מערכות HR', role: 'HRIS: מידע רשמי על עובדים', storesOfficialData: true, executesActions: true, requiresEnterpriseApproval: true },
];
