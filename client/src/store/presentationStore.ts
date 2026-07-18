import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SCENES } from '../data/scenes';

export type QualityLevel = 'high' | 'balanced' | 'lightweight';
export type DemoState = 'idle' | 'trigger' | 'retrieving' | 'planning' | 'tools' | 'preview' | 'approval' | 'executing' | 'feedback' | 'result';

export interface PresentationStore {
  // Navigation
  currentSceneIndex: number;
  totalScenes: number;
  visitedScenes: Set<number>;
  isTransitioning: boolean;

  // UI State
  isChapterMapOpen: boolean;
  isPresenterNotesOpen: boolean;
  isKeyboardHelpOpen: boolean;
  isDiagnosticsOpen: boolean;
  isFullscreen: boolean;
  isBlackout: boolean;

  // Sound
  isSoundEnabled: boolean;

  // Reduced motion
  isReducedMotion: boolean;

  // Quality
  qualityLevel: QualityLevel;

  // Demo state
  demoState: DemoState;
  demoApprovalPath: 'approve' | 'edit' | 'return' | null;
  demoAnswers: {
    buddy: string;
    crmApproval: string;
    firstMonthClients: string;
  };

  // Scene 4 audience selections
  audienceSelections: string[];

  // Pilot selector scores
  pilotScores: Record<string, number>;

  // Agent canvas data
  agentCanvas: Record<string, string>;

  // ROI calculator
  roiValues: {
    hoursPerProcess: number;
    processesPerMonth: number;
    errorRate: number;
    hourlyRate: number;
    buildCost: number;
  };

  // Actions
  goToScene: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  goFirst: () => void;
  goLast: () => void;
  setTransitioning: (v: boolean) => void;

  toggleChapterMap: () => void;
  togglePresenterNotes: () => void;
  toggleKeyboardHelp: () => void;
  toggleDiagnostics: () => void;
  toggleFullscreen: () => void;
  toggleBlackout: () => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  setQualityLevel: (level: QualityLevel) => void;

  setDemoState: (state: DemoState) => void;
  setDemoApprovalPath: (path: 'approve' | 'edit' | 'return' | null) => void;
  // Aliases used by demo scenes
  setDemoStep: (step: number) => void;
  demoApprovalState: 'pending' | 'approved' | 'rejected';
  setDemoApprovalState: (state: 'pending' | 'approved' | 'rejected') => void;
  setDemoAnswers: (answers: Partial<PresentationStore['demoAnswers']>) => void;
  resetDemo: () => void;

  toggleAudienceSelection: (item: string) => void;
  clearAudienceSelections: () => void;

  setPilotScore: (idea: string, score: number) => void;
  setAgentCanvasField: (field: string, value: string) => void;
  resetAgentCanvas: () => void;
  setRoiValue: (key: keyof PresentationStore['roiValues'], value: number) => void;
}

// Detect device capability for initial quality level
function detectQualityLevel(): QualityLevel {
  if (typeof window === 'undefined') return 'balanced';
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return 'lightweight';
  const renderer = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).RENDERER);
  if (renderer && (renderer.includes('Intel') || renderer.includes('integrated'))) {
    return 'balanced';
  }
  // Check memory hint
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory && nav.deviceMemory < 4) return 'balanced';
  return 'high';
}

const TOTAL_SCENES = SCENES.length; // auto-derived from scenes data

