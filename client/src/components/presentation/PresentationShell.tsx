import { useEffect, useRef, useCallback } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { PresenterControls } from './PresenterControls';
import { ChapterMap } from './ChapterMap';
import { SpeakerNotes } from './SpeakerNotes';
import { KeyboardHelp } from './KeyboardHelp';
import { SceneRenderer } from './SceneRenderer';

export function PresentationShell() {
  const {
    currentSceneIndex,
    isChapterMapOpen,
    isPresenterNotesOpen,
    isKeyboardHelpOpen,
    isTransitioning,
    setTransitioning,
    goNext,
    goPrev,
  } = usePresentationStore();

  // Enable keyboard controls
  useKeyboardControls();

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    // Only handle horizontal swipes (dx > dy threshold)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) goNext(); // swipe left → next
      else goPrev();        // swipe right → prev
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }, [goNext, goPrev]);

  // Overlay backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      const { toggleChapterMap, togglePresenterNotes, toggleKeyboardHelp, isChapterMapOpen, isPresenterNotesOpen, isKeyboardHelpOpen } = usePresentationStore.getState();
      if (isChapterMapOpen) toggleChapterMap();
      if (isKeyboardHelpOpen) toggleKeyboardHelp();
    }
  }, []);

  return (
    <div
      className="presentation-shell"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      dir="rtl"
    >
      {/* Main scene area */}
      <SceneRenderer currentIndex={currentSceneIndex} />

      {/* Controls */}
      <PresenterControls />

      {/* Overlays */}
      <div onClick={handleBackdropClick}>
        <ChapterMap />
        <KeyboardHelp />
      </div>

      {/* Speaker notes — slides up from bottom */}
      <SpeakerNotes />
    </div>
  );
}
