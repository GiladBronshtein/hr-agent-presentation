import { useState, useEffect } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES, CHAPTERS, getCurrentChapter } from '../../data/scenes';
import {
  Map, StickyNote, Volume2, VolumeX, Maximize, Minimize,
  ChevronRight, ChevronLeft, Accessibility, Zap, ZapOff
} from 'lucide-react';

export function PresenterControls() {
  const {
    currentSceneIndex,
    totalScenes,
    isChapterMapOpen,
    isPresenterNotesOpen,
    isSoundEnabled,
    isFullscreen,
    isReducedMotion,
    qualityLevel,
    toggleChapterMap,
    togglePresenterNotes,
    toggleSound,
    toggleFullscreen,
    toggleReducedMotion,
    setQualityLevel,
    goNext,
    goPrev,
  } = usePresentationStore();

  const [isVisible, setIsVisible] = useState(true);
  const [hideTimer, setHideTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const currentScene = SCENES[currentSceneIndex];
  const currentChapter = getCurrentChapter(currentSceneIndex);
  const chapterInfo = CHAPTERS.find((c) => c.id === currentChapter);
  const progress = (currentSceneIndex / (totalScenes - 1)) * 100;

  // Auto-hide controls after inactivity
  useEffect(() => {
    const showControls = () => {
      setIsVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      const timer = setTimeout(() => setIsVisible(false), 3000);
      setHideTimer(timer);
    };

    window.addEventListener('mousemove', showControls);
    window.addEventListener('keydown', showControls);
    window.addEventListener('touchstart', showControls);

    // Initial hide after 3s
    const initial = setTimeout(() => setIsVisible(false), 3000);
    setHideTimer(initial);

    return () => {
      window.removeEventListener('mousemove', showControls);
      window.removeEventListener('keydown', showControls);
      window.removeEventListener('touchstart', showControls);
      if (hideTimer) clearTimeout(hideTimer);
      clearTimeout(initial);
    };
  }, []);

  return (
    <>
      {/* Progress bar — always visible */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-0.5"
        style={{ background: 'rgba(255,255,255,0.1)' }}
        role="progressbar"
        aria-valuenow={currentSceneIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalScenes}
        aria-label={`סצנה ${currentSceneIndex + 1} מתוך ${totalScenes}`}
      >
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: chapterInfo?.color || '#4F7CFF',
          }}
        />
      </div>

      {/* Chapter indicator — top right, subtle */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        dir="rtl"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{
              background: (chapterInfo?.color || '#4F7CFF') + '20',
              color: chapterInfo?.color || '#4F7CFF',
              border: `1px solid ${(chapterInfo?.color || '#4F7CFF')}30`,
            }}
          >
            {currentChapter}
          </span>
          <span className="text-xs text-white/40 font-mono">
            {currentSceneIndex + 1}/{totalScenes}
          </span>
        </div>
      </div>

      {/* Bottom controls bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <div
          className="mx-auto max-w-3xl mb-4 px-4"
          dir="rtl"
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl"
            style={{
              background: 'rgba(9, 17, 31, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {/* Navigation */}
            <button
              onClick={goPrev}
              disabled={currentSceneIndex === 0}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="סצנה קודמת"
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={goNext}
              disabled={currentSceneIndex === totalScenes - 1}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="סצנה הבאה"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="w-px h-5 bg-white/15 mx-1" />

            {/* Scene title */}
            <span className="text-white/70 text-sm flex-1 truncate">
              {currentScene?.hebrewTitle}
            </span>

            <div className="w-px h-5 bg-white/15 mx-1" />

            {/* Chapter map */}
            <button
              onClick={toggleChapterMap}
              className={`p-1.5 rounded-lg transition-all ${
                isChapterMapOpen ? 'text-white bg-white/15' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="מפת מצגת (Esc)"
              title="מפת מצגת (Esc)"
            >
              <Map size={16} />
            </button>

            {/* Presenter notes */}
            <button
              onClick={togglePresenterNotes}
              className={`p-1.5 rounded-lg transition-all ${
                isPresenterNotesOpen ? 'text-white bg-white/15' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label="הערות מציג (P)"
              title="הערות מציג (P)"
            >
              <StickyNote size={16} />
            </button>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isSoundEnabled ? 'השתק (M)' : 'הפעל צליל (M)'}
              title={isSoundEnabled ? 'השתק (M)' : 'הפעל צליל (M)'}
            >
              {isSoundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Reduced motion */}
            <button
              onClick={toggleReducedMotion}
              className={`p-1.5 rounded-lg transition-all ${
                isReducedMotion ? 'text-yellow-400 bg-yellow-400/15' : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              aria-label={isReducedMotion ? 'בטל מצב תנועה מופחתת' : 'הפעל מצב תנועה מופחתת'}
              title="תנועה מופחתת"
            >
              <Accessibility size={16} />
            </button>

            {/* Quality toggle */}
            <button
              onClick={() => {
                const levels = ['high', 'balanced', 'lightweight'] as const;
                const current = levels.indexOf(qualityLevel);
                setQualityLevel(levels[(current + 1) % levels.length]);
              }}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label={`איכות: ${qualityLevel}`}
              title={`איכות גרפיקה: ${qualityLevel}`}
            >
              {qualityLevel === 'lightweight' ? <ZapOff size={16} /> : <Zap size={16} />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isFullscreen ? 'צא ממסך מלא (F)' : 'מסך מלא (F)'}
              title="מסך מלא (F)"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
