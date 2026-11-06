import { useEffect, useLayoutEffect, useMemo, useRef, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { usePresentationStore } from '../../store/presentationStore';
import { CHAPTERS, SCENES } from '../../data/scenes';
import { ChapterInterstitial } from '../motion/ChapterInterstitial';
import { PathTransition, type PathHandle } from '../motion/PathTransition';
import { sound } from '../../lib/sound';
import { useReducedMotion } from '../motion/useReducedMotion';
import { mark } from '../../lib/diag';

// Scene chunk importers. Kept separate from lazy() so neighbours can be
// preloaded: import() caches the module promise, so a later lazy render of a
// preloaded scene resolves without showing the Suspense fallback.
const SCENE_IMPORTERS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'cold-open': () => import('../../scenes/S00_ColdOpen'),
  'title': () => import('../../scenes/S01_Title'),
  'agenda': () => import('../../scenes/S02_Agenda'),
  'audience-question': () => import('../../scenes/S03_AudienceQuestion'),
  'ld-week': () => import('../../scenes/S04_LDWeek'),
  'automation-vs-agent': () => import('../../scenes/S05_AutomationVsAgent'),
  'anatomy': () => import('../../scenes/S07_Anatomy'),
  'decision-tree': () => import('../../scenes/S09_DecisionTree'),
  'why-2026': () => import('../../scenes/S10_Why2026'),
  'ld-role': () => import('../../scenes/S11_LDRole'),
  'learning-cycle': () => import('../../scenes/S12_LearningCycle'),
  'agent-map': () => import('../../scenes/S13_AgentMap'),
  'needs-analysis-agent': () => import('../../scenes/S14_NeedsAnalysisAgent'),
  'content-agent': () => import('../../scenes/S15_ContentAgent'),
  'learning-path-agent': () => import('../../scenes/S16_LearningPathAgent'),
  'impact-agent': () => import('../../scenes/S17_ImpactAgent'),
  'simulation-agent': () => import('../../scenes/S18_SimulationAgent'),
  'flow-of-work-agent': () => import('../../scenes/S19_FlowOfWorkAgent'),
  'skills-agent': () => import('../../scenes/S20_SkillsAgent'),
  'onboarding-learning-agent': () => import('../../scenes/S21_OnboardingLearningAgent'),
  'knowledge-agent': () => import('../../scenes/S22_KnowledgeAgent'),
  'demo-entrance': () => import('../../scenes/S23_DemoEntrance'),
  'demo-trigger': () => import('../../scenes/S24_DemoTrigger'),
  'demo-retrieval': () => import('../../scenes/S25_DemoRetrieval'),
  'demo-planning': () => import('../../scenes/S26_DemoPlanning'),
  'demo-tools': () => import('../../scenes/S27_DemoTools'),
  'demo-preview': () => import('../../scenes/S28_DemoPreview'),
  'demo-approval': () => import('../../scenes/S29_DemoApproval'),
  'demo-execution': () => import('../../scenes/S30_DemoExecution'),
  'demo-feedback': () => import('../../scenes/S31_DemoFeedback'),
  'demo-result': () => import('../../scenes/S32_DemoResult'),
  'accessible-stack': () => import('../../scenes/S33_AccessibleStack'),
  'design-ingredients': () => import('../../scenes/S35_DesignIngredients'),
  'governance': () => import('../../scenes/S36_Governance'),
  'permissions': () => import('../../scenes/S37_Permissions'),
  'trust-architecture': () => import('../../scenes/S38_TrustArchitecture'),
  'measuring-value': () => import('../../scenes/S39_MeasuringValue'),
  'pilot-selector': () => import('../../scenes/S40_PilotSelector'),
  'roadmap-90': () => import('../../scenes/S41_Roadmap90'),
  'agent-canvas': () => import('../../scenes/S42_AgentCanvas'),
  'objections': () => import('../../scenes/S43_Objections'),
  'final-action': () => import('../../scenes/S45_FinalAction'),
  'appendix-system-instructions': () => import('../../scenes/S46_AppendixSystemInstructions'),
  'appendix-n8n-blueprint': () => import('../../scenes/S47_AppendixN8nBlueprint'),
  'appendix-evaluation': () => import('../../scenes/S48_AppendixEvaluation'),
  'sources': () => import('../../scenes/S51_Sources'),
  'appendix-tool-map': () => import('../../scenes/S49_AppendixToolMap'),
  'personal-closing': () => import('../../scenes/S50_PersonalClosing'),
};

