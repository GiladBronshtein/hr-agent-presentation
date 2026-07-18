import { useEffect, useRef, useCallback } from 'react';
import { prefetchMediaAssets } from '../../lib/mediaAssets';
import { usePresentationStore } from '../../store/presentationStore';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { useHashSync } from '../../hooks/useHashSync';
import { usePresenterBridge } from '../../hooks/usePresenterBridge';
import { PresenterControls } from './PresenterControls';
import { ChapterMap } from './ChapterMap';
import { SpeakerNotes } from './SpeakerNotes';
import { KeyboardHelp } from './KeyboardHelp';
import { SceneRenderer } from './SceneRenderer';
import { SceneStage } from './SceneStage';
import { RotateHint } from './RotateHint';

export function PresentationShell() {
  const {
    currentSceneIndex,
    isChapterMapOpen,
    isPresenterNotesOpen,
    isKeyboardHelpOpen,
    isTransitioning,
    isBlackout,
    toggleBlackout,
    setTransitioning,
    goNext,
    goPrev,
  } = usePresentationStore();

  // Enable keyboard controls
  useKeyboardControls();

  // URL hash <-> scene index sync (deep links + refresh recovery)
  useHashSync();

  // Sync state with the presenter-view window (BroadcastChannel)
  usePresenterBridge();

  // Warm the image cache during idle time so slide images appear instantly
  useEffect(() => { prefetchMediaAssets(); }, []);

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
      {/* Main scene area — SceneStage scales it to fit small screens */}
      <SceneStage>
        <SceneRenderer currentIndex={currentSceneIndex} />
      </SceneStage>

      {/* Controls */}
      <PresenterControls />

      {/* Mobile portrait hint */}
      <RotateHint />

      {/* Overlays */}
      <div onClick={handleBackdropClick}>
        <ChapterMap />
        <KeyboardHelp />
      </div>

      {/* Speaker notes — slides up from bottom */}
      <SpeakerNotes />

      {/* Presenter blackout (B) */}
      <div
        className={`blackout-overlay ${isBlackout ? 'on' : ''}`}
        onClick={() => { if (isBlackout) toggleBlackout(); }}
        aria-hidden={!isBlackout}
      />
    </div>
  );
}