export const usePresentationStore = create<PresentationStore>()(
  persist(
    (set, get) => ({
      currentSceneIndex: 0,
      totalScenes: TOTAL_SCENES,
      visitedScenes: new Set(),
      isTransitioning: false,

      isChapterMapOpen: false,
      isPresenterNotesOpen: false,
      isKeyboardHelpOpen: false,
      isDiagnosticsOpen: false,
      isFullscreen: false,
      isBlackout: false,

      isSoundEnabled: false,
      isReducedMotion: typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,

      qualityLevel: 'balanced', // Will be set on mount

      demoState: 'idle',
      demoApprovalPath: null,
      demoApprovalState: 'pending' as 'pending' | 'approved' | 'rejected',
      demoAnswers: {
        buddy: '',
        crmApproval: '',
        firstMonthClients: '',
      },

      audienceSelections: [],
      pilotScores: {},
      agentCanvas: {
        name: 'אייג׳נט קליטת עובד',
        mainUser: 'HR ומנהלים',
        goal: 'להכין תוכנית קליטה מאושרת לפני היום הראשון',
        trigger: 'הצעת עבודה אושרה ונקבע תאריך התחלה',
        sources: 'פרופיל תפקיד, מדריך עובד, תבניות קליטה',
        tools: 'Google Docs, Calendar, Gmail, Slack, Jira',
        allowed: 'יצירת טיוטות, פתיחת משימות, קריאת לוחות שנה',
        forbidden: 'שינוי מידע HR, חשיפת שכר, שליחה ללא אישור',
        approvals: 'לפני יצירת אירועים, שליחת הודעות, מתן הרשאות',
        outputs: 'תוכנית קליטה, לוח יום ראשון, רשימות פעולות',
        metrics: 'אחוז פעולות שהושלמו לפני יום ראשון',
        owner: 'מנהל HR',
        reviewFrequency: 'רבעוני',
        dataPolicy: 'מחיקה אחרי 90 יום, ללא שמירת מידע אישי',
      },

      roiValues: {
        hoursPerProcess: 4,
        processesPerMonth: 20,
        errorRate: 15,
        hourlyRate: 150,
        buildCost: 30000,
      },

      goToScene: (index) => {
        const { totalScenes, visitedScenes } = get();
        const clamped = Math.max(0, Math.min(index, totalScenes - 1));
        const newVisited = new Set(visitedScenes);
        newVisited.add(clamped);
        set({ currentSceneIndex: clamped, visitedScenes: newVisited });
      },

      goNext: () => {
        const { currentSceneIndex, totalScenes, isTransitioning } = get();
        if (isTransitioning) return;
        if (currentSceneIndex < totalScenes - 1) {
          get().goToScene(currentSceneIndex + 1);
        }
      },

      goPrev: () => {
        const { currentSceneIndex, isTransitioning } = get();
        if (isTransitioning) return;
        if (currentSceneIndex > 0) {
          get().goToScene(currentSceneIndex - 1);
        }
      },

      goFirst: () => get().goToScene(0),
      goLast: () => get().goToScene(get().totalScenes - 1),

      setTransitioning: (v) => set({ isTransitioning: v }),

      toggleChapterMap: () => set((s) => ({ isChapterMapOpen: !s.isChapterMapOpen })),
      togglePresenterNotes: () => set((s) => ({ isPresenterNotesOpen: !s.isPresenterNotesOpen })),
      toggleKeyboardHelp: () => set((s) => ({ isKeyboardHelpOpen: !s.isKeyboardHelpOpen })),
      toggleDiagnostics: () => set((s) => ({ isDiagnosticsOpen: !s.isDiagnosticsOpen })),
      toggleFullscreen: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
          set({ isFullscreen: true });
        } else {
          document.exitFullscreen().catch(() => {});
          set({ isFullscreen: false });
        }
      },
      toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),
      toggleBlackout: () => set((s) => ({ isBlackout: !s.isBlackout })),
      toggleReducedMotion: () => set((s) => ({ isReducedMotion: !s.isReducedMotion })),
      setQualityLevel: (level) => set({ qualityLevel: level }),

      setDemoState: (state) => set({ demoState: state }),
      setDemoApprovalPath: (path) => set({ demoApprovalPath: path }),
      setDemoStep: (step) => {
        const states: DemoState[] = ['idle', 'trigger', 'retrieving', 'planning', 'tools', 'preview', 'approval', 'executing', 'feedback', 'result'];
        set({ demoState: states[step] || 'idle' });
      },
      setDemoApprovalState: (state) => set({ demoApprovalState: state }),
      setDemoAnswers: (answers) => set((s) => ({ demoAnswers: { ...s.demoAnswers, ...answers } })),
      resetDemo: () => set({ demoState: 'idle', demoApprovalPath: null, demoApprovalState: 'pending', demoAnswers: { buddy: '', crmApproval: '', firstMonthClients: '' } }),

      toggleAudienceSelection: (item) => set((s) => {
        const current = s.audienceSelections;
        if (current.includes(item)) {
          return { audienceSelections: current.filter((i) => i !== item) };
        }
        if (current.length >= 3) return {};
        return { audienceSelections: [...current, item] };
      }),
      clearAudienceSelections: () => set({ audienceSelections: [] }),

      setPilotScore: (idea, score) => set((s) => ({ pilotScores: { ...s.pilotScores, [idea]: score } })),
      setAgentCanvasField: (field, value) => set((s) => ({ agentCanvas: { ...s.agentCanvas, [field]: value } })),
      resetAgentCanvas: () => set((s) => ({ agentCanvas: { ...s.agentCanvas } })),
      setRoiValue: (key, value) => set((s) => ({ roiValues: { ...s.roiValues, [key]: value } })),
    }),
    {
      name: 'hr-agent-presentation',
      partialize: (state) => ({
        currentSceneIndex: state.currentSceneIndex,
        audienceSelections: state.audienceSelections,
        agentCanvas: state.agentCanvas,
        pilotScores: state.pilotScores,
        roiValues: state.roiValues,
        qualityLevel: state.qualityLevel,
        isSoundEnabled: state.isSoundEnabled,
        isReducedMotion: state.isReducedMotion,
      }),
    }
  )
);

// Initialize quality level on first load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('hr-agent-presentation');
  if (!stored || !JSON.parse(stored).state?.qualityLevel) {
    usePresentationStore.getState().setQualityLevel(detectQualityLevel());
  }
}