// Resolved scene components. React.lazy always suspends on its first render,
// even for an already imported module, so a scene found here is rendered
// directly and never shows a fallback.
const LOADED: Record<string, React.ComponentType> = {};
const LOADING: Record<string, Promise<void>> = {};

function loadScene(id: string): Promise<void> {
  if (LOADED[id]) return Promise.resolve();
  const load = SCENE_IMPORTERS[id];
  if (!load) return Promise.resolve();
  if (!LOADING[id]) {
    LOADING[id] = load()
      .then((m) => { LOADED[id] = m.default; })
      .catch(() => { delete LOADING[id]; });
  }
  return LOADING[id];
}

// Lazy components: only used when a scene is rendered before its module
// resolved (first paint of a deep link, reduced-motion jumps)
const SCENE_COMPONENTS: Record<string, React.LazyExoticComponent<React.ComponentType>> = Object.fromEntries(
  Object.keys(SCENE_IMPORTERS).map((id) => [id, lazy(() => loadScene(id).then(() => ({ default: LOADED[id] })))]),
);

function preloadScene(index: number) {
  const scene = SCENES[index];
  if (scene) void loadScene(scene.id);
}

/** Empty dark frame while a scene chunk loads: no spinner, no text */
function SceneFallback() {
  return <div className="scene-base" style={{ background: '#0A0A1A' }} />;
}

interface SceneRendererProps {
  currentIndex: number;
}

// ─── Transition tuning ──────────────────────────────────────────
// The learning-path line carries every transition (PathTransition): it
// covers the slide out of its node, the swap happens underneath, and the
// next slide opens out of the same node. Each step plays the next note of
// the deck's melody. The plain fade below is only the lightweight fallback.
const X_SHIFT = 1.2;          // fallback: percent of the stage width
const SCALE_AWAY = 0.985;     // fallback
const ENTER_MS = 360;         // fallback, ease-out-expo
const EXIT_MS = 230;          // fallback, ease-in
const CARD_SWAP_MS = 1000;    // with a chapter card the scene swaps just before the wash wipes away,
                              // so the slide's own entrance plays as the card reveals it
const CARD_GUARD_MS = 1200;   // never show a chapter card right after app load (deep links)

type Phase = 'idle' | 'exit' | 'enter';

function indexFromHash(): number | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.hash.match(/^#\/scene\/([\w-]+)$/);
  if (!match) return null;
  const scene = SCENES.find((s) => s.id === match[1]);
  return scene ? scene.index : null;
}

/** Index into CHAPTERS when `index` is the first scene of chapters 2-5, else -1 */
function chapterStartingAt(index: number): number {
  for (let i = 1; i < CHAPTERS.length; i++) {
    if (CHAPTERS[i].sceneRange[0] === index) return i;
  }
  return -1;
}

function preloadNeighbours(index: number) {
  const run = () => { preloadScene(index + 1); preloadScene(index - 1); };
  const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 500 });
  else window.setTimeout(run, 120);
}

