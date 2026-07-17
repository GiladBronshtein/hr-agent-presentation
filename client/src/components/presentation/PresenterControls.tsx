/**
 * PresenterControls — AI-Native UI + Glassmorphism
 * Design: Floating glassmorphic pill, indigo/cyan accents, smooth 200ms transitions
 * Anti-patterns avoided: Heavy chrome, cluttered toolbar
 */
import { useState, useEffect, useCallback } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS, getCurrentChapter } from '../../data/scenes';
import {
  LayoutGrid, StickyNote, Maximize, Minimize,
  ChevronRight, ChevronLeft, Accessibility, Zap, ZapOff,
  Keyboard
} from 'lucide-react';

const CHAPTER_COLORS: Record<string, string> = {
  'להבין': '#6366F1',
  'לראות': '#0891B2',
  'לבנות': '#10B981',
  'להטמיע': '#F59E0B',
  'נספח': '#64748B',
};

export function PresenterControls() {
  const {
    currentSceneIndex,
    totalScenes,
    isChapterMapOpen,
    isPresenterNotesOpen,
    isFullscreen,
    isReducedMotion,
    qualityLevel,
    toggleChapterMap,
    togglePresenterNotes,
    toggleFullscreen,
    toggleReducedMotion,
    setQualityLevel,
    goNext,
    goPrev,
  } = usePresentationStore();

  const [isVisible, setIsVisible] = useState(true);
  const [hideTimerRef, setHideTimerRef] = useState<ReturnType<typeof setTimeout> | null>(null);

  const currentScene = SCENES[currentSceneIndex];
  const currentChapter = getCurrentChapter(currentSceneIndex);
  const chapterInfo = CHAPTERS.find((c) => c.id === currentChapter);
  const chapterColor = CHAPTER_COLORS[currentChapter] || '#6366F1';
  const progress = totalScenes > 1 ? (currentSceneIndex / (totalScenes - 1)) * 100 : 0;

  const resetHideTimer = useCallback(() => {
    setIsVisible(true);
    if (hideTimerRef) clearTimeout(hideTimerRef);
    const t = setTimeout(() => setIsVisible(false), 3500);
    setHideTimerRef(t);
  }, [hideTimerRef]);

  useEffect(() => {
    window.addEventListener('mousemove', resetHideTimer);
    window.addEventListener('keydown', resetHideTimer);
    window.addEventListener('touchstart', resetHideTimer);
    const initial = setTimeout(() => setIsVisible(false), 3500);
    return () => {
      window.removeEventListener('mousemove', resetHideTimer);
      window.removeEventListener('keydown', resetHideTimer);
      window.removeEventListener('touchstart', resetHideTimer);
      clearTimeout(initial);
    };
  }, []);

  return (
    <>
      {/* ── Top progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: '2px', background: 'rgba(255,255,255,0.06)' }}
        role="progressbar"
        aria-valuenow={currentSceneIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalScenes}
        aria-label={`סצנה ${currentSceneIndex + 1} מתוך ${totalScenes}`}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${chapterColor}, #22D3EE)`,
            boxShadow: `0 0 8px ${chapterColor}80`,
            transition: 'width 500ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      </div>

      {/* ── Chapter + scene counter (top right) ── */}
      <div
        className="fixed top-4 right-5 z-50 flex items-center gap-2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 400ms ease',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        dir="rtl"
      >
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: chapterColor + '18',
            color: chapterColor,
            border: `1px solid ${chapterColor}30`,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.04em',
          }}
        >
          {chapterInfo?.label || currentChapter}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {String(currentSceneIndex + 1).padStart(2, '0')}/{String(totalScenes).padStart(2, '0')}
        </span>
      </div>

      {/* ── Bottom floating controls pill ── */}
      <div
        className="fixed bottom-5 left-0 right-0 z-50 flex justify-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 350ms ease, transform 350ms cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div
          dir="rtl"
          className="flex items-center gap-1 px-3 py-2 rounded-2xl"
          style={{
            background: 'rgba(8, 8, 20, 0.88)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)',
          }}
        >
          {/* Prev */}
          <ControlBtn
            onClick={goPrev}
            disabled={currentSceneIndex === 0}
            aria-label="סצנה קודמת (←)"
            title="קודם (←)"
          >
            <ChevronRight size={16} />
          </ControlBtn>

          {/* Scene title */}
          <div
            className="px-3 max-w-[220px] truncate text-sm"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {currentScene?.hebrewTitle || ''}
          </div>

          {/* Next */}
          <ControlBtn
            onClick={goNext}
            disabled={currentSceneIndex === totalScenes - 1}
            aria-label="סצנה הבאה (→)"
            title="הבא (→)"
          >
            <ChevronLeft size={16} />
          </ControlBtn>

          <Divider />

          {/* Chapter map */}
          <ControlBtn
            onClick={toggleChapterMap}
            active={isChapterMapOpen}
            aria-label="מפת פרקים (Esc)"
            title="מפת פרקים (Esc)"
          >
            <LayoutGrid size={15} />
          </ControlBtn>

          {/* Presenter notes */}
          <ControlBtn
            onClick={togglePresenterNotes}
            active={isPresenterNotesOpen}
            aria-label="הערות מציג (P)"
            title="הערות מציג (P)"
          >
            <StickyNote size={15} />
          </ControlBtn>

          <Divider />

          {/* Reduced motion */}
          <ControlBtn
            onClick={toggleReducedMotion}
            active={isReducedMotion}
            activeColor="#F59E0B"
            aria-label="תנועה מופחתת"
            title="תנועה מופחתת"
          >
            <Accessibility size={15} />
          </ControlBtn>

          {/* Quality */}
          <ControlBtn
            onClick={() => {
              const levels = ['high', 'balanced', 'lightweight'] as const;
              const idx = levels.indexOf(qualityLevel);
              setQualityLevel(levels[(idx + 1) % levels.length]);
            }}
            active={qualityLevel === 'lightweight'}
            activeColor="#F43F5E"
            aria-label={`איכות: ${qualityLevel}`}
            title={`איכות גרפיקה: ${qualityLevel}`}
          >
            {qualityLevel === 'lightweight' ? <ZapOff size={15} /> : <Zap size={15} />}
          </ControlBtn>

          {/* Fullscreen */}
          <ControlBtn
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'צא ממסך מלא (F)' : 'מסך מלא (F)'}
            title="מסך מלא (F)"
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </ControlBtn>
        </div>
      </div>
    </>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '18px',
        background: 'rgba(255,255,255,0.1)',
        margin: '0 2px',
        flexShrink: 0,
      }}
    />
  );
}

interface ControlBtnProps {
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  activeColor?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  title?: string;
}

function ControlBtn({
  onClick,
  disabled = false,
  active = false,
  activeColor = '#6366F1',
  children,
  'aria-label': ariaLabel,
  title,
}: ControlBtnProps) {
  const [hovered, setHovered] = useState(false);

  const bg = active
    ? `${activeColor}22`
    : hovered
    ? 'rgba(99,102,241,0.12)'
    : 'transparent';

  const color = active
    ? activeColor
    : hovered
    ? '#818CF8'
    : 'rgba(255,255,255,0.45)';

  const border = active
    ? `1px solid ${activeColor}35`
    : hovered
    ? '1px solid rgba(99,102,241,0.25)'
    : '1px solid transparent';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30px',
        height: '30px',
        borderRadius: '8px',
        background: bg,
        border,
        color,
        opacity: disabled ? 0.25 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 180ms cubic-bezier(0.23, 1, 0.32, 1)',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}
