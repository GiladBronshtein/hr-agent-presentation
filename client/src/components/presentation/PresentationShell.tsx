import { useEffect, useRef, useCallback } from 'react';
import { prefetchMediaAssets } from '../../lib/mediaAssets';
import { sound } from '../../lib/sound';
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
import { SoundArmHint } from './SoundArmHint';
import { MEDIA_AUDIO } from '../../lib/device';

export function PresentationShell() {
  const {
    currentSceneIndex,
    isChapterMapOpen,
    isPresenterNotesOpen,
    isKeyboardHelpOpen,
    isTransitioning,
    isBlackout,
    toggleBlackout,
    isSoundEnabled,
    setTransitioning,
    goNext,
    goPrev,
  } = usePresentationStore();

  // Enable keyboard controls
  useKeyboardControls();

  // URL hash <-> scene index sync (deep links + refresh recovery)
  useHashSync();

  // iOS streams the trailer soundtrack (lib/device.ts): register it before the first gesture
  if (MEDIA_AUDIO && !sound.mediaUrl) sound.mediaUrl = `${import.meta.env.BASE_URL}audio/trailer-score.m4a`;
  // Audio needs a user gesture once; any key or click unlocks it
  useEffect(() => {
    const unlock = () => sound.unlock();
    window.addEventListener('keydown', unlock, true);
    window.addEventListener('pointerdown', unlock, true);
    return () => {
      window.removeEventListener('keydown', unlock, true);
      window.removeEventListener('pointerdown', unlock, true);
    };
  }, []);
  useEffect(() => { sound.setEnabled(isSoundEnabled); }, [isSoundEnabled]);

  // Sync state with the presenter-view window (BroadcastChannel)
  usePresenterBridge();

  // Warm caches during idle time: slide images + the heavy 3D closing scene
  useEffect(() => {
    prefetchMediaAssets();
    // the slide 2 trailer: particle formations + offline-rendered score
    const p = setTimeout(() => { import('./trailer/prepare').then((m) => m.prepareTrailer()); }, 600);
    const t = setTimeout(() => { import('../../scenes/S50_PersonalClosing'); }, 4000);
    // the closing finale's sound, rendered offline long before it is needed
    const f = setTimeout(() => { import('./PortraitFinale').then((m) => m.prepareFinale()); }, 20000);
    return () => { clearTimeout(p); clearTimeout(t); clearTimeout(f); };
  }, []);

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
      {/* Main scene area - SceneStage scales it to fit small screens */}
      <SceneStage>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <SceneRenderer currentIndex={currentSceneIndex} />
          {/* Audio not yet allowed in this window: sits in the title
              trailer's bottom letterbox bar, in stage coordinates */}
          <SoundArmHint />
        </div>
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

      {/* Speaker notes - slides up from bottom */}
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
