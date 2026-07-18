import { useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';
import { openPresenterWindow } from '../lib/presenterChannel';

export function useKeyboardControls() {
  const {
    goNext,
    goPrev,
    goFirst,
    goLast,
    toggleChapterMap,
    togglePresenterNotes,
    toggleKeyboardHelp,
    toggleDiagnostics,
    toggleFullscreen,
    toggleBlackout,
    toggleReducedMotion,
    resetDemo,
    isChapterMapOpen,
    isKeyboardHelpOpen,
    isPresenterNotesOpen,
  } = usePresentationStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Diagnostics panel (Ctrl+Shift+D)
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        toggleDiagnostics();
        return;
      }

      // Close overlays with Escape
      if (e.key === 'Escape') {
        if (isChapterMapOpen) {
          toggleChapterMap();
          return;
        }
        if (isKeyboardHelpOpen) {
          toggleKeyboardHelp();
          return;
        }
        if (isPresenterNotesOpen) {
          togglePresenterNotes();
          return;
        }
        // Otherwise open chapter map
        toggleChapterMap();
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;

        case ' ':
          e.preventDefault();
          if (e.shiftKey) goPrev();
          else goNext();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;

        case 'PageDown':
          e.preventDefault();
          goNext();
          break;

        case 'PageUp':
          e.preventDefault();
          goPrev();
          break;

        case 'Home':
          e.preventDefault();
          goFirst();
          break;

        case 'End':
          e.preventDefault();
          goLast();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'p':
        case 'P':
          e.preventDefault();
          togglePresenterNotes();
          break;

        case 'b':
        case 'B':
          e.preventDefault();
          toggleBlackout();
          break;

        case 'r':
        case 'R':
          e.preventDefault();
          resetDemo();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          openPresenterWindow();
          break;

        case 'h':
        case 'H':
        case '?':
          e.preventDefault();
          toggleKeyboardHelp();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    goNext,
    goPrev,
    goFirst,
    goLast,
    toggleChapterMap,
    togglePresenterNotes,
    toggleKeyboardHelp,
    toggleDiagnostics,
    toggleFullscreen,
    toggleBlackout,
    toggleReducedMotion,
    resetDemo,
    isChapterMapOpen,
    isKeyboardHelpOpen,
    isPresenterNotesOpen,
  ]);
}
