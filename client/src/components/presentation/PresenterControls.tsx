/**
 * PresenterControls - floating presenter chrome
 * Design: a dark glass pill lit in the chapter color, a spectrum progress
 * line with a glowing head, smooth 200ms transitions
 * Auto-hide: shown only on real pointer movement or touch, never on key or
 * clicker presses (navigation must not flash chrome over the audience view).
 * Hides after 3s of inactivity and immediately on a slide change.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS, getCurrentChapter } from '../../data/scenes';
import {
  LayoutGrid, StickyNote, Maximize, Minimize, MonitorUp, Volume2, VolumeX,
  ChevronRight, ChevronLeft, Accessibility, Zap, ZapOff,
} from 'lucide-react';
import { openPresenterWindow } from '../../lib/presenterChannel';
import { PALETTE, textOn } from '../../lib/palette';

const HIDE_DELAY = 3000;
const MOVE_THRESHOLD = 6; // px: ignore jitter and synthetic mousemove after layout changes

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
    isSoundEnabled,
    toggleSound,
    setQualityLevel,
    goNext,
    goPrev,
  } = usePresentationStore();

  const [isVisible, setIsVisible] = useState(false);
  // Use a ref for the timer to avoid stale closure issues
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const currentScene = SCENES[currentSceneIndex];
  const currentChapter = getCurrentChapter(currentSceneIndex);
  const chapterInfo = CHAPTERS.find((c) => c.id === currentChapter);
  const chapterColor = chapterInfo?.color ?? PALETTE.violet;
  const chapterText = textOn(chapterColor);
  const progress = totalScenes > 1 ? (currentSceneIndex / (totalScenes - 1)) * 100 : 0;

  const scheduleHide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsVisible(false), HIDE_DELAY);
  }, []);

  const showAndReschedule = useCallback(() => {
    setIsVisible(true);
    scheduleHide();
  }, [scheduleHide]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const last = lastPointRef.current;
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      if (!last) return; // first event only records the resting position
      if (Math.abs(e.clientX - last.x) + Math.abs(e.clientY - last.y) < MOVE_THRESHOLD) return;
      showAndReschedule();
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchstart', showAndReschedule);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', showAndReschedule);
    };
  }, [showAndReschedule]);

  // A slide change hides the chrome at once, unless the pointer is on the pill
  useEffect(() => {
    if (hoverRef.current) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
  }, [currentSceneIndex]);

  return (
    <>
      {/* ── Top progress bar (always visible) ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ height: '3px', background: 'rgba(246,242,234,0.06)' }}
        role="progressbar"
        aria-valuenow={currentSceneIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalScenes}
        aria-label={`סצנה ${currentSceneIndex + 1} מתוך ${totalScenes}`}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: `${progress}%`,
            // RTL deck: the line grows from the right, so the spectrum runs right to left
            backgroundImage: `linear-gradient(270deg, ${PALETTE.blue}, ${PALETTE.violet}, ${PALETTE.magenta}, ${PALETTE.coral}, ${PALETTE.amber})`,
            backgroundSize: `${progress > 0 ? 10000 / progress : 100}% 100%`,
            backgroundPosition: 'right center',
            boxShadow: `0 0 12px ${chapterColor}99`,
            transition: 'width 500ms cubic-bezier(0.23, 1, 0.32, 1), background-size 500ms cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {/* glowing head */}
          <span
            aria-hidden
            style={{
              position: 'absolute', left: -3, top: '50%', width: 7, height: 7, borderRadius: '50%',
              transform: 'translateY(-50%)', background: PALETTE.paper,
              boxShadow: `0 0 10px 2px ${chapterColor}, 0 0 22px 4px ${chapterColor}88`,
              opacity: progress > 0 ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* ── Chapter + scene counter (top right, auto-hides) ── */}
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
            background: chapterColor + '1F',
            color: chapterText,
            border: `1px solid ${chapterColor}55`,
            boxShadow: `0 0 18px -6px ${chapterColor}`,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.04em',
          }}
        >
          {chapterInfo?.label || currentChapter}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: PALETTE.muted }}
        >
          {String(currentSceneIndex + 1).padStart(2, '0')}/{String(totalScenes).padStart(2, '0')}
        </span>
      </div>

      {/* ── Bottom floating controls pill (auto-hides) ── */}
      <div
        className="fixed bottom-5 left-0 right-0 z-50 flex justify-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 350ms ease, transform 350ms cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        // Hovering the controls bar keeps it visible
        onMouseEnter={() => { hoverRef.current = true; setIsVisible(true); if (timerRef.current) clearTimeout(timerRef.current); }}
        onMouseLeave={() => { hoverRef.current = false; scheduleHide(); }}
      >
        <div
          dir="rtl"
          className="control-pill flex items-center gap-1 px-3 py-2 rounded-2xl"
          style={{
            background: 'linear-gradient(180deg, rgba(246,242,234,0.06), rgba(246,242,234,0.015)), rgba(10,14,40,0.94)',
            border: `1px solid ${chapterColor}38`,
            boxShadow: `0 0 40px -14px ${chapterColor}AA, 0 18px 40px -16px rgba(0,0,0,0.8), inset 0 1px 0 rgba(246,242,234,0.07)`,
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
              color: 'rgba(246,242,234,0.78)',
              fontFamily: "'Heebo', sans-serif",
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
            aria-label="מפת המצגת (Esc)"
            title="מפת המצגת (Esc)"
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

          {/* Presenter view window */}
          <ControlBtn
            onClick={openPresenterWindow}
            aria-label="חלון מציג (N)"
            title="חלון מציג (N)"
          >
            <MonitorUp size={15} />
          </ControlBtn>

          <Divider />

          {/* Sound */}
          <ControlBtn
            onClick={toggleSound}
            active={!isSoundEnabled}
            activeColor={PALETTE.muted}
            hoverColor={chapterText}
            aria-label={isSoundEnabled ? 'השתקה (M)' : 'הפעלת צליל (M)'}
            title={isSoundEnabled ? 'השתקה (M)' : 'הפעלת צליל (M)'}
          >
            {isSoundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </ControlBtn>

          {/* Reduced motion */}
          <ControlBtn
            onClick={toggleReducedMotion}
            active={isReducedMotion}
            activeColor={PALETTE.amber}
            hoverColor={chapterText}
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
            activeColor={PALETTE.muted}
            hoverColor={chapterText}
            aria-label={`איכות: ${qualityLevel}`}
            title={`איכות גרפיקה: ${qualityLevel}`}
          >
            {qualityLevel === 'lightweight' ? <ZapOff size={15} /> : <Zap size={15} />}
          </ControlBtn>

          {/* Fullscreen */}
          <ControlBtn
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'יציאה ממסך מלא (F)' : 'מסך מלא (F)'}
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

function useChapterText() {
  const index = usePresentationStore((st) => st.currentSceneIndex);
  const info = CHAPTERS.find((c) => c.id === getCurrentChapter(index));
  return textOn(info?.color ?? PALETTE.violet);
}

function Divider() {
  return (
    <div
      style={{
        width: '1px',
        height: '18px',
        background: 'rgba(246,242,234,0.12)',
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
  hoverColor?: string;
  children: React.ReactNode;
  'aria-label'?: string;
  title?: string;
}

function ControlBtn({
  onClick,
  disabled = false,
  active = false,
  activeColor,
  hoverColor,
  children,
  'aria-label': ariaLabel,
  title,
}: ControlBtnProps) {
  const [hovered, setHovered] = useState(false);
  const chapterText = useChapterText();
  const lit = activeColor ?? chapterText;
  const hoverC = hoverColor ?? chapterText;

  const bg = active
    ? `${lit}24`
    : hovered
    ? 'rgba(246,242,234,0.1)'
    : 'transparent';

  const color = active
    ? lit
    : hovered
    ? hoverC
    : 'rgba(246,242,234,0.72)';

  const border = active
    ? `1px solid ${lit}50`
    : hovered
    ? `1px solid ${hoverC}55`
    : '1px solid transparent';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="control-btn"
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