export function SceneRenderer({ currentIndex }: SceneRendererProps) {
  const reduced = useReducedMotion();
  const qualityLevel = usePresentationStore((s) => s.qualityLevel);

  // A deep link wins on first paint, so the app never animates from the
  // persisted scene to the linked one while useHashSync catches up.
  const [displayIndex, setDisplayIndex] = useState(() => indexFromHash() ?? currentIndex);
  const [card, setCard] = useState<{ chapter: number; id: number } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef(displayIndex);   // scene currently rendered
  const targetRef = useRef(displayIndex);    // latest requested scene
  const phaseRef = useRef<Phase>('idle');
  const dirRef = useRef<1 | -1>(1);
  const exitEndsAtRef = useRef(0);
  const swapTimerRef = useRef(0);
  const swapTokenRef = useRef(0);             // invalidates a swap still waiting on a chunk
  const pendingEnterRef = useRef(false);
  const cardOnRef = useRef(false);
  const cardIdRef = useRef(0);
  const mountedAtRef = useRef(typeof performance !== 'undefined' ? performance.now() : 0);
  const firstRunRef = useRef(true);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const pathRef = useRef<PathHandle>(null);
  const pathOnRef = useRef(true);
  pathOnRef.current = qualityLevel !== 'lightweight';
  const viaPathRef = useRef(false);   // the current transition is carried by the line

  // The engine only touches refs and stable state setters, so it is created once.
  const engine = useMemo(() => {
    const clearMotion = (el: HTMLElement) => {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'transform,filter,opacity,willChange' });
    };

    const runEnter = () => {
      const el = stageRef.current;
      if (!el) { phaseRef.current = 'idle'; return; }
      if (viaPathRef.current || cardOnRef.current) {
        // the line (or the chapter card) reveals the slide: show it as is
        viaPathRef.current = false;
        clearMotion(el);
        if (!cardOnRef.current) pathRef.current?.reveal();
        phaseRef.current = 'idle';
        preloadNeighbours(displayRef.current);
        return;
      }
      const dir = dirRef.current;
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        {
          xPercent: -dir * X_SHIFT,
          scale: SCALE_AWAY,
          opacity: 0,
          willChange: 'transform, opacity',
        },
        {
          xPercent: 0,
          scale: 1,
          opacity: 1,
          duration: ENTER_MS / 1000,
          ease: 'expo.out',
          overwrite: true,
          onComplete: () => {
            clearMotion(el);
            phaseRef.current = 'idle';
            preloadNeighbours(displayRef.current);
          },
        },
      );
    };

    const swap = (loaded = false) => {
      const el = stageRef.current;
      const next = targetRef.current;
      const token = ++swapTokenRef.current;
      const nextId = SCENES[next]?.id;
      if (!loaded && nextId && !LOADED[nextId] && SCENE_IMPORTERS[nextId]) {
        // Hold the cleared stage until the chunk is in, so the enter tween
        // always plays on the real slide (never on a loading frame)
        if (el) {
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: 0 });
        }
        void loadScene(nextId).then(() => {
          if (token === swapTokenRef.current) swap(true);
        });
        return;
      }
      phaseRef.current = 'enter';
      if (el && !viaPathRef.current && !cardOnRef.current) {
        gsap.killTweensOf(el);
        gsap.set(el, { opacity: 0 });
      }
      if (next !== displayRef.current) {
        displayRef.current = next;
        pendingEnterRef.current = true;   // the layout effect starts the enter before paint
        setDisplayIndex(next);
      } else {
        runEnter();
      }
    };

    const scheduleSwap = (at: number) => {
      window.clearTimeout(swapTimerRef.current);
      swapTokenRef.current++;
      swapTimerRef.current = window.setTimeout(() => swap(), Math.max(0, at - performance.now()));
    };

    const showCard = (chapter: number) => {
      cardOnRef.current = true;
      cardIdRef.current += 1;
      setCard({ chapter, id: cardIdRef.current });
    };

    const hideCard = () => {
      if (!cardOnRef.current) return;
      cardOnRef.current = false;
      setCard(null);
      // Release the hold: swap as soon as the exit itself is done
      if (phaseRef.current === 'exit') scheduleSwap(exitEndsAtRef.current);
    };

    const instant = (next: number) => {
      window.clearTimeout(swapTimerRef.current);
      swapTokenRef.current++;
      const el = stageRef.current;
      if (el) clearMotion(el);
      pathRef.current?.clear();
      viaPathRef.current = false;
      phaseRef.current = 'idle';
      pendingEnterRef.current = false;
      targetRef.current = next;
      if (next !== displayRef.current) {
        displayRef.current = next;
        setDisplayIndex(next);
      }
      preloadNeighbours(next);
    };

    const navigate = (next: number) => {
      mark(`go ${next}`);
      hideCard(); // any navigation removes a visible chapter card
      const el = stageRef.current;
      if (reducedRef.current || !el) { instant(next); return; }

      const prevTarget = targetRef.current;
      if (next === prevTarget) return;
      targetRef.current = next;
      const dir: 1 | -1 = next > prevTarget ? 1 : -1;
      dirRef.current = dir;
      preloadScene(next);

      const now = performance.now();
      const chapter = chapterStartingAt(next);
      const withCard = dir === 1 && chapter >= 1 && now - mountedAtRef.current > CARD_GUARD_MS;

      // the deck's melody: one note per step, a chord when a chapter opens
      sound.step(next, dir, withCard);

      if (phaseRef.current === 'exit') {
        // Already leaving: just retarget, the swap renders the latest target
        if (withCard) { pathRef.current?.clear(); viaPathRef.current = false; showCard(chapter); }
        scheduleSwap(withCard ? Math.max(exitEndsAtRef.current, now + CARD_SWAP_MS) : exitEndsAtRef.current);
        return;
      }

      // Idle or mid-enter: leave from wherever the stage is right now
      phaseRef.current = 'exit';
      gsap.killTweensOf(el);
      if (withCard) {
        pathRef.current?.clear();
        viaPathRef.current = false;
        exitEndsAtRef.current = now;
        showCard(chapter);
        scheduleSwap(now + CARD_SWAP_MS);
        return;
      }
      if (pathOnRef.current && pathRef.current) {
        viaPathRef.current = true;
        const ms = pathRef.current.cover(dir, next);
        exitEndsAtRef.current = now + ms;
        scheduleSwap(exitEndsAtRef.current);
        return;
      }
      gsap.to(el, {
        xPercent: dir * X_SHIFT,
        scale: SCALE_AWAY,
        opacity: 0,
        willChange: 'transform, opacity',
        duration: EXIT_MS / 1000,
        ease: 'power2.in',
        overwrite: true,
      });
      exitEndsAtRef.current = now + EXIT_MS;
      scheduleSwap(exitEndsAtRef.current);
    };

    return { navigate, instant, hideCard, runEnter };
  }, []);

  // Navigation requests
  useEffect(() => {
    if (firstRunRef.current) {
      firstRunRef.current = false;
      preloadNeighbours(displayRef.current);
      if (currentIndex !== displayRef.current) {
        // Deep link shown first; useHashSync aligns the store right after.
        // Safety net in case it never does.
        const t = window.setTimeout(() => {
          const idx = usePresentationStore.getState().currentSceneIndex;
          if (idx !== displayRef.current) engine.instant(idx);
        }, 0);
        return () => window.clearTimeout(t);
      }
      return;
    }
    engine.navigate(currentIndex);
  }, [currentIndex, engine]);

  // Start the enter before the new scene paints
  useLayoutEffect(() => {
    if (pendingEnterRef.current) {
      pendingEnterRef.current = false;
      engine.runEnter();
    }
  }, [displayIndex, engine]);

  // Reduced motion switched on mid-flight: settle instantly
  useEffect(() => {
    if (!reduced) return;
    engine.hideCard();
    engine.instant(targetRef.current);
  }, [reduced, engine]);

  // Any key or pointer press skips the chapter card
  useEffect(() => {
    if (!card) return;
    const skip = () => engine.hideCard();
    window.addEventListener('keydown', skip, true);
    window.addEventListener('pointerdown', skip, true);
    return () => {
      window.removeEventListener('keydown', skip, true);
      window.removeEventListener('pointerdown', skip, true);
    };
  }, [card, engine]);

  useEffect(() => () => {
    window.clearTimeout(swapTimerRef.current);
    if (stageRef.current) gsap.killTweensOf(stageRef.current);
  }, []);

  // Pick the component once per displayed scene: a resolved module renders
  // directly; the lazy one is kept for that scene even after its chunk lands,
  // so an unrelated re-render never remounts (and replays) the slide.
  const displayScene = SCENES[displayIndex];
  const pickRef = useRef<{ index: number; Comp: React.ComponentType | null } | null>(null);
  if (!pickRef.current || pickRef.current.index !== displayIndex) {
    const id = displayScene?.id;
    pickRef.current = { index: displayIndex, Comp: id ? LOADED[id] ?? SCENE_COMPONENTS[id] ?? null : null };
  }
  const DisplayComponent = pickRef.current.Comp;

  return (
    <div className="relative w-full h-full">
      <div ref={stageRef} className="w-full h-full isolate">
        {DisplayComponent && (
          <Suspense fallback={<SceneFallback />}>
            <DisplayComponent />
          </Suspense>
        )}
      </div>
      {!reduced && <PathTransition ref={pathRef} />}
      {card && <ChapterInterstitial key={card.id} chapterIndex={card.chapter} onDone={engine.hideCard} />}
    </div>
  );
}
