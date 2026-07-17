import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES } from '../../data/scenes';

// Lazy-load all scenes
const SCENE_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'cold-open': lazy(() => import('../../scenes/S00_ColdOpen')),
  'title': lazy(() => import('../../scenes/S01_Title')),
  'agenda': lazy(() => import('../../scenes/S02_Agenda')),
  'audience-question': lazy(() => import('../../scenes/S03_AudienceQuestion')),
  'hr-workday': lazy(() => import('../../scenes/S04_HRWorkday')),
  'automation-vs-agent': lazy(() => import('../../scenes/S05_AutomationVsAgent')),
  'definition': lazy(() => import('../../scenes/S06_Definition')),
  'anatomy': lazy(() => import('../../scenes/S07_Anatomy')),
  'maturity-ladder': lazy(() => import('../../scenes/S08_MaturityLadder')),
  'decision-tree': lazy(() => import('../../scenes/S09_DecisionTree')),
  'why-2026': lazy(() => import('../../scenes/S10_Why2026')),
  'hr-role': lazy(() => import('../../scenes/S11_HRRole')),
  'employee-journey': lazy(() => import('../../scenes/S12_EmployeeJourney')),
  'use-case-constellation': lazy(() => import('../../scenes/S13_UseCaseConstellation')),
  'recruiting-agent': lazy(() => import('../../scenes/S14_RecruitingAgent')),
  'candidate-experience': lazy(() => import('../../scenes/S15_CandidateExperience')),
  'onboarding-agent': lazy(() => import('../../scenes/S16_OnboardingAgent')),
  'manager-prep': lazy(() => import('../../scenes/S17_ManagerPrep')),
  'learning-agent': lazy(() => import('../../scenes/S18_LearningAgent')),
  'employee-service': lazy(() => import('../../scenes/S19_EmployeeService')),
  'skills-mobility': lazy(() => import('../../scenes/S20_SkillsMobility')),
  'org-insights': lazy(() => import('../../scenes/S21_OrgInsights')),
  'knowledge-preservation': lazy(() => import('../../scenes/S22_KnowledgePreservation')),
  'demo-entrance': lazy(() => import('../../scenes/S23_DemoEntrance')),
  'demo-trigger': lazy(() => import('../../scenes/S24_DemoTrigger')),
  'demo-retrieval': lazy(() => import('../../scenes/S25_DemoRetrieval')),
  'demo-planning': lazy(() => import('../../scenes/S26_DemoPlanning')),
  'demo-tools': lazy(() => import('../../scenes/S27_DemoTools')),
  'demo-preview': lazy(() => import('../../scenes/S28_DemoPreview')),
  'demo-approval': lazy(() => import('../../scenes/S29_DemoApproval')),
  'demo-execution': lazy(() => import('../../scenes/S30_DemoExecution')),
  'demo-feedback': lazy(() => import('../../scenes/S31_DemoFeedback')),
  'demo-result': lazy(() => import('../../scenes/S32_DemoResult')),
  'accessible-stack': lazy(() => import('../../scenes/S33_AccessibleStack')),
  'n8n-workflow': lazy(() => import('../../scenes/S34_N8nWorkflow')),
  'design-ingredients': lazy(() => import('../../scenes/S35_DesignIngredients')),
  'governance': lazy(() => import('../../scenes/S36_Governance')),
  'permissions': lazy(() => import('../../scenes/S37_Permissions')),
  'trust-architecture': lazy(() => import('../../scenes/S38_TrustArchitecture')),
  'measuring-value': lazy(() => import('../../scenes/S39_MeasuringValue')),
  'pilot-selector': lazy(() => import('../../scenes/S40_PilotSelector')),
  'roadmap-90': lazy(() => import('../../scenes/S41_Roadmap90')),
  'agent-canvas': lazy(() => import('../../scenes/S42_AgentCanvas')),
  'objections': lazy(() => import('../../scenes/S43_Objections')),
  'closing-reflection': lazy(() => import('../../scenes/S44_ClosingReflection')),
  'final-action': lazy(() => import('../../scenes/S45_FinalAction')),
  'appendix-system-instructions': lazy(() => import('../../scenes/S46_AppendixSystemInstructions')),
  'appendix-n8n-blueprint': lazy(() => import('../../scenes/S47_AppendixN8nBlueprint')),
  'appendix-evaluation': lazy(() => import('../../scenes/S48_AppendixEvaluation')),
  'appendix-tool-map': lazy(() => import('../../scenes/S49_AppendixToolMap')),
  'personal-closing': lazy(() => import('../../scenes/S50_PersonalClosing')),
};

function SceneFallback({ sceneId }: { sceneId: string }) {
  const scene = SCENES.find((s) => s.id === sceneId);
  return (
    <div className="scene-base flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="text-white/20 text-6xl mb-4">⟳</div>
        <p className="text-white/40 text-sm">{scene?.hebrewTitle || sceneId}</p>
      </div>
    </div>
  );
}

interface SceneRendererProps {
  currentIndex: number;
}

export function SceneRenderer({ currentIndex }: SceneRendererProps) {
  const { isReducedMotion } = usePresentationStore();
  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevIndexRef = useRef(currentIndex);

  const currentScene = SCENES[currentIndex];
  const SceneComponent = currentScene ? SCENE_COMPONENTS[currentScene.id] : null;

  useEffect(() => {
    if (currentIndex === prevIndexRef.current) return;

    if (isReducedMotion) {
      setDisplayIndex(currentIndex);
      prevIndexRef.current = currentIndex;
      return;
    }

    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setDisplayIndex(currentIndex);
      prevIndexRef.current = currentIndex;
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentIndex, isReducedMotion]);

  const displayScene = SCENES[displayIndex];
  const DisplayComponent = displayScene ? SCENE_COMPONENTS[displayScene.id] : null;

  return (
    <div
      className="w-full h-full"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transition: isReducedMotion ? 'none' : 'opacity 0.3s ease',
      }}
    >
      {DisplayComponent && (
        <Suspense fallback={<SceneFallback sceneId={displayScene.id} />}>
          <DisplayComponent />
        </Suspense>
      )}
    </div>
  );
}
